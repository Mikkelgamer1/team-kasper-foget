// Al HTML til sitet. Tekster rettes her; tal, heste og resultater kommer fra data/travinfo.json.

export const SITE = {
  // ← Bekræft domænet før lancering (kan også sættes med miljøvariablen SITE_URL). På Vercel bruges projektets adresse.
  url: (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL && 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL) || 'https://www.kasperfoget.dk').replace(/\/$/, ''),
  navn: 'Team Kasper Foget',
  person: 'Kasper Foget',
  fornavn: 'Kasper',
  licens: 504440,
  telefon: '+45 28 14 12 13',
  email: 'ryde59@hotmail.com', // står på Facebook-siden og på skive-trav.dk/om-os/traenere
  stald: 'Stald E, Skive Trav',
  gade: 'Flyvej 2',
  postnr: '7800',
  by: 'Skive',
  intro: ['Passion for travsport', 'Erfaring fra Danmark og USA', 'Fokus på kvalitet, udvikling og resultater'], // Facebook-sidens introduktion
  facebook: 'https://www.facebook.com/profile.php?id=61582669813688', // opslag vises som kort, når FB_SIDE/FB_TOKEN er sat i GitHub
  instagram: '', // ← instagram.com/kasperfoget findes – bekræft, om den skal med
  travinfo: 'https://travinfo.dk/licenseholder-tabs/504440',
  hjemmebane: 'https://www.skive-trav.dk/',
  kort: 'https://www.google.com/maps/search/?api=1&query=Skive+Trav%2C+Flyvej+2%2C+7800+Skive',
};

// Sponsorer (står på holdets logo: "Sponsoreret af Øhrberg Tømrerentreprise"). url: '' = intet link.
const PARTNERE = [
  { navn: 'Øhrberg Tømrerentreprise', url: '', logo: 'partner-oehrberg.png', b: 140, h: 52, tekst: 'Tømrerentreprise · Viborg' },
];

// Vejen til trænerlicensen. Kilder: travservice.dk (30.10.2025), travet.dk (4.3.2026), trav24.dk (29.10.2025), Facebook-siden.
const VEJEN = [
  ['2018', 'Europamester', 'Vinder EM for travjockeys – afviklet i Rusland.'],
  ['USA', 'Catchdriver i Amerika', 'Rejser over med legater fra Sigter mod Stjernerne og bliver hos René Sejthen. Bedste sæson i 2022: 30 sejre i 327 starter.'],
  ['2023', 'Hjem til Skive', 'Vender hjem efter 61 sejre i 525 amerikanske løb – og kører som jockey for Team Morten Friis.'],
  ['2025', 'Største sejr', 'Vinder Jydsk 4-årings Grand Prix med Michael Lønborg-trænede Kingston.'],
  ['1. dec. 2025', 'Egen stald', 'Bliver professionel travtræner med Stald E på Skive Trav – 14–15 bokse.'],
];

// Billeder fra Team Kasper Fogets Facebook-side: navn → [forhold, bredder…]
const BILLEDER = {
  'hero': [1.503, 800, 1200, 1500],
  'aften': [0.926, 700, 1100, 1600],
  'jacobite': [1.452, 800, 1400, 2048],
  'starcatcher': [1.502, 800, 1400],
  'kingston': [2.221, 800, 1400, 2048],
  'loeb-sort': [1.503, 800, 1400],
  'loeb-aften': [1.019, 700, 1200],
  'loeb-oploeb': [1.708, 800, 1400],
  'loeb-7': [1.648, 800, 1500],
  'loeb-skive': [1.502, 800, 1400],
  'staldgang': [0.75, 600, 1000],
  'boks': [0.75, 600, 1000],
  'portraet-brun': [0.579, 600, 1000],
  'portraet-moerk': [0.75, 600, 1000],
};
// Hestekort: hest-id → [billede, billedtekst fra Facebook-opslaget]
const HESTEKORT = {
  649374: ['jacobite', 'Ejer: Olsen & Thorsen I/S · Foto: Ole Hindby'],
  655058: ['starcatcher', 'Ejer: Kasper Foget og Robin Øhrberg · Foto: Gormfoto'],
};

const BANER = { Sk: 'Skive', 'Ål': 'Aalborg', 'År': 'Aarhus', Od: 'Odense', Ch: 'Charlottenlund', Bi: 'Billund', Bh: 'Bornholm', Ny: 'Nykøbing F.', Bs: 'Skovbo', Kl: 'Klampenborg', 'Åb': 'Åby', 'Jæ': 'Jägersro', Ax: 'Axevalla' };
// Banernes omtrentlige placering [længdegrad, breddegrad] til det skematiske Danmarkskort (svenske baner og Bornholm vises ikke).
const BANE_POS = { Sk: [9.06, 56.56], 'Ål': [9.87, 57.05], 'År': [10.2, 56.14], Od: [10.36, 55.4], Ch: [12.58, 55.75], Bi: [9.12, 55.73], Ny: [11.87, 54.77], Bs: [12.03, 55.46], Kl: [12.59, 55.77] };
const HJEM = 'Sk';
const SVENSKE = ['Åb', 'Jæ', 'Ax'];
const NAV = [['om-kasper/', 'Om Kasper'], ['stalden/', 'Stalden'], ['heste/', 'Heste'], ['resultater/', 'Resultater']];

// ---------- små hjælpere ----------

let R = ''; // sti tilbage til roden fra den side, der bygges
let V = ''; // versionsmærke til css/js
let KORT;   // Danmarks omrids og projektionstal fra data/danmark.json

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nf = (n) => Number(n).toLocaleString('da-DK');
const kr = (n) => `${nf(n)}&nbsp;kr.`;
const d = (iso) => new Date(`${String(iso).slice(0, 10)}T12:00:00Z`);
const langDato = (iso) => new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d(iso));
const kortDato = (iso) => new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(d(iso));
const ugedag = (iso) => new Intl.DateTimeFormat('da-DK', { weekday: 'long', timeZone: 'UTC' }).format(d(iso));
const dkListe = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} og ${a.at(-1)}`);
// API'et giver kun en kode. Ukendte koder er udenlandske baner (alle danske står i BANER), så de vises som Udlandet.
const bane = (kode) => BANER[kode] ?? 'Udlandet';
const tlfLink = SITE.telefon.replace(/\s/g, '');

/** "16,0a" → "1.16,0a". Tomt, hvis der ikke er en tid (fx galop uden tid). */
export const tid = (t) => (/^\d\d,\d/.test(t ?? '') ? `1.${t}` : '');

/** Hurtigste tid i en rekordstreng som "18,7k 14,3m *12,2am" → "1.12,2am". */
export const bedsteRekord = (mark) => {
  const tider = String(mark ?? '').replace(/\*/g, '').split(/\s+/).filter((x) => /^\d\d,\d/.test(x));
  tider.sort((a, b) => parseFloat(a.replace(',', '.')) - parseFloat(b.replace(',', '.')));
  return tider.length ? `1.${tider[0]}` : '';
};

/** Placering som den vises: 1, 2, 3 … "–" for uplaceret, "disk." for diskvalificeret. */
export const plac = (p) => (/^[1-9]\d*$/.test(p) ? p : p === 'd' ? 'disk.' : '–');

const pil = '<svg class="pil" viewBox="0 0 22 10" width="22" height="10" aria-hidden="true"><path d="M0 5h20M16 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const ud = '<svg class="ud" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><path d="M1 9 9 1M3 1h6v6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const nyFane = '<span class="sr"> (åbner i ny fane)</span>';
const ekstern = (href, tekst, cls = 'link') => `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${tekst} ${ud}${nyFane}</a>`;
const knap = (href, tekst, cls = '') => `<a class="knap ${cls}" href="${R}${href}">${tekst} ${pil}</a>`;
const link = (href, tekst, cls = '') => `<a class="link ${cls}" href="${R}${href}">${tekst} ${pil}</a>`;

const billede = (navn, alt, { sizes = '100vw', lazy = true, cls = '' } = {}) => {
  const [forhold, ...bredder] = BILLEDER[navn];
  const max = bredder.at(-1);
  return `<img${cls ? ` class="${cls}"` : ''} src="${R}assets/img/${navn}-${bredder[0]}.webp" srcset="${bredder.map((w) => `${R}assets/img/${navn}-${w}.webp ${w}w`).join(', ')}" sizes="${sizes}" width="${max}" height="${Math.round(max / forhold)}" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;
};
const etiket = (tekst, attr = '') => `<p class="etiket"${attr}>${tekst}</p>`;

