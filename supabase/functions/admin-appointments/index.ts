
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
      .select('id, role, blocked')
      .eq('phone', fbUser.phoneNumber)
      .single();

    if (!adminUser) return json({ error: 'Utilizator negăsit' }, 404);
    if (adminUser.role !== 'admin') return json({ error: 'Acces interzis' }, 403);
    if (adminUser.blocked) return json({ error: 'Cont blocat' }, 403);

    const { date } = await req.json();
    if (!date) return json({ error: 'Data este obligatorie' }, 400);

    const { data, error } = await db
      .from('appointments')
      .select('*, service:services(id, name, duration_min, price)')
      .eq('date', date)
      .order('start_time');

    if (error) throw error;

    // Fetch client info for each appointment
    const clientIds = [...new Set(data.map((a: any) => a.client_id))];
    const { data: clients } = await db
      .from('users')
      .select('id, prenume, name, phone')
      .in('id', clientIds);

    const clientMap = Object.fromEntries((clients || []).map((c: any) => [c.id, c]));
    const appointments = data.map((a: any) => ({ ...a, client: clientMap[a.client_id] || null }));

    return json({ appointments });
  } catch (e: any) {
    return json({ error: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
