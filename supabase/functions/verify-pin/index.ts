
import { corsHeaders } from '../_shared/cors.ts';
import { getFirebaseUser } from '../_shared/firebase.ts';
import { verifyPin, hashPin } from '../_shared/pin.ts';
import { createServiceClient } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const fbUser = await getFirebaseUser(req);
    if (!fbUser) return json({ error: 'Token Firebase invalid' }, 401);

    const { pin } = await req.json();

    const db = createServiceClient();
    const { data: user, error } = await db
      .from('users')
      .select('id, phone, name, prenume, instagram, facebook, tiktok, role, blocked, pin_hash, created_at')
      .eq('phone', fbUser.phoneNumber)
      .single();

    if (error || !user) return json({ error: 'Utilizator negăsit' }, 404);
    if (user.blocked) return json({ error: 'Contul este blocat. Contactează frizerulsau.' }, 403);

    const valid = await verifyPin(pin, user.pin_hash);
    if (!valid) return json({ error: 'PIN incorect' }, 401);

    if (!user.pin_hash.startsWith('pbkdf2:')) {
      const newHash = await hashPin(pin);
      await db.from('users').update({ pin_hash: newHash }).eq('id', user.id);
    }

    const { pin_hash: _, ...safeUser } = user;
    return json({ user: safeUser });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