// ---------- afledte tal ----------

function afled(data, idag) {
  const heste = [...data.heste].sort((a, b) => b.praemier - a.praemier || a.navn.localeCompare(b.navn, 'da'));
  const navne = new Map(heste.map((h) => [h.id, h.navn]));
  const medNavn = (r) => ({ ...r, hest: navne.get(r.hestId) ?? r.hest });
  const saeson = data.traenerStatistik.find((s) => s.sejre > 0) ?? data.traenerStatistik.find((s) => s.starter > 0) ?? data.traenerStatistik[0];
  const kusk = data.kuskStatistik.find((s) => s.aar === saeson.aar) ?? data.kuskStatistik[0];
  const iAar = data.resultater.filter((r) => r.dato.startsWith(String(saeson.aar)));
  const prNavn = {};
  for (const r of iAar) (prNavn[bane(r.bane)] ??= { kode: r.bane, navn: bane(r.bane), antal: 0 }).antal++;
  const banetal = Object.values(prNavn).sort((a, b) => b.antal - a.antal);
  return {
    heste,
    saeson,
    kusk,
    opdateret: langDato(data.opdateret),
    seneste: data.resultater.slice(0, 10).map(medNavn),
    kommende: data.kommende.filter((k) => k.dato >= idag).map(medNavn),
    banetal,
    banerIAar: [...banetal.filter((b) => b.navn !== 'Udlandet').map((b) => b.navn), ...(prNavn.Udlandet ? ['udenlandske baner'] : [])],
    svenske: banetal.filter((b) => SVENSKE.includes(b.kode)).map((b) => b.navn),
    hjemmestarter: prNavn[bane(HJEM)]?.antal ?? 0,
    loebsheste: heste.filter((h) => h.starter > 0),
    ungheste: heste.filter((h) => h.alder <= 2),
    ustartede: heste.filter((h) => !h.starter),
    kuskAar: data.kuskStatistik.filter((s) => s.starter >= 50).sort((a, b) => a.aar - b.aar),
    fb: (data.facebook ?? []).slice(0, 5),
    kortheste: heste.filter((h) => HESTEKORT[h.id]),
  };
}

// ---------- fælles dele ----------

// Holdets eget mærke (sulky-silhuetten fra logoet) + navnet som tekst.
const maerke = (lys = false, cls = '') => `<span class="maerke ${cls}"><img src="${R}assets/img/maerke${lys ? '-lys' : ''}.png" width="420" height="236" alt=""><span class="maerke__ord"><small>Team</small>Kasper Foget</span></span>`;

const top = (sti) => `
<header class="top">
  <div class="top__inner wrap">
    <a class="top__logo" href="${R || './'}" aria-label="${SITE.navn} – til forsiden">${maerke()}</a>
    <nav class="top__nav" aria-label="Primær navigation">
      ${NAV.map(([href, navn]) => `<a href="${R}${href}"${sti.startsWith(href) ? ' aria-current="page"' : ''}>${navn}</a>`).join('\n      ')}
    </nav>
    <a class="top__tlf" href="tel:${tlfLink}"><span class="sr">Ring til ${SITE.fornavn}: </span>${SITE.telefon}</a>
    <a class="knap knap--lille top__cta" href="${R}kontakt/"${sti.startsWith('kontakt/') ? ' aria-current="page"' : ''}>Kontakt</a>
    <button class="burger" type="button" aria-haspopup="dialog" aria-controls="menu" commandfor="menu" command="show-modal"><span>Menu</span><i aria-hidden="true"></i></button>
  </div>
</header>
<dialog class="menu" id="menu" aria-label="Menu">
  <div class="menu__top wrap">
    ${maerke(true)}
    <button class="burger burger--luk" type="button" data-luk commandfor="menu" command="close"><span>Luk</span><i aria-hidden="true"></i></button>
  </div>
  <nav class="menu__nav wrap" aria-label="Menu">
    <ul>
      ${[['', 'Forside'], ...NAV, ['kontakt/', 'Kontakt']].map(([href, navn], i) => `<li style="--i:${i}"><a href="${R}${href || (R ? '' : './')}"${(href ? sti.startsWith(href) : sti === '') ? ' aria-current="page"' : ''}><span>0${i + 1}</span>${navn}</a></li>`).join('\n      ')}
    </ul>
  </nav>
  <div class="menu__bund wrap">
    <a href="tel:${tlfLink}">${SITE.telefon}</a>
    <a href="mailto:${SITE.email}">${SITE.email}</a>
  </div>
</dialog>`;

const kontaktbaand = () => `
<section class="cta">
  <div class="wrap">
    ${etiket('Kontakt', ' data-vis')}
    <h2 data-vis style="--i:1">Har du en hest til Stald E?</h2>
    <a class="cta__tlf" href="tel:${tlfLink}" data-vis style="--i:2"><span class="sr">Ring til ${SITE.fornavn}: </span>${SITE.telefon}</a>
    <div class="cta__bund" data-vis style="--i:3">
      <p>Ring, send en sms eller skriv til ${SITE.fornavn} – om træning, tilkøring eller en gæstetur i sulkyen.</p>
      <p class="valg"><a class="knap knap--hvid" href="mailto:${SITE.email}">Skriv en mail ${pil}</a> ${link('kontakt/', 'Alle kontaktoplysninger', 'link--lys')}</p>
    </div>
  </div>
</section>`;

const partnere = () => (PARTNERE.length ? `
<section class="sek sek--smal sek--kant">
  <div class="wrap partnere">
    <div>
      ${etiket('Sponsor', ' data-vis')}
      <h2 data-vis style="--i:1">Med i ryggen.</h2>
    </div>
    <ul class="partnere__liste">${PARTNERE.map((p, i) => {
      const indhold = `<img src="${R}assets/img/${p.logo}" width="${p.b}" height="${p.h}" alt="${esc(p.navn)}" loading="lazy"><span>${esc(p.tekst)}${p.url ? ` ${ud}` : ''}</span>`;
      return `
      <li data-vis style="--i:${i + 1}">${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${indhold}${nyFane}</a>` : `<div>${indhold}</div>`}</li>`;
    }).join('')}
    </ul>
  </div>
