/* ─── LOADING SCREEN ─────────────────────────────── */
window.addEventListener('load', () => {
  const ls = document.getElementById('loading-screen');
  if (!ls) return;
  setTimeout(() => ls.classList.add('hidden'), 1400);
});

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
    if (t.re.test(s)) return { full: t.full, logo: `assets/teams/${t.logo}` };
  }
  return { full: s || 'Nieznany zespół', logo: null };
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

function posBadge(p) {
  const cls = p === 1 ? 'p1' : p === 2 ? 'p2' : p === 3 ? 'p3' : '';
  return `<span class="pos-badge ${cls}">${p}</span>`;
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
  if (!code) return '<span style="font-size:22px">&#127937;</span>';
  return '<img src="https://flagcdn.com/w40/' + code + '.png" alt="' + country + '" class="track-flag-img" onerror="this.outerHTML=\'&#127937;\'">';
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
    fastestLap: null,
    _raw: json,
  };
}

/* Load races for a single season+tier folder, e.g. Wyniki/Sezon 1/Tier 1 */
async function loadRacesFor(folder, seasonName, tier) {
  const fallback = (KNOWN_FILES[seasonName] && KNOWN_FILES[seasonName][tier]) || [];
  const races = [];

  const manifest = await tryFetch(`${folder}/${tier}/manifest.json`);
  const fileList = manifest?.files || fallback;

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
      // Use latest team color
      map[d.driver].teamColor = d.teamColor;
    }
  }
  return Object.values(map)
    .sort((a, b) => b.points - a.points || b.wins - a.wins)
    .map((d, i) => ({ ...d, pos: i + 1 }));
}

