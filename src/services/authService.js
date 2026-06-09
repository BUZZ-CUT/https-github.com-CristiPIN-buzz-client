import { callFunction } from './apiService';

// Inregistrare user nou — PIN se hashează server-side
export async function registerUser({ phone: _phone, pin, name, prenume, instagram, facebook, tiktok }) {
  const { user } = await callFunction('register', { pin, name, prenume, instagram, facebook, tiktok });
  return user;
}

// Schimba PIN-ul utilizatorului curent
export async function changePin(pin) {
  await callFunction('change-pin', { pin });
}

// Info de baza (fara pin_hash) dupa verificare Firebase — folosit la login
export async function getUserInfo() {
  const { user } = await callFunction('get-user-info', {});
  return user;
}

// Updateaza profilul — fara userId, identity vine din Firebase token
export async function updateProfile({ name, prenume, instagram, facebook, tiktok }) {
  const { user } = await callFunction('update-profile', { name, prenume, instagram, facebook, tiktok });
  return user;
}

// Pastrat pentru compatibilitate cu SmsPage (login mode check)
export async function getUserByPhone(_phone) {
  return getUserInfo();
}
