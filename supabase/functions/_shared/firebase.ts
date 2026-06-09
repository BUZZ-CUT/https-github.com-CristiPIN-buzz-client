// Verificare token Firebase via REST API (accounts:lookup)
// FIREBASE_WEB_API_KEY e setat ca Supabase secret

export interface FirebaseUser {
  phoneNumber: string;
  localId: string;
}

export async function getFirebaseUser(req: Request): Promise<FirebaseUser | null> {
  const authHeader = req.headers.get('authorization') ?? '';
  const idToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!idToken) {
    console.error('No token in Authorization header');
    return null;
  }

  const API_KEY = Deno.env.get('FIREBASE_WEB_API_KEY') ?? '';
  if (!API_KEY) {
    console.error('FIREBASE_WEB_API_KEY not set');
    return null;
  }

  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.error('Firebase lookup error:', JSON.stringify(data));
      return null;
    }
    const user = data.users?.[0];
    if (!user?.phoneNumber) {
      console.error('No phoneNumber in user:', JSON.stringify(user));
      return null;
    }
    return { phoneNumber: user.phoneNumber, localId: user.localId };
  } catch (e) {
    console.error('Firebase token exception:', e);
    return null;
  }
}
