# BUZZ — Programări Frizerie
## Document complet de proiect pentru Claude Code

---

## 1. DESCRIEREA APLICAȚIEI

**Buzz** este o aplicație mobilă de programări pentru frizerie, construită pentru Cristi Pintea — frizer PFA în Vaslui, România, cu brandul **Apex Man Barber Shop**.

**Nume în aplicație:** Buzz  
**Nume în Play Store:** Buzz — Programări Frizerie  
**Package name:** com.apexman.buzz

---

## 2. ARHITECTURA TEHNICĂ

### Stack
- **Frontend:** React (create-react-app)
- **Baza de date + Backend:** Supabase (regiunea Frankfurt — EU Central)
- **Autentificare:** Firebase Auth (SMS OTP)
- **Hosting:** Vercel (gratuit)
- **Notificări:** Firebase Cloud Messaging

### Supabase
- **URL:** https://lbdqaxjcmzmasodhwacv.supabase.co
- **Anon Key:** sb_publishable_1LuZKzW9RZMeHzgSO64IwA_pOiahAaO
- **Regiune:** Frankfurt (GDPR compliant)

### Structura proiect
```
buzz-client/
  src/
    pages/          # Toate paginile aplicației
    components/     # Componente reutilizabile
    styles/         # Stiluri globale
    supabaseClient.js
    .env.local
```

---

## 3. DOUĂ APLICAȚII SEPARATE

### Aplicația 1 — Client (buzz-client)
- Publică pe Google Play Store
- Pe iPhone — PWA din browser (fără App Store momentan)
- Toți utilizatorii se înregistrează automat ca clienți

### Aplicația 2 — Admin/Frizer (buzz-admin)
- Privată, doar pentru Cristi
- Instalată direct ca APK (nu trece prin Play Store)
- Construită după lansarea aplicației client

---

## 4. ROLURI ȘI SECURITATE

### Faza 1 (acum)
- **Un singur admin** = Cristi Pintea (creat direct din backend)
- **Toți ceilalți** = clienți automat la înregistrare
- Securitate prin SMS — numărul de telefon = identitate unică

### Faza 2 (viitor)
- Sistem cod de invitație pentru alți frizeri
- Un frizer primește cod → se înregistrează ca frizer
- Scalare la mai mulți profesioniști

---

## 5. FLUX AUTENTIFICARE CLIENT

### Înregistrare (5 pași)
1. **Număr telefon** (+40...)
2. **Cod SMS** (6 cifre, auto-focus)
3. **Nume + Prenume**
4. **Linkuri sociale** (Instagram/Facebook/TikTok — opțional, skip disponibil)
5. **Setează PIN** (4 cifre, confirmare)

### Login
1. **Număr telefon**
2. **PIN direct** (fără SMS)
3. "Am uitat PIN-ul" → SMS → PIN nou

### Securitate
- SMS = identitate unică (nimeni nu poate crea cont cu nr. altcuiva)
- PIN = acces rapid la deschiderile următoare
- Telefon NU se poate modifica din profil

---

## 6. PAGINILE APLICAȚIEI CLIENT

### Pagini existente (codate)
- `/` → SplashScreen (2 sec, redirect la /welcome)
- `/welcome` → WelcomePage (Creează cont / Am deja cont)
- `/register` → PhonePage
- `/login` → PhonePage
- `/sms` → SmsPage
- `/name` → NamePage
- `/social` → SocialPage
- `/pin-set` → PinSetPage
- `/pin-login` → PinLoginPage
- `/home` → HomePage
- `/booking` → BookingPage (4 pași)
- `/profile` → ProfilePage
- `/edit-profile` → EditProfilePage

### Pagini de adăugat
- `/booking-done` → Confirmare programare reușită
- `/reprogramare` → Flow reprogramare

---

## 7. HOME PAGE (CLIENT)

### Conține (Faza 1)
1. **Header** — salut + numele clientului + avatar
2. **Următoarea programare** — card cu status, serviciu, frizer, Apel + Reprogramare
3. **Servicii disponibile** — lista serviciilor cu prețuri
4. **Istoricul programărilor** — cu status Prezent/Neprezentat/Anulat/Reprogramat

