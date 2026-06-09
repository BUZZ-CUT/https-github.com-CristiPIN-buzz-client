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
