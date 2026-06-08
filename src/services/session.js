// Gestioneaza sesiunea userului in localStorage

export function saveSession(user) {
  localStorage.setItem('buzz_user', JSON.stringify(user));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem('buzz_user'));
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem('buzz_user');
}

export async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode('buzz_salt_' + pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
