# BUZZ Barber — Document de Viziune

**Versiunea 1.0 | Iunie 2026**

---

## 1. Problema

Platformele existente de programări (MERO, Fresha etc.) sunt construite în jurul salonului, nu al frizerul ui. Consecința directă: dacă un frizer pleacă dintr-un salon, **pierde tot** — vizibilitate, recenzii, istoricul clienților. Salonul rămâne cu profilul, frizerul pleacă cu nimic.

Aceasta este o problemă reală trăită zilnic de mii de frizeri din România.

---

## 2. Viziunea

> **Frizerul este proprietarul identității sale digitale. Salonul este o asociere voluntară, nu un stăpân.**

BUZZ Barber este platforma unde frizerul vine primul. Profilul, clienții, recenziile și reputația aparțin frizerul ui — indiferent unde lucrează.

---

## 3. Utilizatori țintă

| Tip utilizator | Descriere |
|---|---|
| **Frizerul independent** | Lucrează singur sau cu 1-2 colegi. Vrea să-și gestioneze programările fără să depindă de un salon. |
| **Frizerul dintr-un salon** | Face parte dintr-o echipă, dar vrea să-și păstreze identitatea și clienții proprii. |
| **Proprietarul de salon** | Vrea să-și digitalizeze afacerea și să invite frizerii în echipa sa. |
| **Clientul** | Vrea să se programeze ușor la frizerul lui preferat, oriunde ar lucra acesta. |

---

## 4. Principiul fundamental

**Portabilitatea identității.**

Când un frizer se înregistrează pe BUZZ Barber:
- Profilul îi aparține lui, nu salonului
- Recenziile primite rămân pe profilul lui
- Clienții îl urmăresc pe el, nu locația
- Dacă schimbă salonul, clienții îl găsesc automat la noua locație

---

## 5. Arhitectura platformei — 3 niveluri

### Nivel 1 — Frizerul Independent
- Cont propriu, calendar propriu, servicii proprii
- Link personal de programare (ex: `buzzbarber.ro/cristi`)
- Nu depinde de niciun salon

### Nivel 2 — Echipa Mică (2-5 frizeri)
- Frizeri independenți se asociază voluntar
- Fiecare păstrează profilul individual
- Calendar comun vizibil pentru clienți
- Oricine poate ieși din echipă fără să piardă nimic

### Nivel 3 — Salonul
- Salon cu mai mulți frizeri
- Frizerul **alege** să fie listat în salon
- Salonul poate invita frizeri, dar NU îi poate șterge profilul
- Dacă frizerul pleacă din salon: profilul și clienții rămân la el, dispare doar din lista salonului

---

## 6. Diferențiatori față de competiție

| Funcționalitate | MERO | theCut | **BUZZ Barber** |
|---|---|---|---|
| Profilul aparține frizerul ui | ❌ | Parțial | ✅ |
| Portabilitate la schimbarea salonului | ❌ | ❌ | ✅ |
| Sistem de fidelizare clienți | ❌ | ❌ | ✅ |
| Roată norocului / tombole | ❌ | ❌ | ✅ |
| Disponibil în România | ✅ | ❌ | ✅ |
| Frizer independent fără salon | Parțial | ✅ | ✅ |

---

## 7. Sistemul de Fidelizare — BUZZ Points

Acesta este cel mai puternic diferențiator față de orice competiție din România.

### Cum funcționează
- La fiecare programare finalizată, clientul primește **BUZZ Points** (monede)
- Numărul de puncte poate fi setat de frizer per serviciu
- Punctele se acumulează în portofelul digital al clientului

### Cum folosește clientul punctele
| Recompensă | Descriere |
|---|---|
| **Roata Norocului** | Clientul cheltuie X puncte pentru a învârti roata și câștigă premii surpriză |
| **Tombole** | Participare la extrageri lunare cu premii puse de frizer |
| **Card de Fidelitate Digital** | La X programări consecutive, primești una gratuită sau cu reducere |
| **Reduceri directe** | Punctele pot fi convertite în reducere la următoarea programare |

### Beneficii pentru frizer
- Crește loialitatea clienților
- Motivează programările repetate
- Diferențiator față de frizeria de la colț care nu oferă nimic similar

---

