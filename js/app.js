/* ─── HAMBURGER ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

/* ─── SCROLL REVEAL ──────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.05 });
function observeReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
observeReveal();

/* ─── ANIMATED COUNTERS ──────────────────────────── */
function animateCounter(el, target, duration = 900) {
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const target = parseInt(e.target.dataset.count, 10);
    if (!isNaN(target)) animateCounter(e.target, target);
    countObserver.unobserve(e.target);
  });
}, { threshold: 0.3 });
function observeCounters() {
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
}

/* ─── UTILS ──────────────────────────────────────── */
function fmtDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toLocaleDateString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' });
}

/* ─── ICON SET (replaces emoji — consistent, monochrome, theme-colored) ─── */
const ICONS = {
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><line x1="16" y1="3" x2="16" y2="7"></line><line x1="8" y1="3" x2="8" y2="7"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"></path><circle cx="12" cy="9.5" r="2.5"></circle></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"></path></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5-5.9-3.3-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.7z"></path></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18l1-9-5.5 3.5L12 5.5 7.5 12.5 2 9l1 9z"></path><rect x="3" y="19" width="18" height="2" rx="1"></rect></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8v6a4 4 0 0 1-8 0V3z"></path><path d="M8 4H5a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4"></path><path d="M16 4h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4"></path><line x1="12" y1="13" x2="12" y2="17"></line><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
  flag: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="2" width="2" height="20"></rect><rect x="6" y="3" width="3" height="3"></rect><rect x="12" y="3" width="3" height="3"></rect><rect x="9" y="6" width="3" height="3"></rect><rect x="15" y="6" width="3" height="3"></rect><rect x="6" y="9" width="3" height="3"></rect><rect x="12" y="9" width="3" height="3"></rect></svg>`,
  turns: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19V10A5 5 0 0 1 17 10V19"></path></svg>`,
  laps: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5A7 7 0 0 1 19 12A7 7 0 0 1 12 19A7 7 0 0 1 5 12"></path><polyline points="9 3 12 5 9 7"></polyline></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"></path></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 16 4 6h16z"></path></svg>`,
  medal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 5 10"></path><path d="M16 3l3 7"></path><circle cx="12" cy="15" r="6"></circle></svg>`,
  helmet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15a8 8 0 0 1 16 0"></path><path d="M3 15h18v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2z"></path><line x1="12" y1="7" x2="12" y2="10"></line></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"></path><polyline points="9 21 9 13 15 13 15 21"></polyline></svg>`,
  news: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="9" x2="17" y2="9"></line><line x1="7" y1="13" x2="17" y2="13"></line><line x1="7" y1="17" x2="13" y2="17"></line></svg>`,
};
function icon(name, extraClass) {
  return `<span class="icon${extraClass ? ' ' + extraClass : ''}" aria-hidden="true">${ICONS[name] || ''}</span>`;
}

function hexColor(raw) {
  if (!raw) return '#888';
  // Handle #FFRRGGBB format (alpha first) from Racing League Tools
  if (raw.length === 9 && raw.startsWith('#')) {
    return '#' + raw.slice(3); // drop alpha, keep RGB
  }
  return raw.substring(0, 7);
}

/* ─── TEAM REGISTRY (logos + canonical full names) ───
   Matches on whatever team name/fullName came through in the data (which
   varies release to release: "Red Bull" vs "Oracle Red Bull Racing" etc.)
   against a keyword, so it works regardless of exact source naming. */
const TEAM_REGISTRY = [
  { re: /ferrari/i, full: 'Scuderia Ferrari', logo: 'fer.png' },
  { re: /red\s*bull/i, full: 'Oracle Red Bull Racing', logo: 'rbr.png' },
  { re: /racing bulls|vcarb|cash app/i, full: 'Visa Cash App RB F1 Team', logo: 'rb.png' },
  { re: /mercedes/i, full: 'Mercedes-AMG Petronas F1 Team', logo: 'mer.png' },
  { re: /mclaren/i, full: 'McLaren Formula 1 Team', logo: 'mcl.png' },
  { re: /aston martin/i, full: 'Aston Martin Aramco F1 Team', logo: 'amr.png' },
  { re: /alpine/i, full: 'BWT Alpine F1 Team', logo: 'alp.png' },
  { re: /williams/i, full: 'Williams Racing', logo: 'wil.png' },
  { re: /haas/i, full: 'MoneyGram Haas F1 Team', logo: 'haa.png' },
  { re: /sauber/i, full: 'Stake F1 Team Kick Sauber', logo: 'sau.png' },
  { re: /audi/i, full: 'Audi F1 Team', logo: 'audi.png' },
  { re: /cadillac/i, full: 'Cadillac Formula 1 Team', logo: 'cad.png' },
];

function getTeamMeta(nameOrFull) {
  const s = (nameOrFull || '').toString();
  for (const t of TEAM_REGISTRY) {
    if (t.re.test(s)) return { full: t.full, logo: `assets/teams/${t.logo}`, avatar: `assets/drivers/${t.logo}` };
  }
  return { full: s || 'Nieznany zespół', logo: null, avatar: null };
}

/** Team-branded driver avatar (generic helmet+kit figure per team, not per named driver). */
function driverAvatar(teamNameOrFull) {
  return getTeamMeta(teamNameOrFull).avatar;
}

/** Renders a small logo + full team name. `size`: 'sm' (table rows) | 'md' (cards). */
function renderTeamBadge(nameOrFull, size) {
  const meta = getTeamMeta(nameOrFull);
  const cls = size === 'md' ? 'team-badge team-badge-md' : 'team-badge';
  const img = meta.logo
    ? `<img class="team-logo" src="${meta.logo}" alt="" loading="lazy" onerror="this.remove()">`
    : '';
  return `<span class="${cls}">${img}<span class="team-name">${meta.full}</span></span>`;
}

function posRankClass(p) {
  return p === 1 ? 'p1' : p === 2 ? 'p2' : p === 3 ? 'p3' : '';
}
function posBadge(p) {
  return `<span class="pos-badge ${posRankClass(p)}">${p}</span>`;
}

function trackFlag(country) {
  const codes = {
    'Bahrain': 'bh', 'bahrain': 'bh',
    'Italy': 'it', 'italy': 'it',
    'Belgium': 'be', 'belgium': 'be',
    'Monaco': 'mc', 'monaco': 'mc',
    'Spain': 'es', 'spain': 'es',
    'Great Britain': 'gb', 'United Kingdom': 'gb',
    'Hungary': 'hu', 'hungary': 'hu',
    'Netherlands': 'nl', 'netherlands': 'nl',
    'Singapore': 'sg', 'singapore': 'sg',
    'Japan': 'jp', 'japan': 'jp',
    'USA': 'us', 'United States': 'us',
    'Mexico': 'mx', 'mexico': 'mx',
    'Brazil': 'br', 'brazil': 'br',
    'Abu Dhabi': 'ae', 'United Arab Emirates': 'ae',
    'Australia': 'au', 'australia': 'au',
    'Canada': 'ca', 'canada': 'ca',
    'Austria': 'at', 'austria': 'at',
    'Azerbaijan': 'az', 'azerbaijan': 'az',
    'Saudi Arabia': 'sa',
    'China': 'cn',
    'Qatar': 'qa',
    'Poland': 'pl',
  };
  const code = codes[country];
  if (!code) return icon('flag', 'icon-flag-fallback');
  return '<img src="https://flagcdn.com/w40/' + code + '.png" alt="' + country + '" class="track-flag-img" onerror="flagImgFallback(this)">';
}

/** onerror handler for the <img> in trackFlag() — swaps a broken flag image
 *  for the SVG flag icon. Kept as a named function (rather than inlining the
 *  icon markup into the onerror attribute) since the icon's own double-quoted
 *  HTML attributes would otherwise conflict with the attribute's quoting. */
function flagImgFallback(imgEl) {
  imgEl.outerHTML = icon('flag', 'icon-flag-fallback');
}

/* ─────────────────────────────────────────────────── 
   JSON LOADER — czyta z folderów Wyniki/Sezon X/
   Szuka pliku manifest.json w każdym sezonie.
   Jeśli nie ma manifestu, używa wbudowanej listy plików.
   ───────────────────────────────────────────────── */

// Seasons config — add more seasons here as needed
const SEASONS_CONFIG = [
  { name: 'Sezon 1', folder: 'Wyniki/Sezon 1' },
  { name: 'Sezon 2', folder: 'Wyniki/Sezon 2' },
  { name: 'Sezon 3', folder: 'Wyniki/Sezon 3' },
];

// Calendar seasons config — mirror of SEASONS_CONFIG
const CALENDAR_SEASONS_CONFIG = [
  { name: 'Sezon 1', folder: 'Kalendarz/Sezon 1' },
  { name: 'Sezon 2', folder: 'Kalendarz/Sezon 2' },
  { name: 'Sezon 3', folder: 'Kalendarz/Sezon 3' },
];

// Tiers — every season folder is now split into Tier 1 / Tier 2 / Tier 3 subfolders
const TIERS = ['Tier 1', 'Tier 2', 'Tier 3'];
const DEFAULT_TIER = 'Tier 1';

// Known files per season+tier (fallback if no manifest) — auto-populated from what we discover
// In production: add a manifest.json to each Tier folder listing the .json files
const KNOWN_FILES = {
  'Sezon 1': { 'Tier 1': ['polaris_race_sezon_1_e01_20260614_0000.json'], 'Tier 2': [], 'Tier 3': [] },
  'Sezon 2': { 'Tier 1': [], 'Tier 2': [], 'Tier 3': [] },
  'Sezon 3': { 'Tier 1': [], 'Tier 2': [], 'Tier 3': [] },
};

async function tryFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/* ─── AUTO-DISCOVERY (no manifest.json needed) ───────
   On GitHub Pages, we can ask the GitHub API "what files are in this
   folder?" instead of maintaining a manifest.json by hand. If this ever
   fails (rate limit, custom domain, running the site locally, etc.) every
   caller falls back to reading manifest.json exactly as before — nothing
   breaks, it just goes back to needing the manifest in that situation. */

// Set this if the site is served from a custom domain (not *.github.io) —
// e.g. { owner: 'my-org', repo: 'polaris-site' }. Leave null to auto-detect.
const GITHUB_REPO_OVERRIDE = null;

let _cachedRepo; // undefined = not computed yet, null = none detected
function detectGithubRepo() {
  if (GITHUB_REPO_OVERRIDE) return GITHUB_REPO_OVERRIDE;
  if (_cachedRepo !== undefined) return _cachedRepo;
  const host = location.hostname;
  if (!host.endsWith('.github.io')) { _cachedRepo = null; return null; }
  const owner = host.replace('.github.io', '');
  const pathParts = location.pathname.split('/').filter(Boolean);
  // Project page (https://owner.github.io/repo/...) — first segment is the repo name.
  // User/org root page (https://owner.github.io/) has no segment, repo == owner.github.io.
  const repo = pathParts.length > 0 ? pathParts[0] : `${owner}.github.io`;
  _cachedRepo = { owner, repo };
  return _cachedRepo;
}

const _dirListCache = {};
/** Lists the .json files actually present in a folder via the GitHub API.
 *  Returns null (not an empty array) whenever discovery isn't possible, so
 *  callers can tell "no files" apart from "couldn't check, use the manifest". */
