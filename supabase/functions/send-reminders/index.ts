// Cron function — rulat la fiecare ora de Supabase
// Trimite notificari FCM cu 24h si 1h inainte de programare
import { createServiceClient } from '../_shared/supabase.ts';
import { sendFcmNotification } from '../_shared/fcm.ts';

Deno.serve(async () => {
  const db = createServiceClient();
  const now = new Date();

  // Ferestre: [23h30 - 24h30] pentru notificarea de 24h, [30min - 1h30] pentru 1h
  const windows = [
    { type: '24h', minMs: 23.5 * 3600 * 1000, maxMs: 24.5 * 3600 * 1000, label: '24h' },
    { type: '1h',  minMs: 0.5  * 3600 * 1000, maxMs: 1.5  * 3600 * 1000, label: '1h' },
  ];

  let sent = 0;
  let errors = 0;

  for (const window of windows) {
    // Gaseste programarile in fereastra de timp
    const minDate = new Date(now.getTime() + window.minMs);
    const maxDate = new Date(now.getTime() + window.maxMs);

    // Combinam data si ora programarii intr-un timestamp
    const { data: appointments, error } = await db
      .from('appointments')
      .select(`
        id, date, start_time,
        users!client_id(id, prenume, fcm_token),
        services!service_id(name)
      `)
      .eq('status', 'confirmat')
      .gte('date', minDate.toISOString().split('T')[0])
      .lte('date', maxDate.toISOString().split('T')[0]);

    if (error) {
      console.error('DB error:', error);
      continue;
    }

    for (const appt of appointments ?? []) {
      const apptDateTime = new Date(`${appt.date}T${appt.start_time}`);
      const diff = apptDateTime.getTime() - now.getTime();

      if (diff < window.minMs || diff > window.maxMs) continue;

      const user = appt.users as { id: string; prenume: string; fcm_token: string | null };
      const service = appt.services as { name: string };

      if (!user?.fcm_token) continue;

      // Verifica daca notificarea a fost deja trimisa
      const { data: existing } = await db
        .from('notifications')
        .select('id')
        .eq('appointment_id', appt.id)
        .eq('type', window.type)
        .maybeSingle();

      if (existing) continue;

      const timeStr = appt.start_time.slice(0, 5);
      const title = 'Apex Man Barber Shop';
      const body = window.type === '24h'
        ? `Mâine la ${timeStr} ai programare: ${service.name}. Te așteptăm!`
        : `Peste o oră ai programare la ${timeStr}: ${service.name}. Nu uita!`;

      try {
        await sendFcmNotification(user.fcm_token, title, body);

        await db.from('notifications').insert({
          user_id: user.id,
          appointment_id: appt.id,
          type: window.type,
          scheduled_for: apptDateTime.toISOString(),
          sent_at: now.toISOString(),
        });

        sent++;
      } catch (e) {
        console.error(`FCM failed for appt ${appt.id}:`, e);
        errors++;
      }
    }
  }

  return new Response(JSON.stringify({ sent, errors }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
