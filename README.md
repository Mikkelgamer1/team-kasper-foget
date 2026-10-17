# Team Kasper Foget – hjemmeside

Statisk site for Team Kasper Foget og travtræner Kasper Foget (licens 504440). Ingen afhængigheder – kræver kun Node 20+.

```
node build.mjs            byg til dist/ med de gemte data
node build.mjs --hent     hent friske data fra Dansk Hestevæddeløb først
node build.mjs --serve    byg og vis på http://localhost:4173 (PORT=… for en anden port)
node build.mjs --test     selvtjek
```

## Det opdaterer sig selv

- **Heste i træning, resultater, kommende starter og statistik** hentes fra Dansk Hestevæddeløbs åbne data (samme kilde som travinfo.dk) og gemmes i `data/travinfo.json`.
- `.github/workflows/opdater.yml` henter data hver morgen og ved hvert push til `main` og gemmer dem i repoet – så bygger Vercel en ny udgave. Fejler hentningen, bygges der videre med de gemte data.
- På Vercel bygges sitet med `vercel.json` og får projektets adresse automatisk. En `vercel.app`- eller `github.io`-adresse holdes ude af søgemaskinerne.

## Facebook-opslag på forsiden

De 5 seneste opslag fra staldens Facebook-**side** kan vises som kort på forsiden. De hentes ved den daglige opdatering via Meta's Graph API, og billederne gemmes på sitet selv – ingen indlejring, ingen cookies og intet klik.

Opsætning (én gang, af en administrator af Facebook-siden):

1. developers.facebook.com → **Mine apps** → **Opret app** (type: Virksomhed).
2. **Graph API Explorer**: vælg appen og siden, giv tilladelserne `pages_show_list` og `pages_read_engagement`, hent et **sideadgangstoken** og forlæng det i **Access Token Debugger**.
3. Find sidens id (`me?fields=id,name` med sidetokenet).
4. GitHub-repoet → **Settings → Secrets and variables → Actions**: secret `FB_TOKEN` = sidetokenet, variable `FB_SIDE` = sidens id.
5. Kør workflowet "Opdater data" én gang.

Sæt også sidens adresse i `SITE.facebook` (og Instagram i `SITE.instagram`), så "Følg stalden" og links vises.

## Ret indhold

Alt indhold står i `templates.mjs`: kontaktoplysninger i `SITE` øverst. Design i `assets/css/site.css` (farverne øverst: hvid, grafit og smaragdgrøn – fra løbsfarverne hvid/grøn). Skrift: Plus Jakarta Sans (SIL Open Font License).

## Kilder

| Oplysning | Kilde |
| --- | --- |
| Født 1993, A1-licens, hjemmebane Skive Trav, telefon, løbsfarver (hvid/grøn) | Dansk Hestevæddeløb (licens 504440) |
| Træningsliste, resultater, statistik | Dansk Hestevæddeløb, opdateres dagligt |
| Intro "Passion for travsport · Erfaring fra Danmark og USA · Fokus på kvalitet, udvikling og resultater", Flyvej 2 Skive, e-mail | Facebook-siden Team Kasper Foget (introduktion); e-mail også på skive-trav.dk/om-os/traenere |
| Træner fra 1. december 2025, Stald E (Knud Mønsters gamle stald, 14–15 bokse), legater fra Sigter mod Stjernerne, René Sejthen, USA-tal (2022: 30 sejre i 327 starter, 427.472 $; i alt 61 sejre i 525 løb, 912.559 $), hjem 2023, jockey for Team Morten Friis, Kingston/Jydsk 4-årings GP 2025, EM 2018 i Rusland, citatet | travservice.dk, 30. oktober 2025 (Karsten Bønsdorf) |
| Samme USA-tal, Jacobite, 11 heste i marts 2026 | travet.dk, 4. marts 2026 (Ulrik Pedersen) |
| Sølv ved EM året før (2017) | TV Midtvest, 2. september 2018 (søgeresultat) |
| Hjemmebanen: åbnet 1948, Flyvej siden 1966, lysanlæg 2019–20 | skive-trav.dk/om-os |
| Logo (sulky-silhuetten) og sponsor Øhrberg Tømrerentreprise | Holdets logo på Facebook; CVR/Krak: Øhrberg Tømrerentreprise ApS, Viborg |
| Hestekort: Jacobite (ejer Olsen & Thorsen I/S, foto Ole Hindby), Starcatcher (ejer Kasper Foget og Robin Øhrberg, foto Gormfoto), Kingston (træner Michael Lønborg, foto Ole Hindby) | Facebook-opslagenes tekster |
| Billeder | Team Kasper Fogets Facebook-side (fotografer bl.a. Ole Hindby og Gorm Johansen/Gormfoto) |