/* Compute constructor standings from races — same points-scoring-sessions filter as drivers. */
function computeConstructorStandings(races) {
  const map = {};
  for (const race of races.filter(r => r.sessionType === 'Race' || r.sessionType === 'Sprint')) {
    for (const d of race.raceResults) {
      const key = d.teamFull || d.team;
      if (!map[key]) {
        map[key] = {
          team: d.teamFull || d.team,
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
    .map(c => ({ ...c, drivers: [...c.drivers] }))
    .sort((a, b) => b.points - a.points || b.wins - a.wins)
    .map((c, i) => ({ ...c, pos: i + 1 }));
}

/* ─── RENDER HELPERS ─────────────────────────────── */
function renderDriverCell(d) {
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
    badges.push(`<span class="penalty-badge penalty-badge-pos" title="${escHtml(d.positionPenaltyReason) || 'Kara pozycji'}">▼${d.positionPenalty} poz.</span>`);
  }

  return `<div class="driver-cell">
    <span class="team-dot" style="background:${hexColor(d.teamColor)}"></span>
    <div>${nameDisplay}</div>
    ${badges.join('')}
  </div>`;
}

function escHtml(s) {
  return s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : '';
}

function renderStandingsTable(standings, containerId) {
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
          ${standings.map(d => `
            <tr>
              <td><span class="standing-pos ${d.pos <= 3 ? 'top' : ''}">${d.pos}</span></td>
              <td>${renderDriverCell(d)}</td>
              <td>${renderTeamBadge(d.teamFull || d.team)}</td>
              <td class="right"><span class="wins-val">${d.wins}</span></td>
              <td class="right"><span class="podium-val">${d.podiums}</span></td>
              <td class="right"><span class="points-big">${d.points}</span></td>
            </tr>
          `).join('')}
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
              <td><span class="standing-pos ${c.pos <= 3 ? 'top' : ''}">${c.pos}</span></td>
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
  const allSeasons = await loadAllRaces();
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

  // stat: completed races / total
  const latestSeason = seasonNames[seasonNames.length - 1];
  const latestRaces = racesForTier(allSeasons, latestSeason, DEFAULT_TIER).filter(r => r.sessionType === 'Race');
  const completedCount = latestRaces.filter(r => r.status === 'completed').length;
  document.getElementById('stat-rounds').textContent =
    latestRaces.length ? `${completedCount}/${latestRaces.length}` : '—';

  // Last race (most recent completed Race session across all seasons)
  const lastRace = raceSessionsOnly.filter(r => r.status === 'completed').pop();
  if (lastRace) renderLastRaceCard(lastRace);
  else document.getElementById('last-race').innerHTML = '<p style="color:var(--gray)">Brak danych do wyświetlenia.</p>';

  // Mini standings
  const latestDrivers = computeDriverStandings(latestRaces);
  renderStandingsTable(latestDrivers.slice(0, 5), 'standings-mini');

  // Mini constructors
  const latestConstructors = computeConstructorStandings(latestRaces);
  renderConstructorsTable(latestConstructors.slice(0, 5), 'constructors-mini');

  // News teaser (latest 3) from the dedicated Aktualności page's data
  const newsData = await tryFetch('Aktualnosci/aktualnosci.json');
  const articles = (newsData?.articles || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  if (articles.length) renderNews(articles.slice(0, 3));
  else document.getElementById('news-grid').innerHTML = '<p style="color:var(--gray)">Brak danych do wyświetlenia.</p>';

  observeReveal();
  observeCounters();
}

function renderLastRaceCard(r) {
  const el = document.getElementById('last-race');
  if (!el) return;
  const top3 = r.raceResults.slice(0, 3);
  const posEmoji = ['🥇','🥈','🥉'];
  const posClass = ['p1','p2','p3'];

  el.innerHTML = `
    <div class="last-race-grid">
      <div class="race-info-card">
        <div class="race-flag">${r.flag}</div>
        <div class="race-name-display">${r.name}</div>
        <div class="race-meta-row">
          <div class="race-meta-item">📅 <strong>${fmtDate(r.date)}</strong></div>
          <div class="race-meta-item">🏁 <strong>Runda ${r.round}</strong> · ${r.totalLaps} okrążeń</div>
          <div class="race-meta-item">📍 <strong>${r.track}</strong></div>
        </div>
        <div class="podium-row">
          ${top3.map((d,i) => `
            <div class="podium-item">
              <span class="podium-pos ${posClass[i]}">${posEmoji[i]}</span>
              <div>
                <div class="podium-driver">${d.driver}</div>
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
                  <td>${renderDriverCell(d)}</td>
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
  el.innerHTML = `
    <div class="news-grid">
      ${news.map(n => `
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
    el.innerHTML = renderCalendarRounds(rounds, { season: activeSeason, tier: activeTier });
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

  const [allCalendars, allSeasons] = await Promise.all([loadAllCalendars(), loadAllRaces()]);
  const rounds = calendarForTier(allCalendars, season, tier);
  const roundInfo = rounds.find(r => r.round === round);
  const sessions = racesForTier(allSeasons, season, tier).filter(r => r.round === round);

  const flag = roundInfo ? trackFlag(roundInfo.country || roundInfo.track) : (sessions[0]?.flag || '');
  const trackName = roundInfo?.track || sessions[0]?.track || 'Nieznany tor';
  const dateStr = roundInfo?.date || sessions[0]?.date || '';

  titleEl.innerHTML = `${flag ? flag + ' ' : ''}${trackName} Grand Prix`;
  subEl.textContent = `Runda ${round} · ${season} · ${tier}` + (dateStr ? ` · ${fmtDate(dateStr)}` : '');
  document.title = `${trackName} — Wyniki — Polaris Racing League`;

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
    contentEl.innerHTML = renderSessionResults(byType[activeType]);
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

function renderSessionResults(session) {
  if (!session) return '<p style="color:var(--gray);padding:2rem 0">Brak danych do wyświetlenia.</p>';
  const showPoints = session.sessionType === 'Race' || session.sessionType === 'Sprint';
  return `
    <div class="race-chips reveal" style="margin:0 0 1.5rem">
      <span class="race-chip">🗓️ ${fmtDate(session.date)}</span>
      <span class="race-chip">🏁 ${session.totalLaps || 0} okrążeń</span>
      <span class="race-chip">📍 ${session.track}</span>
      ${session.turns ? `<span class="race-chip">🔄 ${session.turns} zakrętów</span>` : ''}
    </div>
    <div class="table-wrap reveal">
      <table class="results">
        <thead>
          <tr>
            <th>#</th>
            <th>Kierowca</th>
            <th>Zespół</th>
            <th class="right">Strata</th>
            <th class="right">Status</th>
            ${showPoints ? '<th class="right">Pkt</th>' : ''}
          </tr>
        </thead>
        <tbody>
          ${session.raceResults.map(d => `
            <tr>
              <td>${posBadge(d.pos)}</td>
              <td>${renderDriverCell(d)}</td>
              <td>${renderTeamBadge(d.teamFull || d.team)}</td>
              <td class="right"><span class="gap-text">${d.gap}</span></td>
              <td class="right"><span class="status-fin">${d.status}</span></td>
              ${showPoints ? `<td class="right"><span class="points-val">${d.points}</span></td>` : ''}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
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

  const rerender = () => {
    const standings = computeDriverStandings(racesForTier(allSeasons, activeSeason, activeTier));
    renderStandingsTable(standings, 'standings-full');
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

  const rerender = () => {
    const constructors = computeConstructorStandings(racesForTier(allSeasons, activeSeason, activeTier));
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
  const manifest = await tryFetch(`${folder}/${tier}/manifest.json`);
  if (!manifest) return [];

  const fileList = manifest.files || [];
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
          ? '<span class="cal-live-badge">🔴 Na żywo</span>'
          : (r._isNext ? '<span class="cal-next-badge">Następny</span>' : '');
        const cardInner = `
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
                <span class="cal-date">🗓️ ${fmtDateTime(r.date, r.time)}</span>
                <span class="cal-status ${cls}">${label}</span>
              </div>
              ${hasSprint ? `
                <div class="cal-body-row cal-sprint-row">
                  <span class="cal-sprint-badge">🏃 Sprint</span>
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
    el.innerHTML = renderCalendarRounds(rounds, { season: activeSeason, tier: activeTier });
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
  return `
    <div class="wdc-hero reveal">
      <div class="wdc-hero-crown">👑</div>
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
  return `
    <div class="wdc-card reveal ${isLatest ? 'wdc-card-latest' : ''}">
      <div class="wdc-card-top">
        <div class="wdc-card-crown">${isLatest ? '👑' : '🏆'}</div>
        <div>
          <div class="wdc-card-season">${c.season}</div>
          <div class="wdc-card-driver">${c.driver}</div>
          <div class="wdc-card-team">${renderTeamBadge(c.team)}</div>
        </div>
        <div class="wdc-card-pts">${c.points}<span>pkt</span></div>
      </div>
      <div class="wdc-card-stats">
        <div class="wdc-stat-item">
          <span class="wdc-stat-icon">🥇</span>
          <span class="wdc-stat-val">${c.wins}</span>
          <span class="wdc-stat-lbl">Zwycięstwa</span>
        </div>
        <div class="wdc-stat-item">
          <span class="wdc-stat-icon">🏅</span>
          <span class="wdc-stat-val">${c.podiums}</span>
          <span class="wdc-stat-lbl">Podium</span>
        </div>
        <div class="wdc-stat-item">
          <span class="wdc-stat-icon">⚡</span>
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

function clipHostLabel(url) {
  if (!url) return 'Link';
  if (/medal\.tv/.test(url)) return 'Medal.tv';
  if (/youtube\.com|youtu\.be/.test(url)) return 'YouTube';
  if (/streamable\.com/.test(url)) return 'Streamable';
  if (/clips\.twitch\.tv|twitch\.tv/.test(url)) return 'Twitch';
  if (/twitter\.com|x\.com/.test(url)) return 'X / Twitter';
  try { return new URL(url).hostname.replace('www.', ''); } catch { return 'Link'; }
}

/** Renders one clip as either a YouTube embed or a clean "watch" card, depending on the link.
 *  Used for Clip miesiąca / Najlepszy manewr (large, played inline) and on the clip detail page. */
function renderClip(clip, size) {
  if (!clip || !clip.url) return '';
  const ytId = extractYouTubeId(clip.url);
  const sizeClass = size === 'large' ? 'hof-clip-large' : 'hof-clip-card';

  const media = ytId
    ? `<div class="hof-embed-wrap"><iframe src="https://www.youtube.com/embed/${ytId}" title="${clip.title || 'Clip'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    : `<a class="hof-watch-card" href="${clip.url}" target="_blank" rel="noopener">
         <span class="hof-watch-icon">▶</span>
         <span class="hof-watch-label">Obejrzyj na ${clipHostLabel(clip.url)}</span>
       </a>`;

  return `
    <div class="${sizeClass}">
      ${media}
      <div class="hof-clip-info">
        ${clip.title ? `<div class="hof-clip-title">${clip.title}</div>` : ''}
        <div class="hof-clip-meta">
          ${clip.driver ? `<span class="hof-clip-driver">🏎️ ${clip.driver}</span>` : ''}
          ${clip.month ? `<span class="hof-clip-month">${clip.month}</span>` : ''}
        </div>
        ${clip.description ? `<p class="hof-clip-desc">${clip.description}</p>` : ''}
      </div>
    </div>`;
}

/** Renders one "Wyróżniony clip" as a thumbnail card that links to its own detail page
 *  (hall-of-fame-clip.html?i=N) instead of playing/linking out directly. */
function renderFeaturedCard(clip, index) {
  if (!clip || !clip.url) return '';
  const thumb = clipThumbnail(clip);
  const media = thumb
    ? `<div class="hof-thumb-wrap"><img src="${thumb}" alt="" loading="lazy" onerror="this.parentElement.classList.add('hof-thumb-fallback')"><span class="hof-play-overlay">▶</span></div>`
    : `<div class="hof-thumb-wrap hof-thumb-fallback"><span class="hof-play-overlay">▶</span><span class="hof-thumb-host">${clipHostLabel(clip.url)}</span></div>`;

  return `
    <a class="hof-clip-card" href="hall-of-fame-clip.html?i=${index}">
      ${media}
      <div class="hof-clip-info">
        ${clip.title ? `<div class="hof-clip-title">${clip.title}</div>` : ''}
        <div class="hof-clip-meta">
          ${clip.driver ? `<span class="hof-clip-driver">🏎️ ${clip.driver}</span>` : ''}
        </div>
      </div>
    </a>`;
}

async function initHallOfFame() {
  const data = await tryFetch('HallOfFame/hall_of_fame.json');

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
      ? renderClip(data.clipOfMonth, 'large')
      : '<p style="color:var(--gray);padding:1rem 0">Brak jeszcze clipu miesiąca.</p>';
  }
  if (maneuverHost) {
    maneuverHost.classList.remove('hof-skeleton');
    maneuverHost.innerHTML = data.bestManeuverAllTime
      ? renderClip(data.bestManeuverAllTime, 'large')
      : '<p style="color:var(--gray);padding:1rem 0">Brak jeszcze wyróżnionego manewru.</p>';
  }
  if (featuredHost) {
    const featured = data.featured || [];
    featuredHost.innerHTML = featured.length
      ? featured.map((c, i) => renderFeaturedCard(c, i)).join('')
      : '<p style="color:var(--gray);padding:1rem 0">Brak jeszcze wyróżnionych clipów.</p>';
  }

  observeReveal();
}

/* ─── HALL OF FAME — CLIP DETAIL PAGE ────────────── */
async function initHallOfFameClip() {
  const host = document.getElementById('hof-clip-detail');
  if (!host) return;

  const params = new URLSearchParams(location.search);
  const index = parseInt(params.get('i'), 10);
  const data = await tryFetch('HallOfFame/hall_of_fame.json');
  const clip = data && Array.isArray(data.featured) ? data.featured[index] : null;

  if (!clip) {
    host.innerHTML = '<p style="color:var(--gray);padding:2rem 0">Nie znaleziono tego clipu — może został usunięty albo link jest nieprawidłowy.</p>';
    return;
  }

  document.title = `${clip.title || 'Clip'} — Hall of Fame — Polaris Racing League`;
  host.innerHTML = renderClip(clip, 'large');
  observeReveal();
}
