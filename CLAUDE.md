# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BUZZ Barber** — platformă de programări pentru frizeri din România, fondată de Cristi Pintea. Viziunea completă e în `BUZZ_Barber_Viziune.md`.

**Filozofia centrală:** Frizerul este proprietarul identității sale digitale. Profilul, clienții și recenziile îi aparțin lui — nu salonului. Dacă schimbă salonul, clienții îl urmăresc automat.

**Stadiu curent:** MVP fazei 1 — aplicație client pentru **Apex Man Barber Shop** (Vaslui), ca produs de validare înainte de lansarea platformei multi-frizer.

**Arhitectura platformei (3 niveluri):**
- **Nivel 1** — Frizer independent (cont propriu, link personal `buzzbarber.ro/cristi`)
- **Nivel 2** — Echipă mică (2-5 frizeri asociați voluntar, calendar comun)
- **Nivel 3** — Salon (frizerul alege să fie listat; salonul NU poate șterge profilul lui)

**Diferențiator cheie — BUZZ Points:**
- La fiecare programare finalizată, clientul primește puncte (setate de frizer per serviciu)
- Punctele se folosesc la: Roata Norocului, tombole lunare, card de fidelitate digital, reduceri directe

**Model de monetizare (propunere):**
- Gratuit: 1 frizer, max 30 programări/lună
- Pro ~49 lei/lună: programări nelimitate + BUZZ Points + statistici
- Salon ~99 lei/lună: până la 5 frizeri
- Salon+ ~199 lei/lună: frizeri nelimitați + branding

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
- **Supabase** (`@supabase/supabase-js` v2.108+) — Frankfurt region, GDPR compliant
- **Firebase Auth** — SMS OTP activ, integrat în PhonePage + SmsPage
- **Firebase Cloud Messaging** — push notifications (de făcut)
- Deployed to **Vercel**; Android via Capacitor APK (de făcut)

## Architecture

### Routing (`src/App.js`)

Toate rutele sunt flat într-un singur `<Router>`. Fluxurile:

- **Înregistrare:** `/` → `/welcome` → `/register` → `/sms` → `/name` → `/social` → `/pin-set` → `/home`
- **Login:** `/welcome` → `/login` → `/pin-login` → `/home`
- **Autentificat:** `/home` ↔ `/booking` (4 pași) → `/booking-done` ↔ `/profile` ↔ `/edit-profile`

`PhonePage` e refolosit pentru `/register` și `/login` — detectează modul din `location.state.mode`.

### Servicii (`src/services/`)

- **`supabaseClient.js`** — instanță Supabase exportată, folosită în toate serviciile
- **`firebaseClient.js`** — instanță Firebase Auth exportată
- **`smsAuth.js`** — stochează `confirmationResult` între PhonePage și SmsPage (modul-level var)
- **`session.js`** — gestionează sesiunea în `localStorage` (saveSession, getSession, clearSession, hashPin)
- **`authService.js`** — registerUser, getUserByPhone, updateProfile
- **`bookingService.js`** — getServices, getMyAppointments, getNextAppointment, getBusySlots, createAppointment, rescheduleAppointment, getWorkSchedule

### Firebase Phone Auth — detalii importante

- `RecaptchaVerifier` e stocat la nivel de modul în `PhonePage.js` (var `recaptchaVerifier`) — nu se apelează `.clear()` niciodată (distruge DOM-ul intern)
- `div#recaptcha-container` e în `public/index.html` (nu în componente) — persistă între navigări
- Erorile interne reCAPTCHA sunt suprimate în `src/index.js` cu `window.addEventListener('error', ...)`
- `React.StrictMode` e dezactivat din `src/index.js` (cauza double-render care duplica reCAPTCHA)
- **Numere de test Firebase:** `+40700000000` → cod `123456` (configurat în Firebase Console → Authentication → Phone)

### Supabase — detalii importante

- **Cheia anon** trebuie să fie în format JWT (`eyJ...`), NU formatul nou `sb_publishable_...`
- RLS este **dezactivat** pe toate tabelele (folosim Firebase Auth, nu Supabase Auth — `auth.uid()` returnează null)
- Permisiuni acordate explicit: `grant select, insert, update on public.users to anon` etc.
- Schema completă în `supabase_schema.sql` din rădăcina proiectului

### Sesiune utilizator

Nu există context global sau Redux. Sesiunea e în `localStorage` sub cheia `buzz_user` (obiectul user complet din Supabase). Orice pagină autentificată face `getSession()` și redirectează la `/welcome` dacă e null.

PIN-ul e hashat cu SHA-256 + salt `buzz_salt_` înainte de stocare: `hashPin(pin)` din `session.js`.

### Styling

Toate stilurile sunt **obiecte JSX inline** — fără CSS-in-JS, CSS modules sau Tailwind.

```js
'#0A0A0F'                // bg — fundal aproape negru
'#8B5CF6'                // violet — primary/interactiv
'#A78BFA'                // violet-light — prețuri, accente
'#1E1635'                // violet-card — fundal carduri
'rgba(139,92,246,0.15)'  // violet-border — separatoare
'rgba(255,255,255,0.55)' // text2 — text secundar
'rgba(255,255,255,0.28)' // text3 — muted/labels
'#22C55E'                // success
'#EF4444'                // danger
'#F59E0B'                // warning
```

