
import { corsHeaders } from '../_shared/cors.ts';
import { getFirebaseUser } from '../_shared/firebase.ts';
import { hashPin } from '../_shared/pin.ts';
import { createServiceClient } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const fbUser = await getFirebaseUser(req);
    if (!fbUser) return json({ error: 'Token Firebase invalid' }, 401);

    const { pin, name, prenume, instagram, facebook, tiktok } = await req.json();

    const db = createServiceClient();
    const { data: existing } = await db.from('users').select('id').eq('phone', fbUser.phoneNumber).single();
    if (existing) return json({ error: 'Număr deja înregistrat' }, 409);

    const pin_hash = await hashPin(pin);
    const { data: user, error } = await db
      .from('users')
      .insert([{ phone: fbUser.phoneNumber, name, prenume, instagram: instagram || null, facebook: facebook || null, tiktok: tiktok || null, pin_hash, role: 'client' }])
      .select('id, phone, name, prenume, instagram, facebook, tiktok, role, blocked, created_at')
      .single();

    if (error) throw error;
    return json({ user });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
