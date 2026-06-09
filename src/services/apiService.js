import { auth } from '../firebaseClient';

const BASE = process.env.REACT_APP_SUPABASE_URL + '/functions/v1';

function getFirebaseToken() {
  return new Promise((resolve, reject) => {
    if (auth.currentUser) return resolve(auth.currentUser.getIdToken());
    const unsub = auth.onAuthStateChanged(user => {
      unsub();
      if (user) resolve(user.getIdToken());
      else reject(new Error('Sesiune expirată. Autentifică-te din nou.'));
    });
  });
}

export async function callFunction(name, body = {}) {
  const firebase_token = await getFirebaseToken();
  const res = await fetch(`${BASE}/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${firebase_token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Eroare server');
  return data;
}