</section>` : '');

const bund = (o) => `
<footer class="bund">
  <div class="wrap bund__gitter">
    <div class="bund__brand">
      ${maerke(true, 'maerke--stor')}
      <p>${SITE.intro.join(' · ')}. Professionel travtræner med stald på Skive Trav.</p>
    </div>
    <nav aria-label="Sider">
      <h2>Sider</h2>
      <ul>
        ${[...NAV, ['kontakt/', 'Kontakt']].map(([href, navn]) => `<li><a href="${R}${href}">${navn}</a></li>`).join('')}
      </ul>
    </nav>
    <div>
      <h2>Kontakt</h2>
      <ul>
        <li><a href="tel:${tlfLink}">${SITE.telefon}</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><address>${SITE.stald}<br>${SITE.gade}, ${SITE.postnr} ${SITE.by}</address></li>
      </ul>
    </div>
    <div>
      <h2>Følg med</h2>
      <ul>
        ${SITE.facebook ? `<li>${ekstern(SITE.facebook, 'Facebook', '')}</li>` : ''}
        ${SITE.instagram ? `<li>${ekstern(SITE.instagram, 'Instagram', '')}</li>` : ''}
        <li>${ekstern(SITE.travinfo, 'Travinfo', '')}</li>
        <li>${ekstern(SITE.hjemmebane, 'Skive Trav', '')}</li>
      </ul>
    </div>
  </div>
  <div class="wrap bund__linje">
    <p>Resultater og statistik: Dansk Hestevæddeløb · opdateret ${o.opdateret}</p>
    <p>Billeder: Team Kasper Fogets Facebook-side · fotografer bl.a. Ole Hindby og Gorm Johansen (Gormfoto)</p>
    <p>© ${new Date().getFullYear()} ${SITE.navn}</p>
  </div>
  <p class="bund__ord" aria-hidden="true">Kasper Foget</p>
</footer>`;

const organisation = () => ({
  '@type': ['LocalBusiness', 'SportsOrganization'],
  '@id': `${SITE.url}/#stald`,
  name: SITE.navn,
  description: 'Professionel travtræner med stald på Skive Trav: træning af løbsheste, tilkøring af ungheste og gæsteture som kusk.',
  url: `${SITE.url}/`,
  telephone: tlfLink,
  email: SITE.email,
  image: `${SITE.url}/assets/img/og.jpg`,
  logo: `${SITE.url}/assets/img/ikon-512.png`,
  sport: 'Travsport',
  address: { '@type': 'PostalAddress', streetAddress: `${SITE.stald}, ${SITE.gade}`, postalCode: SITE.postnr, addressLocality: SITE.by, addressCountry: 'DK' },
  founder: { '@id': `${SITE.url}/#person` },
  foundingDate: '2025-12-01',
  sameAs: [SITE.travinfo, SITE.facebook, SITE.instagram].filter(Boolean),
});
const person = () => ({
  '@type': 'Person',
  '@id': `${SITE.url}/#person`,
  name: SITE.person,
  jobTitle: 'Professionel travtræner og kusk',
  url: `${SITE.url}/om-kasper/`,
  worksFor: { '@id': `${SITE.url}/#stald` },
  award: 'EM for travjockeys 2018',
  sameAs: [SITE.travinfo],
});