Lățime maximă **430px** centrată. Bottom nav e `position: fixed` → conținut pagini necesită `paddingBottom: '90px'`.

## Fișiere modificate în această sesiune

| Fișier | Ce face |
|--------|---------|
| `src/pages/BookingDonePage.js` | NOU — ecran confirmare după programare, SVG bifa verde, card detalii, buton Acasă |
| `src/pages/PhonePage.js` | Firebase Phone Auth real, RecaptchaVerifier modul-level, loading/error states |
| `src/pages/SmsPage.js` | Verificare cod Firebase real, paste din clipboard, retrimite SMS, redirect după login vs register |
| `src/pages/PinSetPage.js` | Hashare PIN, salvare user real în Supabase, gestionare erori |
| `src/pages/PinLoginPage.js` | Verificare PIN din Supabase, afișare nume/inițiale reale din DB |
| `src/pages/HomePage.js` | Date reale: programare activă + servicii din Supabase, redirect dacă fără sesiune |
| `src/pages/BookingPage.js` | Servicii reale, calendar cu zile închise, ore generate din work_schedule, ore ocupate din DB, salvare programare reală |
| `src/pages/ProfilePage.js` | Date reale din sesiune, istoric programări din Supabase, deconectare reală |
| `src/pages/EditProfilePage.js` | Pre-completat cu date reale, salvare în Supabase, actualizare sesiune |
| `src/services/authService.js` | NOU — registerUser, getUserByPhone, updateProfile |
| `src/services/bookingService.js` | NOU — toate operațiunile CRUD pentru programări și servicii |
| `src/services/session.js` | NOU — localStorage session management + hashPin SHA-256 |
| `src/services/smsAuth.js` | NOU — confirmationResult store între pagini |
| `src/firebaseClient.js` | NOU — inițializare Firebase App + Auth |
| `src/index.js` | Suprimare erori reCAPTCHA, dezactivare StrictMode |
| `public/index.html` | Adăugat `div#recaptcha-container` permanent în DOM |
| `.env.local` | Adăugat variabile Firebase; cheia Supabase corectată la format JWT |
| `supabase_schema.sql` | NOU — schema completă SQL + date inițiale + RLS (RLS dezactivat ulterior) |
| `src/App.js` | Adăugat ruta `/booking-done` |

## Status actual

### ✅ Complet și funcțional
- Flux înregistrare complet (Firebase SMS → Supabase user)
- Flux login cu PIN
- Booking 4 pași cu date reale + salvare în Supabase
- Ecran confirmare programare (BookingDonePage)
- HomePage cu programare activă + servicii reale
- ProfilePage cu istoric real + deconectare
- EditProfilePage cu salvare reală

### ⏳ În așteptare
- **Firebase Blaze** — billing account BUZZ BARBER (01085A-F64D54-53911E) confirmat activ de Google Support (10 iunie 2026). Trecerea Spark → Blaze se propagă în 24-48h automat. Nu mai e nevoie de nicio acțiune. Când apare Blaze în Firebase Console, începem FCM.

### ❌ De făcut — Faza 1 MVP (Apex Man)
1. **Firebase FCM** — notificări push 24h și 1h înainte de programare (necesită Blaze — în propagare)
2. **Reprogramare** — pagina `/reprogramare` + logica în Supabase
3. **Recuperare PIN** — flow "Am uitat PIN-ul" (SMS → PIN nou)
4. **Build APK Android** — Capacitor setup
5. **Vercel deploy** — publicare web/PWA
6. **buzz-admin** — aplicația separată pentru Cristi (calendar, clienți, setări)

### ❌ De făcut — Faza 2 Platformă
- Arhitectură multi-frizer (cont per frizer, izolat)
- BUZZ Points — acumulare, portofel digital
- Roata Norocului
- Card de fidelitate digital
- Profil public frizer (`buzzbarber.ro/[slug]`)
- Profil public salon cu echipă
- Statistici avansate (clienți noi, recurenți, venit estimat)
- Sistem de recenzii per frizer
- Notificări SMS automate

## DB Schema (Supabase)

```
users         (id, phone, name, prenume, instagram, facebook, tiktok, pin_hash, role, created_at, blocked)
services      (id, name, description, duration_min, price, active, created_at)
appointments  (id, client_id, service_id, date, start_time, end_time, status, observations, created_at, updated_at, rescheduled_from)
              -- status: confirmat | prezent | neprezentat | anulat | reprogramat
work_schedule (id, day_of_week, is_open, start_time, end_time)  -- 0=luni, 6=duminică
notifications (id, user_id, appointment_id, type, sent_at, scheduled_for)
```

## Decizii de produs luate

- **Abonamente frizer → salon (10 iunie 2026):** Când un frizer cu plan Pro se alătură unui salon, abonamentul lui se suspendă automat — salonul îl acoperă prin planul său (per seat). La plecare din salon, abonamentul Pro se reactivează automat cu creditele rămase. Detalii complete în `BUZZ_Barber_Viziune.md` secțiunea 11.

## Business Rules

- Telefon = identitate unică, nu se poate modifica din profil
- Clienții nu pot șterge programări — doar reprogramează
- Reprogramarea înlocuiește slotul vechi; status vechi devine "reprogramat" (nu afectează ratingul)
- Un singur admin: Cristi Pintea (creat direct în Supabase, nu prin app)
- Notificările (24h + 1h) sunt automate, fără toggle în profil