### Bottom Nav
- 🏠 Home
- 📅 Programare (deschide direct fluxul de programare)
- 👤 Profil

### De adăugat în Faza 2
- Jocuri & Monede
- Anunțuri/noutăți de la frizerie
- Pagina Explorează (caută frizerii)

---

## 8. FLUX PROGRAMARE CLIENT (4 PAȘI)

1. **Alege serviciul** — radio buttons, buton blocat până selectezi
2. **Alege data** — calendar lunar, zile trecute blocate
3. **Alege ora** — grid ore disponibile vs ocupate (taiate)
4. **Confirmare** — card frizer + detalii + câmp Observații (opțional)
5. **Done** — ecran confirmare cu data și ora

### Reguli programare
- Clientul NU poate șterge programarea — doar reprogramează
- Reprogramarea = alege altă oră disponibilă → vechea se înlocuiește automat
- Status "Reprogramat" NU afectează ratingul clientului
- Notificări automate: 24h și 1h înainte de programare

---

## 9. PROFIL CLIENT

### Conține
- Avatar + Nume + Telefon (readonly) + Linkuri sociale
- Setări: Schimbă PIN / Temă (Închis/Deschis)
- Istoricul programărilor
- Buton Deconectare

### Editare profil
- Schimbă prenume/nume
- Schimbă linkuri sociale
- Telefon = blocat, nu se poate modifica

### Notificări
- NU există toggle de notificări în profil
- Notificările sunt automate și nu pot fi dezactivate
- 24h și 1h înainte de programare

---

## 10. DESIGN SYSTEM

### Culori
```css
--bg: #0A0A0F
--violet: #8B5CF6
--violet-light: #A78BFA
--violet-card: #1E1635
--violet-border: rgba(139,92,246,0.15)
--text: #FFFFFF
--text2: rgba(255,255,255,0.55)
--text3: rgba(255,255,255,0.28)
--success: #22C55E
--danger: #EF4444
--warning: #F59E0B
```

