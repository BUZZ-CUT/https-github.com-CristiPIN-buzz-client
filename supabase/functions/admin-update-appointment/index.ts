
import { corsHeaders } from '../_shared/cors.ts';
import { getFirebaseUser } from '../_shared/firebase.ts';
import { createServiceClient } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const fbUser = await getFirebaseUser(req);
    if (!fbUser) return json({ error: 'Token Firebase invalid' }, 401);

    const db = createServiceClient();

    const { data: adminUser } = await db.from('users')
      .select('id, role')
      .eq('phone', fbUser.phoneNumber)
      .single();

    if (!adminUser || adminUser.role !== 'admin') return json({ error: 'Acces interzis' }, 403);

    const { appointment_id, status, date, start_time, end_time, service_id, observations } = await req.json();
    if (!appointment_id) return json({ error: 'appointment_id obligatoriu' }, 400);

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (status !== undefined) updates.status = status;
    if (date !== undefined) updates.date = date;
    if (start_time !== undefined) updates.start_time = start_time;
    if (end_time !== undefined) updates.end_time = end_time;
    if (service_id !== undefined) updates.service_id = service_id;
    if (observations !== undefined) updates.observations = observations;

    const { data, error } = await db
      .from('appointments')
      .update(updates)
      .eq('id', appointment_id)
      .select('*, service:services(id, name, duration_min, price)')
      .single();

    if (error) throw error;

    const { data: client } = await db.from('users').select('id, prenume, name, phone').eq('id', data.client_id).single();
    return json({ appointment: { ...data, client } });
  } catch (e: any) {
    return json({ error: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
