import { supabase } from '../supabaseClient';
import { callFunction } from './apiService';

// Date publice — direct prin anon key (fara PII)

export async function getServices() {
  const { data, error } = await supabase.from('services').select('*').eq('active', true).order('price');
  if (error) throw error;
  return data;
}

export async function getBusySlots(date) {
  const { data, error } = await supabase
    .from('appointments')
    .select('start_time, end_time')
    .eq('date', date)
    .in('status', ['confirmat', 'prezent']);
  if (error) throw error;
  return data;
}

export async function getWorkSchedule() {
  const { data, error } = await supabase.from('work_schedule').select('*').order('day_of_week');
  if (error) throw error;
  return data;
}

// Date private — prin Edge Functions cu autentificare Firebase

export async function getMyAppointments() {
  const { appointments } = await callFunction('my-appointments', {});
  return appointments;
}

export async function getNextAppointment() {
  const { appointment } = await callFunction('my-appointments', { type: 'next' });
  return appointment;
}

export async function createAppointment({ serviceId, date, startTime, endTime, observations }) {
  const { appointment } = await callFunction('create-appointment', {
    service_id: serviceId,
    date,
    start_time: startTime,
    end_time: endTime,
    observations,
  });
  return appointment;
}

export async function rescheduleAppointment(oldId, { date, startTime, endTime }) {
  const { appointment } = await callFunction('reschedule', {
    appointment_id: oldId,
    date,
    start_time: startTime,
    end_time: endTime,
  });
  return appointment;
}
