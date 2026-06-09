
import { corsHeaders } from '../_shared/cors.ts';
import { getFirebaseUser } from '../_shared/firebase.ts';
import { hashPin } from '../_shared/pin.ts';
import { createServiceClient } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const fbUser = await getFirebaseUser(req);
    if (!fbUser) return json({ error: 'Token Firebase invalid' }, 401);

    const { pin } = await req.json();
    const db = createServiceClient();
    const pin_hash = await hashPin(pin);

    const { error } = await db.from('users').update({ pin_hash }).eq('phone', fbUser.phoneNumber);
    if (error) throw error;
    return json({ ok: true });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
