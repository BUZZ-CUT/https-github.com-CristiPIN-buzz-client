
import { corsHeaders } from '../_shared/cors.ts';
import { getFirebaseUser } from '../_shared/firebase.ts';
import { createServiceClient } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const fbUser = await getFirebaseUser(req);
    if (!fbUser) return json({ error: 'Token Firebase invalid' }, 401);

    const { service_id, date, start_time, end_time, observations } = await req.json();

    const db = createServiceClient();
    const { data: user } = await db.from('users').select('id, blocked').eq('phone', fbUser.phoneNumber).single();
    if (!user) return json({ error: 'Utilizator negăsit' }, 404);
    if (user.blocked) return json({ error: 'Cont blocat' }, 403);

    const { data: ok, error: rpcErr } = await db.rpc('create_appointment_atomic', {
      p_client_id: user.id,
      p_service_id: service_id,
      p_date: date,
      p_start_time: start_time,
      p_end_time: end_time,
      p_observations: observations || null,
    });

    if (rpcErr) {
      if (rpcErr.message?.includes('SLOT_OCCUPIED')) return json({ error: 'Slot ocupat. Alege altă oră.' }, 409);
      throw rpcErr;
    }

    return json({ appointment: ok });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
