import { supabase } from '../supabaseClient';

// Inregistrare user nou dupa verificarea SMS
export async function registerUser({ phone, name, prenume, instagram, facebook, tiktok, pin_hash }) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ phone, name, prenume, instagram, facebook, tiktok, pin_hash, role: 'client' }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Gaseste user dupa telefon
export async function getUserByPhone(phone) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('phone', phone)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

// Updateaza profilul userului curent
export async function updateProfile(userId, fields) {
  const { data, error } = await supabase
    .from('users')
    .update(fields)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