## 8. Funcționalități principale

### Pentru Client
- Programare online în 3 pași (alege frizerul → serviciu → oră)
- Notificări SMS/push de confirmare și reminder
- Portofel BUZZ Points
- Istoricul programărilor
- Recenzii și note pentru frizer

### Pentru Frizer (Admin)
- Calendar personal cu toate programările
- Gestionare servicii (nume, durată, preț)
- Program de lucru și zile libere
- Setare recompense BUZZ Points
- Statistici (clienți noi, recurenți, venit estimat)
- Link personal de distribuire

### Pentru Salon (Super Admin)
- Invitare frizeri în echipă
- Calendar agregat al echipei
- Statistici per frizer
- Profil public al salonului cu toți frizerii listați

---

## 9. Migrația de la frizer individual la salon

Scenariul real: Cristi lucrează independent, colegii îl văd și vor să adopte și ei aplicația, apoi tot salonul adoptă.

**Etapa 1:** Cristi folosește BUZZ Barber independent → are profilul lui, clienții lui.

**Etapa 2:** Un coleg se înregistrează și ei se asociază în echipă mică → două calendare separate, o pagină comună.

**Etapa 3:** Salonul adoptă BUZZ Barber → crează profil de salon, invită toți frizerii → fiecare rămâne cu profilul lui, dar apare și în pagina salonului.

**Dacă cineva pleacă:** Iese din grupul salonului, profilul individual rămâne intact. Clienții îl găsesc în continuare.

---

## 10. Piața țintă

**Faza 1 — Lansare locală**
- Orașul de origine al fondatorului
- Validare produs, primii 10-20 de frizeri
- Feedback real, ajustări rapide

**Faza 2 — Expansiune națională**
- România întreagă
- Focus pe orașe mari: București, Cluj, Timișoara, Iași
- Posibil parteneriat cu școli de frizerie

**Faza 3 — Expansiune regională**
- Moldova, Bulgaria, alte piețe din Europa de Est unde MERO nu este prezent

---

## 11. Model de monetizare (propunere)

| Plan | Preț estimat | Ce include |
|---|---|---|
| **Gratuit** | 0 lei | 1 frizer, max 30 programări/lună, fără BUZZ Points |
| **Pro** | ~49 lei/lună | Programări nelimitate, BUZZ Points, statistici |
| **Salon** | ~99 lei/lună | Până la 5 frizeri, toate funcționalitățile |
| **Salon+** | ~199 lei/lună | Frizeri nelimitați, branding personalizat |

### Regula abonamentelor la asocierea frizer → salon

Când un frizer cu abonament Pro se alătură unui salon:
- Abonamentul lui individual se **suspendă automat** — salonul îl acoperă prin planul său (per loc/seat)
- Frizerul nu plătește dublu niciodată
- Dacă frizerul **pleacă din salon**, abonamentul Pro i se **reactivează automat**
- Creditele rămase neutilizate la suspendare se convertesc în zile gratuite la reactivare

Planul salonului include un număr fix de locuri (Salon = 5 locuri, Salon+ = nelimitat). La atingerea limitei, salonul trebuie să facă upgrade pentru a adăuga un nou frizer.

> Această regulă respectă filozofia platformei: frizerul nu e pedepsit că a crescut.

---

## 12. Roadmap tehnic

### Faza curentă (în dezvoltare)
- ✅ Aplicație client PWA (programări, servicii)
- ✅ Autentificare cu număr de telefon (Firebase)
- 🔄 Panou admin pentru frizer

### Următoarele etape
- [ ] Sistem multi-frizer (arhitectură independentă per frizer)
- [ ] BUZZ Points — acumulare și portofel
- [ ] Roata Norocului
- [ ] Card de fidelitate digital
- [ ] Notificări SMS automate
- [ ] Profil public de salon
- [ ] Statistici avansate

---

## 13. Filosofia produsului

BUZZ Barber nu este doar o aplicație de programări. Este o platformă care **respectă munca frizerul ui** și îi dă instrumentele să construiască o afacere independentă, portabilă și loială față de el — nu față de locul unde lucrează azi.

> *„Clientul tău este al tău. Indiferent unde tunzi."*

---

*Document creat: Iunie 2026 | Fondator: Cristi*