function layout({ sti, titel, beskrivelse, indhold, o, klasse = '', noindex = false }) {
  const kanonisk = `${SITE.url}/${sti}`;
  const sideNavn = [...NAV, ['kontakt/', 'Kontakt']].find(([href]) => href === sti)?.[1];
  const graf = [
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.navn, inLanguage: 'da-DK' },
    organisation(),
    person(),
    ...(sideNavn ? [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Forside', item: `${SITE.url}/` }, { '@type': 'ListItem', position: 2, name: sideNavn, item: kanonisk }] }] : []),
  ];
  return `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titel)}</title>
<meta name="description" content="${esc(beskrivelse)}">
${noindex ? '<meta name="robots" content="noindex">' : '<link rel="canonical" href="' + kanonisk + '">'}
<meta name="theme-color" content="#f3f3ef">
<meta property="og:type" content="website">
<meta property="og:locale" content="da_DK">
<meta property="og:site_name" content="${SITE.navn}">
<meta property="og:title" content="${esc(titel)}">
<meta property="og:description" content="${esc(beskrivelse)}">
<meta property="og:url" content="${kanonisk}">
<meta property="og:image" content="${SITE.url}/assets/img/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Team Kasper Foget – travtræner på Skive Trav">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="48x48" href="${R}assets/img/ikon-48.png">
<link rel="apple-touch-icon" href="${R}assets/img/ikon-180.png">
<link rel="preload" href="${R}assets/fonts/geist.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${R}assets/fonts/geist-mono.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${R}assets/css/site.css?v=${V}">
<script>document.documentElement.classList.add('js');setTimeout(function(){window.__klar||document.documentElement.classList.remove('js')},2500)</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graf }).replace(/</g, '\\u003c')}</script>
</head>
<body class="${klasse}">
<a class="skip" href="#indhold">Spring til indhold</a>
${top(sti)}
<main id="indhold">
${indhold}
</main>
${bund(o)}
<script src="${R}assets/js/site.js?v=${V}" defer></script>
</body>
</html>
`;
}

// Sidehoved på undersider: stor titel, tekst og nøgletal, derunder et bredt billede.
const sidehoved = ({ sti, h1, tekst, foto, alt = '', pos = '50% 50%', chips = [] }) => `
<section class="sidehoved">
  <div class="wrap">
    <nav class="sti" aria-label="Brødkrumme"><a href="${R}">Forside</a><span aria-hidden="true">/</span><span aria-current="page">${sti}</span></nav>
    <h1 class="sidehoved__titel">${h1}</h1>
    <div class="sidehoved__bund">
      <p class="indled">${tekst}</p>
      ${chips.length ? `<ul class="chips">${chips.map(([tal, tekst]) => `<li><b>${tal}</b>${tekst}</li>`).join('')}</ul>` : ''}
    </div>
    <figure class="sidehoved__foto" style="--pos:${pos}">${billede(foto, alt, { sizes: '(min-width: 1320px) 1240px, 94vw', lazy: false })}</figure>
  </div>
</section>`;

/**
 * Skematisk Danmarkskort. `punkter` er [{ kode, navn, antal? }]: med antal tegnes en boble med tallet i,
 * uden antal en lille prik. Hjemmebanen får en ring, og der tegnes linjer derfra til de andre baner.
 */
function danmarkskort(punkter, beskrivelse) {
  const { bredde, hoejde, lon0, lat1, kx, ky, sti } = KORT;
  const max = Math.max(1, ...punkter.map((p) => p.antal ?? 0));
  const vist = punkter.filter((p) => BANE_POS[p.kode]).map((p) => {
    const [lon, lat] = BANE_POS[p.kode];
    const r = p.antal ? +(8 + 6 * Math.sqrt(p.antal / max)).toFixed(1) : 7;
    return { ...p, x: +((lon - lon0) * kx).toFixed(1), y: +((lat1 - lat) * ky).toFixed(1), r, ydre: p.kode === HJEM ? r + (p.antal ? 4 : 6) : r };
  });
  const hjem = vist.find((p) => p.kode === HJEM);
  const ruter = hjem ? vist.filter((p) => p !== hjem) : [];

  // Navnet sættes dér, hvor det bedst holder sig inden for kortet og fri af ruter og andre baner.
  const navn = (p) => {
    const w = p.navn.length * 6.4, m = p.ydre + 6;
    const steder = [['start', p.x + m, p.y + 3.7], ['middle', p.x, p.y + m + 9], ['end', p.x - m, p.y + 3.7], ['end', Math.min(p.x + p.ydre, bredde - 4), p.y + m + 9], ['middle', p.x, p.y - m - 2]];
    const straf = ([anker, x, y]) => { // 100 for at stikke ud over kortet, 10 for at ramme en rute eller en anden bane
      const x0 = (anker === 'start' ? x : anker === 'end' ? x - w : x - w / 2) - 3, x1 = x0 + w + 6, y0 = y - 12, y1 = y + 4;
      const inde = (px, py, luft = 0) => px > x0 - luft && px < x1 + luft && py > y0 - luft && py < y1 + luft;
      const udenfor = x0 < 0 || x1 > bredde || y0 < 0 || y1 > hoejde;
      const rammer = vist.some((q) => q !== p && inde(q.x, q.y, q.ydre))
        || ruter.some((q) => { for (let t = 0; t <= 1; t += 0.02) if (inde(hjem.x + (q.x - hjem.x) * t, hjem.y + (q.y - hjem.y) * t)) return true; return false; });
      return (udenfor ? 100 : 0) + (rammer ? 10 : 0);
    };
    // Hjemmebanen helst til venstre, uden for viften af ruter. Ved lige straf vinder det første sted på listen.
    const [anker, x, y] = (p === hjem ? [steder[2], ...steder] : steder).map((sted, i) => [straf(sted) + i / 100, sted]).sort((a, b) => a[0] - b[0])[0][1];
    return `<text class="kort__navn" x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" text-anchor="${anker}">${esc(p.navn)}</text>`;
  };

  return `<svg class="kort__svg" viewBox="0 0 ${bredde} ${hoejde}" role="img" aria-label="${esc(beskrivelse)}">
        <path class="kort__land" d="${sti}"/>${ruter.map((p, i) => `
        <path class="kort__rute" pathLength="1" d="M${hjem.x},${hjem.y}L${p.x},${p.y}" style="--n:${i}"/>`).join('')}${vist.map((p, i) => `
        <g class="kort__bane" style="--n:${i}">${p === hjem ? `<circle class="kort__ring" cx="${p.x}" cy="${p.y}" r="${p.ydre}"/>` : ''}<circle class="kort__prik" cx="${p.x}" cy="${p.y}" r="${p.r}"/>${p.antal ? `<text class="kort__tal" x="${p.x}" y="${+(p.y + 3.3).toFixed(1)}" text-anchor="middle">${p.antal}</text>` : ''}${navn(p)}</g>`).join('')}
      </svg>`;
}

// ---------- genbrugte blokke ----------

const plKlasse = (p) => (p === '1' ? ' pl--1' : /^[23]$/.test(p) ? ' pl--23' : p === 'd' ? ' pl--tekst' : '');

const resultatRaekke = (r) => `
      <li class="res__r">
        <span class="pl${plKlasse(r.placering)}"><span class="sr">Placering: </span>${plac(r.placering)}</span>
        <span class="res__hest">${esc(r.hest)}</span>
        <span class="res__info"><time datetime="${r.dato}">${kortDato(r.dato)}</time> · ${esc(bane(r.bane))} · ${r.loeb}. løb · ${nf(r.distance)}&nbsp;m</span>
        <span class="res__tid">${tid(r.tid) || '<span aria-hidden="true">–</span><span class="sr">ingen tid</span>'}</span>
        <span class="res__kr">${r.praemie ? kr(r.praemie) : '<span aria-hidden="true">–</span><span class="sr">ingen præmie</span>'}</span>
      </li>`;
const resultatliste = (liste) => `<ol class="res">${liste.map(resultatRaekke).join('')}
    </ol>`;

const kommendeListe = (liste) => `<ul class="kom">${liste.map((k) => `
      <li>
        <time datetime="${k.dato}"><b>${new Date(`${k.dato}T12:00:00Z`).getUTCDate()}</b>${kortDato(k.dato).replace(/^\d+\.\s*/, '')}</time>
        <span class="kom__hest">${esc(k.hest)}</span>
        <span class="kom__bane">${ugedag(k.dato)} · ${esc(bane(k.bane))} · ${k.loeb}. løb${k.kusk ? ` · ${esc(k.kusk)}` : ''}</span>
      </li>`).join('')}
    </ul>`;
const ingenStarter = () => `<p class="tom">Ingen af staldens heste er startmeldt lige nu. Nye startlister kommer på ${ekstern(SITE.travinfo, 'Travinfo')}.</p>`;

const omHest = (h) => `${h.alder}-årig ${esc(h.koen.toLowerCase())}`;
const afstamning = (h) => (h.far ? `e. ${esc(h.far)} – ${esc(h.mor)}` : '');
const sejre = (h) => Number(h.placeringer.split('-')[0]) || 0;

// Hestekort med foto: de heste, der er præsenteret på Facebook.
const hestekort = (heste) => `<ul class="hestekort">${heste.map((h, i) => `
      <li data-vis style="--i:${i}">
        <a href="https://travinfo.dk/horse_tabs/${h.id}" target="_blank" rel="noopener">
          <figure>${billede(HESTEKORT[h.id][0], `${h.navn} i løb`, { sizes: '(min-width: 901px) 46vw, 92vw' })}</figure>
          <div class="hestekort__tekst">
            <h3>${esc(h.navn)}</h3>
            <p>${omHest(h)} · ${afstamning(h)}</p>
            <dl>
              <div><dt>Starter</dt><dd>${h.starter}</dd></div>
              <div><dt>Sejre</dt><dd>${sejre(h)}</dd></div>
              <div><dt>Indkørt</dt><dd>${kr(h.praemier)}</dd></div>
              <div><dt>Rekord</dt><dd>${bedsteRekord(h.rekord) || '–'}</dd></div>
            </dl>
            <small>${esc(HESTEKORT[h.id][1])}</small>
          </div>
          ${nyFane}
        </a>
      </li>`).join('')}
    </ul>`;

// Kompakte kort for de øvrige startede heste.
const profilkort = (h, i) => `
      <a class="profil" href="https://travinfo.dk/horse_tabs/${h.id}" target="_blank" rel="noopener" data-vis style="--i:${i % 4}">
        <h3>${esc(h.navn)}</h3>
        <p>${omHest(h)}${afstamning(h) ? `<br>${afstamning(h)}` : ''}</p>
        <dl>
          <div><dt>Starter</dt><dd>${h.starter}</dd></div>
          <div><dt>1-2-3</dt><dd>${esc(h.placeringer)}</dd></div>
          <div><dt>Indkørt</dt><dd>${kr(h.praemier)}</dd></div>
        </dl>
        <span class="profil__ud">Travinfo ${ud}${nyFane}</span>
      </a>`;

// Hesterække til den fulde træningsliste.
const hesteraekke = (h, i) => `
      <li class="hest" data-vis style="--i:${i % 6}">
        <div class="hest__navn">
          <h3><a href="https://travinfo.dk/horse_tabs/${h.id}" target="_blank" rel="noopener">${esc(h.navn)}${nyFane}</a></h3>
          <p>${omHest(h)}${afstamning(h) ? ` · ${afstamning(h)}` : ''}</p>
        </div>
        ${h.starter ? `<dl class="hest__tal">
          <div><dt>Starter</dt><dd>${h.starter} <small>${esc(h.placeringer)}</small></dd></div>
          <div><dt>Indkørt</dt><dd>${kr(h.praemier)}</dd></div>
          <div><dt>Rekord</dt><dd>${bedsteRekord(h.rekord) || '–'}</dd></div>
        </dl>` : '<p class="hest__tal hest__tal--tom">Ustartet</p>'}
      </li>`;
const hestegruppe = (titel, heste) => (heste.length ? `
    <div class="gruppe">
      <h2 class="gruppe__titel" data-vis>${titel} <span>${heste.length}</span></h2>
      <ul class="hesteliste">${heste.map(hesteraekke).join('')}
      </ul>
    </div>` : '');

// Rullebåndet med meritter (listen står to gange efter hinanden, så den kan glide uendeligt).
const MERITTER = ['Europamester for travjockeys 2018', '61 sejre som catchdriver i USA', 'Jydsk 4-årings Grand Prix 2025', 'Egen stald på Skive Trav siden 1. december 2025', 'A1-licens som træner og kusk'];
const baand = () => `
<div class="baand" role="region" aria-label="Meritter">
  <div class="baand__spor">${[0, 1].map((n) => `<ul${n ? ' aria-hidden="true"' : ''}>${MERITTER.map((m) => `<li>${m}</li>`).join('')}</ul>`).join('')}</div>
</div>`;

// Historien: billedet og overskriften står fast, mens trinene ruller forbi.
const historie = () => `
<section class="sek historie">
  <div class="wrap historie__gitter">
    <div class="historie__fast">
      ${etiket('Vejen hertil')}
      <h2>Fra Skive til USA – og hjem igen.</h2>
      <figure class="historie__foto">${billede('aften', 'Travløb i aftensol på Skive Trav', { sizes: '(min-width: 901px) 40vw, 92vw' })}</figure>
    </div>
    <div>
      <ol class="historie__trin">${VEJEN.map(([naar, titel, tekst]) => `
        <li data-vis><span class="historie__aar">${naar}</span><h3>${titel}</h3><p>${tekst}</p></li>`).join('')}
      </ol>
      <blockquote class="historie__citat" data-vis><p>»Hvis ikke jeg havde haft tiden i USA, så ville jeg ikke være den, jeg er i dag.«</p><cite>${SITE.person} til travservice.dk, oktober 2025</cite></blockquote>
      <p class="valg" data-vis>${link('om-kasper/', 'Hele historien')}</p>
    </div>
  </div>
</section>`;

// Sejre som kusk pr. sæson (kun sæsoner med mindst 50 starter).
const kuskSoejler = (aar) => {
  const max = Math.max(1, ...aar.map((s) => s.sejre));
  return `<ul class="soejler" aria-label="Sejre som kusk pr. sæson">${aar.map((s) => `
        <li style="--h:${Math.round((s.sejre / max) * 100)}%"><b>${s.sejre}</b><i aria-hidden="true"></i><span>${s.aar}<small>${s.starter} starter</small></span></li>`).join('')}
      </ul>`;
};

const ydelser = (o) => `
    <ul class="ydelser">
      <li data-vis>
        <span class="ydelser__nr" aria-hidden="true">01</span>
        <h3>Træning af løbsheste</h3>
        <p>Stald E på Skive Trav har 14–15 bokse. I ${o.saeson.aar} har staldens heste været til start i ${dkListe(o.banerIAar)}.</p>
      </li>
      <li data-vis style="--i:1">
        <span class="ydelser__nr" aria-hidden="true">02</span>
        <h3>Tilkøring af ungheste</h3>
        <p>${o.ungheste.length > 1 ? `Lige nu står ${o.ungheste.length} åringer og 2-årige på træningslisten og bygges op mod deres første starter.` : 'Ungheste køres til og bygges op mod deres første starter.'}</p>
      </li>
      <li data-vis style="--i:2">
        <span class="ydelser__nr" aria-hidden="true">03</span>
        <h3>Kusk og gæsteture</h3>
        <p>${SITE.fornavn} kører både staldens egne heste og gæsteture for andre trænere – i ${o.kusk.aar} ${o.kusk.starter} starter og ${o.kusk.sejre} sejre som kusk.</p>
      </li>
    </ul>`;

// Billedgitteret: stor og bred = 2×2 felter (bred er de vandrette løbsbilleder), hoej = 1×2. Fjerde felt (valgfrit) styrer beskæringen. Rækkefølgen er lagt, så gitteret går op i fire spalter.
const FOTOS = [
  ['loeb-skive', 'Sort hest i løb på Skive Trav · Foto: Gorm Johansen', 'stor'],
  ['portraet-brun', 'Brun travhest med grime foran stalden', 'hoej'],
  ['staldgang', 'Travhest i staldgangen', 'hoej'],
  ['loeb-oploeb', 'Hest nummer 6 i opløbet foran tribunen', 'bred'],
  ['loeb-7', 'Hest nummer 7 kommer i mål', 'bred', '50% 8%'],
  ['portraet-moerk', 'Mørk travhest ved hegnet', 'hoej'],
  ['loeb-sort', 'Sort travhest i fuld fart på Skive Trav', 'stor'],
  ['boks', 'En ung hest i boksen', 'hoej'],
];
const galleri = (n = FOTOS.length) => `<ul class="galleri">${FOTOS.slice(0, n).map(([navn, alt, form, pos], i) => `
      <li class="galleri__${form}" data-vis style="--i:${i % 4}${pos ? `; --pos:${pos}` : ""}">${billede(navn, alt, { sizes: form === 'stor' || form === 'bred' ? '(min-width: 901px) 50vw, 92vw' : '(min-width: 901px) 25vw, 46vw' })}</li>`).join('')}
    </ul>`;

const banebjaelker = (banetal) => {
  const max = Math.max(1, ...banetal.map((b) => b.antal));
  return `<ul class="baner">${banetal.map((b) => `
        <li style="--w:${Math.round((b.antal / max) * 100)}%"><span>${esc(b.navn)}</span><b>${b.antal}</b></li>`).join('')}
      </ul>`;
};

const kortfigur = (o) => `<figure class="kort" data-vis style="--i:2">
      ${danmarkskort(o.banetal, `Danmarkskort med staldens starter pr. bane i ${o.saeson.aar}: ${o.banetal.map((b) => `${b.navn} ${b.antal}`).join(', ')}.`)}
      <figcaption>Staldens starter pr. dansk bane i ${o.saeson.aar}. Ringen markerer hjemmebanen.</figcaption>
    </figure>`;

const statTabel = (titel, raekker) => `
      <div class="tabelboks" role="region" aria-label="${titel}" tabindex="0">
        <table class="tabel">
          <caption>${titel}</caption>
          <thead><tr><th scope="col">År</th><th scope="col">Starter</th><th scope="col">1.–2.–3.</th><th scope="col">Sejrs&shy;procent</th><th scope="col">Præmiesum</th></tr></thead>
          <tbody>${raekker.filter((s) => s.starter > 0).map((s) => `
            <tr><th scope="row">${s.aar}</th><td>${s.starter}</td><td>${s.sejre}–${s.toer}–${s.treer}</td><td>${s.procent}&nbsp;%</td><td>${kr(s.praemier)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>`;

const formkurve = (liste) => `<ol class="form" aria-label="Placeringer i de seneste ${liste.length} starter, nyeste først">${liste.map((r) => `<li class="pl${plKlasse(r.placering)}"><span class="sr">${esc(r.hest)}: </span>${plac(r.placering)}</li>`).join('')}</ol>`;

/** Lang tekst forkortes ved et ordskifte. */
const kortTekst = (s, max = 240) => (s.length <= max ? s : `${s.slice(0, s.lastIndexOf(' ', max))}…`);

// De seneste Facebook-opslag (hentet af build.mjs) som kort. Vises kun, når der er opslag.
const fbKort = (liste) => `
    <ul class="fbkort" aria-label="Seneste opslag fra Facebook">${liste.map((p, i) => `
      <li data-vis style="--i:${i}">
        <a href="${esc(p.link)}" target="_blank" rel="noopener">
          ${p.billede ? `<img src="${R}assets/fb/${p.billede}" alt="" loading="lazy" decoding="async">` : ''}
          <time datetime="${p.dato}">${langDato(p.dato)}</time>
          ${p.tekst ? `<p>${esc(kortTekst(p.tekst))}</p>` : ''}
          <span class="fbkort__mere">Se opslaget på Facebook ${ud}</span>${nyFane}
        </a>
      </li>`).join('')}
    </ul>`;

const foelg = (fb = []) => (SITE.facebook || SITE.instagram || fb.length ? `
<section class="sek sek--is">
  <div class="wrap foelg">
    <div>
      ${etiket('Følg med', ' data-vis')}
      <h2 data-vis style="--i:1">Dagens køreture.</h2>
      <p data-vis style="--i:2">På Facebook fortæller holdet, hvor Kasper kører – egne heste og gæsteture – og hvordan det gik${fb.length ? '. Her er de seneste opslag' : ''}.</p>
      <p class="valg" data-vis style="--i:3">
        ${SITE.facebook ? ekstern(SITE.facebook, 'Team Kasper Foget på Facebook', 'knap') : ''}
        ${SITE.instagram ? ekstern(SITE.instagram, 'Instagram', 'knap knap--kant') : ''}
      </p>
    </div>
    <div>
      ${SITE.facebook && !fb.length ? `<div class="fb" data-fb="${SITE.facebook}">
        <button class="knap knap--kant" type="button">Vis de seneste opslag ${pil}</button>
        <p class="fb__note">Opslagene hentes fra Facebook og sætter cookies derfra.</p>
      </div>` : ''}
    </div>
  </div>
  ${fb.length ? `<div class="wrap">${fbKort(fb)}</div>` : ''}
</section>` : '');

// ---------- sider ----------

const forside = (o, data) => `
<section class="hero">
  <div class="wrap">
    <p class="hero__meta"><span>Professionel travtræner</span><span>${SITE.stald}</span><span>Siden 1.12.2025</span></p>
    <h1 class="hero__navn">Kasper Foget</h1>
    <figure class="hero__foto">${billede('kingston', 'Kingston vinder Jydsk 4-årings Grand Prix 2025 med Kasper Foget i sulkyen', { sizes: '(min-width: 1320px) 1240px, 96vw', lazy: false })}<figcaption>Kingston vinder Jydsk 4-årings Grand Prix 2025 · Foto: Ole Hindby</figcaption></figure>
    <div class="hero__bund">
      <p class="hero__indled">Europamester for travjockeys, catchdriver i USA og siden 1. december 2025 selvstændig træner med ${o.heste.length} heste i Stald E på Skive Trav.</p>
      <p class="valg">${knap('kontakt/', `Kontakt ${SITE.fornavn}`)} ${knap('heste/', 'Se hestene', 'knap--kant')}</p>
    </div>
  </div>
</section>
${baand()}

<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket(`Sæson ${o.saeson.aar}`, ' data-vis')}
        <h2 data-vis style="--i:1">Første sæson med egen stald.</h2>
      </div>
      <p data-vis style="--i:2">Officielle tal fra Dansk Hestevæddeløb, opdateret ${o.opdateret}.</p>
    </div>
    <div class="tal">
      <div class="tal__felt tal__felt--stor" data-vis><b data-tael="${o.saeson.sejre}">${o.saeson.sejre}</b><span>sejre som træner</span><small>på ${o.saeson.starter} starter i ${o.saeson.aar}</small></div>
      <div class="tal__felt" data-vis style="--i:1"><b><span data-tael="${o.saeson.procent}">${o.saeson.procent}</span><small>%</small></b><span>sejrsprocent</span></div>
      <div class="tal__felt" data-vis style="--i:2"><b><span data-tael="${o.saeson.praemier}">${nf(o.saeson.praemier)}</span><small>kr.</small></b><span>indkørt som træner</span></div>
      <div class="tal__felt tal__felt--groen" data-vis style="--i:3"><b data-tael="${o.kusk.sejre}">${o.kusk.sejre}</b><span>sejre som kusk på ${o.kusk.starter} starter</span></div>
      <div class="tal__felt tal__felt--moerk" data-vis style="--i:4"><b data-tael="${o.heste.length}">${o.heste.length}</b><span>heste i Stald E – ${o.ustartede.length} unge på vej</span></div>
    </div>
  </div>
</section>
${historie()}

<section class="sek sek--moerk">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Hestene', ' data-vis')}
        <h2 data-vis style="--i:1">I stalden lige nu.</h2>
      </div>
      <p data-vis style="--i:2">${o.heste.length} heste på træningslisten – ${o.loebsheste.length} har været til start, og ${o.ustartede.length} unge heste er på vej.</p>
    </div>
    ${o.kortheste.length ? hestekort(o.kortheste) : ''}
    <div class="profiler">${o.loebsheste.filter((h) => !HESTEKORT[h.id]).map(profilkort).join('')}
    </div>
    <p class="midt" data-vis>${knap('heste/', `Hele træningslisten (${o.heste.length})`, 'knap--hvid')}</p>
  </div>
</section>

<section class="sek sek--galleri">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Fra banen', ' data-vis')}
        <h2 data-vis style="--i:1">Hverdag og løbsdage.</h2>
      </div>
      <p data-vis style="--i:2">Billeder fra Team Kasper Fogets Facebook-side.</p>
    </div>
    ${galleri(3)}
  </div>
</section>

<section class="sek sek--is">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Resultater', ' data-vis')}
        <h2 data-vis style="--i:1">Seneste starter.</h2>
      </div>
      <p data-vis style="--i:2">Staldens egne heste. Opdateret ${o.opdateret}.</p>
    </div>
    <div class="resgitter">
      <div class="panel" data-vis>
        ${resultatliste(o.seneste.slice(0, 6))}
        <p class="valg">${link('resultater/', 'Alle resultater og statistik')}</p>
      </div>
      <div class="panel panel--moerk" data-vis style="--i:1">
        <h3 class="mini">Kommende starter</h3>
        ${o.kommende.length ? kommendeListe(o.kommende.slice(0, 5)) : ingenStarter()}
        <h3 class="mini mini--luft">Formkurve</h3>
        ${formkurve(o.seneste)}
      </div>
    </div>
  </div>
</section>

<section class="sek">
  <div class="wrap duo">
    <div>
      ${etiket('Banerne', ' data-vis')}
      <h2 data-vis style="--i:1">Hjemme i Skive.</h2>
      <p class="indled" data-vis style="--i:2">Skive Trav er både hjemmebane og adresse for stalden${o.hjemmestarter ? ` – ${o.hjemmestarter} af sæsonens starter er kørt her` : ''}.${o.svenske.length ? ` Stalden har også været til start i Sverige på ${dkListe(o.svenske)}.` : ''}</p>
      <div data-vis style="--i:3">${banebjaelker(o.banetal)}</div>
    </div>
    ${kortfigur(o)}
  </div>
</section>
${partnere()}
${foelg(o.fb)}
${kontaktbaand()}`;

const omKasper = (o, data) => `
${sidehoved({
  sti: 'Om Kasper',
  h1: 'Kasper Foget',
  tekst: `Født i ${data.traener.foedt}, europamester for travjockeys i 2018, catchdriver i USA og siden 1. december 2025 professionel travtræner med stald på Skive Trav.`,
  foto: 'kingston',
  alt: 'Kingston vinder Jydsk 4-årings Grand Prix 2025 med Kasper Foget i sulkyen',
  pos: '50% 50%',
  chips: [['2018', 'EM-guld'], ['61', 'sejre i USA'], [esc(data.traener.licens), 'licens']],
})}

<section class="sek">
  <div class="wrap artikel">
    <aside class="fakta" data-vis>
      <dl>
        <div><dt>Født</dt><dd>${data.traener.foedt}</dd></div>
        <div><dt>Licens</dt><dd>${esc(data.traener.licens)} – professionel træner og kusk</dd></div>
        <div><dt>Træner siden</dt><dd>1. december 2025</dd></div>
        <div><dt>Stald</dt><dd>${SITE.stald}</dd></div>
        <div><dt>Løbsfarver</dt><dd>Hvid og grøn</dd></div>
        <div><dt>I USA</dt><dd>61 sejre i 525 løb</dd></div>
        <div><dt>Heste i træning</dt><dd>${o.heste.length}</dd></div>
      </dl>
    </aside>
    <div class="prosa">
      ${etiket('Historien', ' data-vis')}
      <h2 data-vis>Fra jockey til træner.</h2>
      <p class="indled" data-vis>I 2018 vandt ${SITE.person} EM for travjockeys – i Rusland. Året før var det blevet til sølv.</p>
      <p data-vis>Med omkring 20.000 kroner i legater fra Sigter mod Stjernerne rejste han til USA for at være en måned hos René Sejthen. Han blev hængende og fik pæn succes som catchdriver: den bedste sæson var 2022 med 30 sejre i 327 starter og 427.472 dollars indkørt, og samlet blev det til 61 sejre i 525 amerikanske løb.</p>
      <p data-vis>Siden hjemkomsten i 2023 har han kørt som jockey for Team Morten Friis og som catchdriver for flere trænere. Den hidtil største sejr kom i 2025, da han vandt Jydsk 4-årings Grand Prix med Michael Lønborg-trænede Kingston.</p>
      <blockquote data-vis><p>»Hvis ikke jeg havde haft tiden i USA, så ville jeg ikke være den, jeg er i dag.«</p><cite>Kasper Foget til travservice.dk, oktober 2025</cite></blockquote>
      <h2 data-vis>Egen stald.</h2>
      <p data-vis>Den 1. december 2025 skiftede Kasper jockeylicensen ud med en trænerlicens og overtog Stald E på Skive Trav – Knud Mønsters gamle stald med 14–15 bokse. Lige nu står ${o.heste.length} heste på træningslisten, og i ${o.saeson.aar} er det blevet til ${o.saeson.sejre} sejre på ${o.saeson.starter} starter som træner.</p>
      <p data-vis>Som kusk har han i ${o.kusk.aar} kørt ${o.kusk.starter} løb og vundet ${o.kusk.sejre} – med både egne heste og gæsteture for andre trænere.</p>
      <p class="valg" data-vis>${ekstern(SITE.travinfo, `Se ${SITE.fornavn}s profil på Travinfo`)}</p>
      <p class="note" data-vis>Kilder: travservice.dk (30. oktober 2025), travet.dk (4. marts 2026), trav24.dk (29. oktober 2025), TV Midtvest (2. september 2018) og Dansk Hestevæddeløb.</p>
    </div>
  </div>
</section>

<section class="sek sek--moerk">
  <div class="wrap duo duo--top">
    <div>
      ${etiket('Kusken', ' data-vis')}
      <h2 data-vis style="--i:1">Sejre i sulkyen.</h2>
      <p class="indled" data-vis style="--i:2">Sejre som kusk pr. sæson ifølge Dansk Hestevæddeløb – egne heste og gæsteture.</p>
    </div>
    <div data-vis style="--i:2">${kuskSoejler(o.kuskAar)}</div>
  </div>
</section>

<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Statistik', ' data-vis')}
        <h2 data-vis style="--i:1">Sæson for sæson.</h2>
      </div>
      <p data-vis style="--i:2">Officielle tal fra Dansk Hestevæddeløb, opdateret ${o.opdateret}.</p>
    </div>
    <div class="tabeller" data-vis>
      ${statTabel('Som træner', data.traenerStatistik)}
      ${statTabel('Som kusk', data.kuskStatistik)}
    </div>
  </div>
</section>
${partnere()}
${kontaktbaand()}`;

const stalden = (o) => `
${sidehoved({
  sti: 'Stalden',
  h1: 'Stald E, Skive Trav',
  tekst: `${SITE.navn} holder til i Stald E på selve Skive Trav – med ${o.heste.length} heste på træningslisten.`,
  foto: 'aften',
  alt: 'Travløb i aftensol på Skive Trav',
  pos: '50% 70%',
  chips: [[o.heste.length, 'heste i træning'], ['14–15', 'bokse'], [o.banetal.length, `baner i ${o.saeson.aar}`]],
})}

<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Det tilbyder stalden', ' data-vis')}
        <h2 data-vis style="--i:1">Træning, tilkøring og køreture.</h2>
      </div>
      <p data-vis style="--i:2">Kontakt ${SITE.fornavn} for pris og en snak om din hest.</p>
    </div>
    ${ydelser(o)}
  </div>
</section>

<section class="sek sek--galleri sek--is">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Hverdagen', ' data-vis')}
        <h2 data-vis style="--i:1">Stald og bane.</h2>
      </div>
      <p data-vis style="--i:2">Billeder fra Team Kasper Fogets Facebook-side.</p>
    </div>
    ${galleri()}
  </div>
</section>

<section class="sek">
  <div class="wrap duo">
    <div>
      ${etiket('Hjemmebanen', ' data-vis')}
      <h2 data-vis style="--i:1">Skive Trav.</h2>
      <p class="indled" data-vis style="--i:2">Stalden ligger på selve banen${o.hjemmestarter ? `, og i ${o.saeson.aar} er ${o.hjemmestarter} af staldens starter kørt her` : ''}.</p>
      <p data-vis style="--i:3">Skive Trav åbnede i 1948 som Nordvestjysk Væddeløbsbane og har ligget på Flyvej i Skive siden 1966. Et lysanlæg fra 2019–20 gør det muligt at køre løb hele vinteren.</p>
      <div data-vis style="--i:4">${banebjaelker(o.banetal)}</div>
      <p class="valg" data-vis style="--i:5">${ekstern(SITE.hjemmebane, 'skive-trav.dk')}</p>
    </div>
    ${kortfigur(o)}
  </div>
</section>

<section class="sek sek--top0">
  <div class="wrap">
    <div class="adresse" data-vis>
      <div>
        ${etiket('Adresse')}
        <address class="adresse__stor">${SITE.navn}<br>${SITE.stald}<br>${SITE.gade}, ${SITE.postnr} ${SITE.by}</address>
      </div>
      <p>${ekstern(SITE.kort, 'Åbn i Google Maps', 'knap')}</p>
    </div>
  </div>
</section>
${partnere()}
${kontaktbaand()}`;

const heste = (o) => `
${sidehoved({
  sti: 'Heste',
  h1: 'Heste i træning',
  tekst: 'Træningslisten kommer direkte fra Dansk Hestevæddeløb og følger automatisk med, når heste kommer til eller rejser videre.',
  foto: 'jacobite',
  alt: 'Jacobite i løb med Kasper Foget i sulkyen',
  pos: '50% 50%',
  chips: [[o.loebsheste.length, 'startede'], [o.ustartede.length, 'på vej'], [o.ungheste.length, 'åringer og 2-årige']],
})}

${o.kortheste.length ? `
<section class="sek sek--moerk sek--smal">
  <div class="wrap">
    ${etiket('Staldens profiler', ' data-vis')}
    ${hestekort(o.kortheste)}
  </div>
</section>` : ''}

<section class="sek">
  <div class="wrap">
    ${hestegruppe('Løbsheste', o.heste.filter((h) => h.alder >= 3))}
    ${hestegruppe('2-årige', o.heste.filter((h) => h.alder === 2))}
    ${hestegruppe('Åringer', o.heste.filter((h) => h.alder <= 1))}
    <p class="note" data-vis>Starter, placeringer (1.–2.–3.), præmiesum og rekord er livstal. Rekorden er hestens hurtigste kilometertid; a = autostart, k/m/l = kort, mellem og lang distance. Klik på en hest for at se den på Travinfo. Kilde: Dansk Hestevæddeløb, opdateret ${o.opdateret}.</p>
  </div>
</section>
${kontaktbaand()}`;

const resultater = (o, data) => `
${sidehoved({
  sti: 'Resultater',
  h1: 'Resultater',
  tekst: `Staldens seneste starter, kommende løb og sæsonens tal. Data kommer fra Dansk Hestevæddeløb og er senest opdateret ${o.opdateret}.`,
  foto: 'loeb-oploeb',
  alt: 'Hest i opløbet foran tribunen',
  pos: '50% 50%',
  chips: [[o.saeson.sejre, `sejre i ${o.saeson.aar}`], [`${o.saeson.procent} %`, 'sejrsprocent'], [o.kusk.sejre, 'sejre som kusk']],
})}

<section class="sek">
  <div class="wrap">
    ${etiket(`Sæson ${o.saeson.aar} som træner`, ' data-vis')}
    <dl class="kpi" data-vis>
      <div><dt>Starter</dt><dd>${o.saeson.starter}</dd></div>
      <div><dt>Sejre</dt><dd>${o.saeson.sejre}</dd></div>
      <div><dt>2.-pladser</dt><dd>${o.saeson.toer}</dd></div>
      <div><dt>3.-pladser</dt><dd>${o.saeson.treer}</dd></div>
      <div><dt>Sejrsprocent</dt><dd>${o.saeson.procent}<small>%</small></dd></div>
      <div><dt>Indkørt</dt><dd>${nf(o.saeson.praemier)}<small>kr.</small></dd></div>
    </dl>
    <div class="formboks" data-vis style="--i:1">
      <h3 class="mini">Formkurve – de seneste ${o.seneste.length} starter</h3>
      ${formkurve(o.seneste)}
    </div>
  </div>
</section>

<section class="sek sek--is">
  <div class="wrap resgitter">
    <div class="panel" data-vis>
      <h2 class="mini">De seneste ${o.seneste.length} starter</h2>
      ${resultatliste(o.seneste)}
      <p class="note">Tider er kilometertider. a = autostart, g = galop undervejs. – = uplaceret, disk. = diskvalificeret.</p>
    </div>
    <div class="panel panel--moerk" data-vis style="--i:1">
      <h2 class="mini">Kommende starter</h2>
      ${o.kommende.length ? kommendeListe(o.kommende) : ingenStarter()}
    </div>
  </div>
</section>

<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Statistik', ' data-vis')}
        <h2 data-vis style="--i:1">Sæson for sæson.</h2>
      </div>
      <p data-vis style="--i:2">Alle resultater og detaljer findes hos Dansk Hestevæddeløb. ${ekstern(SITE.travinfo, 'Åbn Travinfo')}</p>
    </div>
    <div class="tabeller" data-vis>
      ${statTabel('Som træner', data.traenerStatistik)}
      ${statTabel('Som kusk', data.kuskStatistik)}
    </div>
  </div>
</section>
${kontaktbaand()}`;

const kontakt = () => `
${sidehoved({
  sti: 'Kontakt',
  h1: `Kontakt ${SITE.fornavn}`,
  tekst: 'Har du en hest, der skal i træning, en unghest, der skal køres til, eller brug for en kusk? Ring, send en sms eller skriv en mail.',
  foto: 'loeb-sort',
  alt: 'Sort travhest i fuld fart på Skive Trav',
  pos: '50% 40%',
})}

<section class="sek">
  <div class="wrap kontakt">
    <div class="kontakt__felt kontakt__felt--tlf" data-vis>
      <h2 class="mini">Telefon</h2>
      <p class="kontakt__stor"><a href="tel:${tlfLink}">${SITE.telefon}</a></p>
      <p class="valg"><a class="knap knap--hvid" href="tel:${tlfLink}">Ring op ${pil}</a> <a class="link link--lys" href="sms:${tlfLink}">Send en sms ${pil}</a></p>
    </div>
    <div class="kontakt__felt" data-vis style="--i:1">
      <h2 class="mini">E-mail</h2>
      <p class="kontakt__stor kontakt__stor--mail"><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p class="valg"><a class="knap" href="mailto:${SITE.email}?subject=${encodeURIComponent('Henvendelse fra hjemmesiden')}">Skriv en mail ${pil}</a></p>
    </div>
    <div class="kontakt__felt kontakt__felt--kort" data-vis style="--i:2">
      <div>
        <h2 class="mini">Stalden</h2>
        <address class="kontakt__adr">${SITE.navn}<br>${SITE.stald}<br>${SITE.gade}, ${SITE.postnr} ${SITE.by}</address>
        <p class="valg">${ekstern(SITE.kort, 'Find vej')}</p>
      </div>
      <div class="kort kort--mini">${danmarkskort([{ kode: HJEM, navn: 'Skive' }], 'Danmarkskort, hvor Skive er markeret')}</div>
    </div>
  </div>
</section>
${foelg()}`;

const ikkeFundet = () => `
${sidehoved({
  sti: 'Fejl 404',
  h1: 'Siden findes ikke',
  tekst: `Adressen er forkert, eller siden er flyttet. <a class="link" href="${R}">Til forsiden ${pil}</a>`,
  foto: 'loeb-aften',
  pos: '50% 50%',
})}`;

/** Alle sider som [{ sti, html }]. `idag` er YYYY-MM-DD, `v` et versionsmærke til css/js. */
export function sider(data, { v, idag, kort }) {
  V = v;
  KORT = kort;
  const o = afled(data, idag);
  const side = (sti, def) => {
    R = sti === '404.html' ? new URL(SITE.url + '/').pathname : sti ? '../' : '';
    return { sti: sti.endsWith('.html') ? sti : `${sti}index.html`, url: sti, html: layout({ sti, o, ...def() }) };
  };
  return [
    side('', () => ({
      titel: `${SITE.navn} – travtræner ${SITE.person}, Skive Trav`,
      beskrivelse: `${SITE.person}: europamester for travjockeys, catchdriver i USA og professionel travtræner på Skive Trav med ${o.heste.length} heste i Stald E.`,
      klasse: 'forside',
      indhold: forside(o, data),
    })),
    side('om-kasper/', () => ({
      titel: `Om ${SITE.person} – travtræner og kusk | ${SITE.navn}`,
      beskrivelse: `Mød ${SITE.person}: EM-vinder for travjockeys 2018, 61 sejre som catchdriver i USA og selvstændig travtræner på Skive Trav siden 1. december 2025.`,
      indhold: omKasper(o, data),
    })),
    side('stalden/', () => ({
      titel: `Stald E på Skive Trav | ${SITE.navn}`,
      beskrivelse: `${SITE.navn} holder til i Stald E på Skive Trav, ${SITE.gade}, ${SITE.postnr} ${SITE.by}. Træning af løbsheste, tilkøring af ungheste og gæsteture som kusk.`,
      indhold: stalden(o),
    })),
    side('heste/', () => ({
      titel: `Heste i træning | ${SITE.navn}`,
      beskrivelse: `Se de ${o.heste.length} travheste, der lige nu er i træning hos ${SITE.person} – med afstamning, starter, præmiesum og rekord.`,
      indhold: heste(o),
    })),
    side('resultater/', () => ({
      titel: `Resultater og statistik | ${SITE.navn}`,
      beskrivelse: `Seneste resultater, kommende starter og sæsonstatistik for travtræner ${SITE.person}: ${o.saeson.sejre} sejre på ${o.saeson.starter} starter i ${o.saeson.aar}.`,
      indhold: resultater(o, data),
    })),
    side('kontakt/', () => ({
      titel: `Kontakt ${SITE.person} – ${SITE.navn}, Skive`,
      beskrivelse: `Kontakt ${SITE.navn}: telefon ${SITE.telefon}, ${SITE.email}. Stalden ligger i ${SITE.stald}, ${SITE.gade}, ${SITE.postnr} ${SITE.by}.`,
      indhold: kontakt(),
    })),
    side('404.html', () => ({
      titel: `Siden findes ikke | ${SITE.navn}`,
      beskrivelse: `Siden findes ikke. Gå til forsiden for ${SITE.navn} – travtræner ${SITE.person} på Skive Trav.`,
      noindex: true,
      indhold: ikkeFundet(),
    })),
  ];
}
