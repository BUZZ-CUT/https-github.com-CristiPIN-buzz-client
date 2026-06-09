
import { corsHeaders } from '../_shared/cors.ts';
import { getFirebaseUser } from '../_shared/firebase.ts';
import { createServiceClient } from '../_shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const fbUser = await getFirebaseUser(req);
    if (!fbUser) return json({ error: 'Token Firebase invalid' }, 401);

    const { name, prenume, instagram, facebook, tiktok } = await req.json();

    const db = createServiceClient();
    const { data: user, error } = await db
      .from('users')
      .update({ name, prenume, instagram: instagram || null, facebook: facebook || null, tiktok: tiktok || null })
      .eq('phone', fbUser.phoneNumber)
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
