# Deploy Edge Functions

## Cerinte
- Supabase CLI instalat: `npm install -g supabase`
- Logat: `supabase login`

## Pas 1 — Seteaza secretele
```bash
supabase secrets set FIREBASE_WEB_API_KEY=AIzaSyB0F0uhekStCkdjrYmO-vMUA0u9-GwLZ4c --project-ref lbdqaxjcmzmasodhwacv
```

## Pas 2 — Deploy toate functiile
```bash
supabase functions deploy register --project-ref lbdqaxjcmzmasodhwacv
supabase functions deploy verify-pin --project-ref lbdqaxjcmzmasodhwacv
supabase functions deploy change-pin --project-ref lbdqaxjcmzmasodhwacv
supabase functions deploy get-user-info --project-ref lbdqaxjcmzmasodhwacv
supabase functions deploy my-appointments --project-ref lbdqaxjcmzmasodhwacv
supabase functions deploy create-appointment --project-ref lbdqaxjcmzmasodhwacv
supabase functions deploy update-profile --project-ref lbdqaxjcmzmasodhwacv
```

## Pas 3 — Ruleaza SQL-ul de securitate
In Supabase Dashboard > SQL Editor, ruleaza continutul din `supabase_rls_v2.sql`

## Verificare
Dupa deploy, functiile sunt accesibile la:
https://lbdqaxjcmzmasodhwacv.supabase.co/functions/v1/<nume-functie>
