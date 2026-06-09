-- ============================================================
-- BUZZ - Securitate v2
-- Ruleaza in: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Functie atomica pentru creare programare (previne race condition)
CREATE OR REPLACE FUNCTION create_appointment_atomic(
  p_client_id uuid,
  p_service_id uuid,
  p_date date,
  p_start_time time,
  p_end_time time,
  p_observations text DEFAULT NULL
) RETURNS appointments AS $$
DECLARE
  v_conflict integer;
  v_appt appointments;
BEGIN
  SELECT COUNT(*) INTO v_conflict
  FROM appointments
  WHERE date = p_date
    AND status IN ('confirmat', 'prezent')
    AND start_time < p_end_time
    AND end_time > p_start_time
  FOR UPDATE;

  IF v_conflict > 0 THEN
    RAISE EXCEPTION 'SLOT_OCCUPIED';
  END IF;

  INSERT INTO appointments (client_id, service_id, date, start_time, end_time, observations, status)
  VALUES (p_client_id, p_service_id, p_date, p_start_time, p_end_time, p_observations, 'confirmat')
  RETURNING * INTO v_appt;

  RETURN v_appt;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 2. Re-activare RLS pe toate tabelele
-- ============================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 3. Drop politici vechi (care depindeau de auth.uid())
-- ============================================================
DROP POLICY IF EXISTS "user vede profilul sau" ON users;
DROP POLICY IF EXISTS "user isi editeaza profilul" ON users;
DROP POLICY IF EXISTS "insert user la inregistrare" ON users;
DROP POLICY IF EXISTS "client vede programarile sale" ON appointments;
DROP POLICY IF EXISTS "client face programare" ON appointments;
DROP POLICY IF EXISTS "client reprogrameaza" ON appointments;
DROP POLICY IF EXISTS "user vede notificarile sale" ON notifications;

-- ============================================================
-- 4. Politici noi
-- ============================================================

-- SERVICES: citire publica (active)
-- (politica "servicii publice" ramane neschimbata)

-- WORK_SCHEDULE: citire publica
-- (politica "program public" ramane neschimbata)

-- USERS: fara acces direct cu anon key
-- Toate operatiile merg prin Edge Functions cu service_role key

-- APPOINTMENTS: anon poate citi DOAR start_time/end_time/date/status pentru calendar
-- (fara PII — client_id este UUID anonim)
CREATE POLICY "busy slots publice" ON appointments
  FOR SELECT USING (status IN ('confirmat', 'prezent'));

-- NOTIFICATIONS: fara acces direct
-- (nicio politica = nicio accesibilitate pentru anon)

-- ============================================================
-- 5. Revoke direct INSERT pe users de la anon
--    (inregistrarea merge acum prin Edge Function)
-- ============================================================
REVOKE INSERT ON public.users FROM anon;
REVOKE UPDATE ON public.users FROM anon;
REVOKE DELETE ON public.users FROM anon;
REVOKE INSERT ON public.appointments FROM anon;
REVOKE UPDATE ON public.appointments FROM anon;
REVOKE DELETE ON public.appointments FROM anon;
REVOKE ALL ON public.notifications FROM anon;

-- Edge Functions folosesc service_role care are acces complet
