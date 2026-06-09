
import { corsHeaders } from '../_shared/cors.ts';
import { getFirebaseUser } from '../_shared/firebase.ts';
import { createServiceClient } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const fbUser = await getFirebaseUser(req);
    if (!fbUser) return json({ error: 'Token Firebase invalid' }, 401);

    const { appointment_id, date, start_time, end_time } = await req.json();

    const db = createServiceClient();

    const { data: user } = await db.from('users').select('id, blocked').eq('phone', fbUser.phoneNumber).single();
    if (!user) return json({ error: 'Utilizator negăsit' }, 404);
    if (user.blocked) return json({ error: 'Cont blocat' }, 403);

    const { data: oldAppt } = await db.from('appointments')
      .select('id, client_id, service_id, observations, status')
      .eq('id', appointment_id)
      .single();

    if (!oldAppt) return json({ error: 'Programare negăsită' }, 404);
    if (oldAppt.client_id !== user.id) return json({ error: 'Acces interzis' }, 403);
    if (oldAppt.status !== 'confirmat') return json({ error: 'Doar programările confirmate pot fi reprogramate' }, 400);

    await db.from('appointments')
      .update({ status: 'reprogramat', updated_at: new Date().toISOString() })
      .eq('id', appointment_id);

    const { data: newAppt, error: rpcErr } = await db.rpc('create_appointment_atomic', {
      p_client_id: user.id,
      p_service_id: oldAppt.service_id,
      p_date: date,
      p_start_time: start_time,
      p_end_time: end_time,
      p_observations: oldAppt.observations,
    });

    if (rpcErr) {
      await db.from('appointments').update({ status: 'confirmat' }).eq('id', appointment_id);
      if (rpcErr.message?.includes('SLOT_OCCUPIED')) return json({ error: 'Slot ocupat. Alege altă oră.' }, 409);
      throw rpcErr;
    }

    await db.from('appointments').update({ rescheduled_from: appointment_id }).eq('id', newAppt.id);

    return json({ appointment: newAppt });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
