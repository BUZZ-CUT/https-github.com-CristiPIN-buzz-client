import { supabase } from '../supabaseClient';

// Toate serviciile active
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('price');
  if (error) throw error;
  return data;
}

// Programarile unui client (cu detalii serviciu)
export async function getMyAppointments(clientId) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, service:services(name, duration_min, price)')
    .eq('client_id', clientId)
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
}

// Urmatoarea programare activa
export async function getNextAppointment(clientId) {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('appointments')
    .select('*, service:services(name, duration_min, price)')
    .eq('client_id', clientId)
    .eq('status', 'confirmat')
    .gte('date', today)
    .order('date')
    .order('start_time')
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

// Ore ocupate pentru o data data
export async function getBusySlots(date) {
  const { data, error } = await supabase
    .from('appointments')
    .select('start_time, end_time')
    .eq('date', date)
    .in('status', ['confirmat', 'prezent']);
  if (error) throw error;
  return data;
}

// Creeaza programare noua
export async function createAppointment({ clientId, serviceId, date, startTime, endTime, observations }) {
  const { data, error } = await supabase
    .from('appointments')
    .insert([{
      client_id: clientId,
      service_id: serviceId,
      date,
      start_time: startTime,
      end_time: endTime,
      observations: observations || null,
      status: 'confirmat',
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Reprogrameaza (inlocuieste vechea programare)
export async function rescheduleAppointment(oldId, { date, startTime, endTime }) {
  const { error } = await supabase
    .from('appointments')
    .update({ status: 'reprogramat', updated_at: new Date().toISOString() })
    .eq('id', oldId);
  if (error) throw error;

  const { data: old } = await supabase
    .from('appointments')
    .select('client_id, service_id, observations')
    .eq('id', oldId)
    .single();

  const { data, error: err2 } = await supabase
    .from('appointments')
    .insert([{
      client_id: old.client_id,
      service_id: old.service_id,
      date,
      start_time: startTime,
      end_time: endTime,
      observations: old.observations,
      status: 'confirmat',
      rescheduled_from: oldId,
    }])
    .select()
    .single();
  if (err2) throw err2;
  return data;
}

// Program de lucru
export async function getWorkSchedule() {
  const { data, error } = await supabase
    .from('work_schedule')
    .select('*')
    .order('day_of_week');
  if (error) throw error;
  return data;
}
