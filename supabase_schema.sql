-- ============================================================
-- BUZZ - Schema Supabase
-- Ruleaza in: Supabase Dashboard > SQL Editor
-- ============================================================

-- USERS
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  phone text unique not null,
  name text,
  prenume text,
  instagram text,
  facebook text,
  tiktok text,
  pin_hash text,
  role text not null default 'client' check (role in ('client', 'admin')),
  blocked boolean not null default false,
  created_at timestamptz not null default now()
);

-- SERVICES
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  duration_min integer not null,
  price integer not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- WORK SCHEDULE (0=luni ... 6=duminica)
create table if not exists work_schedule (
  id uuid primary key default gen_random_uuid(),
  day_of_week integer not null unique check (day_of_week between 0 and 6),
  is_open boolean not null default true,
  start_time time not null default '09:00',
  end_time time not null default '18:00'
);

-- APPOINTMENTS
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references users(id),
  service_id uuid not null references services(id),
  date date not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'confirmat' check (status in ('confirmat','prezent','neprezentat','anulat','reprogramat')),
  observations text,
  rescheduled_from uuid references appointments(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- NOTIFICATIONS
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  appointment_id uuid not null references appointments(id),
  type text not null check (type in ('24h', '1h')),
  scheduled_for timestamptz not null,
  sent_at timestamptz
);

-- ============================================================
-- DATE INITIALE
-- ============================================================

-- Program de lucru default (luni-sambata, duminica inchis)
insert into work_schedule (day_of_week, is_open, start_time, end_time) values
  (0, true,  '09:00', '18:00'),
  (1, true,  '09:00', '18:00'),
  (2, true,  '09:00', '18:00'),
  (3, true,  '09:00', '18:00'),
  (4, true,  '09:00', '18:00'),
  (5, true,  '09:00', '16:00'),
  (6, false, '09:00', '18:00')
on conflict (day_of_week) do nothing;

-- Servicii default
insert into services (name, description, duration_min, price) values
  ('Tuns + Contur', null, 45, 70),
  ('Tuns simplu', null, 30, 50),
  ('Fade and Styling', null, 60, 90),
  ('Barba + Contur', null, 30, 40),
  ('Tuns + Barba', null, 75, 100)
on conflict do nothing;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table users enable row level security;
alter table services enable row level security;
alter table work_schedule enable row level security;
alter table appointments enable row level security;
alter table notifications enable row level security;

-- SERVICES: oricine poate citi serviciile active
create policy "servicii publice" on services
  for select using (active = true);

-- WORK SCHEDULE: oricine poate citi programul
create policy "program public" on work_schedule
  for select using (true);

-- USERS: fiecare vede doar profilul sau
create policy "user vede profilul sau" on users
  for select using (id = auth.uid());

create policy "user isi editeaza profilul" on users
  for update using (id = auth.uid());

create policy "insert user la inregistrare" on users
  for insert with check (true);

-- APPOINTMENTS: clientul vede doar programarile sale
create policy "client vede programarile sale" on appointments
  for select using (client_id = auth.uid());

create policy "client face programare" on appointments
  for insert with check (client_id = auth.uid());

create policy "client reprogrameaza" on appointments
  for update using (client_id = auth.uid());

-- NOTIFICATIONS: userul vede doar ale lui
create policy "user vede notificarile sale" on notifications
  for select using (user_id = auth.uid());