async function listGithubDir(path) {
  const repo = detectGithubRepo();
  if (!repo) return null;
  if (path in _dirListCache) return _dirListCache[path];
  try {
    const res = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${path}`);
    if (!res.ok) { _dirListCache[path] = null; return null; }
    const data = await res.json();
    if (!Array.isArray(data)) { _dirListCache[path] = null; return null; }
    const files = data
      .filter(item => item.type === 'file' && item.name.endsWith('.json') && item.name !== 'manifest.json')
      .map(item => item.name);
    _dirListCache[path] = files;
    return files;
  } catch {
    _dirListCache[path] = null;
    return null;
  }
}

/* Parse a Racing League Tools JSON session into our internal race format */
/* ─── PENALTY & CLASSIFICATION ENGINE ────────────────
   Positions and points are never trusted as-authored — they are always
   recomputed here from: raw gap-to-leader (gapMs), any time penalty added,
   any penalty time removed on appeal, and any position-drop penalty. This
   is what lets an admin type "3s kara" and have the site itself move the
   driver down the order and recompute points, rather than the admin having
   to re-sort everything by hand. */

const RACE_POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
const SPRINT_POINTS = [8, 7, 6, 5, 4, 3, 2, 1];

function normalizeSessionType(raw) {
  const s = (raw || '').toLowerCase();
  if (s.includes('sprint') && s.includes('qual')) return 'Qualifying Sprint';
  if (s.includes('sprint')) return 'Sprint';
  if (s.includes('qual')) return 'Qualifying';
  return 'Race';
}

const SESSION_TYPE_LABELS = {
  'Qualifying Sprint': 'Kwalifikacje Sprintu',
  'Sprint': 'Sprint',
  'Qualifying': 'Kwalifikacje',
  'Race': 'Wyścig',
};
const SESSION_TYPE_ORDER = ['Qualifying Sprint', 'Sprint', 'Qualifying', 'Race'];

/** Recomputes final classification for one session's drivers.
 *  Input drivers need: pos (as-raced/as-qualified position), gapMs (or null),
 *  status ('Finished'/'DNF'/'DSQ'), penaltySeconds, penaltyRemovedSeconds,
 *  positionPenalty. Returns a new array, sorted into final order, with pos/
 *  points overwritten to reflect the recalculated classification. */
function computeFinalClassification(drivers, sessionType) {
  const withKeys = drivers.map(d => {
    const rawStatus = d.rawStatus || d.status || 'Finished';
    const statusRank = rawStatus === 'DSQ' ? 2 : (rawStatus === 'DNF' ? 1 : 0);
    const penaltyMs = (d.penaltySeconds || 0) * 1000;
    const removedMs = (d.penaltyRemovedSeconds || 0) * 1000;
    const rawMs = typeof d.gapMs === 'number' ? d.gapMs : null;
    const adjustedMs = rawMs !== null ? Math.max(0, rawMs + penaltyMs - removedMs) : null;
    return { ...d, statusRank, adjustedMs, originalPos: d.pos };
  });

  let sorted = [...withKeys].sort((a, b) => {
    if (a.statusRank !== b.statusRank) return a.statusRank - b.statusRank;
    if (a.adjustedMs === null && b.adjustedMs === null) return a.originalPos - b.originalPos;
    if (a.adjustedMs === null) return 1;
    if (b.adjustedMs === null) return -1;
    return a.adjustedMs - b.adjustedMs;
  });

  // Position-drop penalties are applied after time-based sorting: move the
  // penalized driver back N places from wherever they ended up.
  const withPosPenalty = sorted.filter(d => d.positionPenalty > 0);
  for (const d of withPosPenalty) {
    const idx = sorted.indexOf(d);
    if (idx === -1) continue;
    const newIdx = Math.min(idx + d.positionPenalty, sorted.length - 1);
    sorted.splice(idx, 1);
    sorted.splice(newIdx, 0, d);
  }

  const pointsTable = sessionType === 'Sprint' ? SPRINT_POINTS
    : sessionType === 'Race' ? RACE_POINTS
    : null; // Qualifying sessions don't award championship points

  return sorted.map((d, i) => {
    const finalPos = i + 1;
    const finalPoints = pointsTable ? (finalPos <= pointsTable.length ? pointsTable[finalPos - 1] : 0) : 0;
    return {
      ...d,
      pos: finalPos,
      points: finalPoints,
      teamPoints: finalPoints,
      positionChanged: finalPos !== d.originalPos,
    };
  });
}

function parseRLT(json, seasonName) {
  const ev = json.event || {};
  const sess = json.session || {};
  const info = sess.sessionInfo || {};
  const drivers = sess.drivers || [];
  const track = ev.track || {};

  const country = track.country || 'Unknown';
  const flag = trackFlag(country);
  const sessionType = normalizeSessionType(info.sessionType);

  const rawResults = drivers
    .sort((a, b) => a.position - b.position)
    .map(d => ({
      pos: d.position,
      driver: d.driverName,
      realName: d.driverInfo?.realName || null,
      team: d.team?.abbreviation || d.team?.name || '—',
      teamFull: d.team?.fullName || d.team?.name || '—',
      teamColor: d.team?.primaryColor || '#888',
      gap: d.gap === '0' ? '—' : (d.gap || '—'),
      gapMs: typeof d.gapMs === 'number' ? d.gapMs : null,
      laps: d.lapsCompleted,
      rawStatus: d.status || 'Finished',
      status: d.status === 'Finished' ? 'Ukończony' : d.status,
      penaltySeconds: d.penaltySeconds ? parseInt(d.penaltySeconds) || 0 : 0,
      penaltyReason: d.penaltyReason || null,
      penaltyRemovedSeconds: d.penaltyRemovedSeconds ? parseInt(d.penaltyRemovedSeconds) || 0 : 0,
      penaltyRemovedReason: d.penaltyRemovedReason || null,
      positionPenalty: d.positionPenalty ? parseInt(d.positionPenalty) || 0 : 0,
      positionPenaltyReason: d.positionPenaltyReason || null,
      fastestLapTime: d.fastestLapTime || null,
      fastestLapTyre: d.fastestLapTyreCompound || null,
      stints: Array.isArray(d.stints)
        ? d.stints.map(s => ({ compound: s.tyreCompound, laps: s.lapsCount }))
        : null,
    }));

  const raceResults = computeFinalClassification(rawResults, sessionType);

  return {
    id: `${seasonName}-round${ev.round}-${sessionType}`,
    season: json.season?.seasonName || seasonName,
    round: ev.round || 1,
    sessionType,
    name: `${track.trackName || country} Grand Prix`,
    shortName: `${track.trackName || country} GP`,
    country,
    flag,
    date: ev.eventDate || info.sessionDate || '',
    track: track.trackName || country,
    turns: track.turnsCount || 0,
    totalLaps: info.totalLaps || 0,
    status: 'completed',
    raceResults,
    qualifying: [], // qualification data not in race session JSON
    fastestLap: sess.fastestLap ? {
      driver: sess.fastestLap.driverName,
      time: sess.fastestLap.lapTime,
      lap: sess.fastestLap.lapNumber,
      tyre: sess.fastestLap.tyreCompound,
    } : null,
    driverOfTheDay: sess.driverOfTheDay?.driver ? {
      driver: sess.driverOfTheDay.driver,
      reason: sess.driverOfTheDay.reason || '',
    } : null,
    bestManeuver: sess.bestManeuver?.url ? {
      url: sess.bestManeuver.url,
      title: sess.bestManeuver.title || '',
      driver: sess.bestManeuver.driver || '',
      description: sess.bestManeuver.description || '',
    } : null,
    _raw: json,
  };
}

/* Load races for a single season+tier folder, e.g. Wyniki/Sezon 1/Tier 1 */
async function loadRacesFor(folder, seasonName, tier) {
  const fallback = (KNOWN_FILES[seasonName] && KNOWN_FILES[seasonName][tier]) || [];
  const races = [];

  let fileList = await listGithubDir(`${folder}/${tier}`);
  if (!fileList) {
    const manifest = await tryFetch(`${folder}/${tier}/manifest.json`);
    fileList = manifest?.files || fallback;
  }

  for (const file of fileList) {
    const json = await tryFetch(`${folder}/${tier}/${file}`);
    if (json && json.metadata?.exportType === 'Session') {
      races.push(parseRLT(json, seasonName));
    }
  }

  races.sort((a, b) => a.round - b.round);
  return races;
}

/* Load all races for all seasons, nested by tier: { 'Sezon 1': { 'Tier 1': [...], 'Tier 2': [...] } } */
async function loadAllRaces() {
  const allSeasons = {};

  for (const season of SEASONS_CONFIG) {
    const tiersData = {};
    for (const tier of TIERS) {
      const races = await loadRacesFor(season.folder, season.name, tier);
      if (races.length > 0) tiersData[tier] = races;
    }
    if (Object.keys(tiersData).length > 0) {
      allSeasons[season.name] = tiersData;
    }
  }

  return allSeasons;
}

/* Pick races for a given season+tier. No fallback to another tier — if the
   requested tier genuinely has no results yet, callers should show an empty
   state rather than silently displaying a different tier's data. */
function racesForTier(allSeasons, seasonName, tier) {
  const tiers = allSeasons[seasonName] || {};
  return tiers[tier] || [];
}

/* Compute driver standings from races — only sessions that actually award
   championship points (Race, Sprint) count; Qualifying/Qualifying Sprint don't. */
function computeDriverStandings(races) {
  const map = {};
  for (const race of races.filter(r => r.sessionType === 'Race' || r.sessionType === 'Sprint')) {
    for (const d of race.raceResults) {
      if (!map[d.driver]) {
        map[d.driver] = {
          driver: d.driver,
          realName: d.realName,
          team: d.teamFull || d.team,
          teamAbbr: d.team,
          teamColor: d.teamColor,
          points: 0,
          wins: 0,
          podiums: 0,
        };
      }
      map[d.driver].points += d.points;
      if (race.sessionType === 'Race') {
        if (d.pos === 1) map[d.driver].wins++;
        if (d.pos <= 3) map[d.driver].podiums++;
      }
      // Use latest team (and its color) — a driver who switched teams mid-season
      // should read as their most recent team here, not whichever one they were
      // on when first encountered. This is only a fallback for when no current
      // roster entry exists — renderStandingsTable() prefers driverIndex (from
      // sklad.json) as the real source of truth for "current team".
      map[d.driver].team = d.teamFull || d.team;
      map[d.driver].teamAbbr = d.team;
      map[d.driver].teamColor = d.teamColor;
    }
  }
  return Object.values(map)
    .sort((a, b) => b.points - a.points || b.wins - a.wins)
    .map((d, i) => ({ ...d, pos: i + 1 }));
}

/* Compute constructor standings from races — same points-scoring-sessions filter as drivers. */
/** Akceptuje stary format sklad.json (drivers: [string]) albo nowy
 *  (drivers: [{name, number}]) i zwraca ujednoliconą tablicę {name, number} —
 *  number to liczba albo null. */
function normalizeSkladDrivers(rawDrivers) {
  if (!Array.isArray(rawDrivers)) return [];
  return rawDrivers.map(d => {
    if (typeof d === 'string') {
      const name = d.trim();
      return name ? { name, number: null } : null;
    }
    if (d && typeof d === 'object' && typeof d.name === 'string') {
      const name = d.name.trim();
      if (!name) return null;
      const n = parseInt(d.number, 10);
      return { name, number: isNaN(n) ? null : n };
    }
    return null;
  }).filter(Boolean);
}

/* Loads the "current roster" file for a Tier — who drives for whom right now,
   and with what car number. `rosterMap` is used only to decide which drivers
   are SHOWN under each constructor; `driverIndex` (name -> {team, number}) is
   used to attach car numbers and to resolve team-branded avatars by name.
   Neither ever affects how points are attributed (that always stays
   historical, per-race, from whatever team was recorded in that race's own
   result file). */
async function loadSklad(tier) {
  const data = await tryFetch(`Sklady/${tier}/sklad.json`);
  if (!data || !Array.isArray(data.teams)) return { rosterMap: null, driverIndex: {} };
  const rosterMap = {};
  const driverIndex = {};
  data.teams.forEach(t => {
    const canonical = getTeamMeta(t.team).full;
    const drivers = normalizeSkladDrivers(t.drivers);
    rosterMap[canonical] = drivers.map(d => d.name);
    drivers.forEach(d => { driverIndex[d.name] = { team: canonical, number: d.number }; });
  });
  return { rosterMap, driverIndex };
}

function computeConstructorStandings(races, roster) {
  const map = {};
  for (const race of races.filter(r => r.sessionType === 'Race' || r.sessionType === 'Sprint')) {
    for (const d of race.raceResults) {
      const key = getTeamMeta(d.teamFull || d.team).full;
      if (!map[key]) {
        map[key] = {
          team: key,
          teamAbbr: d.team,
          teamColor: d.teamColor,
          points: 0,
          wins: 0,
          podiums: 0,
          drivers: new Set(),
        };
      }
      map[key].points += d.teamPoints || d.points;
      if (race.sessionType === 'Race') {
        if (d.pos === 1) map[key].wins++;
        if (d.pos <= 3) map[key].podiums++;
      }
      map[key].drivers.add(d.driver);
      map[key].teamColor = d.teamColor;
    }
  }
  return Object.values(map)
    .map(c => ({
      ...c,
      // If a roster file exists for this Tier, it is the ONLY source of truth
      // for who's shown as driving for a team — a driver who isn't listed in
      // sklad.json has no business appearing here, even if their team simply
      // has no roster entry yet (that just means an empty list, not a
      // fallback to history). Only when there's no roster file at all do we
      // fall back to "everyone who ever scored for them" so the page still
      // works before you've set up any roster.
      drivers: roster ? (roster[c.team] || []) : [...c.drivers],
    }))
    .sort((a, b) => b.points - a.points || b.wins - a.wins)
    .map((c, i) => ({ ...c, pos: i + 1 }));
}

/* ─── RENDER HELPERS ─────────────────────────────── */
function renderDriverCell(d, leadingBadges, driverIndex) {
  const avatar = driverAvatar(d.teamFull || d.team);
  const num = driverIndex?.[d.driver]?.number ?? null;
  const nameDisplay = d.realName
    ? `<span class="driver-name">${d.driver}</span><span class="driver-realname">${d.realName}</span>`
    : `<span class="driver-name">${d.driver}</span>`;

  const badges = [];
  if (d.penaltySeconds > 0) {
    badges.push(`<span class="penalty-badge" title="${escHtml(d.penaltyReason) || 'Kara czasowa'}">+${d.penaltySeconds}s</span>`);
  }
  if (d.penaltyRemovedSeconds > 0) {
    badges.push(`<span class="penalty-badge penalty-badge-removed" title="${escHtml(d.penaltyRemovedReason) || 'Kara odwołana'}">−${d.penaltyRemovedSeconds}s</span>`);
  }
  if (d.positionPenalty > 0) {
    badges.push(`<span class="penalty-badge penalty-badge-pos" title="${escHtml(d.positionPenaltyReason) || 'Kara pozycji'}">${icon('chevronDown')}${d.positionPenalty} poz.</span>`);
  }

  return `<div class="driver-cell">
    ${leadingBadges || ''}
    ${avatar ? `<img class="driver-cell-avatar" src="${avatar}" alt="" loading="lazy" onerror="this.remove()">` : `<span class="team-dot" style="background:${hexColor(d.teamColor)}"></span>`}
    ${num !== null ? `<span class="driver-number">${num}</span>` : ''}
    <div>${nameDisplay}</div>
    ${badges.join('')}
  </div>`;
}

function escHtml(s) {
  return s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : '';
}

function renderStandingsTable(standings, containerId, driverIndex) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!standings.length) {
    el.innerHTML = '<p style="color:var(--gray);padding:2rem 0">Brak danych do wyświetlenia.</p>';
    return;
  }
  el.innerHTML = `
    <div class="standings-wrap table-wrap">
      <table class="standings">
        <thead>
          <tr>
            <th>Poz.</th>
            <th>Kierowca</th>
            <th>Zespół</th>
            <th class="right">Zwycięstwa</th>
            <th class="right">Podium</th>
            <th class="right">Punkty</th>
          </tr>
        </thead>
        <tbody>
          ${standings.map(d => {
            // Prefer the current roster (sklad.json via driverIndex) for the team
            // shown here — this is a standings/ranking view, not a single race
            // result, so it should reflect who a driver races for *now*, not
            // whichever team they were on in their most recent result. Falls back
            // to that historical team when there's no roster entry (or file) yet.
            const currentTeam = driverIndex?.[d.driver]?.team || d.teamFull || d.team;
            const rowDriver = currentTeam === (d.teamFull || d.team) ? d : { ...d, teamFull: currentTeam, team: currentTeam };
            return `
            <tr>
              <td><span class="standing-pos ${posRankClass(d.pos)}">${d.pos}</span></td>
              <td>${renderDriverCell(rowDriver, null, driverIndex)}</td>
              <td>${renderTeamBadge(currentTeam)}</td>
              <td class="right"><span class="wins-val">${d.wins}</span></td>
              <td class="right"><span class="podium-val">${d.podiums}</span></td>
              <td class="right"><span class="points-big">${d.points}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
  observeReveal();
}

function renderConstructorsTable(constructors, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!constructors.length) {
    el.innerHTML = '<p style="color:var(--gray);padding:2rem 0">Brak danych do wyświetlenia.</p>';
    return;
  }
  el.innerHTML = `
    <div class="standings-wrap table-wrap">
      <table class="standings">
        <thead>
          <tr>
            <th>Poz.</th>
            <th>Konstruktor</th>
            <th>Kierowcy</th>
            <th class="right">Zwycięstwa</th>
            <th class="right">Podium</th>
            <th class="right">Punkty</th>
          </tr>
        </thead>
        <tbody>
          ${constructors.map(c => `
            <tr>
              <td><span class="standing-pos ${posRankClass(c.pos)}">${c.pos}</span></td>
              <td>${renderTeamBadge(c.team, 'md')}</td>
              <td><span style="font-size:12px;color:var(--gray-light)">${c.drivers.join(', ')}</span></td>
              <td class="right"><span class="wins-val">${c.wins}</span></td>
              <td class="right"><span class="podium-val">${c.podiums}</span></td>
              <td class="right"><span class="points-big">${c.points}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
  observeReveal();
}

function renderSeasonTabs(seasons, activeSeasonName, onSelect) {
  const el = document.getElementById('season-tabs');
  if (!el) return;
  const names = Object.keys(seasons);
  if (names.length === 0) return;
  el.innerHTML = names.map(name =>
    `<button class="season-tab ${name === activeSeasonName ? 'active' : ''}" data-season="${name}">${name}</button>`
  ).join('');
  el.querySelectorAll('.season-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.season-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(btn.dataset.season);
    });
  });
}

/* Renders the Tier 1 / Tier 2 / Tier 3 switcher. Always shows all tiers
   regardless of whether data exists yet — defaults to Tier 1. */
function renderTierTabs(activeTier, onSelect) {
  const el = document.getElementById('tier-tabs');
  if (!el) return;
  el.innerHTML = TIERS.map(tier =>
    `<button class="tier-tab ${tier === activeTier ? 'active' : ''}" data-tier="${tier}">${tier}</button>`
  ).join('');
  el.querySelectorAll('.tier-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.tier-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(btn.dataset.tier);
    });
  });
}

/* ─── INDEX PAGE ─────────────────────────────────── */
async function initIndex() {
  const [allSeasons, allCalendars, { rosterMap: homeRoster, driverIndex }] = await Promise.all([loadAllRaces(), loadAllCalendars(), loadSklad(DEFAULT_TIER)]);
  const seasonNames = Object.keys(allSeasons);

  // Homepage always shows the default tier (Tier 1)
  const allRaces = seasonNames.flatMap(name => racesForTier(allSeasons, name, DEFAULT_TIER));
  // "Races" for stats/podium purposes means actual Race sessions — a Qualifying
  // or Sprint Qualifying file for the same round shouldn't be counted twice.
  const raceSessionsOnly = allRaces.filter(r => r.sessionType === 'Race');

  // stat: total unique drivers across all seasons (Tier 1)
  const allDrivers = new Set(raceSessionsOnly.flatMap(r => r.raceResults.map(d => d.driver)));
  const statDriversEl = document.getElementById('stat-drivers');
  if (allDrivers.size) { statDriversEl.dataset.count = allDrivers.size; statDriversEl.textContent = '0'; }
  else statDriversEl.textContent = '—';

  // stat: completed races / total rounds on the calendar (not just how many
  // result files happen to exist — a season with 12 planned rounds and only
  // 1 result published should read "1/12", not "1/1").
  const latestSeason = seasonNames[seasonNames.length - 1];
  const latestRaces = racesForTier(allSeasons, latestSeason, DEFAULT_TIER).filter(r => r.sessionType === 'Race');
  const calRoundsForSeason = calendarForTier(allCalendars, latestSeason, DEFAULT_TIER);
  const totalRounds = calRoundsForSeason.length || latestRaces.length;
  document.getElementById('stat-rounds').textContent =
    totalRounds ? `${latestRaces.length}/${totalRounds}` : '—';

  // Feature the next upcoming round's track photo in the hero (falls back to
  // the most recently completed round if the season is finished); silently
  // no-ops if there's no calendar data or the photo file doesn't exist.
  markNextRound(calRoundsForSeason);
  const featuredRound = calRoundsForSeason.find(r => r._isNext)
    || calRoundsForSeason.slice().reverse().find(r => r.status === 'completed');
  if (featuredRound) applyHeroTrackBackground(document.getElementById('hero-bg'), featuredRound.track);

  // Last race (most recent completed Race session across all seasons)
  const lastRace = raceSessionsOnly.filter(r => r.status === 'completed').pop();
  if (lastRace) renderLastRaceCard(lastRace, driverIndex);
  else document.getElementById('last-race').innerHTML = '<p style="color:var(--gray)">Brak danych do wyświetlenia.</p>';

  // Mini standings
  const latestDrivers = computeDriverStandings(latestRaces);
  renderStandingsTable(latestDrivers.slice(0, 5), 'standings-mini', driverIndex);

  // Mini constructors
  const latestConstructors = computeConstructorStandings(latestRaces, homeRoster);
  renderConstructorsTable(latestConstructors.slice(0, 5), 'constructors-mini');

  // News teaser (latest 3) from the dedicated Aktualności page's data
  const newsData = await tryFetch('Aktualnosci/aktualnosci.json');
  const articles = (newsData?.articles || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  if (articles.length) renderNews(articles.slice(0, 3));
  else document.getElementById('news-grid').innerHTML = '<p style="color:var(--gray)">Brak danych do wyświetlenia.</p>';

  observeReveal();
  observeCounters();
}

function renderLastRaceCard(r, driverIndex) {
  const el = document.getElementById('last-race');
  if (!el) return;
  const top3 = r.raceResults.slice(0, 3);
  const posEmoji = [1, 2, 3];
  const posClass = ['p1','p2','p3'];

  el.innerHTML = `
    <div class="last-race-grid">
      <div class="race-info-card">
        <div class="race-flag">${r.flag}</div>
        <div class="race-name-display">${r.name}</div>
        <div class="race-meta-row">
          <div class="race-meta-item">${icon('calendar','icon-lg')}<strong>${fmtDate(r.date)}</strong></div>
          <div class="race-meta-item">${icon('laps','icon-lg')}<strong>Runda ${r.round}</strong> · ${r.totalLaps} okrążeń</div>
          <div class="race-meta-item"><span class="icon icon-flag">${r.flag}</span><strong>${r.track}</strong></div>
        </div>
        <div class="podium-row">
          ${top3.map((d,i) => `
            <div class="podium-item">
              <span class="podium-pos ${posClass[i]}">${posEmoji[i]}</span>
              ${driverAvatar(d.teamFull || d.team) ? `<img class="podium-avatar" src="${driverAvatar(d.teamFull || d.team)}" alt="" onerror="this.style.display='none'">` : ''}
              <div>
                <div class="podium-driver">${driverIndex?.[d.driver]?.number !== null && driverIndex?.[d.driver]?.number !== undefined ? `<span class="driver-number">${driverIndex[d.driver].number}</span>` : ''}${d.driver}</div>
                <div class="podium-team">${renderTeamBadge(d.teamFull || d.team)}</div>
              </div>
              <span class="podium-pts">${d.points} pkt</span>
            </div>
          `).join('')}
        </div>
        <a href="wynik-wydarzenia.html?season=${encodeURIComponent(r.season)}&tier=${encodeURIComponent(DEFAULT_TIER)}&round=${r.round}" class="btn btn-outline" style="margin-top:0.5rem;justify-content:center;font-size:12px">
          Pełne wyniki →
        </a>
      </div>
      <div>
        <div class="table-wrap">
          <table class="results">
            <thead>
              <tr>
                <th>#</th>
                <th>Kierowca</th>
                <th>Zespół</th>
                <th class="right">Strata</th>
                <th class="right">Status</th>
                <th class="right">Pkt</th>
              </tr>
            </thead>
            <tbody>
              ${r.raceResults.map(d => `
                <tr>
                  <td>${posBadge(d.pos)}</td>
                  <td>${renderDriverCell(d, null, driverIndex)}</td>
                  <td>${renderTeamBadge(d.teamFull || d.team)}</td>
                  <td class="right"><span class="gap-text">${d.gap}</span></td>
                  <td class="right"><span class="status-fin">${d.status}</span></td>
                  <td class="right"><span class="points-val">${d.points}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
  observeReveal();
}

function renderNews(news) {
  const el = document.getElementById('news-grid');
  if (!el || !news?.length) return;
  const [first, ...rest] = news;
  el.innerHTML = `
    <div class="news-grid">
      <div class="news-card news-card-featured">
        <div class="news-type">${first.type}</div>
        <div class="news-title">${first.title}</div>
        <div class="news-body">${first.body}</div>
        <div class="news-date">${fmtDate(first.date)}</div>
      </div>
      ${rest.map(n => `
        <div class="news-card">
          <div class="news-type">${n.type}</div>
          <div class="news-title">${n.title}</div>
          <div class="news-body">${n.body}</div>
          <div class="news-date">${fmtDate(n.date)}</div>
        </div>
      `).join('')}
    </div>`;
}

/* ─── AKTUALNOŚCI PAGE ───────────────────────────── */
async function initAktualnosci() {
  const data = await tryFetch('Aktualnosci/aktualnosci.json');
  const articles = (data?.articles || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  if (articles.length) renderNews(articles);
  else document.getElementById('news-grid').innerHTML = '<p style="color:var(--gray);padding:2rem 0">Brak danych do wyświetlenia.</p>';
  observeReveal();
}

/* ─── WYNIKI PAGE ────────────────────────────────── */
async function initWyniki() {
  const el = document.getElementById('races-list');
  if (!el) return;

  const allSeasons = await loadAllCalendars();
  const seasonNames = Object.keys(allSeasons);

  if (!seasonNames.length) {
    el.innerHTML = '<p style="color:var(--gray);padding:2rem 0">Brak danych do wyświetlenia.</p>';
    return;
  }

  let activeSeason = seasonNames[0];
  let activeTier = DEFAULT_TIER;

  const rerender = () => {
    const rounds = calendarForTier(allSeasons, activeSeason, activeTier);
    markNextRound(rounds);

    const featured = rounds.find(r => r.status === 'live') || rounds.slice().reverse().find(r => r.status === 'completed');
    if (featured) applyTrackBackground(document.getElementById('wyniki-hero'), featured.track);

    document.getElementById('wyniki-featured').innerHTML = renderFeaturedRound(featured, { season: activeSeason, tier: activeTier }, { pastLabel: 'Najnowszy wyścig' });
    document.getElementById('wyniki-progress').innerHTML = renderSeasonProgress(rounds);

    const gridRounds = featured ? rounds.filter(r => r !== featured) : rounds;
    el.innerHTML = renderCalendarRounds(gridRounds, { season: activeSeason, tier: activeTier });
    observeReveal();
  };

  renderSeasonTabs(allSeasons, activeSeason, (name) => {
    activeSeason = name;
    rerender();
  });
  renderTierTabs(activeTier, (tier) => {
    activeTier = tier;
    rerender();
  });

  rerender();
  setInterval(rerender, 60 * 1000);
}

/* ─── WYNIK WYDARZENIA (event results, driven by the calendar) ──────
   URL: wynik-wydarzenia.html?season=Sezon%201&tier=Tier%201&round=1
   Shows sub-tabs for whichever sessions exist for that round: Kwalifikacje
   Sprintu, Sprint, Kwalifikacje, Wyścig — only the ones that have data. */
function trackImageSlug(trackName) {
  return (trackName || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Sets a track photo as the page-hero background if assets/tracks/{slug}.jpg
 *  exists — checked by actually trying to load it, so a missing file just
 *  silently leaves the existing plain hero look untouched. */
function applyTrackBackground(heroEl, trackName) {
  const slug = trackImageSlug(trackName);
  if (!slug || !heroEl) return;
  const url = `assets/tracks/${slug}.jpg`;
  const test = new Image();
  test.onload = () => {
    // Set as one inline background-image (gradients + photo together) rather
    // than via a CSS custom property — a relative url() inside a custom
    // property is resolved against the STYLESHEET's location (css/), not the
    // page, so it would silently 404 and never show anything.
    heroEl.style.backgroundImage =
      `linear-gradient(180deg, rgba(10,11,13,.6) 0%, rgba(10,11,13,.92) 75%, var(--black) 100%), ` +
      `radial-gradient(ellipse 70% 100% at 50% 100%, rgba(225,6,0,0.12) 0%, transparent 70%), ` +
      `url("${url}")`;
    heroEl.classList.add('has-track-bg');
  };
  test.src = url;
}

/** Same idea as applyTrackBackground(), for the homepage hero specifically.
 *  A separate function (not a shared one) because the homepage hero carries
 *  much more foreground content — logo, stats row, buttons — so it needs a
 *  stronger dark fade, and it layers the existing grid-pattern texture into
 *  the same background-image stack as the photo instead of dropping it. */
function applyHeroTrackBackground(heroEl, trackName) {
  const slug = trackImageSlug(trackName);
  if (!slug || !heroEl) return;
  const url = `assets/tracks/${slug}.jpg`;
  const test = new Image();
  test.onload = () => {
    heroEl.style.backgroundImage =
      `linear-gradient(180deg, rgba(10,11,13,.55) 0%, rgba(10,11,13,.82) 55%, var(--black) 100%), ` +
      `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(225,6,0,0.18) 0%, transparent 70%), ` +
      `repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.03) 80px), ` +
      `repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.03) 80px), ` +
      `url("${url}")`;
    heroEl.classList.add('has-track-bg');
  };
  test.src = url;
}

async function initWynikWydarzenia() {
  const params = new URLSearchParams(location.search);
  const season = params.get('season');
  const tier = params.get('tier');
  const round = parseInt(params.get('round'), 10);

  const titleEl = document.getElementById('event-title');
  const subEl = document.getElementById('event-sub');
  const tabsEl = document.getElementById('session-tabs');
  const contentEl = document.getElementById('session-content');

  if (!season || !tier || !round) {
    titleEl.textContent = 'Nie znaleziono wydarzenia';
    contentEl.innerHTML = '<p style="color:var(--gray);padding:2rem 0">Brak danych do wyświetlenia.</p>';
    return;
  }

  const [allCalendars, allSeasons, { driverIndex }] = await Promise.all([loadAllCalendars(), loadAllRaces(), loadSklad(tier)]);
  const rounds = calendarForTier(allCalendars, season, tier);
  const roundInfo = rounds.find(r => r.round === round);
  const sessions = racesForTier(allSeasons, season, tier).filter(r => r.round === round);

  const flag = roundInfo ? trackFlag(roundInfo.country || roundInfo.track) : (sessions[0]?.flag || '');
  const trackName = roundInfo?.track || sessions[0]?.track || 'Nieznany tor';
  const dateStr = roundInfo?.date || sessions[0]?.date || '';

  titleEl.innerHTML = `${flag ? flag + ' ' : ''}${trackName} Grand Prix`;
  subEl.textContent = `Runda ${round} · ${season} · ${tier}` + (dateStr ? ` · ${fmtDate(dateStr)}` : '');
  document.title = `${trackName} — Wyniki — Polaris Racing League`;
  applyTrackBackground(document.getElementById('event-hero'), trackName);

  if (!sessions.length) {
    tabsEl.innerHTML = '';
    contentEl.innerHTML = '<p style="color:var(--gray);padding:2rem 0">Brak jeszcze wyników dla tego wydarzenia.</p>';
    observeReveal();
    return;
  }

  const byType = {};
  sessions.forEach(s => { byType[s.sessionType] = s; });
  const availableTypes = SESSION_TYPE_ORDER.filter(t => byType[t]);
  let activeType = byType['Race'] ? 'Race' : availableTypes[0];

  const rerenderContent = () => {
    contentEl.innerHTML = renderSessionResults(byType[activeType], driverIndex);
    observeReveal();
  };

  tabsEl.innerHTML = availableTypes.map(t =>
    `<button class="tier-tab ${t === activeType ? 'active' : ''}" data-type="${t}">${SESSION_TYPE_LABELS[t]}</button>`
  ).join('');
  tabsEl.querySelectorAll('.tier-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeType = btn.dataset.type;
      tabsEl.querySelectorAll('.tier-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      rerenderContent();
    });
  });

  rerenderContent();
}

const TYRE_COMPOUNDS = {
  'Soft':         { letter: 'S', bg: '#e10600', fg: '#ffffff' },
  'Medium':       { letter: 'M', bg: '#f4c430', fg: '#0a0b0d' },
  'Hard':         { letter: 'H', bg: '#f5f4f1', fg: '#0a0b0d' },
  'Intermediate': { letter: 'I', bg: '#43b34a', fg: '#ffffff' },
  'Wet':          { letter: 'W', bg: '#1e88f0', fg: '#ffffff' },
};
function tyreCompoundMeta(compound) {
  const key = Object.keys(TYRE_COMPOUNDS).find(k => k.toLowerCase() === (compound || '').toLowerCase());
  return key ? TYRE_COMPOUNDS[key] : null;
}
function tyrePill(compound) {
  if (!compound) return '';
  const meta = tyreCompoundMeta(compound);
  if (!meta) return `<span class="tyre-pill tyre-pill-fallback" title="${compound}">?</span>`;
  return `<span class="tyre-pill" style="background:${meta.bg};color:${meta.fg}" title="${compound}">${meta.letter}</span>`;
}
function tyreStrategyCell(stints) {
  if (!stints || !stints.length) return '<span class="gap-text">—</span>';
  return `<span class="tyre-strategy">${stints.map(s => tyrePill(s.compound) + (s.laps ? `<span class="tyre-laps">${s.laps}</span>` : '')).join('<span class="tyre-arrow">→</span>')}</span>`;
}

/* ─── DRIVER HOVER POPOVER (results table) ─────────
   Hovering a results-table row pops up an enlarged stat card for that
   driver — position, points/status, gap, and (if the session recorded one)
   their fastest lap, highlighted. A single popover element is created once
   and reused for every row; the row's own stats travel with it as a small
   JSON blob in a data-driver attribute, so no separate lookup table is
   needed and the popover works for any table.results row on any page. */
function attrJson(obj) {
  return JSON.stringify(obj).replace(/&/g, '&amp;').replace(/'/g, '&#39;');
}

function driverPopoverData(d, showPoints, driverIndex) {
  return {
    driver: d.driver,
    realName: d.realName,
    team: d.teamFull || d.team,
    teamColor: d.teamColor,
    number: driverIndex?.[d.driver]?.number ?? null,
    pos: d.pos,
    points: d.points,
    showPoints: !!showPoints,
    gap: d.gap,
    status: d.status,
    fastestLapTime: d.fastestLapTime,
    fastestLapTyre: d.fastestLapTyre,
    penaltySeconds: d.penaltySeconds,
    penaltyReason: d.penaltyReason,
  };
}

function renderDriverPopoverContent(d) {
  const avatar = driverAvatar(d.team);
  return `
    <div class="driver-popover-head">
      <span class="driver-popover-avatar-wrap">${avatar ? `<img class="driver-popover-avatar" src="${avatar}" alt="" onerror="this.remove()">` : ''}</span>
      <span class="driver-popover-dot" style="background:${hexColor(d.teamColor)}"></span>
      <div>
        <div class="driver-popover-name">${d.number !== null && d.number !== undefined ? `<span class="driver-number driver-popover-number">${d.number}</span>` : ''}${d.driver}</div>
        <div class="driver-popover-team">${d.realName ? d.realName + ' · ' : ''}${d.team}</div>
      </div>
    </div>
    <div class="driver-popover-stats">
      <div class="driver-popover-stat">
        <span class="driver-popover-stat-label">Pozycja</span>
        <span class="pos-badge ${posRankClass(d.pos)} driver-popover-pos">${d.pos}</span>
      </div>
      <div class="driver-popover-stat">
        <span class="driver-popover-stat-label">Strata</span>
        <span class="driver-popover-stat-val small">${d.gap}</span>
      </div>
      <div class="driver-popover-stat">
        <span class="driver-popover-stat-label">${d.showPoints ? 'Punkty' : 'Status'}</span>
        <span class="driver-popover-stat-val ${d.showPoints ? '' : 'small'}">${d.showPoints ? d.points : d.status}</span>
      </div>
    </div>
    ${d.fastestLapTime ? `
      <div class="driver-popover-fastest">
        ${icon('bolt', 'icon-red')}
        <div class="driver-popover-fastest-info">
          <span class="driver-popover-fastest-label">Najszybsze okrążenie</span>
          <span class="driver-popover-fastest-time">${d.fastestLapTime}</span>
        </div>
        ${tyrePill(d.fastestLapTyre)}
      </div>
    ` : ''}
    ${d.penaltySeconds > 0 ? `<div class="driver-popover-penalty">${icon('chevronDown')}Kara: +${d.penaltySeconds}s${d.penaltyReason ? ' — ' + d.penaltyReason : ''}</div>` : ''}
  `;
}

let driverPopoverEl = null;
function getDriverPopover() {
  if (!driverPopoverEl) {
    driverPopoverEl = document.createElement('div');
    driverPopoverEl.className = 'driver-popover';
    document.body.appendChild(driverPopoverEl);
  }
  return driverPopoverEl;
}

function positionDriverPopover(pop, tr) {
  const rect = tr.getBoundingClientRect();
  const popRect = pop.getBoundingClientRect();
  const margin = 12;
  let top = rect.top + rect.height / 2 - popRect.height / 2;
  top = Math.max(margin, Math.min(top, window.innerHeight - popRect.height - margin));
  let left = rect.right + margin;
  if (left + popRect.width > window.innerWidth - margin) left = rect.left - popRect.width - margin;
  if (left < margin) left = margin; // narrow viewport fallback — clamp rather than run off-screen
  pop.style.top = `${top}px`;
  pop.style.left = `${left}px`;
}

function showDriverPopover(tr) {
  let d;
  try { d = JSON.parse(tr.dataset.driver); } catch { return; }
  const pop = getDriverPopover();
  pop.innerHTML = renderDriverPopoverContent(d);
  positionDriverPopover(pop, tr); // measure/place before revealing so it never flashes at the wrong spot
  pop.classList.add('visible');
}

function hideDriverPopover() {
  if (driverPopoverEl) driverPopoverEl.classList.remove('visible');
}

function initDriverPopovers() {
  document.addEventListener('mouseover', (e) => {
    const tr = e.target.closest('table.results tbody tr');
    if (!tr || !tr.dataset.driver) return;
    showDriverPopover(tr);
  });
  document.addEventListener('mouseout', (e) => {
    const tr = e.target.closest('table.results tbody tr');
    if (!tr || tr.contains(e.relatedTarget)) return;
    hideDriverPopover();
  });
  window.addEventListener('scroll', hideDriverPopover, true);
}
initDriverPopovers();

function renderSessionResults(session, driverIndex) {
  if (!session) return '<p style="color:var(--gray);padding:2rem 0">Brak danych do wyświetlenia.</p>';
  const showPoints = session.sessionType === 'Race' || session.sessionType === 'Sprint';
  const showStrategy = session.raceResults.some(d => d.stints && d.stints.length);
  const showFastestLap = session.raceResults.some(d => d.fastestLapTime);
  const dotdDriver = session.driverOfTheDay?.driver || null;
  const posClass = ['p1','p2','p3'];
  const top3 = showPoints ? session.raceResults.slice(0, 3) : [];
  const fastestLapEntry = session.fastestLap ? session.raceResults.find(d => d.driver === session.fastestLap.driver) : null;
  const fastestLapAvatar = fastestLapEntry ? driverAvatar(fastestLapEntry.teamFull || fastestLapEntry.team) : null;
  const dotdEntry = dotdDriver ? session.raceResults.find(d => d.driver === dotdDriver) : null;
  const dotdAvatar = dotdEntry ? driverAvatar(dotdEntry.teamFull || dotdEntry.team) : null;
  return `
    <div class="race-chips reveal" style="margin:0 0 1.5rem">
      <span class="race-chip">${icon('calendar','icon-lg')}${fmtDate(session.date)}</span>
      <span class="race-chip">${icon('laps','icon-lg')}${session.totalLaps || 0} okrążeń</span>
      <span class="race-chip"><span class="icon icon-flag">${session.flag}</span>${session.track}</span>
      ${session.turns ? `<span class="race-chip">${icon('turns','icon-lg')}${session.turns} zakrętów</span>` : ''}
      ${session.fastestLap ? `<span class="race-chip race-chip-fastest">${icon('bolt','icon-red icon-lg')}Najszybsze okrążenie: ${fastestLapAvatar ? `<img class="chip-avatar" src="${fastestLapAvatar}" alt="" onerror="this.remove()">` : ''}<strong>${session.fastestLap.driver}</strong> — ${session.fastestLap.time} ${tyrePill(session.fastestLap.tyre)}</span>` : ''}
      ${dotdDriver ? `<span class="race-chip race-chip-dotd" title="${escHtml(session.driverOfTheDay.reason)}">${icon('star','icon-gold icon-lg')}Kierowca dnia: ${dotdAvatar ? `<img class="chip-avatar" src="${dotdAvatar}" alt="" onerror="this.remove()">` : ''}<strong>${dotdDriver}</strong></span>` : ''}
    </div>
    ${top3.length ? `
      <div class="podium-row podium-row-event reveal">
        ${(top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3).map((d) => {
          const rank = d.pos;
          const isFirst = rank === 1;
          const num = driverIndex?.[d.driver]?.number;
          return `
          <div class="podium-item ${isFirst ? 'podium-item-first' : ''}">
            <span class="podium-pos ${posClass[rank - 1] || ''}">${rank}</span>
            ${driverAvatar(d.teamFull || d.team) ? `<img class="podium-avatar" src="${driverAvatar(d.teamFull || d.team)}" alt="" onerror="this.style.display='none'">` : ''}
            <div>
              <div class="podium-driver">${num !== null && num !== undefined ? `<span class="driver-number">${num}</span>` : ''}${d.driver}</div>
              <div class="podium-team">${renderTeamBadge(d.teamFull || d.team)}</div>
            </div>
            <span class="podium-pts">${d.points} pkt</span>
          </div>
        `;
        }).join('')}
      </div>
    ` : ''}
    <div class="table-wrap reveal">
      <table class="results">
        <thead>
          <tr>
            <th>#</th>
            <th>Kierowca</th>
            <th>Zespół</th>
            <th class="right">Strata</th>
            <th class="right">Status</th>
            ${showStrategy ? '<th>Opony</th>' : ''}
            ${showFastestLap ? '<th class="right">Najsz. okr.</th>' : ''}
            ${showPoints ? '<th class="right">Pkt</th>' : ''}
          </tr>
        </thead>
        <tbody>
          ${session.raceResults.map(d => {
            const isDotd = d.driver === dotdDriver;
            const isFastest = !!(session.fastestLap && d.driver === session.fastestLap.driver);
            const leadingBadges = [
              isDotd ? `<span class="dotd-badge icon-gold" title="Kierowca dnia${session.driverOfTheDay.reason ? ': ' + escHtml(session.driverOfTheDay.reason) : ''}">${icon('star')}</span>` : '',
              isFastest ? `<span class="fastest-badge icon-red" title="Najszybsze okrążenie sesji: ${session.fastestLap.time}">${icon('bolt')}</span>` : '',
            ].join('');
            const rowClass = [isDotd ? 'row-dotd' : '', isFastest ? 'row-fastest' : ''].filter(Boolean).join(' ');
            return `
            <tr class="${rowClass}" data-driver='${attrJson(driverPopoverData(d, showPoints, driverIndex))}'>
              <td>${posBadge(d.pos)}</td>
              <td>${renderDriverCell(d, leadingBadges, driverIndex)}</td>
              <td>${renderTeamBadge(d.teamFull || d.team)}</td>
              <td class="right"><span class="gap-text">${d.gap}</span></td>
              <td class="right"><span class="status-fin">${d.status}</span></td>
              ${showStrategy ? `<td>${tyreStrategyCell(d.stints)}</td>` : ''}
              ${showFastestLap ? `<td class="right">${d.fastestLapTime ? `<span class="gap-text">${d.fastestLapTime}</span> ${tyrePill(d.fastestLapTyre)}` : '<span class="gap-text">—</span>'}</td>` : ''}
              ${showPoints ? `<td class="right"><span class="points-val">${d.points}</span></td>` : ''}
            </tr>
          `;
          }).join('')}
        </tbody>
      </table>
    </div>
    ${session.bestManeuver ? `
      <div class="section-header reveal" style="margin-top:2.5rem">
        <span class="section-label">Wyróżnienie wyścigu</span>
        <h2 class="section-title">Najlepszy manewr</h2>
        <div class="section-divider"></div>
      </div>
      ${renderClip(session.bestManeuver, 'large', { ribbon: { label: 'Najlepszy manewr wyścigu', tone: 'red' }, driverIndex })}
    ` : ''}
  `;
}

function renderStandingsSummary(standings, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (standings.length < 2) { el.innerHTML = ''; return; }
  const leader = standings[0];
  const gap = leader.points - standings[1].points;
  const mostWins = standings.slice().sort((a, b) => b.wins - a.wins)[0];
  const mostPodiums = standings.slice().sort((a, b) => b.podiums - a.podiums)[0];
  const chip = (row) => {
    const avatar = driverAvatar(row.team);
    return avatar ? `<img class="chip-avatar" src="${avatar}" alt="" onerror="this.remove()">` : '';
  };
  el.innerHTML = `
    <div class="stats-strip reveal">
      <div class="stat-tile"><span class="stat-tile-label">Lider</span><span class="stat-tile-value">${leader.points}<small> pkt</small></span><span class="stat-tile-sub">${chip(leader)}${leader.driver}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">Przewaga nad P2</span><span class="stat-tile-value accent">+${gap}<small> pkt</small></span><span class="stat-tile-sub">nad ${chip(standings[1])}${standings[1].driver}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">Najwięcej zwycięstw</span><span class="stat-tile-value">${mostWins.wins}<small> wygr.</small></span><span class="stat-tile-sub">${chip(mostWins)}${mostWins.driver}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">Najwięcej podiów</span><span class="stat-tile-value">${mostPodiums.podiums}<small> podiów</small></span><span class="stat-tile-sub">${chip(mostPodiums)}${mostPodiums.driver}</span></div>
    </div>`;
}

/* ─── KLASYFIKACJA PAGE ──────────────────────────── */
async function initKlasyfikacja() {
  const allSeasons = await loadAllRaces();
  const seasonNames = Object.keys(allSeasons);

  if (!seasonNames.length) {
    document.getElementById('standings-full').innerHTML =
      '<p style="color:var(--gray);padding:2rem 0">Brak danych.</p>';
    return;
  }

  let activeSeason = seasonNames[seasonNames.length - 1];
  let activeTier = DEFAULT_TIER;

  const rerender = async () => {
    const standings = computeDriverStandings(racesForTier(allSeasons, activeSeason, activeTier));
    const { driverIndex } = await loadSklad(activeTier);
    renderStandingsSummary(standings, 'standings-summary');
    renderStandingsTable(standings, 'standings-full', driverIndex);
  };

  renderSeasonTabs(allSeasons, activeSeason, (name) => {
    activeSeason = name;
    rerender();
  });
  renderTierTabs(activeTier, (tier) => {
    activeTier = tier;
    rerender();
  });

  rerender();
}

function renderConstructorsSummary(constructors, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (constructors.length < 2) { el.innerHTML = ''; return; }
  const leader = constructors[0];
  const gap = leader.points - constructors[1].points;
  const mostWins = constructors.slice().sort((a, b) => b.wins - a.wins)[0];
  const mostPodiums = constructors.slice().sort((a, b) => b.podiums - a.podiums)[0];
  el.innerHTML = `
    <div class="stats-strip reveal">
      <div class="stat-tile"><span class="stat-tile-label">Lider</span><span class="stat-tile-value">${leader.points}<small> pkt</small></span><span class="stat-tile-sub">${leader.team}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">Przewaga nad P2</span><span class="stat-tile-value accent">+${gap}<small> pkt</small></span><span class="stat-tile-sub">nad ${constructors[1].team}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">Najwięcej zwycięstw</span><span class="stat-tile-value">${mostWins.wins}<small> wygr.</small></span><span class="stat-tile-sub">${mostWins.team}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">Najwięcej podiów</span><span class="stat-tile-value">${mostPodiums.podiums}<small> podiów</small></span><span class="stat-tile-sub">${mostPodiums.team}</span></div>
    </div>`;
}

/* ─── KONSTRUKTORZY PAGE ─────────────────────────── */
async function initKonstruktorzy() {
  const allSeasons = await loadAllRaces();
  const seasonNames = Object.keys(allSeasons);

  if (!seasonNames.length) {
    document.getElementById('constructors-full').innerHTML =
      '<p style="color:var(--gray);padding:2rem 0">Brak danych.</p>';
    return;
  }

  let activeSeason = seasonNames[seasonNames.length - 1];
  let activeTier = DEFAULT_TIER;

  const rerender = async () => {
    const { rosterMap: roster } = await loadSklad(activeTier);
    const constructors = computeConstructorStandings(racesForTier(allSeasons, activeSeason, activeTier), roster);
    renderConstructorsSummary(constructors, 'constructors-summary');
    renderConstructorsTable(constructors, 'constructors-full');
  };

  renderSeasonTabs(allSeasons, activeSeason, (name) => {
    activeSeason = name;
    rerender();
  });
  renderTierTabs(activeTier, (tier) => {
    activeTier = tier;
    rerender();
  });

  rerender();
}

/* ─── KALENDARZ LOADER ───────────────────────────── */
async function loadCalendarFor(folder, tier) {
  let fileList = await listGithubDir(`${folder}/${tier}`);
  if (!fileList) {
    const manifest = await tryFetch(`${folder}/${tier}/manifest.json`);
    if (!manifest) return [];
    fileList = manifest.files || [];
  }

  const rounds = [];

  for (const file of fileList) {
    const json = await tryFetch(`${folder}/${tier}/${file}`);
    if (json?.rounds) {
      rounds.push(...json.rounds);
    }
  }

  rounds.sort((a, b) => a.round - b.round);
  return rounds;
}

async function loadAllCalendars() {
  const allSeasons = {};

  for (const season of CALENDAR_SEASONS_CONFIG) {
    const tiersData = {};
    for (const tier of TIERS) {
      const rounds = await loadCalendarFor(season.folder, tier);
      if (rounds.length > 0) tiersData[tier] = rounds;
    }
    if (Object.keys(tiersData).length > 0) {
      allSeasons[season.name] = tiersData;
    }
  }

  return allSeasons;
}

/* Pick calendar rounds for a given season+tier. No fallback — same reasoning as racesForTier. */
function calendarForTier(allSeasons, seasonName, tier) {
  const tiers = allSeasons[seasonName] || {};
  return tiers[tier] || [];
}

function statusLabel(s) {
  if (s === 'completed') return { label: 'Zakończony', cls: 'done' };
  if (s === 'cancelled') return { label: 'Odwołany', cls: 'cancelled' };
  if (s === 'live') return { label: 'W trakcie', cls: 'live' };
  return { label: 'Nadchodzący', cls: 'upcoming' };
}

/* Parse a "YYYY-MM-DD" + "HH:MM" pair into a Date, or null if invalid/missing */
function parseRoundDateTime(date, time) {
  if (!date || !time) return null;
  const d = new Date(`${date}T${time}`);
  return isNaN(d.getTime()) ? null : d;
}

/* Automatically compute a round's live status from the current date/time:
   - "cancelled" is always a manual override and takes priority
   - "upcoming" until the first session of the weekend starts (sprint, if earlier than the race)
   - "live" from that first session start until 1 hour after the race start
   - "completed" after that */
function computeRoundStatus(r) {
  if (r.status === 'cancelled') return 'cancelled';

  const raceStart = parseRoundDateTime(r.date, r.time);
  if (!raceStart) return r.status || 'upcoming'; // no reliable date/time — fall back to manual value

  const raceEnd = new Date(raceStart.getTime() + 60 * 60 * 1000); // race counts as "live" for 1h

  let firstSessionStart = raceStart;
  if (r.hasSprint && r.sprintTime) {
    const sprintStart = parseRoundDateTime(r.sprintDate || r.date, r.sprintTime);
    if (sprintStart && sprintStart < firstSessionStart) firstSessionStart = sprintStart;
  }

  const now = new Date();
  if (now < firstSessionStart) return 'upcoming';
  if (now < raceEnd) return 'live';
  return 'completed';
}

function fmtDateTime(date, time) {
  const label = fmtDate(date);
  return time ? `${label}, ${time}` : label;
}

function renderCalendarRounds(rounds, linkCtx) {
  if (!rounds.length) {
    return '<p style="color:var(--gray);padding:2rem 0">Brak danych do wyświetlenia.</p>';
  }
  return `
    <div class="calendar-grid reveal">
      ${rounds.map(r => {
        const { label, cls } = statusLabel(r.status);
        const flag = trackFlag(r.country || r.track);
        const hasSprint = !!(r.hasSprint && r.sprintTime);
        const badge = r.status === 'live'
          ? '<span class="cal-live-badge"><span class="live-dot"></span>Na żywo</span>'
          : (r._isNext ? '<span class="cal-next-badge">Następny</span>' : '');
        const thumbSlug = trackImageSlug(r.track);
        const thumb = thumbSlug
          ? `<div class="cal-card-thumb"><img src="assets/tracks/${thumbSlug}.jpg" alt="" loading="lazy" onerror="this.parentElement.remove()"></div>`
          : '';
        const cardInner = `
            ${thumb}
            <div class="cal-card-top">
              <span class="cal-flag">${flag}</span>
              <div>
                <div class="cal-round">Runda ${r.round}</div>
                <div class="cal-name">${r.track} Grand Prix</div>
              </div>
              ${badge}
            </div>
            <div class="cal-card-body">
              <div class="cal-body-row">
                <span class="cal-date">${icon('calendar')}${fmtDateTime(r.date, r.time)}</span>
                <span class="cal-status ${cls}">${label}</span>
              </div>
              ${hasSprint ? `
                <div class="cal-body-row cal-sprint-row">
                  <span class="cal-sprint-badge">${icon('bolt')}Sprint</span>
                  <span class="cal-date">${fmtDateTime(r.sprintDate || r.date, r.sprintTime)}</span>
                </div>
              ` : ''}
            </div>`;
        const cardClass = `cal-card ${r.status === 'completed' ? 'completed' : ''} ${r.status === 'cancelled' ? 'cancelled' : ''} ${r.status === 'live' ? 'live' : ''}`;

        if (linkCtx) {
          const href = `wynik-wydarzenia.html?season=${encodeURIComponent(linkCtx.season)}&tier=${encodeURIComponent(linkCtx.tier)}&round=${r.round}`;
          return `<a class="${cardClass}" href="${href}">${cardInner}</a>`;
        }
        return `<div class="${cardClass}">${cardInner}</div>`;
      }).join('')}
    </div>`;
}

/* Recompute each round's live status, then mark only the first still-upcoming
   round as "Następny" (a "live" round is shown as "Na żywo" instead) */
function markNextRound(rounds) {
  for (const r of rounds) {
    r.status = computeRoundStatus(r);
    r._isNext = false;
  }
  const next = rounds.find(r => r.status === 'upcoming');
  if (next) next._isNext = true;
}

function daysUntilLabel(date, time) {
  const start = parseRoundDateTime(date, time);
  if (!start) return '';
  const diffMs = start.getTime() - Date.now();
  if (diffMs <= 0) return '';
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Dziś';
  if (days === 1) return 'Za 1 dzień';
  return `Za ${days} dni`;
}

function renderFeaturedRound(r, linkCtx, opts) {
  if (!r) return '';
  opts = opts || {};
  const isLive = r.status === 'live';
  const isCompleted = r.status === 'completed';
  const slug = trackImageSlug(r.track);
  const photo = slug
    ? `<div class="cal-featured-photo"><img src="assets/tracks/${slug}.jpg" alt="" onerror="this.parentElement.remove()"></div>`
    : '';
  const flag = trackFlag(r.country || r.track);
  const hasSprint = !!(r.hasSprint && r.sprintTime);
  const days = daysUntilLabel(r.date, r.time); // for a completed round this is already '' — past date
  const href = `wynik-wydarzenia.html?season=${encodeURIComponent(linkCtx.season)}&tier=${encodeURIComponent(linkCtx.tier)}&round=${r.round}`;
  const eyebrow = isLive
    ? icon('bolt') + 'Na żywo teraz'
    : isCompleted
      ? icon('flag') + (opts.pastLabel || 'Ostatnia runda')
      : icon('calendar') + 'Następna runda';
  return `
    <div class="cal-featured reveal">
      <a class="cal-featured-card" href="${href}">
        ${photo}
        <div class="cal-featured-info">
          <span class="cal-featured-eyebrow ${isLive ? 'is-live' : ''}">${eyebrow}</span>
          <div class="cal-featured-title"><span class="icon icon-flag">${flag}</span>${r.track} Grand Prix</div>
          <div class="cal-featured-meta">
            <span class="cal-featured-meta-item">${icon('flag')}Runda ${r.round}</span>
            <span class="cal-featured-meta-item">${icon('calendar')}${fmtDateTime(r.date, r.time)}</span>
            ${hasSprint ? `<span class="cal-featured-meta-item">${icon('bolt')}Sprint: ${fmtDateTime(r.sprintDate || r.date, r.sprintTime)}</span>` : ''}
          </div>
          ${!isLive && days ? `<span class="cal-featured-countdown">${days}</span>` : ''}
        </div>
      </a>
    </div>`;
}

function renderSeasonProgress(rounds) {
  if (!rounds.length) return '';
  const doneCount = rounds.filter(r => r.status === 'completed').length;
  return `
    <div class="cal-progress reveal">
      ${rounds.map(r => {
        const cls = r.status === 'completed' ? 'done' : r.status === 'live' ? 'live' : r.status === 'cancelled' ? 'cancelled' : 'upcoming';
        return `<span class="cal-progress-dot ${cls}" title="Runda ${r.round} · ${r.track}"></span>`;
      }).join('')}
      <span class="cal-progress-label">${doneCount}/${rounds.length} rund</span>
    </div>`;
}

/* ─── KALENDARZ PAGE ─────────────────────────────── */
async function initKalendarz() {
  const el = document.getElementById('calendar-full');
  if (!el) return;

  const allSeasons = await loadAllCalendars();
  const seasonNames = Object.keys(allSeasons);

  if (!seasonNames.length) {
    el.innerHTML = '<p style="color:var(--gray);padding:2rem 0">Brak danych do wyświetlenia.</p>';
    return;
  }

  let activeSeason = seasonNames[0];
  let activeTier = DEFAULT_TIER;

  const rerender = () => {
    const rounds = calendarForTier(allSeasons, activeSeason, activeTier);
    markNextRound(rounds);

    const heroEl = document.getElementById('calendar-hero');
    const featured = rounds.find(r => r.status === 'live') || rounds.find(r => r._isNext);
    const heroTrack = featured
      ? featured.track
      : rounds.slice().reverse().find(r => r.status === 'completed')?.track;
    if (heroTrack) applyTrackBackground(heroEl, heroTrack);

    document.getElementById('calendar-featured').innerHTML = renderFeaturedRound(featured, { season: activeSeason, tier: activeTier });
    document.getElementById('calendar-progress').innerHTML = renderSeasonProgress(rounds);

    const gridRounds = featured ? rounds.filter(r => r !== featured) : rounds;
    el.innerHTML = renderCalendarRounds(gridRounds, { season: activeSeason, tier: activeTier });
    observeReveal();
  };

  renderSeasonTabs(allSeasons, activeSeason, (name) => {
    activeSeason = name;
    rerender();
  });
  renderTierTabs(activeTier, (tier) => {
    activeTier = tier;
    rerender();
  });

  rerender();

  // Refresh statuses periodically so "Nadchodzący → Na żywo → Zakończony"
  // updates automatically for anyone who leaves the page open
  setInterval(rerender, 60 * 1000);
}

/* ─── WDC PAGE ───────────────────────────────────── */
async function initWDC() {
  const el = document.getElementById('wdc-list');
  if (!el) return;

  let activeTier = DEFAULT_TIER;

  const rerender = async () => {
    const data = await tryFetch(`Mistrzowie swiata/${activeTier}/mistrzowie.json`);

    if (!data || !data.champions || !data.champions.length) {
      el.innerHTML = '<p style="color:var(--gray);padding:2rem 0">Brak danych do wyświetlenia.</p>';
      return;
    }

    // Sort by season descending (latest first)
    const champions = [...data.champions].reverse();

    el.innerHTML = `
      <div class="wdc-hero-wrap">
        ${champions.length > 0 ? renderWDCHero(champions[0]) : ''}
      </div>
      <div class="wdc-grid">
        ${champions.map((c, i) => renderWDCCard(c, i)).join('')}
      </div>
    `;
    observeReveal();
    observeCounters();
  };

  renderTierTabs(activeTier, (tier) => {
    activeTier = tier;
    rerender();
  });

  rerender();
}

function renderWDCHero(c) {
  const avatar = driverAvatar(c.team);
  return `
    <div class="wdc-hero reveal">
      <div class="wdc-hero-avatar-wrap">
        ${avatar ? `<img class="wdc-hero-avatar" src="${avatar}" alt="" onerror="this.style.display='none'">` : ''}
        <span class="wdc-hero-avatar-badge">${icon('crown','icon-lg icon-gold')}</span>
      </div>
      <div class="wdc-hero-label">Aktualny Mistrz Świata</div>
      <div class="wdc-hero-driver">${c.driver}</div>
      <div class="wdc-hero-season">${c.season} · ${renderTeamBadge(c.team)}</div>
      <div class="wdc-hero-stats">
        <div class="wdc-hero-stat">
          <div class="wdc-hero-stat-num" data-count="${c.points}">0</div>
          <div class="wdc-hero-stat-label">Punkty</div>
        </div>
        <div class="wdc-hero-stat">
          <div class="wdc-hero-stat-num" data-count="${c.wins}">0</div>
          <div class="wdc-hero-stat-label">Zwycięstwa</div>
        </div>
        <div class="wdc-hero-stat">
          <div class="wdc-hero-stat-num" data-count="${c.podiums}">0</div>
          <div class="wdc-hero-stat-label">Podium</div>
        </div>
        <div class="wdc-hero-stat">
          <div class="wdc-hero-stat-num" data-count="${c.polePositions}">0</div>
          <div class="wdc-hero-stat-label">Pole Position</div>
        </div>
      </div>
    </div>
  `;
}

function renderWDCCard(c, i) {
  const isLatest = i === 0;
  const avatar = driverAvatar(c.team);
  return `
    <div class="wdc-card reveal ${isLatest ? 'wdc-card-latest' : ''}">
      <div class="wdc-card-top">
        <div class="wdc-card-avatar-wrap">
          ${avatar ? `<img class="wdc-card-avatar" src="${avatar}" alt="" onerror="this.style.display='none'">` : `<div class="wdc-card-crown icon-gold">${icon(isLatest ? 'crown' : 'trophy', 'icon-lg')}</div>`}
          ${avatar ? `<span class="wdc-card-avatar-badge icon-gold">${icon(isLatest ? 'crown' : 'trophy')}</span>` : ''}
        </div>
        <div>
          <div class="wdc-card-season">${c.season}</div>
          <div class="wdc-card-driver">${c.driver}</div>
          <div class="wdc-card-team">${renderTeamBadge(c.team)}</div>
        </div>
        <div class="wdc-card-pts">${c.points}<span>pkt</span></div>
      </div>
      <div class="wdc-card-stats">
        <div class="wdc-stat-item">
          <span class="wdc-stat-icon icon-gold">${icon('trophy')}</span>
          <span class="wdc-stat-val">${c.wins}</span>
          <span class="wdc-stat-lbl">Zwycięstwa</span>
        </div>
        <div class="wdc-stat-item">
          <span class="wdc-stat-icon icon-gold">${icon('medal')}</span>
          <span class="wdc-stat-val">${c.podiums}</span>
          <span class="wdc-stat-lbl">Podium</span>
        </div>
        <div class="wdc-stat-item">
          <span class="wdc-stat-icon icon-gold">${icon('bolt')}</span>
          <span class="wdc-stat-val">${c.polePositions}</span>
          <span class="wdc-stat-lbl">Pole</span>
        </div>
      </div>
    </div>
  `;
}

/* ─── HALL OF FAME ───────────────────────────────── */

/** Extracts a YouTube video ID from common URL shapes, or null if not YouTube. */
function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/watch\?v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

/** Best available thumbnail for a clip: YouTube's own thumbnail, an admin-provided
 *  thumbnailUrl for other platforms, or null (renders a plain placeholder instead). */
function clipThumbnail(clip) {
  const ytId = extractYouTubeId(clip.url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return clip.thumbnailUrl || null;
}

const CLIP_HOSTS = [
  { re: /medal\.tv/,               slug: 'medal',      label: 'Medal.tv' },
  { re: /youtube\.com|youtu\.be/,  slug: 'youtube',     label: 'YouTube' },
  { re: /streamable\.com/,         slug: 'streamable',  label: 'Streamable' },
  { re: /clips\.twitch\.tv|twitch\.tv/, slug: 'twitch',  label: 'Twitch' },
  { re: /twitter\.com|x\.com/,     slug: 'x',           label: 'X / Twitter' },
];
function clipHostMeta(url) {
  if (!url) return { slug: 'link', label: 'Link' };
  for (const h of CLIP_HOSTS) { if (h.re.test(url)) return { slug: h.slug, label: h.label }; }
  try { return { slug: 'link', label: new URL(url).hostname.replace('www.', '') }; } catch { return { slug: 'link', label: 'Link' }; }
}
function clipHostLabel(url) { return clipHostMeta(url).label; }

/** "Hełm + kierowca" na kartach Hall of Fame — podmienia ikonę hełmu na awatar
 *  drużynowy, jeśli kierowca jest w aktualnym składzie; w przeciwnym razie
 *  (np. klip ze starszego sezonu) zostaje sama ikona jak dotychczas. */
function clipDriverCredit(driverName, driverIndex) {
  if (!driverName) return '';
  const entry = driverIndex?.[driverName];
  const avatar = entry ? driverAvatar(entry.team) : null;
  const img = avatar ? `<img class="chip-avatar" src="${avatar}" alt="" onerror="this.remove()">` : icon('helmet');
  return `<span class="hof-clip-driver">${img}${driverName}</span>`;
}

/** Renders one clip as either a YouTube embed or a clean "watch" card, depending on the link.
 *  Used for Clip miesiąca / Najlepszy manewr (large, played inline), the per-race best-maneuver
 *  embed on wynik-wydarzenia.html, and the clip detail page.
 *  opts.ribbon = { label, tone: 'gold'|'red' } — corner tag identifying a spotlight slot.
 *  opts.hideInfo = true — omit the built-in title/meta/description block (the detail page
 *  renders its own richer header instead — see initHallOfFameClip()). */
function renderClip(clip, size, opts) {
  if (!clip || !clip.url) return '';
  opts = opts || {};
  const ytId = extractYouTubeId(clip.url);
  const sizeClass = size === 'large' ? 'hof-clip-large' : 'hof-clip-card';
  const ribbonHtml = opts.ribbon
    ? `<span class="hof-ribbon hof-ribbon-${opts.ribbon.tone || 'red'}">${opts.ribbon.label}</span>`
    : '';
  const hostMeta = clipHostMeta(clip.url);

  const media = ytId
    ? `<div class="hof-embed-wrap">${ribbonHtml}<iframe src="https://www.youtube.com/embed/${ytId}" title="${clip.title || 'Clip'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    : `<a class="hof-watch-card" href="${clip.url}" target="_blank" rel="noopener">
         ${ribbonHtml}
         <span class="hof-watch-pattern" aria-hidden="true"></span>
         <span class="hof-watch-icon">${icon('play')}</span>
         <span class="hof-watch-label">Obejrzyj na</span>
         <span class="hof-watch-host hof-watch-host-${hostMeta.slug}">${hostMeta.label}</span>
       </a>`;

  const info = opts.hideInfo ? '' : `
      <div class="hof-clip-info">
        ${clip.title ? `<div class="hof-clip-title">${clip.title}</div>` : ''}
        <div class="hof-clip-meta">
          ${clipDriverCredit(clip.driver, opts.driverIndex)}
          ${clip.category ? `<span class="hof-clip-category">${clip.category}</span>` : ''}
          ${clip.month ? `<span class="hof-clip-month">${clip.month}</span>` : ''}
        </div>
        ${clip.description ? `<p class="hof-clip-desc">${clip.description}</p>` : ''}
      </div>`;

  return `<div class="${sizeClass}">${media}${info}</div>`;
}

/** Renders one "Wyróżniony clip" as a thumbnail card that links to its own detail page
 *  (hall-of-fame-clip.html?i=N) instead of playing/linking out directly. */
function renderFeaturedCard(clip, index, driverIndex) {
  if (!clip || !clip.url) return '';
  const thumb = clipThumbnail(clip);
  const hostMeta = clipHostMeta(clip.url);
  const media = thumb
    ? `<div class="hof-thumb-wrap"><img src="${thumb}" alt="" loading="lazy" onerror="this.parentElement.classList.add('hof-thumb-fallback')"><span class="hof-play-overlay">${icon('play')}</span></div>`
    : `<div class="hof-thumb-wrap hof-thumb-fallback"><span class="hof-watch-pattern" aria-hidden="true"></span><span class="hof-play-overlay">${icon('play')}</span><span class="hof-thumb-host hof-watch-host-${hostMeta.slug}">${hostMeta.label}</span></div>`;

  return `
    <a class="hof-clip-card" href="hall-of-fame-clip.html?i=${index}">
      ${media}
      <div class="hof-clip-info">
        ${clip.title ? `<div class="hof-clip-title">${clip.title}</div>` : ''}
        <div class="hof-clip-meta">
          ${clipDriverCredit(clip.driver, driverIndex)}
          ${clip.category ? `<span class="hof-clip-category">${clip.category}</span>` : ''}
          ${clip.month ? `<span class="hof-clip-month">${clip.month}</span>` : ''}
        </div>
        ${clip.description ? `<p class="hof-clip-desc">${clip.description}</p>` : ''}
      </div>
    </a>`;
}

/** Sets the Hall-of-Fame hero backdrop from the clip-of-month thumbnail (or the all-time
 *  best-maneuver thumbnail as a fallback), reusing the same inline background-image-stack /
 *  graceful-degrade pattern as applyTrackBackground(). No-ops whenever there's no clip yet, or
 *  its thumbnail 404s — so an empty HallOfFame/hall_of_fame.json never looks broken (the
 *  CSS-only star watermark in .hof-hero::after stays visible instead). */
function applyHofHeroBackground(heroEl, clip) {
  if (!heroEl || !clip) return;
  const url = clipThumbnail(clip);
  if (!url) return;
  const test = new Image();
  test.onload = () => {
    heroEl.style.backgroundImage =
      `linear-gradient(180deg, rgba(10,11,13,.78) 0%, rgba(10,11,13,.93) 55%, var(--black) 100%), ` +
      `radial-gradient(ellipse 70% 90% at 50% 100%, rgba(225,6,0,0.16) 0%, transparent 70%), ` +
      `url("${url}")`;
    heroEl.classList.add('has-track-bg');
  };
  test.src = url;
}

async function initHallOfFame() {
  const [data, { driverIndex }] = await Promise.all([tryFetch('HallOfFame/hall_of_fame.json'), loadSklad(DEFAULT_TIER)]);
  applyHofHeroBackground(document.getElementById('hof-hero'), data && (data.clipOfMonth || data.bestManeuverAllTime));

  const monthHost = document.getElementById('hof-clip-of-month');
  const maneuverHost = document.getElementById('hof-best-maneuver');
  const featuredHost = document.getElementById('hof-featured');

  if (!data) {
    const emptyMsg = '<p style="color:var(--gray);padding:1rem 0">Brak danych do wyświetlenia.</p>';
    if (monthHost) { monthHost.classList.remove('hof-skeleton'); monthHost.innerHTML = emptyMsg; }
    if (maneuverHost) { maneuverHost.classList.remove('hof-skeleton'); maneuverHost.innerHTML = emptyMsg; }
    if (featuredHost) featuredHost.innerHTML = emptyMsg;
    return;
  }

  if (monthHost) {
    monthHost.classList.remove('hof-skeleton');
    monthHost.innerHTML = data.clipOfMonth
      ? renderClip(data.clipOfMonth, 'large', { ribbon: { label: 'Clip miesiąca', tone: 'gold' }, driverIndex })
      : '<p style="color:var(--gray);padding:1rem 0">Brak jeszcze clipu miesiąca.</p>';
  }
  if (maneuverHost) {
    maneuverHost.classList.remove('hof-skeleton');
    maneuverHost.innerHTML = data.bestManeuverAllTime
      ? renderClip(data.bestManeuverAllTime, 'large', { ribbon: { label: 'Najlepszy manewr', tone: 'red' }, driverIndex })
      : '<p style="color:var(--gray);padding:1rem 0">Brak jeszcze wyróżnionego manewru.</p>';
  }
  if (featuredHost) {
    const featured = data.featured || [];
    featuredHost.innerHTML = featured.length
      ? featured.map((c, i) => renderFeaturedCard(c, i, driverIndex)).join('')
      : '<p style="color:var(--gray);padding:1rem 0">Brak jeszcze wyróżnionych clipów.</p>';
  }

  observeReveal();
}

/* ─── HALL OF FAME — CLIP DETAIL PAGE ────────────── */
async function initHallOfFameClip() {
  const host = document.getElementById('hof-clip-detail');
  const relatedHost = document.getElementById('hof-related');
  if (!host) return;

  const params = new URLSearchParams(location.search);
  const index = parseInt(params.get('i'), 10);
  const [data, { driverIndex }] = await Promise.all([tryFetch('HallOfFame/hall_of_fame.json'), loadSklad(DEFAULT_TIER)]);
  const featured = data && Array.isArray(data.featured) ? data.featured : [];
  const clip = featured[index];

  if (!clip) {
    host.innerHTML = '<p style="color:var(--gray);padding:2rem 0">Nie znaleziono tego clipu — może został usunięty albo link jest nieprawidłowy.</p>';
    return;
  }

  document.title = `${clip.title || 'Clip'} — Hall of Fame — Polaris Racing League`;
  const hostMeta = clipHostMeta(clip.url);

  const head = `
    <div class="hof-detail-head reveal">
      <span class="hof-detail-eyebrow">Wyróżniony clip</span>
      <h1 class="hof-detail-title">${clip.title || 'Bez tytułu'}</h1>
      <div class="hof-detail-meta">
        ${clipDriverCredit(clip.driver, driverIndex)}
        ${clip.category ? `<span class="hof-clip-category">${clip.category}</span>` : ''}
        ${clip.month ? `<span class="hof-clip-month">${clip.month}</span>` : ''}
        <span class="race-chip">${icon('play')}${hostMeta.label}</span>
      </div>
      ${clip.description ? `<p class="hof-clip-desc" style="margin-top:1rem;max-width:760px">${clip.description}</p>` : ''}
    </div>`;

  host.innerHTML = head + renderClip(clip, 'large', { hideInfo: true, driverIndex });

  if (relatedHost) {
    const related = featured
      .map((c, i) => ({ c, i }))
      .filter(({ c, i }) => i !== index && c && c.url)
      .slice(0, 3);
    relatedHost.innerHTML = related.length ? `
      <div class="section-header reveal" style="margin-top:3rem">
        <span class="section-label">Zobacz też</span>
        <h2 class="section-title">Inne wyróżnione clipy</h2>
        <div class="section-divider"></div>
      </div>
      <div class="hof-grid reveal">
        ${related.map(({ c, i }) => renderFeaturedCard(c, i, driverIndex)).join('')}
      </div>` : '';
  }
  observeReveal();
}
