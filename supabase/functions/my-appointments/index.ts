
import { corsHeaders } from '../_shared/cors.ts';
import { getFirebaseUser } from '../_shared/firebase.ts';
import { createServiceClient } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const fbUser = await getFirebaseUser(req);
    if (!fbUser) return json({ error: 'Token Firebase invalid' }, 401);

    const body = await req.json().catch(() => ({}));
    const { type } = body;

    const db = createServiceClient();
    const { data: user } = await db.from('users').select('id').eq('phone', fbUser.phoneNumber).single();
    if (!user) return json({ error: 'Utilizator negăsit' }, 404);

    if (type === 'next') {
      // Bucharest = UTC+3 summer / UTC+2 winter; simplified as +3
      const now = new Date();
      const bucNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);
      const todayStr = bucNow.toISOString().split('T')[0];
      const nowTimeStr = bucNow.toISOString().split('T')[1].slice(0, 8);
      const { data, error } = await db
        .from('appointments')
        .select('*, service:services(name, duration_min, price)')
        .eq('client_id', user.id)
        .eq('status', 'confirmat')
        .or(`date.gt.${todayStr},and(date.eq.${todayStr},end_time.gt.${nowTimeStr})`)
        .order('date')
        .order('start_time')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return json({ appointment: data || null });
    }

    const { data, error } = await db
      .from('appointments')
      .select('*, service:services(name, duration_min, price)')
      .eq('client_id', user.id)
      .order('date', { ascending: false });
    if (error) throw error;
    return json({ appointments: data });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