### Tipografie
- **Titluri principale:** Bebas Neue (Google Fonts)
- **Text:** Outfit (Google Fonts)
- Titluri importante = alb (#fff)
- Text secundar = gri (--text2 sau --text3)

### Principii de design
- **Premium, nu de buget** — inspirat din Instagram/TikTok/Facebook
- **Simetrie și eleganță** — butoane centrate, spațiere egală
- **Aerisit** — spațiu între secțiuni, nu înghesuit
- **Ierarhie clară** — un singur lucru important per secțiune
- **Borduri minime** — doar unde ajută înțelegerea
- **Lățime maximă:** 430px (mobil)

### Butoane
```css
/* Primary */
background: #8B5CF6
border-radius: 14px
padding: 16px
font: Bebas Neue 17-18px, letterSpacing: 3px

/* Secondary */
background: transparent
border: 1px solid rgba(139,92,246,0.3)

/* Danger */
background: rgba(239,68,68,0.08)
border: 1px solid rgba(239,68,68,0.15)
color: #EF4444
```

---

## 11. BAZA DE DATE SUPABASE (tabele necesare)

### users
```sql
id, phone, name, prenume, instagram, facebook, tiktok, 
pin_hash, role (client/admin), created_at, blocked
```

### services
```sql
id, name, description, duration_min, price, active, created_at
```

### appointments
```sql
id, client_id, service_id, date, start_time, end_time,
status (confirmat/prezent/neprezentat/anulat/reprogramat),
observations, created_at, updated_at, rescheduled_from
```

### work_schedule
```sql
id, day_of_week (0-6), is_open, start_time, end_time
```

### notifications
```sql
id, user_id, appointment_id, type, sent_at, scheduled_for
```

---

## 12. APLICAȚIA ADMIN (buzz-admin)

### Informații generale
- **Nume proiect:** buzz-admin
- **Tip:** APK privat — instalat direct pe telefonul lui Cristi
- **Nu** trece prin Play Store
- Același Supabase și Firebase ca buzz-client
- Construit după lansarea aplicației client

### Flux autentificare admin
- Număr telefon → SMS → PIN (identic cu clientul)
- Contul de admin creat direct din backend (Supabase) la lansare
- Dacă role = 'admin' → redirect la CalendarPage
- Dacă role = 'client' → redirect la HomePage (nu are acces la admin)

### Structura proiect
```
buzz-admin/
  src/
    pages/
      CalendarPage.js
      EditAppointmentPage.js
      ClientiPage.js
      FisaClientPage.js
      SetariPage.js
      SetariProgramPage.js
      SetariServiciiPage.js
      SetariContPage.js
    components/
    supabaseClient.js
    .env.local
```

### Bottom Nav Admin
- 📅 Calendar (activ implicit)
- 👥 Clienți
- ⚙️ Setări

---

### PAGINA 1 — CALENDAR (CalendarPage.js)

#### Header (topbar)
- **Stânga:** Data curentă cu dropdown (ex: "Joi 5 Iun. ↓")
  - La apăsare → dropdown calendar lunar 40% din ecran
  - Cifre mari, navigare luni cu săgeți
  - Ziua selectată = cerc violet
  - Se închide la tap în afară sau la selectare zi
- **Dreapta:** Toggle Eu/Toți + iconița Mesaje + iconița Filtre

#### Bara săptămânii
- Săgeți navigare stânga/dreapta (22px)
- 7 zile vizibile, ziua activă = cerc violet
- Dot sub ziua curentă

#### Grid calendar (scroll vertical)
- **Coloana ore:** 48px fix, stânga
- **Coloana evenimente:** restul lățimii
- **Înălțime per oră:** 100px
- **Linie groasă:** ora exactă (rgba violet 0.2)
- **Linie subțire:** 30 minute (rgba violet 0.07)
- **Linia roșie:** ora curentă cu punct roșu stânga
- **Zone moarte (gri):** în afara programului de lucru — calculate automat din setări
- **Scroll automat:** la 1 oră înainte de program

#### Blocuri programare
```
Rândul 1: [ora start - ora sfârșit] · [status] → [tag dreapta]
Rândul 2: [Nume client bold] [serviciu ales]
```
- **Tip client:** gradient violet #6D28D9 → #4C1D95, border-left 2px
- **Tip blocat manual:** portocaliu dashed rgba(245,158,11)
- **Tip fără client:** violet transparent
- **Blocuri trecute:** devin gri automat după linia roșie
- **Tag:** text alb semitransparent (fără background)
- **Status:** Prezent (verde) / Neprezentat (roșu) / Anulat (galben) / Reprogramat (galben)
- **La apăsare bloc:** deschide EditAppointmentPage

#### Timp blocat manual
- Adăugat prin apăsare pe zonă goală din calendar
- Bottom sheet cu: Programare client / Blochează timp
- Bloc portocaliu cu text "Timp blocat"
- Diferit de zona moartă — poate fi șters oricând

#### Filtru (iconița ≡)
- Bottom sheet cu:
  - **Afișare programări:** Include anulate / Doar neîncasate
  - **Interval calendar:** Complet (6-23h) / Program de lucru (automat)

---

### PAGINA 2 — EDITARE PROGRAMARE (EditAppointmentPage.js)

#### Header
- Săgeată înapoi (22px) + titlu "Editeaza programarea"
- Compact, padding redus

#### Conținut (scroll)

**Status + Data**
- Badge status colorat (Confirmat/Prezent/Neprezentat/Anulat/Reprogramat)
- Data mare: "Joi 5 Iun. · 13:00" (Bebas Neue 30px)
- Subtitlu: "45 min · Nu se repetă" (gri)

**Card client** (cu fundal + bordură)
- Avatar + Nume + Telefon
- Butoane: Apel (violet) / Mesaj (card) / WhatsApp (verde)
- Textarea observații client (ce a scris clientul la programare)

**Serviciu** (cu fundal + bordură)
- Denumire + durată + preț
- Săgeată → pentru editare

**Data și ora** (fără card)
- 2 butoane cu bordură: "5 Iun. 13:00 ↓" și "13:45 ↓"
- La apăsare → modal custom cu:
  - Calendar mini
  - Scroll ore (0-23)
  - Scroll minute (0, 10, 15, 20, 30, 45)
  - Toggle interval: 10 min / 15 min
  - Butoane: Anulează / Setează
- Ore disponibile ca pill-uri (violet card)

**Observații interne** (fără card)
- Textarea — vizibile doar de frizer

**Repetare** (fără card)
- Iconița + text "Repetare" (alb) + valoare curentă dreapta
- La apăsare → bottom sheet cu radio buttons:
  - Nu se repetă ✓ / Zilnic / Săptămânal / La 2 săptămâni / Lunar

**Acțiuni rapide** (fără card)
- Grid 2x2: Prezent + Cod (verde) / Trimite cod (violet) / Neprezentare (roșu) / Blochează client (portocaliu)

**Istoric programare** (fără card)
- Iconița ceas + text gri
- DATA CREARII (violet mic) + data exactă

#### Footer fix (centrat)
- Coș roșu 52px + Buton Salvează 280px
- Centrate pe ecran

---

### PAGINA 3 — CLIENȚI (ClientiPage.js)

#### Header
- Titlu "Clienți" + număr total (ex: "24 clienți")

#### Căutare
- Input cu iconița lupă, fundal violet-card

#### Filtre
- Pills scroll orizontal: Toți / Activi / Neprezentați / Blocați

#### Lista clienți
- Avatar (inițiale) + Nume + Telefon
- Dreapta: Data ultimei vizite + număr tunsori
- Client blocat: avatar roșu + badge "Blocat"
- La apăsare → FisaClientPage

---

### PAGINA 4 — FIȘA CLIENT (FisaClientPage.js)

#### Header
- Săgeată înapoi + "Fișa client" + buton ⋮ dreapta
- La apăsare ⋮ → bottom sheet opțiuni:
  - Trimite avertisment (portocaliu)
  - Blochează/Deblochează client (roșu/verde)
  - Buton Anulează

#### Conținut
- Avatar mare (64px) + Nume + Telefon + "Client din [lună] [an]"
- Butoane contact: Apel / Mesaj / WhatsApp
- Statistici: Tunsori / Neprezentări / Rată prezență (%)
- Separator
- **Istoricul programărilor:** zile + serviciu + status

#### Note
- Fără secțiunea de observații (observațiile sunt la programare, nu la client)
- Fără footer cu butoane

---

### PAGINA 5 — SETĂRI (SetariPage.js)

#### Listă simplă cu 3 opțiuni
- Program de lucru → SetariProgramPage
- Servicii → SetariServiciiPage
- Cont și profil → SetariContPage

---

### PAGINA 6 — PROGRAM DE LUCRU (SetariProgramPage.js)

#### Pentru fiecare zi (L-D)
- Numele zilei + Toggle on/off + Ore start/stop
- Când off → afișează "Închis"
- La apăsare ore → picker custom (NU Android nativ):
  - Bottom sheet cu titlu "Ora de început/sfârșit"
  - Display mare cu ora curentă (Bebas Neue 48px)
  - Scroll ore (coloană stânga) + separator ":" + Scroll minute (coloană dreapta)
  - Minute fixe: 0, 10, 15, 20, 30, 45
  - Fade gradient sus/jos pe coloane
  - Butoane: Anulează / Setează

#### Footer
- Buton Salvează centrat (280px)

#### Logică
- Zonele moarte din calendar se calculează automat din aceste setări
- Schimbi programul → calendar se actualizează automat

---

### PAGINA 7 — SERVICII (SetariServiciiPage.js)

#### Lista serviciilor
- Denumire + durată + preț + buton editare (creion)
- Buton "Adaugă serviciu nou" jos

#### Modal editare/adăugare serviciu (bottom sheet)
- Câmpuri: Denumire / Descriere (opțional) / Durată (min) / Preț (lei)
- Butoane: coș ștergere + Salvează

---

### PAGINA 8 — CONT ȘI PROFIL (SetariContPage.js)

#### Avatar
- Cerc mare cu inițiale + iconița editare
- La apăsare → schimbă poza

#### Informații
- Numele frizieriei (ex: Apex Man Barber Shop)
- Numele tău (ex: Cristi Pintea)
- Adresa
- Telefon

#### Social media
- Instagram (@cristi.99p) / Facebook / TikTok

#### Footer
- Buton Salvează centrat (280px)

---

## 13. SISTEM DE FIDELIZARE (FAZA 2 — DEZACTIVAT MOMENTAN)

### Monede
- 1 tuns = cod de la frizer → 10 monede (editabil din admin)
- Folosite pentru jocuri și recompense

### Foculețe (streak)
- 1 tuns/lună = 1 foculeț (se acumulează)
- Dacă nu vine o lună → 1 săptămână grație → plătește 20 monede SAU pierde foculețele
- Clasament fidelitate: top 3 primesc monede automat lunar

### Jocuri
- Roată norocului (60 monede)
- Tombolă (30 monede)
- Scratch Card (300 monede)
- Flappy Barber (gratuit)
- Card Fidelitate

### Clasament
- Topuri: Monede / Tunsori / Vechime
- Premii lunare automate pentru top 3

---

## 14. FAZA 2 — EXPLOREAZĂ (VIITOR)

### Viziunea pe termen lung
Buzz devine un ecosistem complet, nu doar un tool de programări:

- **Pagina Explorează** — caută frizeri/frizerii în zonă
- **Favorite** — urmărești mai mulți frizeri
- **Home personalizat** — conținut de la toți frizerii urmăriți
- **Anunțuri/promoții** — de la frizerii favorite
- **Stories/postări** tip Instagram de la frizeri
- **Sistem multi-frizer** cu cod de invitație

---

## 15. INFRASTRUCTURĂ ȘI COSTURI

### Faza 1 (lansare)
- Supabase Free: $0/lună
- Firebase Spark (SMS): $0/lună (10.000 SMS gratuit)
- Vercel Free: $0/lună
- Google Play: $25 (o singură dată)
- **Total lunar: $0**

### Faza 2 (creștere)
- Supabase Pro: $25/lună
- Firebase Blaze: ~$0.01/SMS peste limită
- **Total lunar: ~$25**

### Server recomandat
- Supabase cloud Frankfurt (ping ~25ms din România)
- GDPR compliant (date în UE)

---

## 16. STATUS ACTUAL

### ✅ Completat (prototipuri HTML)
- Flux autentificare complet
- Home client
- Flux programare (4 pași)
- Profil client + editare
- Calendar admin
- Editare programare (standard premium)
- Lista clienți + fișă client
- Setări admin (program, servicii, cont)

### ✅ Completat (cod React)
- SplashScreen
- WelcomePage
- PhonePage
- SmsPage
- NamePage
- SocialPage
- PinSetPage
- PinLoginPage
- HomePage
- BookingPage
- ProfilePage
- EditProfilePage

### ❌ De construit
- BookingDonePage (confirmare după programare)
- Integrare reală Firebase Auth (SMS)
- Tabele Supabase + Row Level Security
- Logica programărilor în timp real
- Notificări push (Firebase FCM)
- Aplicația admin (buzz-admin)
- Build APK + publicare Play Store
- PWA config pentru iPhone

---

## 17. CONVENȚII DE COD

### Structura unui fișier pagină
```javascript
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NumePagina() {
  const navigate = useNavigate();
  // state, logica
  
  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', ... }}>
      {/* Conținut */}
    </div>
  );
}

export default NumePagina;
```

### Stiluri inline vs CSS
- Momentan stiluri inline în React
- Migrare la CSS modules sau Tailwind în faza 2

### Variabile de mediu (.env.local)
```
REACT_APP_SUPABASE_URL=https://lbdqaxjcmzmasodhwacv.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sb_publishable_...
REACT_APP_FIREBASE_API_KEY=...
```

---

## 18. URMĂTORII PAȘI (PRIORITIZAT)

1. **Fix SmsPage** — căsuțele SMS să apară corect
2. **BookingDonePage** — ecran confirmare după programare
3. **Supabase tabele** — creare structură bază de date
4. **Firebase Auth** — integrare SMS real
5. **Conectare Supabase** — salvare/citire programări reale
6. **Notificări** — Firebase FCM setup
7. **Build APK** — Capacitor/Expo pentru Android
8. **buzz-admin** — aplicația de admin

