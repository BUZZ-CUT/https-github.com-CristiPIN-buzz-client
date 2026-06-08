# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Buzz** — barbershop appointment app for Apex Man Barber Shop (Vaslui, Romania), built by/for Cristi Pintea. This is the **client-facing** app (`buzz-client`). A separate admin app (`buzz-admin`) is planned but not yet built.

Package name (Android): `com.apexman.buzz`

## Commands

```bash
npm start        # dev server (localhost:3000)
npm run build    # production build
npm test         # run tests (Jest / React Testing Library)
npm test -- --testPathPattern=SomePage  # run a single test file
```

## Tech Stack

- **React** (Create React App, React 19) with `react-router-dom` v7
- **Supabase** (`@supabase/supabase-js` v2) — Frankfurt region, GDPR compliant
- **Firebase Auth** — SMS OTP (planned; not yet wired)
- **Firebase Cloud Messaging** — push notifications (planned)
- Deployed to **Vercel**; Android via Capacitor APK (not yet built)

## Architecture

### Routing (`src/App.js`)

All routes are flat in a single `<Router>`. No auth guards exist yet — pages navigate freely using `useNavigate`. The intended flows are:

- **Registration:** `/` → `/welcome` → `/register` (PhonePage) → `/sms` → `/name` → `/social` → `/pin-set` → `/home`
- **Login:** `/welcome` → `/login` (PhonePage) → `/pin-login` → `/home`
- **Authenticated:** `/home` ↔ `/booking` (4-step flow) ↔ `/profile` ↔ `/edit-profile`

`PhonePage` is reused for both `/register` and `/login` routes — it uses `useLocation` to detect which flow it's in.

### Supabase client (`src/supabaseClient.js`)

Single exported `supabase` instance, initialized from env vars. Import it directly in any page that needs DB access.

Required `.env.local` vars:
```
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_ANON_KEY=
REACT_APP_FIREBASE_API_KEY=
```

### Pages (`src/pages/`)

Each page is a standalone function component — no shared layout wrappers, no context providers. State is local. Pages communicate by passing data through `navigate('/route', { state: { ... } })` and reading it back with `useLocation().state`.

`BookingPage` manages a 4-step wizard with local `useState` (`step`, `selSrv`, `selDate`, `selOra`, `obs`). On step 4 confirm, it navigates to `/booking-done` with the booking data in route state — that page doesn't exist yet.

### Styling

All styles are **inline JSX objects** — no CSS-in-JS library, no CSS modules, no Tailwind. The design system uses:

```js
// Core tokens used throughout
'#0A0A0F'               // bg — near-black background
'#8B5CF6'               // violet — primary/interactive
'#A78BFA'               // violet-light — prices, accents
'#1E1635'               // violet-card — card backgrounds
'rgba(139,92,246,0.15)' // violet-border — dividers
'rgba(255,255,255,0.55)'// text2 — secondary text
'rgba(255,255,255,0.28)'// text3 — muted/labels
'#22C55E'               // success
'#EF4444'               // danger
```

Fonts loaded from Google Fonts: **Bebas Neue** (headings, buttons — uppercase, `letterSpacing: '2-3px'`) and **Outfit** (body text). Until fonts are wired, pages fall back to `fontFamily: 'sans-serif'`.

Max width is **430px** centered — target is mobile. Bottom navigation is `position: fixed`, so page content needs `paddingBottom: '90px'`.

## What's Hardcoded (Needs Real Data)

Current pages use static/mock data:
- Services list in `BookingPage` and `HomePage` — hardcoded arrays
- Available/busy time slots in `BookingPage` — hardcoded
- Appointment history in `HomePage` — hardcoded
- User name/avatar in `HomePage` and `ProfilePage` — hardcoded

## Pending Work (Priority Order)

1. **BookingDonePage** — confirmation screen after booking (route `/booking-done` already referenced)
2. **Supabase schema** — create tables: `users`, `services`, `appointments`, `work_schedule`, `notifications`
3. **Firebase Auth SMS** — replace mock phone/OTP flow with real Firebase Auth
4. **Connect real data** — wire Supabase reads/writes to booking, profile, history
5. **Firebase FCM** — push notifications 24h and 1h before appointments
6. **Android APK** — Capacitor build
7. **buzz-admin** — separate app for Cristi (calendar, client list, settings)

## DB Schema (Supabase)

```sql
users         (id, phone, name, prenume, instagram, facebook, tiktok, pin_hash, role, created_at, blocked)
services      (id, name, description, duration_min, price, active, created_at)
appointments  (id, client_id, service_id, date, start_time, end_time, status, observations, created_at, updated_at, rescheduled_from)
              -- status: confirmat | prezent | neprezentat | anulat | reprogramat
work_schedule (id, day_of_week, is_open, start_time, end_time)
notifications (id, user_id, appointment_id, type, sent_at, scheduled_for)
```

## Business Rules

- Phone number = unique identity; cannot be changed from profile
- Clients cannot delete appointments — only reschedule
- Rescheduling replaces the old slot; old status becomes "reprogramat" (doesn't affect rating)
- Only one admin: Cristi Pintea (created directly in Supabase backend, not via the app)
- Notifications (24h + 1h) are automatic — no user toggle
