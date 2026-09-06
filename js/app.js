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

/* ─── I18N ──────────────────────────────────────────
   Tłumaczony jest wyłącznie interfejs (nawigacja, nagłówki, statusy,
   przyciski, puste stany) — nazwiska, newsy, opisy partnerów, powody kar,
   tytuły clipów itd. pochodzą z JSON-ów (prawdziwa treść ligi) i zostają
   po polsku niezależnie od wybranego języka. Zmiana języka przeładowuje
   stronę (setLang()) — najprostszy niezawodny sposób, by wszystko
   wygenerowane przez JS przerenderowało się od razu w nowym języku. */
const I18N = {
  pl: {
    'nav.home': 'Strona główna', 'nav.results': 'Wyniki',
    'nav.driverStandings': 'Klasyfikacja Kierowców', 'nav.constructorStandings': 'Klasyfikacja Konstruktorska',
    'nav.calendar': 'Kalendarz', 'nav.news': 'Aktualności', 'nav.partners': 'Partnerstwa',
    'footer.motto': 'Rywalizacja, Pasja, Motorsport',
    'footer.copyright': '© 2026 Polaris Racing League. Wszelkie prawa zastrzeżone.',
    'hero.wyniki.title': 'WYNIKI',
    'hero.klasyfikacja.title': 'KLASYFIKACJA KIEROWCÓW',
    'hero.konstruktorzy.title': 'KLASYFIKACJA KONSTRUKTORÓW',
    'hero.wdc.title': 'MISTRZOWIE ŚWIATA',
    'hero.kalendarz.eyebrow': 'F1 2025', 'hero.kalendarz.title': 'KALENDARZ SEZONU',
    'hero.aktualnosci.title': 'AKTUALNOŚCI',
    'hero.partnerstwa.title': 'PARTNERSTWA',
    'hero.hof.title': 'HALL OF FAME', 'hero.hof.sub': 'Najlepsze manewry, momenty i clipy sezonu',
    'hero.index.eyebrow': 'F1 2025 · Sezon 1',
    'title.wyniki': 'Wyniki — Polaris Racing League',
    'title.klasyfikacja': 'Klasyfikacja Kierowców — Polaris Racing League',
    'title.konstruktorzy': 'Klasyfikacja Konstruktorów — Polaris Racing League',
    'title.wdc': 'WDC — Polaris Racing League',
    'title.kalendarz': 'Kalendarz — Polaris Racing League',
    'title.aktualnosci': 'Aktualności — Polaris Racing League',
    'title.partnerstwa': 'Partnerstwa — Polaris Racing League',
    'title.hof': 'Hall of Fame — Polaris Racing League',
    'pos': 'Poz.', 'driver': 'Kierowca', 'team': 'Zespół', 'wins': 'Zwycięstwa',
    'podiums': 'Podium', 'points': 'Punkty', 'constructor': 'Konstruktor', 'drivers': 'Kierowcy',
    'gap': 'Strata', 'status': 'Status', 'pts': 'Pkt', 'tyres': 'Opony', 'fastestLapShort': 'Najsz. okr.',
    'startPos': 'Start', 'posChange': '+/-',
    'discordStats.members': 'Członków na Discordzie', 'discordStats.drivers': 'Kierowców',
    'discordStats.newest': 'Najnowszy członek',
    'round': 'Runda', 'laps': 'okrążeń', 'turns': 'zakrętów',
    'empty.generic': 'Brak danych do wyświetlenia.', 'empty.short': 'Brak danych.',
    'finished': 'Ukończony', 'unknownTeam': 'Nieznany zespół', 'unknownTrack': 'Nieznany tor',
    'eventNotFound': 'Nie znaleziono wydarzenia', 'noEventResults': 'Brak jeszcze wyników dla tego wydarzenia.',
    'sessionType.qualiSprint': 'Kwalifikacje Sprintu', 'sessionType.sprint': 'Sprint',
    'sessionType.qualifying': 'Kwalifikacje', 'sessionType.race': 'Wyścig',
    'penalty.time': 'Kara czasowa', 'penalty.removed': 'Kara odwołana', 'penalty.pos': 'Kara pozycji',
    'penalty.posSuffix': 'poz.',
    'cta.fullResults': 'Pełne wyniki →', 'cta.visitSite': 'Odwiedź stronę →',
    'league.races': 'Rozegrane wyścigi', 'league.drivers': 'Kierowcy w historii', 'league.seasons': 'Sezony',
    'latestRace': 'Najnowszy wyścig',
    'position': 'Pozycja', 'fastestLap': 'Najszybsze okrążenie', 'podiumsShort': 'Podia', 'pole': 'Pole',
    'chip.fastestLaps': 'najsz. okrążeń', 'chip.dotd': 'kierowca dnia',
    'starts': 'Starty', 'bestResult': 'Najlepszy wynik', 'avgPosition': 'Śr. pozycja', 'dnf': 'DNF',
    'leader': 'Lider', 'gapToP2': 'Przewaga nad P2', 'mostWins': 'Najwięcej zwycięstw', 'mostPodiums': 'Najwięcej podiów',
    'ptsSuffix': 'pkt', 'winsSuffix': 'wygr.', 'podiumsSuffix': 'podiów', 'over': 'nad',
    'fastestLapPrefix': 'Najszybsze okrążenie: ', 'dotdPrefix': 'Kierowca dnia: ', 'dotdTitle': 'Kierowca dnia',
    'fastestLapSessionTitle': 'Najszybsze okrążenie sesji: ',
    'raceHighlight': 'Wyróżnienie wyścigu', 'bestManeuver': 'Najlepszy manewr', 'bestManeuverOfRace': 'Najlepszy manewr wyścigu',
    'status.completed': 'Zakończony', 'status.cancelled': 'Odwołany', 'status.live': 'W trakcie', 'status.upcoming': 'Nadchodzący',
    'cal.live': 'Na żywo', 'cal.next': 'Następny', 'cal.briefing': 'Odprawa',
    'cal.today': 'Dziś', 'cal.inPrefix': 'Za', 'cal.day': 'dzień', 'cal.days': 'dni', 'cal.roundsGenitive': 'rund',
    'cal.liveNow': 'Na żywo teraz', 'cal.lastRound': 'Ostatnia runda', 'cal.nextRound': 'Następna runda',
    'wdc.currentChampion': 'Aktualny Mistrz Świata', 'wdc.polePosition': 'Pole Position',
    'wdc.titleFight': 'Stan walki o tytuł', 'wdc.gapNotePrefix': 'Przewaga nad',
    'hof.clipOfMonth': 'Clip miesiąca', 'hof.noClipOfMonth': 'Brak jeszcze clipu miesiąca.',
    'hof.noBestManeuver': 'Brak jeszcze wyróżnionego manewru.', 'hof.noFeaturedClips': 'Brak jeszcze wyróżnionych clipów.',
    'hof.clipNotFound': 'Nie znaleziono tego clipu — może został usunięty albo link jest nieprawidłowy.',
    'hof.featuredClip': 'Wyróżniony clip', 'hof.untitled': 'Bez tytułu',
    'hof.seeAlso': 'Zobacz też', 'hof.otherFeaturedClips': 'Inne wyróżnione clipy',
    'hof.watchOn': 'Obejrzyj na', 'hof.downloadFile': 'Pobierz plik',
    'hof.videoUnsupported': 'Twoja przeglądarka nie obsługuje odtwarzania wideo. ', 'hof.video': 'Wideo',
    'strip.nextRound': 'Następna runda',
    'back.results': '← Wszystkie wyniki', 'back.hof': '← Wróć do Hall of Fame',
    'season.label': 'Sezon',
    'hero.klasyfikacja.eyebrow': 'Polaris Racing League · Sezon 1',
    'hero.konstruktorzy.eyebrow': 'Polaris Racing League · Sezon 1',
    'home.season1Label': 'Sezon 1',
    'nav.ranking': 'Ranking', 'title.ranking': 'Ranking — Polaris Racing League', 'hero.ranking.title': 'RANKING',
    'nav.lineup': 'Lineup', 'title.lineup': 'Lineup — Polaris Racing League', 'hero.lineup.title': 'LINEUP',
    'ranking.wins': 'Najwięcej zwycięstw', 'ranking.poles': 'Najwięcej Pole Position',
    'ranking.podiums': 'Najwięcej podiów', 'ranking.dotd': 'Najwięcej Kierowca Dnia',
    'ranking.fastestLaps': 'Najwięcej najszybszych okrążeń', 'ranking.avgPosition': 'Najwyższa średnia pozycja',
    'ranking.finishes': 'Najwięcej ukończonych wyścigów', 'ranking.winStreak': 'Najdłuższa seria zwycięstw',
    'ranking.podiumStreak': 'Najdłuższa seria podiów', 'ranking.poleStreak': 'Najdłuższa seria Pole Position',
    'ranking.minStartsNote': 'Min. 5 startów w sezonie',
    'wyniki.lastPodium': 'Podium ostatniej rundy', 'wyniki.resultsHistory': 'Wyniki rund',
    'wyniki.constructorLeader': 'Lider Pucharu Konstruktorów', 'wyniki.highlights': 'Najlepsze akcje sezonu',
    'wyniki.trendUp': 'Przewaga lidera rośnie', 'wyniki.trendDown': 'Przewaga lidera maleje',
    'wyniki.trendNew': 'Nowy lider klasyfikacji!',
    'nav.clipy': 'Clipy', 'title.clipy': 'Clipy — Polaris Racing League', 'hero.clipy.title': 'CLIPY',
    'clipy.comments': 'komentarzy', 'clipy.promoted': 'Wyróżniony',
    'home.stat.drivers': 'Kierowców', 'home.stat.rounds': 'Rundy', 'home.stat.game': 'Gra',
    'home.cta.results': 'Zobacz wyniki', 'home.cta.calendar': 'Kalendarz sezonu',
    'home.lastRace.label': 'Ostatni wyścig', 'home.lastRace.title': 'Wyniki GP',
    'home.standings.title': 'Klasyfikacja kierowców', 'home.constructors.title': 'Klasyfikacja konstruktorów',
    'home.news.label': 'Aktualności', 'home.news.title': 'Nowości Ligi',
    'home.community.label': 'Bądź na bieżąco', 'home.community.title': 'Dołącz do społeczności',
    'home.fullTable': 'Pełna tabela →', 'home.allNews': 'Wszystkie aktualności →',
    'social.discord.desc': 'Dołącz do serwera, rozmawiaj z kierowcami i bądź na bieżąco z ligą.',
    'social.youtube.desc': 'Podsumowania wyścigów, najlepsze akcje i pełne relacje z sezonu.',
    'social.tiktok.desc': 'Krótkie klipy, najlepsze momenty i kulisy ligi.',
    'hof.section.month.label': 'Wyróżnienie miesiąca', 'hof.section.month.title': 'Clip miesiąca',
    'hof.section.legend.label': 'Legenda ligi', 'hof.section.legend.title': 'Najlepszy manewr w historii ligi',
    'hof.section.featured.label': 'Warte obejrzenia', 'hof.section.featured.title': 'Wyróżnione clipy',
    'loading': 'Ładowanie…', 'loadingResults': 'Ładowanie wyników…',
    'nav.penaltyPoints': 'Punkty karne', 'title.punktyKarne': 'Punkty karne — Polaris Racing League',
    'hero.punktyKarne.title': 'PUNKTY KARNE',
    'pk.totalPoints': 'Punkty karne', 'pk.noEntries': 'Brak punktów karnych w tym sezonie/tierze.',
    'pk.history': 'Historia wpisów', 'pk.cancelled': 'Anulowane',
    'pk.dsq': 'DSQ', 'pk.qualiBan': 'Quali-ban', 'pk.raceIncident': 'Race incident', 'pk.points': 'Punkty karne',
    'pk.case': 'Sprawa', 'pk.reason': 'Powód', 'pk.driver': 'Kierowca',
    'penaltyNotes.title': 'Kary i odwołania', 'penaltyNotes.revoked': 'cofnięte w odwołaniu',
  },
  en: {
    'nav.home': 'Home', 'nav.results': 'Results',
    'nav.driverStandings': 'Driver Standings', 'nav.constructorStandings': 'Constructor Standings',
    'nav.calendar': 'Calendar', 'nav.news': 'News', 'nav.partners': 'Partners',
    'footer.motto': 'Competition, Passion, Motorsport',
    'footer.copyright': '© 2026 Polaris Racing League. All rights reserved.',
    'hero.wyniki.title': 'RESULTS',
    'hero.klasyfikacja.title': 'DRIVER STANDINGS',
    'hero.konstruktorzy.title': 'CONSTRUCTOR STANDINGS',
    'hero.wdc.title': 'WORLD CHAMPIONS',
    'hero.kalendarz.eyebrow': 'F1 2025', 'hero.kalendarz.title': 'SEASON CALENDAR',
    'hero.aktualnosci.title': 'NEWS',
    'hero.partnerstwa.title': 'PARTNERS',
    'hero.hof.title': 'HALL OF FAME', 'hero.hof.sub': 'The season\'s best moves, moments and clips',
    'hero.index.eyebrow': 'F1 2025 · Season 1',
    'title.wyniki': 'Results — Polaris Racing League',
    'title.klasyfikacja': 'Driver Standings — Polaris Racing League',
    'title.konstruktorzy': 'Constructor Standings — Polaris Racing League',
    'title.wdc': 'WDC — Polaris Racing League',
    'title.kalendarz': 'Calendar — Polaris Racing League',
    'title.aktualnosci': 'News — Polaris Racing League',
    'title.partnerstwa': 'Partners — Polaris Racing League',
    'title.hof': 'Hall of Fame — Polaris Racing League',
    'pos': 'Pos.', 'driver': 'Driver', 'team': 'Team', 'wins': 'Wins',
    'podiums': 'Podiums', 'points': 'Points', 'constructor': 'Constructor', 'drivers': 'Drivers',
    'gap': 'Gap', 'status': 'Status', 'pts': 'Pts', 'tyres': 'Tyres', 'fastestLapShort': 'Fastest lap',
    'startPos': 'Start', 'posChange': '+/-',
    'discordStats.members': 'Discord members', 'discordStats.drivers': 'Drivers',
    'discordStats.newest': 'Newest member',
    'round': 'Round', 'laps': 'laps', 'turns': 'turns',
    'empty.generic': 'No data to display.', 'empty.short': 'No data.',
    'finished': 'Finished', 'unknownTeam': 'Unknown team', 'unknownTrack': 'Unknown track',
    'eventNotFound': 'Event not found', 'noEventResults': 'No results for this event yet.',
    'sessionType.qualiSprint': 'Sprint Qualifying', 'sessionType.sprint': 'Sprint',
    'sessionType.qualifying': 'Qualifying', 'sessionType.race': 'Race',
    'penalty.time': 'Time penalty', 'penalty.removed': 'Penalty removed', 'penalty.pos': 'Position penalty',
    'penalty.posSuffix': 'pos.',
    'cta.fullResults': 'Full results →', 'cta.visitSite': 'Visit website →',
    'league.races': 'Races completed', 'league.drivers': 'Drivers in history', 'league.seasons': 'Seasons',
    'latestRace': 'Latest race',
    'position': 'Position', 'fastestLap': 'Fastest lap', 'podiumsShort': 'Podiums', 'pole': 'Pole',
    'chip.fastestLaps': 'fastest laps', 'chip.dotd': 'driver of the day',
    'starts': 'Starts', 'bestResult': 'Best result', 'avgPosition': 'Avg. position', 'dnf': 'DNF',
    'leader': 'Leader', 'gapToP2': 'Gap to P2', 'mostWins': 'Most wins', 'mostPodiums': 'Most podiums',
    'ptsSuffix': 'pts', 'winsSuffix': 'wins', 'podiumsSuffix': 'podiums', 'over': 'over',
    'fastestLapPrefix': 'Fastest lap: ', 'dotdPrefix': 'Driver of the day: ', 'dotdTitle': 'Driver of the day',
    'fastestLapSessionTitle': 'Session fastest lap: ',
    'raceHighlight': 'Race highlight', 'bestManeuver': 'Best maneuver', 'bestManeuverOfRace': 'Best maneuver of the race',
    'status.completed': 'Completed', 'status.cancelled': 'Cancelled', 'status.live': 'In progress', 'status.upcoming': 'Upcoming',
    'cal.live': 'Live', 'cal.next': 'Next', 'cal.briefing': 'Briefing',
    'cal.today': 'Today', 'cal.inPrefix': 'In', 'cal.day': 'day', 'cal.days': 'days', 'cal.roundsGenitive': 'rounds',
    'cal.liveNow': 'Live now', 'cal.lastRound': 'Last round', 'cal.nextRound': 'Next round',
    'wdc.currentChampion': 'Current World Champion', 'wdc.polePosition': 'Pole Position',
    'wdc.titleFight': 'Title fight status', 'wdc.gapNotePrefix': 'Gap to',
    'hof.clipOfMonth': 'Clip of the month', 'hof.noClipOfMonth': 'No clip of the month yet.',
    'hof.noBestManeuver': 'No featured maneuver yet.', 'hof.noFeaturedClips': 'No featured clips yet.',
    'hof.clipNotFound': 'Clip not found — it may have been removed or the link is invalid.',
    'hof.featuredClip': 'Featured clip', 'hof.untitled': 'Untitled',
    'hof.seeAlso': 'See also', 'hof.otherFeaturedClips': 'Other featured clips',
    'hof.watchOn': 'Watch on', 'hof.downloadFile': 'Download file',
    'hof.videoUnsupported': 'Your browser does not support video playback. ', 'hof.video': 'Video',
    'strip.nextRound': 'Next round',
    'back.results': '← All results', 'back.hof': '← Back to Hall of Fame',
    'season.label': 'Season',
    'hero.klasyfikacja.eyebrow': 'Polaris Racing League · Season 1',
    'hero.konstruktorzy.eyebrow': 'Polaris Racing League · Season 1',
    'home.season1Label': 'Season 1',
    'nav.ranking': 'Ranking', 'title.ranking': 'Ranking — Polaris Racing League', 'hero.ranking.title': 'RANKING',
    'nav.lineup': 'Lineup', 'title.lineup': 'Lineup — Polaris Racing League', 'hero.lineup.title': 'LINEUP',
    'ranking.wins': 'Most wins', 'ranking.poles': 'Most pole positions',
    'ranking.podiums': 'Most podiums', 'ranking.dotd': 'Most Driver of the Day',
    'ranking.fastestLaps': 'Most fastest laps', 'ranking.avgPosition': 'Best average position',
    'ranking.finishes': 'Most race finishes', 'ranking.winStreak': 'Longest win streak',
    'ranking.podiumStreak': 'Longest podium streak', 'ranking.poleStreak': 'Longest pole position streak',
    'ranking.minStartsNote': 'Min. 5 starts this season',
    'wyniki.lastPodium': 'Last round\'s podium', 'wyniki.resultsHistory': 'Round results',
    'wyniki.constructorLeader': "Constructors' Cup leader", 'wyniki.highlights': "Season's best moments",
    'wyniki.trendUp': "Leader's advantage is growing", 'wyniki.trendDown': "Leader's advantage is shrinking",
    'wyniki.trendNew': 'New championship leader!',
    'nav.clipy': 'Clips', 'title.clipy': 'Clips — Polaris Racing League', 'hero.clipy.title': 'CLIPS',
    'clipy.comments': 'comments', 'clipy.promoted': 'Featured',
    'home.stat.drivers': 'Drivers', 'home.stat.rounds': 'Rounds', 'home.stat.game': 'Game',
    'home.cta.results': 'View results', 'home.cta.calendar': 'Season calendar',
    'home.lastRace.label': 'Last race', 'home.lastRace.title': 'GP Results',
    'home.standings.title': 'Driver standings', 'home.constructors.title': 'Constructor standings',
    'home.news.label': 'News', 'home.news.title': 'League News',
    'home.community.label': 'Stay in the loop', 'home.community.title': 'Join the community',
    'home.fullTable': 'Full table →', 'home.allNews': 'All news →',
    'social.discord.desc': 'Join the server, chat with drivers, and stay up to date with the league.',
    'social.youtube.desc': 'Race recaps, best moments, and full season coverage.',
    'social.tiktok.desc': 'Short clips, best moments, and behind-the-scenes from the league.',
    'hof.section.month.label': 'Monthly spotlight', 'hof.section.month.title': 'Clip of the month',
    'hof.section.legend.label': 'League legend', 'hof.section.legend.title': "The league's best maneuver ever",
    'hof.section.featured.label': 'Worth watching', 'hof.section.featured.title': 'Featured clips',
    'loading': 'Loading…', 'loadingResults': 'Loading results…',
    'nav.penaltyPoints': 'Penalty Points', 'title.punktyKarne': 'Penalty Points — Polaris Racing League',
    'hero.punktyKarne.title': 'PENALTY POINTS',
    'pk.totalPoints': 'Penalty points', 'pk.noEntries': 'No penalty points this season/tier.',
    'pk.history': 'Entry history', 'pk.cancelled': 'Cancelled',
    'pk.dsq': 'DSQ', 'pk.qualiBan': 'Quali ban', 'pk.raceIncident': 'Race incident', 'pk.points': 'Penalty points',
    'pk.case': 'Case', 'pk.reason': 'Reason', 'pk.driver': 'Driver',
    'penaltyNotes.title': 'Penalties & appeals', 'penaltyNotes.revoked': 'overturned on appeal',
  },
};
function getLang() {
  try { return localStorage.getItem('lang') === 'en' ? 'en' : 'pl'; } catch { return 'pl'; }
}
function setLang(lang) {
  try { localStorage.setItem('lang', lang === 'en' ? 'en' : 'pl'); } catch { /* ignore */ }
  location.reload();
}
function t(key) {
  const lang = getLang();
  return I18N[lang]?.[key] ?? I18N.pl[key] ?? key;
}
/** Sezony przechowywane jako sama liczba ("1"/"2"/"3" — SEASONS_CONFIG.name,
 *  mistrzowie.json champions[].season). Jedyne miejsce doklejające słowo
 *  "Sezon"/"Season" przy wyświetlaniu. */
function seasonLabel(n) {
  return `${t('season.label')} ${n}`;
}
/** Dwujęzyczna treść z panelu (Partnerstwa, Aktualności, powód Kierowcy
 *  Dnia) — pole o bazowej nazwie `base` zapisane jako `base_pl`/`base_en`.
 *  Kolejność: dokładny język → wersja polska → stare pojedyncze pole sprzed
 *  tej zmiany (np. istniejący Partnerstwa/partnerstwa.json ma dziś tylko
 *  `description`, bez _pl/_en) → ''. */
function biText(obj, base) {
  if (!obj) return '';
  return obj[base + '_' + getLang()] || obj[base + '_pl'] || obj[base] || '';
}
/** parseRLT() bakes the DISPLAY word 'Ukończony' straight into d.status at
 *  load time (used both for showing "Finished" and, elsewhere, for DNF-
 *  counting comparisons against that same literal) — this only translates
 *  the word for display, the internal 'Ukończony' comparisons stay as-is. */
function displayStatus(status) {
  return status === 'Ukończony' ? t('finished') : status;
}
/** Statyczny tekst w HTML (nawigacja, hero, stopka, <title>) — [data-i18n="klucz"]
 *  dostaje textContent = t(klucz). Bezwarunkowa, jak reszta wstrzykiwanych
 *  sitewide funkcji — działa na każdej z 11 stron bez osobnej inicjalizacji. */
function applyStaticTranslations() {
  document.documentElement.lang = getLang();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}
applyStaticTranslations();

/** Mały przełącznik PL/ENG wstrzykiwany do nawigacji na każdej stronie —
 *  ten sam wzorzec bezwarunkowego wstrzykiwania co initLogoWall(). Klik
 *  zapisuje wybór i przeładowuje stronę (setLang()), żeby cała reszta UI
 *  (wygenerowana przez JS) przerenderowała się od razu w nowym języku. */
function buildLangSwitchEl() {
  const lang = getLang();
  const sw = document.createElement('div');
  sw.className = 'lang-switch';
  sw.innerHTML = `
    <button type="button" class="lang-switch-btn ${lang === 'pl' ? 'active' : ''}" data-lang="pl">PL</button>
    <button type="button" class="lang-switch-btn ${lang === 'en' ? 'active' : ''}" data-lang="en">ENG</button>`;
  sw.querySelectorAll('.lang-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => { if (btn.dataset.lang !== getLang()) setLang(btn.dataset.lang); });
  });
  return sw;
}
function initLanguageSwitcher() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  // Desktop nav: own <li> inserted right before the Discord <li> so it
  // becomes its own flex item in .nav-links (not just extra content stuffed
  // inside the Discord <li>).
  const navLinks = nav.querySelector('ul.nav-links');
  const ctaLi = navLinks?.querySelector('.nav-cta')?.closest('li');
  const li = document.createElement('li');
  li.className = 'lang-switch-item';
  li.appendChild(buildLangSwitchEl());
  if (ctaLi) ctaLi.before(li); else navLinks?.appendChild(li);
  // Mobile menu: same switcher appended at the end of the flat link list.
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) mobileMenu.appendChild(buildLangSwitchEl());
}
initLanguageSwitcher();

/* ─── UTILS ──────────────────────────────────────── */
function fmtDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toLocaleDateString(getLang() === 'en' ? 'en-GB' : 'pl-PL', { day: '2-digit', month: 'long', year: 'numeric' });
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
  partners: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="3" y1="13" x2="21" y2="13"></line></svg>`,
  ranking: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="20" x2="6" y2="14"></line><line x1="12" y1="20" x2="12" y2="9"></line><line x1="18" y1="20" x2="18" y2="4"></line></svg>`,
  lineup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="2"></circle><circle cx="12" cy="6" r="2"></circle><circle cx="19" cy="6" r="2"></circle><circle cx="5" cy="14" r="2"></circle><circle cx="12" cy="14" r="2"></circle><circle cx="19" cy="14" r="2"></circle><line x1="5" y1="20" x2="19" y2="20"></line></svg>`,
  clipy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"></rect><path d="M3 6l3-3h4l-2 3"></path><path d="M11 6l3-3h4l-2 3"></path><polygon points="10.5 11 10.5 16 15 13.5" fill="currentColor" stroke="none"></polygon></svg>`,
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
  { re: /ferrari/i, full: 'Scuderia Ferrari', logo: 'fer.png', color: '#E8002D' },
  { re: /red\s*bull/i, full: 'Oracle Red Bull Racing', logo: 'rbr.png', color: '#3671C6' },
  { re: /racing bulls|vcarb|cash app/i, full: 'Visa Cash App RB F1 Team', logo: 'rb.png', color: '#6C98FF' },
  { re: /mercedes/i, full: 'Mercedes-AMG Petronas F1 Team', logo: 'mer.png', color: '#27F4D2' },
  { re: /mclaren/i, full: 'McLaren Formula 1 Team', logo: 'mcl.png', color: '#FF8000' },
  { re: /aston martin/i, full: 'Aston Martin Aramco F1 Team', logo: 'amr.png', color: '#229971' },
  { re: /alpine/i, full: 'BWT Alpine F1 Team', logo: 'alp.png', color: '#FF87BC' },
  { re: /williams/i, full: 'Williams Racing', logo: 'wil.png', color: '#64C4FF' },
  { re: /haas/i, full: 'MoneyGram Haas F1 Team', logo: 'haa.png', color: '#B6BABD' },
  { re: /sauber/i, full: 'Stake F1 Team Kick Sauber', logo: 'sau.png', color: '#52E252' },
  { re: /audi/i, full: 'Audi F1 Team', logo: 'audi.png', color: '#D0D3D4' },
  { re: /cadillac/i, full: 'Cadillac Formula 1 Team', logo: 'cad.png', color: '#8A6D3B' },
];

function getTeamMeta(nameOrFull) {
  const s = (nameOrFull || '').toString();
  for (const t of TEAM_REGISTRY) {
    if (t.re.test(s)) {
      return {
        full: t.full, logo: `assets/teams/${t.logo}`, avatar: `assets/drivers/${t.logo}`,
        car: `assets/cars/${t.logo}`, color: t.color,
      };
    }
  }
  return { full: s || t('unknownTeam'), logo: null, avatar: null, car: null, color: null };
}

/** Driver avatar - prawdziwy avatar Discorda kierowcy (avatarUrl z driverIndex, wypychany przez
 *  bota), a gdy go jeszcze nie ma (kierowca bez konta/roli w Discordzie), spada na generyczną
 *  maskotkę drużynową jak dawniej. Drugi argument jest opcjonalny - stare wywołania bez niego
 *  nadal działają, po prostu zawsze dostają maskotkę. */
function driverAvatar(teamNameOrFull, avatarUrl) {
  return avatarUrl || getTeamMeta(teamNameOrFull).avatar;
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

/** Nazwa kraju → kod ISO (flagcdn.com). Zasila zarówno flagi torów
 *  (trackFlag(), kraj gospodarza GP) jak i flagi narodowości kierowców
 *  (nationalityFlag(), kraj kierowcy z sklad.json) — jeden wspólny słownik,
 *  rozszerzony o kraje spoza kalendarza GP, które realnie pojawiają się jako
 *  narodowości kierowców w polskiej lidze sim-racingowej. */
const COUNTRY_CODES = {
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
  // Kraje spoza kalendarza GP, przydatne jako narodowości kierowców:
  'Germany': 'de', 'France': 'fr', 'Portugal': 'pt', 'Czechia': 'cz',
  'Czech Republic': 'cz', 'Slovakia': 'sk', 'Ukraine': 'ua', 'Lithuania': 'lt',
  'Latvia': 'lv', 'Estonia': 'ee', 'Romania': 'ro', 'Sweden': 'se',
  'Norway': 'no', 'Denmark': 'dk', 'Finland': 'fi', 'Switzerland': 'ch',
  'Ireland': 'ie', 'Russia': 'ru', 'Turkey': 'tr', 'Greece': 'gr',
  'Croatia': 'hr', 'Serbia': 'rs', 'Slovenia': 'si', 'Bulgaria': 'bg',
  'Iceland': 'is', 'Luxembourg': 'lu', 'New Zealand': 'nz', 'South Africa': 'za',
  'India': 'in', 'South Korea': 'kr', 'Indonesia': 'id', 'Argentina': 'ar',
  'Chile': 'cl', 'Colombia': 'co', 'Israel': 'il', 'Egypt': 'eg', 'Morocco': 'ma',
};

function trackFlag(country) {
  const code = COUNTRY_CODES[country];
  if (!code) return icon('flag', 'icon-flag-fallback');
  return '<img src="https://flagcdn.com/w40/' + code + '.png" alt="' + country + '" class="track-flag-img" onerror="flagImgFallback(this)">';
}

/** Flaga narodowości kierowcy (kraj z sklad.json), ten sam wzorzec co
 *  trackFlag() — te same kody, ten sam CDN, ten sam fallback na ikonę SVG. */
function nationalityFlag(country) {
  if (!country) return '';
  const code = COUNTRY_CODES[country];
  if (!code) return icon('flag', 'icon-flag-fallback driver-flag-fallback');
  return '<img src="https://flagcdn.com/w40/' + code + '.png" alt="' + country + '" class="driver-flag-img" onerror="flagImgFallback(this)">';
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

// Seasons config — add more seasons here as needed. `name` is just the bare
// season NUMBER (used as the object key / lookup value everywhere in the
// code and, since Część 2, in the admin panel's own "Sezon" field too) —
// deliberately decoupled from `folder`, which keeps the existing "Sezon N"
// physical folder naming on disk/GitHub. Display text is built from `name`
// via seasonLabel(), never shown raw.
const SEASONS_CONFIG = [
  { name: '1', folder: 'Wyniki/Sezon 1' },
  { name: '2', folder: 'Wyniki/Sezon 2' },
  { name: '3', folder: 'Wyniki/Sezon 3' },
];

// Calendar seasons config — mirror of SEASONS_CONFIG
const CALENDAR_SEASONS_CONFIG = [
  { name: '1', folder: 'Kalendarz/Sezon 1' },
  { name: '2', folder: 'Kalendarz/Sezon 2' },
  { name: '3', folder: 'Kalendarz/Sezon 3' },
];

// Tiers — every season folder is now split into Tier 1 / Tier 2 / Tier 3 subfolders
const TIERS = ['Tier 1', 'Tier 2', 'Tier 3'];
const DEFAULT_TIER = 'Tier 1';

// Known files per season+tier (fallback if no manifest) — auto-populated from what we discover
// In production: add a manifest.json to each Tier folder listing the .json files
const KNOWN_FILES = {
  '1': { 'Tier 1': ['polaris_race_sezon_1_e01_20260614_0000.json'], 'Tier 2': [], 'Tier 3': [] },
  '2': { 'Tier 1': [], 'Tier 2': [], 'Tier 3': [] },
  '3': { 'Tier 1': [], 'Tier 2': [], 'Tier 3': [] },
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

/* Klucze i18n zamiast sztywnych polskich etykiet — SESSION_TYPE_LABELS()
 *  jest funkcją (nie stałym obiektem), żeby zawsze czytać aktualny język. */
function SESSION_TYPE_LABELS() {
  return {
    'Qualifying Sprint': t('sessionType.qualiSprint'),
    'Sprint': t('sessionType.sprint'),
    'Qualifying': t('sessionType.qualifying'),
    'Race': t('sessionType.race'),
  };
}
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
    // Zawsze parametr `seasonName` (poprawnie wyznaczony przez SEASONS_CONFIG
    // w loadRacesFor()), NIGDY wolnotekstowe pole z samego pliku JSON — to
    // pole potrafiło się różnić plik od pliku ("Sezon 1"/"SEZON 1"/"Season 1"),
    // co psuło dopasowanie do kluczy allSeasons (np. link "Pełne wyniki →"
    // ze strony głównej prowadził donikąd, gdy się nie zgadzało).
    season: seasonName,
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
      reason: sess.driverOfTheDay.reason || '', // stare, jednojęzyczne pole — fallback w biText()
      reason_pl: sess.driverOfTheDay.reason_pl || '',
      reason_en: sess.driverOfTheDay.reason_en || '',
    } : null,
    bestManeuver: sess.bestManeuver?.url ? {
      url: sess.bestManeuver.url,
      title: sess.bestManeuver.title || '',
      driver: sess.bestManeuver.driver || '',
      description: sess.bestManeuver.description || '',
      // Ścieżka względna repo (bez http/https) = plik własny, ta sama
      // konwencja co klipy Hall of Fame — pozwala autoThumbnailClips()
      // wygenerować miniaturkę automatycznie, tak samo jak tam.
      type: /^https?:\/\//i.test(sess.bestManeuver.url) ? undefined : 'file',
      thumbnailUrl: sess.bestManeuver.thumbnailUrl || null,
    } : null,
    // Race incident/DSQ/quali-ban dotyczące TEJ sesji (patrz addPenaltyNoteToResultsFile/
    // applyPendingPenaltyNotes w bocie) - renderowane pod tabelą wyników, patrz renderSessionResults.
    penaltyNotes: Array.isArray(sess.penaltyNotes) ? sess.penaltyNotes : [],
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
function computeDriverStandings(races, roster, driverIndex) {
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
  let list = Object.values(map);
  if (roster) {
    // Ten sam wzorzec co computeConstructorStandings: jeśli plik składu
    // istnieje dla tego Tieru, jest JEDYNYM źródłem prawdy o tym, kto
    // pojawia się w klasyfikacji — kierowca spoza sklad.json nie jest
    // pokazywany, nawet jeśli zdobywał punkty. Tylko brak pliku w ogóle
    // (roster === null) cofa się do „każdy, kto kiedykolwiek zdobył punkty".
    // UWAGA: d.driver to Nick Racetools (klucz z pliku wyników), NIE nick Steam - `roster` (rosterMap)
    // zawiera tylko nicki Steam (wyświetlane), więc do samego filtrowania trzeba użyć driverIndex
    // (kluczowanego zarówno po Nicku Racetools jak i po nicku Steam, patrz loadSklad) zamiast roster.
    const known = driverIndex ? new Set(Object.keys(driverIndex)) : new Set(Object.values(roster).flat());
    list = list.filter(d => known.has(d.driver));
  }

  return list
    .sort((a, b) => b.points - a.points || b.wins - a.wins)
    .map((d, i) => ({ ...d, pos: i + 1 }));
}

/* Compute constructor standings from races — same points-scoring-sessions filter as drivers. */
/** Akceptuje stary format sklad.json (drivers: [string]) albo nowy
 *  (drivers: [{name, racetoolsNick, number, country, avatarUrl, nickDiscord, driverId}]) i zwraca
 *  ujednoliconą tablicę {name, racetoolsNick, number, country, avatarUrl, nickDiscord, driverId} —
 *  number to liczba albo null, reszta to string albo null (puste = brak, nie błąd — wszystkie są
 *  opcjonalne poza name; racetoolsNick/avatarUrl/nickDiscord/driverId istnieją tylko w nowym
 *  eksporcie bota, stary format ich nie ma). `name` to zawsze nick Steam ("nick w F1", WYŚWIETLANY) —
 *  `racetoolsNick` to osobny, techniczny klucz łączący z Wyniki/*.json (patrz loadSklad). */
function normalizeSkladDrivers(rawDrivers) {
  if (!Array.isArray(rawDrivers)) return [];
  return rawDrivers.map(d => {
    if (typeof d === 'string') {
      const name = d.trim();
      return name ? { name, racetoolsNick: null, number: null, country: '', avatarUrl: null, nickDiscord: null, driverId: null } : null;
    }
    if (d && typeof d === 'object' && typeof d.name === 'string') {
      const name = d.name.trim();
      if (!name) return null;
      const n = parseInt(d.number, 10);
      return {
        name, number: isNaN(n) ? null : n, country: (d.country || '').trim(),
        racetoolsNick: (d.racetoolsNick || '').toString().trim() || null,
        avatarUrl: (d.avatarUrl || '').trim() || null,
        nickDiscord: (d.nickDiscord || '').trim() || null,
        driverId: (d.driverId || '').toString().trim() || null,
      };
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
  // Bot eksportuje skład teraz płasko jako Sklady/Stawka_tier_N.json (ten sam kształt danych,
  // wysyłany przez commit do repo — patrz panel #panel-strony bota) — to ma pierwszeństwo.
  // Sklady/Tier N/sklad.json to starsze, zamrożone pliki, trzymane jako fallback, dopóki bot nie
  // zrobi pierwszego realnego eksportu na ten Tier.
  const tierNum = (tier.match(/\d+/) || [''])[0];
  const data = (await tryFetch(`Sklady/Stawka_tier_${tierNum}.json`)) || (await tryFetch(`Sklady/${tier}/sklad.json`));
  if (!data || !Array.isArray(data.teams)) return { rosterMap: null, driverIndex: {}, driverIndexById: {} };
  const rosterMap = {};
  const driverIndex = {};
  // driverIndexById (Discord ID -> ten sam rekord co driverIndex) - pozwala np. Punktom karnym
  // pokazywać zawsze najświeższy zarejestrowany nick EA/Steam, zamiast zamrożonego stringu z
  // momentu wydania kary (patrz renderPunktyKarneList).
  const driverIndexById = {};
  data.teams.forEach(t => {
    const canonical = getTeamMeta(t.team).full;
    const drivers = normalizeSkladDrivers(t.drivers);
    rosterMap[canonical] = drivers.map(d => d.name);
    drivers.forEach(d => {
      const entry = { team: canonical, number: d.number, country: d.country, avatarUrl: d.avatarUrl, nickDiscord: d.nickDiscord, name: d.name };
      // Klucz PODWÓJNY: racetoolsNick (główny - tym nickiem identyfikują kierowców NOWE pliki
      // Wyniki/*.json, eksportowane z Racing League Tools) i name/nick Steam (fallback - kierowcy bez
      // jeszcze przypisanego Nicku Racetools w #stawka-admin, i wszystkie stare archiwalne pliki,
      // które dopasowywały się po tym samym nicku zanim istniało rozróżnienie Racetools/Steam).
      // Oba klucze wskazują na TEN SAM rekord, więc .name (wyświetlany) jest zawsze aktualnym nickiem
      // Steam niezależnie pod którym kluczem trafił tu wynik.
      if (d.racetoolsNick) driverIndex[d.racetoolsNick] = entry;
      driverIndex[d.name] = entry;
      if (d.driverId) driverIndexById[d.driverId] = entry;
    });
  });
  return { rosterMap, driverIndex, driverIndexById };
}

/** Wyniki/*.json identyfikują kierowców po Nicku Racetools (techniczny klucz, nigdy nie ma się
 *  wyświetlać) — ta funkcja zamienia go na przyjazny, aktualny nick Steam z bieżącego składu (patrz
 *  driverIndex w loadSklad, kluczowany zarówno po racetoolsNick jak i po nicku Steam). Gdy kierowcy
 *  nie ma w bieżącym składzie (odszedł, albo archiwalny wynik) — pokazuje surowy string z pliku
 *  wyników jako fallback, zamiast pustki. Wołać wszędzie tam, gdzie surowy driverName z wyniku trafia
 *  na ekran jako WIDOCZNY tekst (nie tylko jako klucz do driverIndex[...] po metadane). */
function resolveDriverName(driverIndex, rawName) {
  return driverIndex?.[rawName]?.name || rawName;
}

/** Jak loadSklad(), ale zwraca listę drużyn z pełnymi obiektami kierowców
 *  (nie spłaszczoną do samych nazw jak rosterMap/driverIndex) — potrzebne na
 *  stronie Lineup, gdzie karta jest per drużyna, nie per kierowca. Drużyny
 *  bez ani jednego kierowcy są pomijane (nic sensownego do pokazania). */
async function loadSkladTeams(tier) {
  // Ten sam fallback co loadSklad() — nowy eksport bota ma pierwszeństwo, stary plik zostaje jako
  // fallback dopóki bot nie zrobi pierwszego realnego eksportu na ten Tier.
  const tierNum = (tier.match(/\d+/) || [''])[0];
  const data = (await tryFetch(`Sklady/Stawka_tier_${tierNum}.json`)) || (await tryFetch(`Sklady/${tier}/sklad.json`));
  if (!data || !Array.isArray(data.teams)) return [];
  return data.teams
    .map(t => ({ meta: getTeamMeta(t.team), drivers: normalizeSkladDrivers(t.drivers) }))
    .filter(t => t.drivers.length);
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
/** detail (optional) = { kind: 'race'|'season', data } — when present, wraps
 *  the cell in a ".dd" hover-expand with a pre-rendered detail panel; when
 *  omitted, renders exactly the plain cell (unchanged for any call site that
 *  doesn't opt in). See renderDriverDetailContent(). */
function renderDriverCell(d, leadingBadges, driverIndex, detail) {
  const info = driverIndex?.[d.driver];
  const avatar = driverAvatar(d.teamFull || d.team, info?.avatarUrl);
  const num = info?.number ?? null;
  const country = info?.country || '';
  const nickDiscord = info?.nickDiscord || '';
  // d.driver to Nick Racetools (klucz z pliku wyników) - info.name to zawsze aktualny nick Steam.
  const nameDisplay = `<span class="driver-name">${info?.name || d.driver}</span>`
    + (d.realName ? `<span class="driver-realname">${d.realName}</span>` : '')
    + (nickDiscord ? `<span class="driver-discord-nick">@${nickDiscord}</span>` : '');

  const badges = [];
  if (d.penaltySeconds > 0) {
    badges.push(`<span class="penalty-badge" title="${escHtml(d.penaltyReason) || t('penalty.time')}">+${d.penaltySeconds}s</span>`);
  }
  if (d.penaltyRemovedSeconds > 0) {
    badges.push(`<span class="penalty-badge penalty-badge-removed" title="${escHtml(d.penaltyRemovedReason) || t('penalty.removed')}">−${d.penaltyRemovedSeconds}s</span>`);
  }
  if (d.positionPenalty > 0) {
    badges.push(`<span class="penalty-badge penalty-badge-pos" title="${escHtml(d.positionPenaltyReason) || t('penalty.pos')}">${icon('chevronDown')}${d.positionPenalty} ${t('penalty.posSuffix')}</span>`);
  }

  const cell = `<div class="driver-cell">
    ${leadingBadges || ''}
    ${avatar ? `<img class="driver-cell-avatar" src="${avatar}" alt="" loading="lazy" onerror="this.remove()">` : `<span class="team-dot" style="background:${hexColor(d.teamColor)}"></span>`}
    ${num !== null ? `<span class="driver-number">${num}</span>` : ''}
    ${country ? `<span class="driver-flag">${nationalityFlag(country)}</span>` : ''}
    <div>${nameDisplay}</div>
    ${badges.join('')}
  </div>`;

  if (!detail) return cell;

  return `<div class="dd" tabindex="0">
    <div class="dd-trigger">${cell}</div>
    <div class="dd-panel"><div class="dd-panel-inner"><div class="dd-panel-content">${renderDriverDetailContent(detail.kind, detail.data)}</div></div></div>
  </div>`;
}

function escHtml(s) {
  return s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : '';
}

function renderStandingsTable(standings, containerId, driverIndex, seasonStats) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!standings.length) {
    el.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
    return;
  }
  el.innerHTML = `
    <div class="standings-wrap table-wrap">
      <table class="standings standings-drivers">
        <thead>
          <tr>
            <th>${t('pos')}</th>
            <th>${t('driver')}</th>
            <th>${t('team')}</th>
            <th class="right">${t('wins')}</th>
            <th class="right">${t('podiums')}</th>
            <th class="right">${t('points')}</th>
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
            const detail = { kind: 'season', data: seasonStats?.[d.driver] || emptySeasonStats() };
            return `
            <tr>
              <td><span class="standing-pos ${posRankClass(d.pos)}">${d.pos}</span></td>
              <td>${renderDriverCell(rowDriver, null, driverIndex, detail)}</td>
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

function renderConstructorsTable(constructors, containerId, driverIndex, seasonStats) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!constructors.length) {
    el.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
    return;
  }
  el.innerHTML = `
    <div class="standings-wrap table-wrap">
      <table class="standings standings-constructors">
        <thead>
          <tr>
            <th>${t('pos')}</th>
            <th>${t('constructor')}</th>
            <th>${t('drivers')}</th>
            <th class="right">${t('wins')}</th>
            <th class="right">${t('podiums')}</th>
            <th class="right">${t('points')}</th>
          </tr>
        </thead>
        <tbody>
          ${constructors.map(c => `
            <tr>
              <td><span class="standing-pos ${posRankClass(c.pos)}">${c.pos}</span></td>
              <td>${renderTeamBadge(c.team, 'md')}</td>
              <td><div class="driver-pill-row">${c.drivers.map(name => renderDriverPill(name, driverIndex, seasonStats)).join('')}</div></td>
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
    `<button class="season-tab ${name === activeSeasonName ? 'active' : ''}" data-season="${name}">${seasonLabel(name)}</button>`
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
/** Statystyki serwera Discord (Faza 3) - eksportowane cyklicznie przez bota (patrz
 *  exportDiscordStats w Bot/index.js), niezależne od danych wyścigowych powyżej - stąd osobny fetch
 *  i osobna, cicha awaria (brak pliku = sekcja po prostu się nie pokazuje, nie blokuje reszty strony). */
function renderDiscordStats(stats) {
  const el = document.getElementById('discord-stats');
  if (!el) return;
  if (!stats) { el.innerHTML = ''; return; }

  const newest = stats.newestMember;
  el.innerHTML = `
    <div class="stats-strip">
      <div class="stat-tile">
        <span class="stat-tile-label">${t('discordStats.members')}</span>
        <span class="stat-tile-value"><span data-count="${stats.memberCount ?? 0}">0</span></span>
      </div>
      <div class="stat-tile">
        <span class="stat-tile-label">${t('discordStats.drivers')}</span>
        <span class="stat-tile-value"><span data-count="${stats.driverCount ?? 0}">0</span></span>
      </div>
      <div class="stat-tile">
        <span class="stat-tile-label">${t('discordStats.newest')}</span>
        <span class="stat-tile-value" style="font-size:16px">${newest ? `${newest.avatarUrl ? `<img class="chip-avatar" src="${newest.avatarUrl}" alt="" onerror="this.remove()">` : ''}${escHtml(newest.name)}` : '—'}</span>
      </div>
    </div>`;
  observeCounters();
}

async function initIndex() {
  const [allSeasons, allCalendars, { rosterMap: homeRoster, driverIndex }, discordStats] = await Promise.all([
    loadAllRaces(), loadAllCalendars(), loadSklad(DEFAULT_TIER), tryFetch('Discord/stats.json'),
  ]);
  renderDiscordStats(discordStats);
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
  // Unfiltered (all session types) — computeDriverSeasonStats() needs
  // Qualifying sessions for pole positions, which the Race-only latestRaces
  // below deliberately excludes.
  const latestSeasonAllSessions = racesForTier(allSeasons, latestSeason, DEFAULT_TIER);
  const seasonStats = computeDriverSeasonStats(latestSeasonAllSessions);
  const latestRaces = latestSeasonAllSessions.filter(r => r.sessionType === 'Race');
  const calRoundsForSeason = calendarForTier(allCalendars, latestSeason, DEFAULT_TIER);
  const totalRounds = calRoundsForSeason.length || latestRaces.length;
  document.getElementById('stat-rounds').textContent =
    totalRounds ? `${latestRaces.length}/${totalRounds}` : '—';

  // Hero tło na stałe ustawione na Spa (wybór designerski użytkownika —
  // "wyglądał najlepiej"), zamiast dynamicznie dobieranego zdjęcia
  // najbliższej/ostatniej rundy jak wcześniej.
  applyHeroTrackBackground(document.getElementById('hero-bg'), 'Spa');

  // Last race (most recent completed Race session across all seasons)
  const lastRace = raceSessionsOnly.filter(r => r.status === 'completed').pop();
  if (lastRace) renderLastRaceCard(lastRace, driverIndex);
  else document.getElementById('last-race').innerHTML = `<p style="color:var(--gray)">${t('empty.generic')}</p>`;

  // Mini standings
  const latestDrivers = computeDriverStandings(latestRaces, homeRoster, driverIndex);
  renderStandingsTable(latestDrivers.slice(0, 5), 'standings-mini', driverIndex, seasonStats);

  // Mini constructors
  const latestConstructors = computeConstructorStandings(latestRaces, homeRoster);
  renderConstructorsTable(latestConstructors.slice(0, 5), 'constructors-mini', driverIndex, seasonStats);

  // News teaser (latest 3) from the dedicated Aktualności page's data
  const newsData = await tryFetch('Aktualnosci/aktualnosci.json');
  const articles = (newsData?.articles || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  if (articles.length) renderNews(articles.slice(0, 3));
  else document.getElementById('news-grid').innerHTML = `<p style="color:var(--gray)">${t('empty.generic')}</p>`;

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
          <div class="race-meta-item">${icon('laps','icon-lg')}<strong>${t('round')} ${r.round}</strong> · ${r.totalLaps} ${t('laps')}</div>
          <div class="race-meta-item"><span class="icon icon-flag">${r.flag}</span><strong>${r.track}</strong></div>
        </div>
        <div class="podium-row">
          ${top3.map((d,i) => `
            <div class="podium-item">
              <span class="podium-pos ${posClass[i]}">${posEmoji[i]}</span>
              ${driverAvatar(d.teamFull || d.team, driverIndex?.[d.driver]?.avatarUrl) ? `<img class="podium-avatar" src="${driverAvatar(d.teamFull || d.team, driverIndex?.[d.driver]?.avatarUrl)}" alt="" onerror="this.style.display='none'">` : ''}
              <div>
                <div class="podium-driver">${driverIndex?.[d.driver]?.number !== null && driverIndex?.[d.driver]?.number !== undefined ? `<span class="driver-number">${driverIndex[d.driver].number}</span>` : ''}${driverIndex?.[d.driver]?.country ? `<span class="driver-flag">${nationalityFlag(driverIndex[d.driver].country)}</span>` : ''}${resolveDriverName(driverIndex, d.driver)}</div>
                <div class="podium-team">${renderTeamBadge(d.teamFull || d.team)}</div>
              </div>
              <span class="podium-pts">${d.points} ${t('ptsSuffix')}</span>
            </div>
          `).join('')}
        </div>
        <a href="wynik-wydarzenia.html?season=${encodeURIComponent(r.season)}&tier=${encodeURIComponent(DEFAULT_TIER)}&round=${r.round}" class="btn btn-outline" style="margin-top:0.5rem;justify-content:center;font-size:12px">
          ${t('cta.fullResults')}
        </a>
      </div>
      <div>
        <div class="table-wrap">
          <table class="results">
            <thead>
              <tr>
                <th>#</th>
                <th>${t('driver')}</th>
                <th>${t('team')}</th>
                <th class="right">${t('gap')}</th>
                <th class="right">${t('status')}</th>
                <th class="right">${t('pts')}</th>
              </tr>
            </thead>
            <tbody>
              ${r.raceResults.map(d => `
                <tr>
                  <td>${posBadge(d.pos)}</td>
                  <td>${renderDriverCell(d, null, driverIndex, { kind: 'race', data: { ...d, showPoints: true } })}</td>
                  <td>${renderTeamBadge(d.teamFull || d.team)}</td>
                  <td class="right"><span class="gap-text">${d.gap}</span></td>
                  <td class="right"><span class="status-fin"${d.status === 'DSQ' && d.positionPenaltyReason ? ` title="${escHtml(d.positionPenaltyReason)}"` : ''}>${displayStatus(d.status)}</span></td>
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
        <div class="news-title">${biText(first, 'title')}</div>
        <div class="news-body">${biText(first, 'body')}</div>
        <div class="news-date">${fmtDate(first.date)}</div>
      </div>
      ${rest.map(n => `
        <div class="news-card">
          <div class="news-type">${n.type}</div>
          <div class="news-title">${biText(n, 'title')}</div>
          <div class="news-body">${biText(n, 'body')}</div>
          <div class="news-date">${fmtDate(n.date)}</div>
        </div>
      `).join('')}
    </div>`;
}

/* ─── AKTUALNOŚCI PAGE ───────────────────────────── */
/** Small "Liga w liczbach" strip — total completed races / unique drivers /
 *  seasons across the league's history (Tier 1, same convention as the
 *  homepage's own all-time stats). Reuses the existing .stats-strip/
 *  .stat-tile styling, just with a different set of numbers. */
async function renderLeagueStats(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const allSeasons = await loadAllRaces();
  const seasonNames = Object.keys(allSeasons);
  if (!seasonNames.length) return;
  const allRaces = seasonNames.flatMap(name => racesForTier(allSeasons, name, DEFAULT_TIER));
  const completedRaces = allRaces.filter(r => r.sessionType === 'Race' && r.status === 'completed');
  const allDrivers = new Set(completedRaces.flatMap(r => r.raceResults.map(d => d.driver)));
  el.innerHTML = `
    <div class="stats-strip reveal">
      <div class="stat-tile"><span class="stat-tile-label">${t('league.races')}</span><span class="stat-tile-value"><span data-count="${completedRaces.length}">0</span></span></div>
      <div class="stat-tile"><span class="stat-tile-label">${t('league.drivers')}</span><span class="stat-tile-value"><span data-count="${allDrivers.size}">0</span></span></div>
      <div class="stat-tile"><span class="stat-tile-label">${t('league.seasons')}</span><span class="stat-tile-value"><span data-count="${seasonNames.length}">0</span></span></div>
    </div>`;
  observeCounters();
}

/** Ogłoszenia z Discord (#ogłoszenia, publikowane przez /panel-admin -> "Publikuj ogłoszenie") -
 *  osobne źródło od ręcznie pisanych Aktualności z #panel-strony, stąd osobna zakładka zamiast
 *  scalania w jedną listę. Jednojęzyczne (bot pisze po polsku), bez biText(). */
function renderOgloszeniaDiscord(list) {
  const el = document.getElementById('news-grid');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
    return;
  }
  const [first, ...rest] = list;
  const card = (o, featured) => `
    <div class="news-card${featured ? ' news-card-featured' : ''}">
      <div class="news-title">${o.naglowek}</div>
      <div class="news-body">${o.tresc}</div>
      ${o.footer ? `<div class="news-body" style="opacity:.7;font-size:.9em">${o.footer}</div>` : ''}
      <div class="news-date">${fmtDate(new Date(o.timestamp).toISOString().slice(0, 10))} · ${o.authorTag || ''}</div>
    </div>`;
  el.innerHTML = `<div class="news-grid">${card(first, true)}${rest.map((o) => card(o, false)).join('')}</div>`;
}

async function initAktualnosci() {
  initHeroPhotoCarousel(document.getElementById('aktualnosci-hero'));
  renderLeagueStats('league-stats');

  const [aktData, oglData] = await Promise.all([
    tryFetch('Aktualnosci/aktualnosci.json'),
    tryFetch('Aktualnosci/ogloszenia_discord.json'),
  ]);
  const articles = (aktData?.articles || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const ogloszenia = (oglData?.ogloszenia || []).slice().sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const tabs = [
    {
      key: 'akt',
      label: t('nav.news'),
      render: () => {
        if (articles.length) return renderNews(articles);
        const el = document.getElementById('news-grid');
        if (el) el.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
      },
    },
    { key: 'discord', label: 'Ogłoszenia z Discord', render: () => renderOgloszeniaDiscord(ogloszenia) },
  ];
  const tabsEl = document.getElementById('aktualnosci-tabs');
  let active = 'akt';
  const renderActive = () => tabs.find((tb) => tb.key === active).render();
  if (tabsEl) {
    tabsEl.innerHTML = tabs.map((tb) => `<button class="season-tab ${tb.key === active ? 'active' : ''}" data-tab="${tb.key}">${tb.label}</button>`).join('');
    tabsEl.querySelectorAll('.season-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        active = btn.dataset.tab;
        tabsEl.querySelectorAll('.season-tab').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderActive();
        observeReveal();
      });
    });
  }
  renderActive();
  observeReveal();
}

/* ─── PARTNERSTWA PAGE ───────────────────────────── */
// Kolejność wyświetlania wg priorytetu ustawionego w panelu administracyjnym
// (Wysoki/Średni/Niski) — priorytet sam w sobie NIGDY nie jest pokazywany
// jako tekst na stronie, tylko wpływa na kolejność (ta funkcja) i rozmiar
// karty (klasa .partner-card-high/-low niżej). Partner bez pola priority
// (starsze dane) domyślnie traktowany jak Średni.
const PARTNER_PRIORITY_RANK = { wysoki: 0, sredni: 1, niski: 2 };
function sortPartnersByPriority(partners) {
  return partners.slice().sort((a, b) =>
    (PARTNER_PRIORITY_RANK[a.priority] ?? 1) - (PARTNER_PRIORITY_RANK[b.priority] ?? 1));
}

function renderPartners(partners, containerId) {
  const el = document.getElementById(containerId || 'partners-grid');
  if (!el) return;
  if (!partners.length) {
    el.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
    return;
  }
  const sorted = sortPartnersByPriority(partners);
  const card = (p) => {
    const logo = p.logo
      ? `<img class="partner-logo" src="${p.logo}" alt="" loading="lazy" onerror="this.parentElement.classList.add('partner-logo-fallback');this.remove()">`
      : `<span class="partner-logo-fallback-text">${escHtml((p.name || '?').charAt(0).toUpperCase())}</span>`;
    return `
      <div class="partner-logo-wrap">${logo}</div>
      <div class="partner-name">${p.name}</div>
      ${p.tier ? `<span class="partner-tier">${p.tier}</span>` : ''}
      ${biText(p, 'description') ? `<p class="partner-desc">${biText(p, 'description')}</p>` : ''}
      ${p.url ? `<span class="partner-link">${t('cta.visitSite')}</span>` : ''}
    `;
  };
  el.innerHTML = `<div class="partners-grid">${sorted.map(p => {
    const sizeClass = p.priority === 'wysoki' ? ' partner-card-high' : p.priority === 'niski' ? ' partner-card-low' : '';
    return p.url
      ? `<a class="partner-card${sizeClass}" href="${p.url}" target="_blank" rel="noopener">${card(p)}</a>`
      : `<div class="partner-card${sizeClass}">${card(p)}</div>`;
  }).join('')}</div>`;
  observeReveal();
}

async function initPartnerstwa() {
  initHeroPhotoCarousel(document.getElementById('partnerstwa-hero'));
  const data = await tryFetch('Partnerstwa/partnerstwa.json');
  renderPartners(data?.partners || [], 'partners-grid');
}

/* ─── WYNIKI PAGE ────────────────────────────────── */
/** Podium ostatniej rozegranej rundy — cieńszy wariant renderFeaturedRound(),
 *  reużywa renderPodiumRow() (ta sama sesja renderowania co pełne wyniki
 *  wydarzenia) + link "Pełne wyniki →" do wynik-wydarzenia.html. */
function renderResultsPodium(lastRace, driverIndex, linkCtx) {
  if (!lastRace) return '';
  const top3 = lastRace.raceResults.slice(0, 3);
  if (!top3.length) return '';
  const href = `wynik-wydarzenia.html?season=${encodeURIComponent(linkCtx.season)}&tier=${encodeURIComponent(linkCtx.tier)}&round=${lastRace.round}`;
  return `
    <div class="section-header reveal">
      <span class="section-label">${t('round')} ${lastRace.round} · ${lastRace.track}</span>
      <h2 class="section-title">${t('wyniki.lastPodium')}</h2>
      <div class="section-divider"></div>
    </div>
    ${renderPodiumRow(top3, driverIndex)}
    <a class="btn btn-outline reveal" href="${href}" style="margin:0 0 1rem">${t('cta.fullResults')}</a>`;
}

/** Mniejszy, jednowierszowy odpowiednik renderConstructorsSummary() — tylko
 *  lider + przewaga, celowo bez mostWins/mostPodiums, żeby nie dublować tego,
 *  co już pokazuje pasek kierowców tuż obok. */
function renderConstructorLeaderChip(constructors, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (constructors.length < 2) { el.innerHTML = ''; return; }
  const leader = constructors[0];
  const gap = leader.points - constructors[1].points;
  el.innerHTML = `
    <div class="constructor-leader-chip reveal">
      <span class="team-dot" style="background:${hexColor(leader.teamColor)}"></span>
      <span class="constructor-leader-label">${t('wyniki.constructorLeader')}</span>
      <strong class="constructor-leader-team">${leader.team}</strong>
      <span class="constructor-leader-points">${leader.points} ${t('ptsSuffix')}</span>
      <span class="constructor-leader-gap">+${gap} ${t('over')} ${constructors[1].team}</span>
    </div>`;
}

/** Czy przewaga lidera klasyfikacji kierowców rośnie czy maleje względem
 *  stanu sprzed ostatniej rundy — a jeśli lider się zmienił, to ważniejsza
 *  wiadomość niż sama przewaga. Zwraca null, gdy za mało danych (< 2 rundy)
 *  do sensownego porównania. */
function computeLeaderTrend(races, raceSessions, standings, rosterMap, driverIndex) {
  if (raceSessions.length < 2 || standings.length < 2) return null;
  const prevRound = raceSessions[raceSessions.length - 2].round;
  const prevStandings = computeDriverStandings(races.filter(r => r.round <= prevRound), rosterMap, driverIndex);
  if (prevStandings.length < 2) return null;
  if (standings[0].driver !== prevStandings[0].driver) return { type: 'new' };
  const gapNow = standings[0].points - standings[1].points;
  const gapPrev = prevStandings[0].points - prevStandings[1].points;
  if (gapNow > gapPrev) return { type: 'up' };
  if (gapNow < gapPrev) return { type: 'down' };
  return { type: 'flat' };
}

function renderLeaderTrend(trend, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const map = {
    up:   { cls: 'up',   arrow: '▲', key: 'wyniki.trendUp' },
    down: { cls: 'down', arrow: '▼', key: 'wyniki.trendDown' },
    new:  { cls: 'new',  arrow: '★', key: 'wyniki.trendNew' },
  };
  const m = trend && map[trend.type];
  el.innerHTML = m ? `<div class="leader-trend leader-trend-${m.cls} reveal"><span class="leader-trend-arrow">${m.arrow}</span>${t(m.key)}</div>` : '';
}

/** Ostatnie do 6 rozegranych rund z wgranym najlepszym manewrem, najnowsze
 *  pierwsze — miniaturki przez clipThumbnail()/.hof-thumb-wrap (ten sam
 *  komponent co Hall of Fame, reużyty 1:1), ale linkujące do
 *  wynik-wydarzenia.html tej konkretnej rundy — to NIE są klipy z
 *  kuratorowanej listy HOF, więc renderFeaturedCard()'s hall-of-fame-clip.html
 *  link tu nie pasuje. */
async function renderHighlightsStrip(raceSessions, linkCtx) {
  const withClips = raceSessions.filter(s => s.bestManeuver).slice().reverse().slice(0, 6);
  if (!withClips.length) return '';
  await autoThumbnailClips(withClips.map(s => s.bestManeuver));
  return `
    <div class="section-header reveal">
      <h2 class="section-title">${t('wyniki.highlights')}</h2>
      <div class="section-divider"></div>
    </div>
    <div class="highlights-strip reveal">
      ${withClips.map(session => {
        const clip = session.bestManeuver;
        const thumb = clipThumbnail(clip);
        const href = `wynik-wydarzenia.html?season=${encodeURIComponent(linkCtx.season)}&tier=${encodeURIComponent(linkCtx.tier)}&round=${session.round}`;
        return `
        <a class="highlight-card" href="${href}">
          ${thumb
            ? `<div class="hof-thumb-wrap"><img src="${thumb}" alt="" loading="lazy" onerror="this.parentElement.classList.add('hof-thumb-fallback')"><span class="hof-play-overlay">${icon('play')}</span></div>`
            : `<div class="hof-thumb-wrap hof-thumb-fallback"><span class="hof-play-overlay">${icon('play')}</span></div>`}
          <div class="highlight-card-info">
            <span class="highlight-card-round">${t('round')} ${session.round}</span>
            <span class="highlight-card-track">${session.track}</span>
          </div>
        </a>`;
      }).join('')}
    </div>`;
}

/** Kompaktowa, rozwijana lista rozegranych rund — jeden wiersz na rundę (nr,
 *  tor+flaga, zwycięzca, najszybsze okrążenie); klik rozwija podium + najsz.
 *  okrążenie + Kierowcę Dnia w miejscu. Reużywa w 100% istniejący mechanizm
 *  .dd/.dd-trigger/.dd-panel (dokładnie ten sam szkielet co renderRankingItem()
 *  — initDriverDetailToggle() już globalnie obsługuje klik, zero nowego JS
 *  do przełączania tutaj). To główny wizualny odróżnik od Kalendarza — lista
 *  wyników, nie siatka kart z datą/statusem (.calendar-grid/.cal-card, wciąż
 *  używane na Kalendarzu). */
function renderResultsList(raceSessions, driverIndex, linkCtx) {
  if (!raceSessions.length) {
    return `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
  }
  return `
    <div class="section-header reveal">
      <h2 class="section-title">${t('wyniki.resultsHistory')}</h2>
      <div class="section-divider"></div>
    </div>
    <div class="results-list reveal">
      ${raceSessions.slice().reverse().map(session => {
        const winner = session.raceResults[0];
        const flag = trackFlag(session.country || session.track);
        const href = `wynik-wydarzenia.html?season=${encodeURIComponent(linkCtx.season)}&tier=${encodeURIComponent(linkCtx.tier)}&round=${session.round}`;
        const winnerAvatar = winner ? driverAvatar(winner.teamFull || winner.team, driverIndex?.[winner.driver]?.avatarUrl) : null;
        const top3 = session.raceResults.slice(0, 3);
        const dotdDriver = session.driverOfTheDay?.driver || null;
        const expandable = top3.length > 0;

        const trigger = `
          <div class="${expandable ? 'dd-trigger' : ''} results-row">
            <span class="results-row-round">${t('round')} ${session.round}</span>
            <span class="results-row-track"><span class="icon icon-flag">${flag}</span>${session.track}</span>
            <span class="results-row-winner">
              ${winnerAvatar ? `<img class="results-row-avatar" src="${winnerAvatar}" alt="" onerror="this.remove()">` : ''}
              ${winner ? resolveDriverName(driverIndex, winner.driver) : '—'}
            </span>
            <span class="results-row-fastest">${session.fastestLap ? `${icon('bolt','icon-red')}${resolveDriverName(driverIndex, session.fastestLap.driver)}` : ''}</span>
            ${expandable ? `<span class="results-row-chevron">${icon('chevronDown')}</span>` : ''}
          </div>`;

        if (!expandable) return `<div class="results-item reveal">${trigger}</div>`;

        return `
        <div class="dd results-item reveal" tabindex="0">
          ${trigger}
          <div class="dd-panel"><div class="dd-panel-inner"><div class="dd-panel-content results-row-panel-content">
            ${renderPodiumRow(top3, driverIndex)}
            ${session.fastestLap ? `
              <div class="dd-fastest">
                ${icon('bolt', 'icon-red')}
                <div class="dd-fastest-info">
                  <span class="dd-fastest-label">${t('fastestLap')}</span>
                  <span class="dd-fastest-time">${resolveDriverName(driverIndex, session.fastestLap.driver)} — ${session.fastestLap.time}</span>
                </div>
                ${tyrePill(session.fastestLap.tyre)}
              </div>
            ` : ''}
            ${dotdDriver ? `
              <div class="dd-chip-row">
                <span class="dd-chip">${icon('star', 'icon-gold')}${t('dotdTitle')}: ${resolveDriverName(driverIndex, dotdDriver)}</span>
              </div>
            ` : ''}
            <a class="btn btn-outline" href="${href}" style="margin-top:12px">${t('cta.fullResults')}</a>
          </div></div></div>
        </div>`;
      }).join('')}
    </div>`;
}

/** Mała, samodzielna karta zapowiadająca najbliższą nierozegraną rundę tego
 *  sezonu/tieru. Celowo NIE reużywa renderFeaturedRound() — jej link zawsze
 *  celuje w wynik-wydarzenia.html, co dla jeszcze nierozegranej rundy
 *  prowadzi na pusty ekran; ta karta linkuje do kalendarz.html zamiast. */
function renderNextRoundTeaser(next, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!next) { el.innerHTML = ''; return; }
  const slug = trackImageSlug(next.track);
  const flag = trackFlag(next.country || next.track);
  const days = daysUntilLabel(next.date, next.time);
  el.innerHTML = `
    <a class="next-round-teaser reveal" href="kalendarz.html">
      ${slug ? `<div class="next-round-teaser-photo"><img src="assets/tracks/${slug}.jpg" alt="" loading="lazy" onerror="this.parentElement.remove()"></div>` : ''}
      <div class="next-round-teaser-info">
        <span class="next-round-teaser-eyebrow">${icon('calendar')}${t('cal.nextRound')}</span>
        <div class="next-round-teaser-title"><span class="icon icon-flag">${flag}</span>${next.track} Grand Prix</div>
        <div class="next-round-teaser-meta">${t('round')} ${next.round} · ${fmtDateTime(next.date, next.time)}</div>
        ${days ? `<span class="next-round-teaser-countdown">${days}</span>` : ''}
      </div>
    </a>`;
}

async function initWyniki() {
  const el = document.getElementById('races-list');
  if (!el) return;

  const [allSeasons, allCalendars] = await Promise.all([loadAllRaces(), loadAllCalendars()]);
  const seasonNames = Object.keys(allSeasons);

  if (!seasonNames.length) {
    el.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
    return;
  }

  let activeSeason = seasonNames[seasonNames.length - 1];
  let activeTier = DEFAULT_TIER;

  const rerender = async () => {
    const summaryEl = document.getElementById('wyniki-summary');
    const trendEl = document.getElementById('wyniki-leader-trend');
    const constructorsEl = document.getElementById('wyniki-constructors');
    const podiumEl = document.getElementById('wyniki-podium');
    const highlightsEl = document.getElementById('wyniki-highlights');
    const nextRoundEl = document.getElementById('wyniki-next-round');

    const { rosterMap, driverIndex } = await loadSklad(activeTier);
    const races = racesForTier(allSeasons, activeSeason, activeTier);
    const raceSessions = races.filter(r => r.sessionType === 'Race').sort((a, b) => a.round - b.round);

    if (!raceSessions.length) {
      summaryEl.innerHTML = '';
      trendEl.innerHTML = '';
      constructorsEl.innerHTML = '';
      podiumEl.innerHTML = '';
      highlightsEl.innerHTML = '';
      nextRoundEl.innerHTML = '';
      el.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
      return;
    }

    const standings = computeDriverStandings(races, rosterMap, driverIndex);
    renderStandingsSummary(standings, 'wyniki-summary', driverIndex);
    renderLeaderTrend(computeLeaderTrend(races, raceSessions, standings, rosterMap, driverIndex), 'wyniki-leader-trend');

    const constructors = computeConstructorStandings(races, rosterMap);
    renderConstructorLeaderChip(constructors, 'wyniki-constructors');

    const lastRace = raceSessions[raceSessions.length - 1];
    applyTrackBackground(document.getElementById('wyniki-hero'), lastRace.track);
    podiumEl.innerHTML = renderResultsPodium(lastRace, driverIndex, { season: activeSeason, tier: activeTier });

    highlightsEl.innerHTML = await renderHighlightsStrip(raceSessions, { season: activeSeason, tier: activeTier });

    el.innerHTML = renderResultsList(raceSessions, driverIndex, { season: activeSeason, tier: activeTier });

    const calRounds = calendarForTier(allCalendars, activeSeason, activeTier);
    markNextRound(calRounds);
    renderNextRoundTeaser(calRounds.find(r => r._isNext) || null, 'wyniki-next-round');

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

/** Zdjęcie konkretnego toru w tle — TĄ SAMĄ techniką co initHeroPhotoCarousel()
 *  (WDC/Klasyfikacja/Konstruktorzy/itd.): osobny .hero-carousel-layer div ze
 *  zdjęciem (własne background-size:cover) POD statycznym przyciemnieniem
 *  .page-hero.hero-carousel::before (zwykły gradient, bez background-size).
 *  Poprzednia wersja kodowała gradient+blask+zdjęcie jako JEDEN złożony
 *  background-image, wszystkie warstwy z background-size:cover — "cover" na
 *  warstwie gradientu (który nie ma naturalnego rozmiaru) to niepewna
 *  operacja i potrafiła zostawiać widoczną "kreskę" na niektórych zdjęciach;
 *  ten sposób (osobny element na zdjęcie, gradient bez sizingu) jest dokładnie
 *  tym, czego już bezproblemowo używa WDC i inne strony z karuzelą.
 *  Bezpieczne przy powtórnych wywołaniach (initWyniki()/initKalendarz()
 *  odświeżają się co 60s) — reużywa tę samą warstwę zamiast tworzyć nową. */
function applyTrackBackground(heroEl, trackName) {
  const slug = trackImageSlug(trackName);
  if (!slug || !heroEl) return;
  const url = `assets/tracks/${slug}.jpg`;
  const test = new Image();
  test.onload = () => {
    let layer = heroEl.querySelector('.hero-carousel-layer');
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'hero-carousel-layer visible';
      heroEl.prepend(layer);
    }
    layer.style.backgroundImage = `url("${url}")`;
    layer.style.backgroundPosition = 'center 40%'; // faworyzuje górną część zdjęcia toru, jak dawniej
    heroEl.classList.add('has-track-bg', 'hero-carousel');
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

/** Probes assets/hero-photos/ for numbered images (1.jpg, 2.png, ...) up to
 *  a small cap, trying a few common extensions per number — same "does this
 *  image actually exist" check applyTrackBackground()/applyHeroTrackBackground()
 *  already use. Gaps are fine (no need for contiguous numbering); cached
 *  after the first check since the result can't change within a page view. */
let _heroPhotoListCache = null;
async function listHeroPhotos() {
  if (_heroPhotoListCache) return _heroPhotoListCache;
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  const checkOne = (n) => new Promise((resolve) => {
    let i = 0;
    const tryNext = () => {
      if (i >= exts.length) return resolve(null);
      const url = `assets/hero-photos/${n}.${exts[i]}`;
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => { i++; tryNext(); };
      img.src = url;
    };
    tryNext();
  });
  const results = await Promise.all(Array.from({ length: 20 }, (_, i) => checkOne(i + 1)));
  _heroPhotoListCache = results.filter(Boolean);
  return _heroPhotoListCache;
}

/** Sets up a slow-crossfading photo carousel behind a .page-hero's title, for
 *  pages that don't have a natural per-item photo (a track, a clip) of their
 *  own. No-ops gracefully when assets/hero-photos/ is empty — the hero keeps
 *  whatever plain/watermarked look it already has, exactly like a missing
 *  track photo does today. Two stacked layers cross-fade via opacity so
 *  there's never a flash of bare background between photos. */
async function initHeroPhotoCarousel(heroEl) {
  if (!heroEl) return;
  const photos = await listHeroPhotos();
  if (!photos.length) return;
  heroEl.classList.add('has-track-bg', 'hero-carousel');
  const layerA = document.createElement('div'), layerB = document.createElement('div');
  layerA.className = layerB.className = 'hero-carousel-layer';
  heroEl.prepend(layerB); heroEl.prepend(layerA);
  let index = Math.floor(Math.random() * photos.length); // don't always start on photo #1
  let showingA = true;
  layerA.style.backgroundImage = `url("${photos[index]}")`;
  layerA.classList.add('visible');
  if (photos.length < 2) return; // only one photo — nothing to rotate to
  setInterval(() => {
    index = (index + 1) % photos.length;
    const next = showingA ? layerB : layerA, cur = showingA ? layerA : layerB;
    next.style.backgroundImage = `url("${photos[index]}")`;
    next.classList.add('visible');
    cur.classList.remove('visible');
    showingA = !showingA;
  }, 9000);
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
    titleEl.textContent = t('eventNotFound');
    contentEl.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
    return;
  }

  const [allCalendars, allSeasons, { driverIndex }, pkData] = await Promise.all([
    loadAllCalendars(), loadAllRaces(), loadSklad(tier), tryFetch('PunktyKarne/punkty_karne.json'),
  ]);
  const rounds = calendarForTier(allCalendars, season, tier);
  const roundInfo = rounds.find(r => r.round === round);
  const sessions = racesForTier(allSeasons, season, tier).filter(r => r.round === round);

  // Punkty Karne wystawione akurat na TĘ rundę (season+tier+round) - pokazywane w sekcji "Kary i
  // odwołania" obok race incident/DSQ/quali-ban z samego pliku wyników (patrz renderPenaltyNotes).
  // Tier w URL to "Tier 1"/"Tier 2"/"Tier 3", a w punkty_karne.json - liczba (event.tier przy
  // wystawianiu kary) - stąd wyciągnięcie cyfry tym samym wzorem co loadSklad.
  const tierNum = Number((tier.match(/\d+/) || [''])[0]);
  const pkEntries = (pkData?.entries || []).filter(
    (e) => String(e.season) === String(season) && Number(e.tier) === tierNum && Number(e.round) === round
  );

  const flag = roundInfo ? trackFlag(roundInfo.country || roundInfo.track) : (sessions[0]?.flag || '');
  const trackName = roundInfo?.track || sessions[0]?.track || t('unknownTrack');
  const dateStr = roundInfo?.date || sessions[0]?.date || '';

  titleEl.innerHTML = `${flag ? flag + ' ' : ''}${trackName} Grand Prix`;
  subEl.textContent = `${t('round')} ${round} · ${seasonLabel(season)} · ${tier}` + (dateStr ? ` · ${fmtDate(dateStr)}` : '');
  document.title = `${trackName} — ${t('nav.results')} — Polaris Racing League`;
  applyTrackBackground(document.getElementById('event-hero'), trackName);

  if (!sessions.length) {
    tabsEl.innerHTML = '';
    contentEl.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('noEventResults')}</p>`;
    observeReveal();
    return;
  }

  // Ten sam automatyczny system miniaturek co Hall of Fame (getVideoThumbnail/
  // autoThumbnailClips) — tu zastosowany do klipu "Najlepszy manewr" osadzonego
  // bezpośrednio przy wyniku wyścigu, nie tylko do klipów w Hall of Fame.
  await autoThumbnailClips(sessions.map(s => s.bestManeuver).filter(Boolean));

  const byType = {};
  sessions.forEach(s => { byType[s.sessionType] = s; });
  const availableTypes = SESSION_TYPE_ORDER.filter(t => byType[t]);
  let activeType = byType['Race'] ? 'Race' : availableTypes[0];

  const rerenderContent = () => {
    contentEl.innerHTML = renderSessionResults(byType[activeType], driverIndex, byType, pkEntries);
    observeReveal();
  };

  tabsEl.innerHTML = availableTypes.map(t =>
    `<button class="tier-tab ${t === activeType ? 'active' : ''}" data-type="${t}">${SESSION_TYPE_LABELS()[t]}</button>`
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

/* ─── DRIVER HOVER DETAILS (wysuwane szczegóły) ────
   Every driver cell/pill carries its OWN pre-rendered, initially-collapsed
   detail panel right in its markup (no floating element, no positioning
   math, no lazy JSON blob) — a wrapping ".dd" element reveals its ".dd-panel"
   child via a pure-CSS grid-rows transition on :hover/:focus-within (see
   css/style.css). The only JS needed is a tiny delegated click-toggle for
   touch devices, where :hover-on-tap is unreliable. */

/** Aggregates per-driver stats across ALL session types (Race, Sprint,
 *  Qualifying, Qualifying Sprint) for one season+tier — fed the same
 *  unfiltered races array that computeDriverStandings()/
 *  computeConstructorStandings() receive. Kept separate from those two:
 *  doesn't change their contracts, and needs Qualifying sessions (for
 *  poles) which they deliberately skip. Returns { [driverName]: stats }. */
function computeDriverSeasonStats(races) {
  const map = {};
  const get = (name) => {
    if (!map[name]) {
      map[name] = { points: 0, wins: 0, podiums: 0, poles: 0, starts: 0, dnfs: 0, fastestLaps: 0, driverOfTheDay: 0, finishedPositions: [] };
    }
    return map[name];
  };

  for (const race of races) {
    if (race.sessionType === 'Race' || race.sessionType === 'Sprint') {
      for (const d of race.raceResults) {
        const s = get(d.driver);
        s.points += d.points;
        if (race.sessionType === 'Race') {
          s.starts++;
          if (d.pos === 1) s.wins++;
          if (d.pos <= 3) s.podiums++;
          if (d.status === 'Ukończony') s.finishedPositions.push(d.pos);
          else s.dnfs++;
        }
      }
    }
    if (race.sessionType === 'Qualifying') {
      for (const d of race.raceResults) { if (d.pos === 1) get(d.driver).poles++; }
    }
    if (race.fastestLap?.driver) get(race.fastestLap.driver).fastestLaps++;
    if (race.driverOfTheDay?.driver) get(race.driverOfTheDay.driver).driverOfTheDay++;
  }

  const result = {};
  Object.keys(map).forEach((name) => {
    const s = map[name];
    const fp = s.finishedPositions;
    result[name] = {
      points: s.points, wins: s.wins, podiums: s.podiums, poles: s.poles,
      starts: s.starts, dnfs: s.dnfs, fastestLaps: s.fastestLaps, driverOfTheDay: s.driverOfTheDay,
      finishes: fp.length, // ukończone wyścigi (bez DNF/DSQ) — Ranking, kategoria 7
      bestFinish: fp.length ? Math.min(...fp) : null,
      avgFinish: fp.length ? Math.round((fp.reduce((a, b) => a + b, 0) / fp.length) * 10) / 10 : null,
    };
  });
  return result;
}

/** Neutral stats for a rostered driver who hasn't appeared in any result
 *  yet this season — keeps renderSeasonDetail() from choking on undefined. */
function emptySeasonStats() {
  return { points: 0, wins: 0, podiums: 0, poles: 0, starts: 0, dnfs: 0, fastestLaps: 0, driverOfTheDay: 0, finishes: 0, bestFinish: null, avgFinish: null };
}

/** Najdłuższa seria pod rząd spełniająca `test(raceResultEntry)` dla każdego
 *  kierowcy, licząc tylko sesje typu `sessionType` (Race dla zwycięstw/
 *  podiów, Qualifying dla pole position), w kolejności rund. Runda, w
 *  której danego kierowcy w ogóle nie ma w wynikach tej sesji, PRZERYWA
 *  jego serię — tak samo jak start bez sukcesu. Runda, dla której w ogóle
 *  nie ma jeszcze przesłanego pliku danej sesji, jest po prostu pominięta w
 *  iteracji (brak danych, nie "wszyscy przegrali tę rundę"). Używane przez
 *  stronę Ranking (kategorie: najdłuższa seria zwycięstw/podiów/pole). */
function computeStreaks(races, sessionType, test) {
  const relevant = races.filter(r => r.sessionType === sessionType).sort((a, b) => a.round - b.round);
  const everyone = new Set(relevant.flatMap(r => r.raceResults.map(d => d.driver)));
  const current = {}, best = {};
  relevant.forEach(race => {
    const hits = new Set(race.raceResults.filter(test).map(d => d.driver));
    everyone.forEach(name => {
      current[name] = hits.has(name) ? (current[name] || 0) + 1 : 0;
      best[name] = Math.max(best[name] || 0, current[name]);
    });
  });
  return best; // { [kierowca]: najdłuższa seria }
}

/** One colored block per penalty TYPE actually present on this result — same
 *  color coding as the collapsed-row badges (.penalty-badge/-removed/-pos,
 *  css/style.css:545-567) so both states read as the same thing. A result
 *  can carry more than one at once (e.g. a time penalty later overturned),
 *  so this returns however many apply, stacked. */
function renderPenaltyBlocks(d) {
  const blocks = [];
  if (d.penaltySeconds > 0) {
    blocks.push(`<div class="dd-penalty-block dd-penalty-block-time">${icon('chevronDown')}<div><span class="dd-penalty-block-title">${t('penalty.time')}: +${d.penaltySeconds}s</span>${d.penaltyReason ? `<span class="dd-penalty-block-reason"> — ${escHtml(d.penaltyReason)}</span>` : ''}</div></div>`);
  }
  if (d.penaltyRemovedSeconds > 0) {
    blocks.push(`<div class="dd-penalty-block dd-penalty-block-removed">${icon('chevronDown')}<div><span class="dd-penalty-block-title">${t('penalty.removed')}: −${d.penaltyRemovedSeconds}s</span>${d.penaltyRemovedReason ? `<span class="dd-penalty-block-reason"> — ${escHtml(d.penaltyRemovedReason)}</span>` : ''}</div></div>`);
  }
  if (d.positionPenalty > 0) {
    blocks.push(`<div class="dd-penalty-block dd-penalty-block-pos">${icon('chevronDown')}<div><span class="dd-penalty-block-title">${t('penalty.pos')}: ${d.positionPenalty} ${t('penalty.posSuffix')}</span>${d.positionPenaltyReason ? `<span class="dd-penalty-block-reason"> — ${escHtml(d.positionPenaltyReason)}</span>` : ''}</div></div>`);
  }
  return blocks.join('');
}

/** Single-race detail — position/gap/status-or-points/fastest lap, plus a
 *  fully-described block for every penalty type that applies. */
function renderRaceDetail(d) {
  return `
    <div class="dd-stats-grid">
      <div class="dd-stat"><span class="dd-stat-label">${t('position')}</span><span class="pos-badge ${posRankClass(d.pos)} dd-stat-pos">${d.pos}</span></div>
      <div class="dd-stat"><span class="dd-stat-label">${t('gap')}</span><span class="dd-stat-val small">${d.gap}</span></div>
      <div class="dd-stat"><span class="dd-stat-label">${d.showPoints ? t('points') : t('status')}</span><span class="dd-stat-val ${d.showPoints ? '' : 'small'}">${d.showPoints ? d.points : displayStatus(d.status)}</span></div>
    </div>
    ${d.fastestLapTime ? `
      <div class="dd-fastest">
        ${icon('bolt', 'icon-red')}
        <div class="dd-fastest-info">
          <span class="dd-fastest-label">${t('fastestLap')}</span>
          <span class="dd-fastest-time">${d.fastestLapTime}</span>
        </div>
        ${tyrePill(d.fastestLapTyre)}
      </div>
    ` : ''}
    ${renderPenaltyBlocks(d)}
  `;
}

/** Season-aggregate detail — points/wins/podiums/pole up front (pole was
 *  explicitly requested) in a single 4-across row, fastest-lap/DOTD counts
 *  as chips, then the rest as a vertical label/value list (.dd-detail-rows)
 *  instead of a second cramped grid — reads much better for longer labels
 *  like "Najlepszy wynik"/"Śr. pozycja". */
function renderSeasonDetail(s) {
  return `
    <div class="dd-stats-grid dd-stats-grid-4">
      <div class="dd-stat"><span class="dd-stat-label">${t('points')}</span><span class="dd-stat-val">${s.points}</span></div>
      <div class="dd-stat"><span class="dd-stat-label">${t('wins')}</span><span class="dd-stat-val">${s.wins}</span></div>
      <div class="dd-stat"><span class="dd-stat-label">${t('podiumsShort')}</span><span class="dd-stat-val">${s.podiums}</span></div>
      <div class="dd-stat"><span class="dd-stat-label">${t('pole')}</span><span class="dd-stat-val">${s.poles}</span></div>
    </div>
    <div class="dd-chip-row">
      <span class="dd-chip">${icon('bolt', 'icon-red')}${s.fastestLaps} ${t('chip.fastestLaps')}</span>
      <span class="dd-chip">${icon('star', 'icon-gold')}${s.driverOfTheDay}× ${t('chip.dotd')}</span>
    </div>
    <div class="dd-detail-rows">
      <div class="dd-detail-row"><span class="dd-detail-row-label">${t('starts')}</span><span class="dd-detail-row-val">${s.starts}</span></div>
      <div class="dd-detail-row"><span class="dd-detail-row-label">${t('bestResult')}</span><span class="dd-detail-row-val">${s.bestFinish !== null ? 'P' + s.bestFinish : '—'}</span></div>
      <div class="dd-detail-row"><span class="dd-detail-row-label">${t('avgPosition')}</span><span class="dd-detail-row-val">${s.avgFinish !== null ? s.avgFinish.toFixed(1) : '—'}</span></div>
      <div class="dd-detail-row"><span class="dd-detail-row-label">${t('dnf')}</span><span class="dd-detail-row-val">${s.dnfs}</span></div>
    </div>
  `;
}

function renderDriverDetailContent(kind, data) {
  return kind === 'season' ? renderSeasonDetail(data) : renderRaceDetail(data);
}

/** Small hoverable chip for the constructors table's "Kierowcy" column —
 *  same season detail panel as the driver standings table (not a trimmed
 *  variant), reusing renderDriverDetailContent() so there's one definition
 *  of what "season stats" means everywhere on the site. */
function renderDriverPill(name, driverIndex, seasonStats) {
  const num = driverIndex?.[name]?.number ?? null;
  const country = driverIndex?.[name]?.country || '';
  const stats = seasonStats?.[name] || emptySeasonStats();
  return `<div class="dd driver-pill" tabindex="0">
    <div class="dd-trigger driver-pill-trigger">${num !== null ? `<span class="driver-number">${num}</span>` : ''}${country ? `<span class="driver-flag">${nationalityFlag(country)}</span>` : ''}${resolveDriverName(driverIndex, name)}</div>
    <div class="dd-panel"><div class="dd-panel-inner"><div class="dd-panel-content">${renderDriverDetailContent('season', stats)}</div></div></div>
  </div>`;
}

/** Delegated click-toggle — the primary way to open a .dd on every device
 *  (deliberately not :hover, so brushing across a table while scanning/
 *  scrolling doesn't pop rows open). Keyboard users get the same reveal for
 *  free via :focus-within in CSS. */
function initDriverDetailToggle() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.dd-trigger');
    document.querySelectorAll('.dd.dd-open').forEach((el) => { if (!el.contains(e.target)) el.classList.remove('dd-open'); });
    if (trigger) trigger.closest('.dd')?.classList.toggle('dd-open');
  });
}
initDriverDetailToggle();

/** Injects a slowly-scrolling strip of team + partner logos just above the
 *  footer, on every page — no HTML markup needed on any of the 11 pages,
 *  this just finds <footer> and inserts a sibling before it. No-ops if a
 *  page happens to have no <footer> or there's nothing to show yet. */
async function initLogoWall() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  const teamLogos = ['fer', 'rbr', 'rb', 'mcl', 'amr', 'alp', 'wil', 'haa', 'sau', 'audi', 'cad', 'mer']
    .map(slug => `assets/teams/${slug}.png`);
  const partnersData = await tryFetch('Partnerstwa/partnerstwa.json');
  const partnerLogos = (partnersData?.partners || []).map(p => p.logo).filter(Boolean);
  const logos = [...teamLogos, ...partnerLogos];
  if (!logos.length) return;
  const wall = document.createElement('div');
  wall.className = 'logo-wall';
  // 8 kopie (liczba parzysta — translateX(-50%) zawsze ląduje dokładnie na
  // granicy dwóch identycznych połówek, więc pętla zostaje bezszwowa
  // niezależnie od liczby kopii). Samo podwojenie (2×) potrafiło dać pasek
  // węższy niż szerokie/ultraszerokie monitory, więc pętla ujawniała pusty
  // kawałek tła zanim zdążyła się zapętlić.
  const REPEATS = 8;
  const repeated = Array.from({ length: REPEATS }, () => logos).flat();
  // Bez loading="lazy" — to ciągle widoczny dekoracyjny pasek, nie zwykła
  // treść strony, więc "leniwe" ładowanie tylko powodowałoby widoczne
  // doskakiwanie logo w trakcie przewijania zamiast oszczędzać transfer.
  const track = repeated.map(src => `<img src="${src}" alt="" onerror="this.remove()">`).join('');
  wall.innerHTML = `<div class="logo-wall-track">${track}</div>`;
  footer.before(wall);
  // Stałe tempo (px/s) niezależnie od tego, ile faktycznie wyszło logo —
  // sztywny czas trwania animacji przy dłuższym pasku (więcej kopii/partnerów)
  // leciałby po prostu szybciej. Mierzone DOPIERO PO załadowaniu wszystkich
  // obrazków (albo błędzie/timeoucie) — mierzenie wcześniej dawało zaniżoną
  // szerokość (obrazki bez znanych wymiarów jeszcze się nie rozłożyły),
  // czyli błędnie skalibrowane, zbyt szybkie tempo.
  const imgs = Array.from(wall.querySelectorAll('img'));
  const whenLoaded = (img) => img.complete ? Promise.resolve() : new Promise((resolve) => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', resolve, { once: true });
  });
  Promise.race([
    Promise.all(imgs.map(whenLoaded)),
    new Promise((resolve) => setTimeout(resolve, 4000)), // safety cap
  ]).then(() => {
    const trackEl = wall.querySelector('.logo-wall-track');
    const halfWidth = trackEl.scrollWidth / 2;
    if (halfWidth > 0) trackEl.style.animationDuration = `${Math.max(20, halfWidth / 40)}s`;
  });
}
initLogoWall();

/** Cichy pasek "następna runda" nad stopką, widoczny na każdej stronie —
 *  dziś ta informacja jest widoczna tylko na Kalendarzu/Wynikach. Tier 1,
 *  najnowszy sezon (ta sama konwencja co statystyki na stronie głównej).
 *  Nic nie renderuje, gdy sezon się skończył (brak nadchodzącej rundy) albo
 *  nie ma jeszcze żadnych danych kalendarza. */
async function initNextRoundStrip() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  const allSeasons = await loadAllCalendars();
  const seasonNames = Object.keys(allSeasons);
  if (!seasonNames.length) return;
  const latestSeason = seasonNames[seasonNames.length - 1];
  const rounds = calendarForTier(allSeasons, latestSeason, DEFAULT_TIER);
  if (!rounds.length) return;
  markNextRound(rounds);
  const upcoming = rounds.find(r => r._isNext);
  if (!upcoming) return;
  const strip = document.createElement('div');
  strip.className = 'next-round-strip';
  strip.innerHTML = `
    <a href="kalendarz.html" class="next-round-strip-inner">
      <span class="next-round-strip-flag">${trackFlag(upcoming.country || upcoming.track)}</span>
      <span>Następna runda:</span>
      <strong>${upcoming.track} Grand Prix</strong>
      <span class="next-round-strip-date">${fmtDate(upcoming.date)}</span>
      ${daysUntilLabel(upcoming.date, upcoming.time) ? `<span class="next-round-strip-days">${daysUntilLabel(upcoming.date, upcoming.time)}</span>` : ''}
    </a>`;
  // Jeśli ściana logo (initLogoWall) już zdążyła się wstawić, pasek ląduje
  // TUŻ NAD nią (informacja przed dekoracją) — w przeciwnym razie po prostu
  // tuż nad stopką, tak jak ściana logo sama się wstawi, gdy dociągnie dane.
  const logoWall = document.querySelector('.logo-wall');
  if (logoWall) logoWall.before(strip); else footer.before(strip);
}
initNextRoundStrip();

/* Wspólny blok podium (miejsca 1-3) — używany zarówno przez pełne wyniki
   sesji (renderSessionResults) jak i skrót na stronie Wyniki (renderResultsPodium).
   `top3` — pierwsze 3 wpisy z session.raceResults (już posortowane po pozycji). */
function renderPodiumRow(top3, driverIndex) {
  if (!top3.length) return '';
  const posClass = ['p1','p2','p3'];
  return `
    <div class="podium-row podium-row-event reveal">
      ${(top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3).map((d) => {
        const rank = d.pos;
        const isFirst = rank === 1;
        const num = driverIndex?.[d.driver]?.number;
        const country = driverIndex?.[d.driver]?.country;
        const avatarUrl = driverIndex?.[d.driver]?.avatarUrl;
        return `
        <div class="podium-item ${isFirst ? 'podium-item-first' : ''}">
          <span class="podium-pos ${posClass[rank - 1] || ''}">${rank}</span>
          ${driverAvatar(d.teamFull || d.team, avatarUrl) ? `<img class="podium-avatar" src="${driverAvatar(d.teamFull || d.team, avatarUrl)}" alt="" onerror="this.style.display='none'">` : ''}
          <div>
            <div class="podium-driver">${num !== null && num !== undefined ? `<span class="driver-number">${num}</span>` : ''}${country ? `<span class="driver-flag">${nationalityFlag(country)}</span>` : ''}${resolveDriverName(driverIndex, d.driver)}</div>
            <div class="podium-team">${renderTeamBadge(d.teamFull || d.team)}</div>
          </div>
          <span class="podium-pts">${d.points} ${t('ptsSuffix')}</span>
        </div>
      `;
      }).join('')}
    </div>`;
}

/** Race incident/DSQ/quali-ban dotyczące TEJ sesji (patrz session.penaltyNotes, dopisywane przez bota
 *  do pliku wyników - addPenaltyNoteToResultsFile/applyPendingPenaltyNotes). Wpisy `revoked:true`
 *  (kara cofnięta w odwołaniu) pokazane przygaszone z etykietą, zamiast po prostu znikać — ślad
 *  procesu odwoławczego zostaje widoczny. */
// pkEntries — wpisy Punkty Karne (z PunktyKarne/punkty_karne.json) wystawione akurat na TĘ rundę
// (dopasowane przez initWynikWydarzenia po season+tier+round), zmieszane w JEDNĄ listę z notatkami
// race incident/DSQ/quali-ban z samego pliku wyników sesji — z perspektywy odwiedzającego to wszystko
// jedna sekcja "Kary i odwołania" dla tego wyścigu, niezależnie skąd bot to zapisał.
function renderPenaltyNotes(notes, pkEntries) {
  const pkAsNotes = (pkEntries || []).map((e) => ({
    type: 'points', driverName: e.driverName, reason: e.reason, points: e.points,
    revoked: e.cancelled, revokedReason: null,
  }));
  const all = [...(notes || []), ...pkAsNotes];
  if (!all.length) return '';
  const badgeLabel = { race_incident: t('pk.raceIncident'), dsq: t('pk.dsq'), quali_ban: t('pk.qualiBan'), points: t('pk.points') };
  return `
    <div class="section-header reveal" style="margin-top:2.5rem">
      <h2 class="section-title">${t('penaltyNotes.title')}</h2>
      <div class="section-divider"></div>
    </div>
    <div class="penalty-notes reveal">${all.map((n) => `
      <div class="penalty-note-item${n.revoked ? ' revoked' : ''}">
        <span class="penalty-note-badge">${badgeLabel[n.type] || n.type}</span>
        <span class="penalty-note-driver">${escHtml(n.driverName || '')}</span>
        ${n.points ? `<span class="pk-entry-points">+${n.points} pkt</span>` : ''}
        ${n.reason ? `<span class="penalty-note-reason">${t('pk.reason')}: ${escHtml(n.reason)}</span>` : ''}
        ${n.revoked ? `<span class="penalty-note-revoked-tag">${t('penaltyNotes.revoked')}${n.revokedReason ? ` — ${escHtml(n.revokedReason)}` : ''}</span>` : ''}
      </div>`).join('')}</div>`;
}

/** Sesja kwalifikacyjna, z której bierze się pozycja startowa danego typu sesji — Wyścig startuje z
 *  Kwalifikacji, Sprint startuje z Kwalifikacji Sprintu. Zwraca null dla samych Kwalifikacji (nie mają
 *  własnej "pozycji startowej") i gdy odpowiadająca sesja kwalifikacyjna jeszcze nie jest opublikowana. */
const GRID_SESSION_TYPE = { Race: 'Qualifying', Sprint: 'Qualifying Sprint' };
function attachStartingPositions(raceResults, sessionType, byType) {
  const qualiType = GRID_SESSION_TYPE[sessionType];
  const qualiSession = qualiType && byType ? byType[qualiType] : null;
  if (!qualiSession) return raceResults.map(d => ({ ...d, startPos: null, posDelta: null }));
  const startByDriver = {};
  qualiSession.raceResults.forEach(q => { startByDriver[q.driver] = q.pos; });
  return raceResults.map(d => {
    const startPos = startByDriver[d.driver] ?? null;
    return { ...d, startPos, posDelta: startPos !== null ? startPos - d.pos : null };
  });
}

/** ▲/▼ + liczba zdobytych/straconych miejsc względem pozycji startowej (dodatnie = do przodu). */
function renderPosDelta(delta) {
  if (delta === null || delta === undefined) return '<span class="gap-text">—</span>';
  if (delta === 0) return `<span class="pos-delta pos-delta-same">=</span>`;
  return `<span class="pos-delta ${delta > 0 ? 'pos-delta-up' : 'pos-delta-down'}">${delta > 0 ? '▲' : '▼'}${Math.abs(delta)}</span>`;
}

function renderSessionResults(session, driverIndex, byType, pkEntries) {
  if (!session) return `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
  const showPoints = session.sessionType === 'Race' || session.sessionType === 'Sprint';
  const showStrategy = session.raceResults.some(d => d.stints && d.stints.length);
  const showFastestLap = session.raceResults.some(d => d.fastestLapTime);
  const dotdDriver = session.driverOfTheDay?.driver || null;
  const top3 = showPoints ? session.raceResults.slice(0, 3) : [];
  const fastestLapEntry = session.fastestLap ? session.raceResults.find(d => d.driver === session.fastestLap.driver) : null;
  const fastestLapAvatar = fastestLapEntry ? driverAvatar(fastestLapEntry.teamFull || fastestLapEntry.team, driverIndex?.[fastestLapEntry.driver]?.avatarUrl) : null;
  const dotdEntry = dotdDriver ? session.raceResults.find(d => d.driver === dotdDriver) : null;
  const dotdAvatar = dotdEntry ? driverAvatar(dotdEntry.teamFull || dotdEntry.team, driverIndex?.[dotdEntry.driver]?.avatarUrl) : null;
  const resultsWithStart = attachStartingPositions(session.raceResults, session.sessionType, byType);
  return `
    <div class="race-chips reveal" style="margin:0 0 1.5rem">
      <span class="race-chip">${icon('calendar','icon-lg')}${fmtDate(session.date)}</span>
      <span class="race-chip">${icon('laps','icon-lg')}${session.totalLaps || 0} ${t('laps')}</span>
      <span class="race-chip"><span class="icon icon-flag">${session.flag}</span>${session.track}</span>
      ${session.turns ? `<span class="race-chip">${icon('turns','icon-lg')}${session.turns} ${t('turns')}</span>` : ''}
      ${session.fastestLap ? `<span class="race-chip race-chip-fastest">${icon('bolt','icon-red icon-lg')}${t('fastestLapPrefix')}${fastestLapAvatar ? `<img class="chip-avatar" src="${fastestLapAvatar}" alt="" onerror="this.remove()">` : ''}<strong>${resolveDriverName(driverIndex, session.fastestLap.driver)}</strong> — ${session.fastestLap.time} ${tyrePill(session.fastestLap.tyre)}</span>` : ''}
      ${dotdDriver ? `<span class="race-chip race-chip-dotd" title="${escHtml(biText(session.driverOfTheDay, 'reason'))}">${icon('star','icon-gold icon-lg')}${t('dotdPrefix')}${dotdAvatar ? `<img class="chip-avatar" src="${dotdAvatar}" alt="" onerror="this.remove()">` : ''}<strong>${resolveDriverName(driverIndex, dotdDriver)}</strong></span>` : ''}
    </div>
    ${renderPodiumRow(top3, driverIndex)}
    <div class="table-wrap reveal">
      <table class="results">
        <thead>
          <tr>
            <th>#</th>
            <th>${t('driver')}</th>
            <th>${t('team')}</th>
            ${showPoints ? `<th class="right">${t('startPos')}</th><th class="right">${t('posChange')}</th>` : ''}
            <th class="right">${t('gap')}</th>
            <th class="right">${t('status')}</th>
            ${showStrategy ? `<th>${t('tyres')}</th>` : ''}
            ${showFastestLap ? `<th class="right">${t('fastestLapShort')}</th>` : ''}
            ${showPoints ? `<th class="right">${t('pts')}</th>` : ''}
          </tr>
        </thead>
        <tbody>
          ${resultsWithStart.map(d => {
            const isDotd = d.driver === dotdDriver;
            const isFastest = !!(session.fastestLap && d.driver === session.fastestLap.driver);
            const leadingBadges = [
              isDotd ? `<span class="dotd-badge icon-gold" title="${t('dotdTitle')}${biText(session.driverOfTheDay, 'reason') ? ': ' + escHtml(biText(session.driverOfTheDay, 'reason')) : ''}">${icon('star')}</span>` : '',
              isFastest ? `<span class="fastest-badge icon-red" title="${t('fastestLapSessionTitle')}${session.fastestLap.time}">${icon('bolt')}</span>` : '',
            ].join('');
            const rowClass = [isDotd ? 'row-dotd' : '', isFastest ? 'row-fastest' : ''].filter(Boolean).join(' ');
            return `
            <tr class="${rowClass}">
              <td>${posBadge(d.pos)}</td>
              <td>${renderDriverCell(d, leadingBadges, driverIndex, { kind: 'race', data: { ...d, showPoints } })}</td>
              <td>${renderTeamBadge(d.teamFull || d.team)}</td>
              ${showPoints ? `<td class="right"><span class="gap-text">${d.startPos ?? '—'}</span></td><td class="right">${renderPosDelta(d.posDelta)}</td>` : ''}
              <td class="right"><span class="gap-text">${d.gap}</span></td>
              <td class="right"><span class="status-fin">${displayStatus(d.status)}</span></td>
              ${showStrategy ? `<td>${tyreStrategyCell(d.stints)}</td>` : ''}
              ${showFastestLap ? `<td class="right">${d.fastestLapTime ? `<span class="gap-text">${d.fastestLapTime}</span> ${tyrePill(d.fastestLapTyre)}` : '<span class="gap-text">—</span>'}</td>` : ''}
              ${showPoints ? `<td class="right"><span class="points-val">${d.points}</span></td>` : ''}
            </tr>
          `;
          }).join('')}
        </tbody>
      </table>
    </div>
    ${renderPenaltyNotes(session.penaltyNotes, pkEntries)}
    ${session.bestManeuver ? `
      <div class="section-header reveal" style="margin-top:2.5rem">
        <span class="section-label">${t('raceHighlight')}</span>
        <h2 class="section-title">${t('bestManeuver')}</h2>
        <div class="section-divider"></div>
      </div>
      ${renderClip(session.bestManeuver, 'large', { ribbon: { label: t('bestManeuverOfRace'), tone: 'red' }, driverIndex })}
    ` : ''}
  `;
}

function renderStandingsSummary(standings, containerId, driverIndex) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (standings.length < 2) { el.innerHTML = ''; return; }
  const leader = standings[0];
  const gap = leader.points - standings[1].points;
  const mostWins = standings.slice().sort((a, b) => b.wins - a.wins)[0];
  const mostPodiums = standings.slice().sort((a, b) => b.podiums - a.podiums)[0];
  const chip = (row) => {
    const avatar = driverAvatar(row.team, driverIndex?.[row.driver]?.avatarUrl);
    return avatar ? `<img class="chip-avatar" src="${avatar}" alt="" onerror="this.remove()">` : '';
  };
  el.innerHTML = `
    <div class="stats-strip reveal">
      <div class="stat-tile"><span class="stat-tile-label">${t('leader')}</span><span class="stat-tile-value"><span data-count="${leader.points}">0</span><small> ${t('ptsSuffix')}</small></span><span class="stat-tile-sub">${chip(leader)}${resolveDriverName(driverIndex, leader.driver)}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">${t('gapToP2')}</span><span class="stat-tile-value accent">+<span data-count="${gap}">0</span><small> ${t('ptsSuffix')}</small></span><span class="stat-tile-sub">${t('over')} ${chip(standings[1])}${resolveDriverName(driverIndex, standings[1].driver)}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">${t('mostWins')}</span><span class="stat-tile-value"><span data-count="${mostWins.wins}">0</span><small> ${t('winsSuffix')}</small></span><span class="stat-tile-sub">${chip(mostWins)}${resolveDriverName(driverIndex, mostWins.driver)}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">${t('mostPodiums')}</span><span class="stat-tile-value"><span data-count="${mostPodiums.podiums}">0</span><small> ${t('podiumsSuffix')}</small></span><span class="stat-tile-sub">${chip(mostPodiums)}${resolveDriverName(driverIndex, mostPodiums.driver)}</span></div>
    </div>`;
  observeCounters();
}

/* ─── KLASYFIKACJA PAGE ──────────────────────────── */
async function initKlasyfikacja() {
  initHeroPhotoCarousel(document.getElementById('klasyfikacja-hero'));
  const allSeasons = await loadAllRaces();
  const seasonNames = Object.keys(allSeasons);

  if (!seasonNames.length) {
    document.getElementById('standings-full').innerHTML =
      `<p style="color:var(--gray);padding:2rem 0">${t('empty.short')}</p>`;
    return;
  }

  let activeSeason = seasonNames[seasonNames.length - 1];
  let activeTier = DEFAULT_TIER;

  const rerender = async () => {
    const { rosterMap, driverIndex } = await loadSklad(activeTier);
    const races = racesForTier(allSeasons, activeSeason, activeTier);
    const standings = computeDriverStandings(races, rosterMap, driverIndex);
    const seasonStats = computeDriverSeasonStats(races);
    renderStandingsSummary(standings, 'standings-summary', driverIndex);
    renderStandingsTable(standings, 'standings-full', driverIndex, seasonStats);
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

/* ─── RANKING PAGE ───────────────────────────────── */
/** Jeden wiersz — miejsce, mały awatar drużynowy, numer+flaga (ten sam
 *  driverIndex co wszędzie indziej), imię, wartość kategorii. Celowo nie
 *  reużywa pełnego renderDriverCell() — tu nie ma kar/rozwijanych
 *  szczegółów, tylko prosty ranking. `tag` — 'li' w rozwiniętej liście
 *  miejsc 2+ (wewnątrz <ol>), 'div' dla wiersza lidera w nagłówku wiersza. */
function renderRankingRow(pos, name, value, driverIndex, tag) {
  tag = tag || 'li';
  const entry = driverIndex?.[name];
  const avatar = entry ? driverAvatar(entry.team, entry.avatarUrl) : null;
  const ringColor = entry ? getTeamMeta(entry.team).color : null;
  const num = entry?.number;
  const country = entry?.country;
  // `name` przychodzi jako surowy Nick Racetools z wyników - entry.name to zawsze aktualny nick Steam.
  const displayName = entry?.name || name;
  return `
    <${tag} class="ranking-row">
      <span class="ranking-row-pos">${pos}</span>
      ${avatar ? `<img class="ranking-row-avatar" src="${avatar}" alt="" onerror="this.remove()"${ringColor ? ` style="--ring:${ringColor}"` : ''}>` : ''}
      <span class="ranking-row-name">${num !== null && num !== undefined ? `<span class="driver-number">${num}</span>` : ''}${country ? `<span class="driver-flag">${nationalityFlag(country)}</span>` : ''}${displayName}</span>
      <span class="ranking-row-value">${value}</span>
    </${tag}>`;
}

/** Jeden wiersz kategorii — domyślnie pokazuje TYLKO lidera; kliknięcie
 *  rozwija miejsca 2-5. Reużywa w 100% istniejący mechanizm .dd/.dd-trigger/
 *  .dd-panel (te same klasy co rozwijane szczegóły kierowcy w tabelach —
 *  initDriverDetailToggle() w js/app.js już globalnie obsługuje kliknięcie,
 *  zero nowej logiki JS do przełączania tutaj). Bez lidera (pusta kategoria)
 *  albo z dokładnie jednym wpisem (nic do rozwinięcia) wiersz nie jest
 *  klikalny — nie ma .dd/strzałki. */
function renderRankingItem(titleKey, iconName, entries, driverIndex, note) {
  const head = `
    <span class="ranking-item-icon">${icon(iconName)}</span>
    <div class="ranking-item-title-wrap">
      <span class="ranking-item-title">${t(titleKey)}</span>
      ${note ? `<span class="ranking-item-note">${note}</span>` : ''}
    </div>`;

  if (!entries.length) {
    return `<div class="ranking-item reveal">${head}<span class="ranking-item-empty">${t('empty.generic')}</span></div>`;
  }

  const [leader, ...rest] = entries;
  const leaderRow = renderRankingRow(1, leader.driver, leader.value, driverIndex, 'div');
  const others = rest.slice(0, 4);
  const expandable = others.length > 0;

  const trigger = `
    <div class="${expandable ? 'dd-trigger' : ''} ranking-item-trigger">
      ${head}
      ${leaderRow}
      ${expandable ? `<span class="ranking-item-chevron">${icon('chevronDown')}</span>` : ''}
    </div>`;

  if (!expandable) return `<div class="ranking-item reveal">${trigger}</div>`;

  return `
    <div class="dd ranking-item reveal" tabindex="0">
      ${trigger}
      <div class="dd-panel"><div class="dd-panel-inner"><div class="dd-panel-content ranking-item-panel-content">
        <ol class="ranking-card-list">${others.map((e, i) => renderRankingRow(i + 2, e.driver, e.value, driverIndex)).join('')}</ol>
      </div></div></div>
    </div>`;
}

/** Buduje wszystkie 10 wierszy Rankingu z już policzonych statystyk sezonu
 *  (computeDriverSeasonStats) i serii (computeStreaks). Kategoria "Najwyższa
 *  średnia pozycja" ma próg min. 5 startów w sezonie (ustalone z
 *  użytkownikiem) i sortuje rosnąco (mniejsza wartość = lepsza pozycja). */
function renderRankingGrid(stats, winStreaks, podiumStreaks, poleStreaks, driverIndex) {
  const names = Object.keys(stats);
  const byField = (field) => names
    .map(name => ({ driver: name, value: stats[name][field] }))
    .filter(e => e.value > 0)
    .sort((a, b) => b.value - a.value);
  const avgPosEntries = names
    .map(name => ({ driver: name, value: stats[name].avgFinish, starts: stats[name].starts }))
    .filter(e => e.value !== null && e.starts >= 5)
    .sort((a, b) => a.value - b.value)
    .map(e => ({ driver: e.driver, value: e.value.toFixed(1) }));
  const streakEntries = (streaks) => Object.entries(streaks)
    .map(([driver, value]) => ({ driver, value }))
    .filter(e => e.value > 0)
    .sort((a, b) => b.value - a.value);

  const items = [
    renderRankingItem('ranking.wins', 'trophy', byField('wins'), driverIndex),
    renderRankingItem('ranking.poles', 'bolt', byField('poles'), driverIndex),
    renderRankingItem('ranking.podiums', 'medal', byField('podiums'), driverIndex),
    renderRankingItem('ranking.dotd', 'star', byField('driverOfTheDay'), driverIndex),
    renderRankingItem('ranking.fastestLaps', 'bolt', byField('fastestLaps'), driverIndex),
    renderRankingItem('ranking.avgPosition', 'flag', avgPosEntries, driverIndex, t('ranking.minStartsNote')),
    renderRankingItem('ranking.finishes', 'laps', byField('finishes'), driverIndex),
    renderRankingItem('ranking.winStreak', 'trophy', streakEntries(winStreaks), driverIndex),
    renderRankingItem('ranking.podiumStreak', 'medal', streakEntries(podiumStreaks), driverIndex),
    renderRankingItem('ranking.poleStreak', 'bolt', streakEntries(poleStreaks), driverIndex),
  ];
  return `<div class="ranking-list">${items.join('')}</div>`;
}

async function initRanking() {
  initHeroPhotoCarousel(document.getElementById('ranking-hero'));
  const el = document.getElementById('ranking-list');
  if (!el) return;
  const allSeasons = await loadAllRaces();
  const seasonNames = Object.keys(allSeasons);

  if (!seasonNames.length) {
    el.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('empty.short')}</p>`;
    return;
  }

  let activeSeason = seasonNames[seasonNames.length - 1];
  let activeTier = DEFAULT_TIER;

  const rerender = async () => {
    const { driverIndex } = await loadSklad(activeTier);
    const races = racesForTier(allSeasons, activeSeason, activeTier);
    const stats = computeDriverSeasonStats(races);
    const winStreaks = computeStreaks(races, 'Race', d => d.pos === 1);
    const podiumStreaks = computeStreaks(races, 'Race', d => d.pos <= 3);
    const poleStreaks = computeStreaks(races, 'Qualifying', d => d.pos === 1);
    el.innerHTML = renderRankingGrid(stats, winStreaks, podiumStreaks, poleStreaks, driverIndex);
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
}

/* ─── LINEUP PAGE ────────────────────────────────── */
/** Jedna karta drużyny — logo+nazwa, zdjęcie bolidu (assets/cars/, patrz
 *  getTeamMeta().car) jako duży dekoracyjny element w rogu, lista kierowców
 *  (numer+flaga+imię — ten sam driver-number/driver-flag co wszędzie
 *  indziej). Sklad.json nie ma wymiaru sezonowego (płaski, aktualny stan),
 *  więc karta nie linkuje do żadnych statystyk — to czysto strona
 *  poglądowa "kto jeździ dla kogo teraz". */
function renderLineupCard({ meta, drivers }) {
  return `
    <div class="lineup-card reveal" style="--team-color:${meta.color || 'var(--red)'}">
      ${meta.car ? `<img class="lineup-card-car" src="${meta.car}" alt="" loading="lazy" onerror="this.remove()">` : ''}
      <div class="lineup-card-head">
        ${meta.logo ? `<img class="lineup-card-logo" src="${meta.logo}" alt="" onerror="this.remove()">` : ''}
        <span class="lineup-card-team">${meta.full}</span>
      </div>
      <div class="lineup-card-drivers">
        ${drivers.map(d => `
          <div class="lineup-driver">
            ${d.number !== null ? `<span class="driver-number">${d.number}</span>` : ''}
            ${d.country ? `<span class="driver-flag">${nationalityFlag(d.country)}</span>` : ''}
            <span class="lineup-driver-name">${d.name}</span>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderLineupGrid(teams) {
  return `<div class="lineup-grid">${teams.map(renderLineupCard).join('')}</div>`;
}

async function initLineup() {
  initHeroPhotoCarousel(document.getElementById('lineup-hero'));
  const el = document.getElementById('lineup-list');
  if (!el) return;

  let activeTier = DEFAULT_TIER;

  const rerender = async () => {
    const teams = await loadSkladTeams(activeTier);
    el.innerHTML = teams.length
      ? renderLineupGrid(teams)
      : `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
    observeReveal();
  };

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
      <div class="stat-tile"><span class="stat-tile-label">${t('leader')}</span><span class="stat-tile-value"><span data-count="${leader.points}">0</span><small> ${t('ptsSuffix')}</small></span><span class="stat-tile-sub">${leader.team}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">${t('gapToP2')}</span><span class="stat-tile-value accent">+<span data-count="${gap}">0</span><small> ${t('ptsSuffix')}</small></span><span class="stat-tile-sub">${t('over')} ${constructors[1].team}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">${t('mostWins')}</span><span class="stat-tile-value"><span data-count="${mostWins.wins}">0</span><small> ${t('winsSuffix')}</small></span><span class="stat-tile-sub">${mostWins.team}</span></div>
      <div class="stat-tile"><span class="stat-tile-label">${t('mostPodiums')}</span><span class="stat-tile-value"><span data-count="${mostPodiums.podiums}">0</span><small> ${t('podiumsSuffix')}</small></span><span class="stat-tile-sub">${mostPodiums.team}</span></div>
    </div>`;
  observeCounters();
}

/* ─── KONSTRUKTORZY PAGE ─────────────────────────── */
async function initKonstruktorzy() {
  initHeroPhotoCarousel(document.getElementById('konstruktorzy-hero'));
  const allSeasons = await loadAllRaces();
  const seasonNames = Object.keys(allSeasons);

  if (!seasonNames.length) {
    document.getElementById('constructors-full').innerHTML =
      `<p style="color:var(--gray);padding:2rem 0">${t('empty.short')}</p>`;
    return;
  }

  let activeSeason = seasonNames[seasonNames.length - 1];
  let activeTier = DEFAULT_TIER;

  const rerender = async () => {
    const { rosterMap: roster, driverIndex } = await loadSklad(activeTier);
    const races = racesForTier(allSeasons, activeSeason, activeTier);
    const constructors = computeConstructorStandings(races, roster);
    const seasonStats = computeDriverSeasonStats(races);
    renderConstructorsSummary(constructors, 'constructors-summary');
    renderConstructorsTable(constructors, 'constructors-full', driverIndex, seasonStats);
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
  if (s === 'completed') return { label: t('status.completed'), cls: 'done' };
  if (s === 'cancelled') return { label: t('status.cancelled'), cls: 'cancelled' };
  if (s === 'live') return { label: t('status.live'), cls: 'live' };
  return { label: t('status.upcoming'), cls: 'upcoming' };
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

/** Godzina odprawy = 30 min przed pierwszą sesją weekendu — sprintem, jeśli
 *  runda go ma, inaczej wyścigiem. Zwraca "HH:MM" albo null, gdy nie da się
 *  wyliczyć (brak daty/godziny). Odejmowanie minut na obiekcie Date poprawnie
 *  przechodzi przez północ/zmianę dnia samo z siebie. */
function briefingTime(r) {
  const useSprint = !!(r.hasSprint && r.sprintTime);
  const dt = parseRoundDateTime(useSprint ? (r.sprintDate || r.date) : r.date, useSprint ? r.sprintTime : r.time);
  if (!dt) return null;
  dt.setMinutes(dt.getMinutes() - 30);
  return dt.toTimeString().slice(0, 5);
}

function renderCalendarRounds(rounds, linkCtx) {
  if (!rounds.length) {
    return `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
  }
  return `
    <div class="calendar-grid reveal">
      ${rounds.map(r => {
        const { label, cls } = statusLabel(r.status);
        const flag = trackFlag(r.country || r.track);
        const hasSprint = !!(r.hasSprint && r.sprintTime);
        const badge = r.status === 'live'
          ? `<span class="cal-live-badge"><span class="live-dot"></span>${t('cal.live')}</span>`
          : (r._isNext ? `<span class="cal-next-badge">${t('cal.next')}</span>` : '');
        const thumbSlug = trackImageSlug(r.track);
        const thumb = thumbSlug
          ? `<div class="cal-card-thumb"><img src="assets/tracks/${thumbSlug}.jpg" alt="" loading="lazy" onerror="this.parentElement.remove()"></div>`
          : '';
        const briefing = briefingTime(r);
        const cardInner = `
            ${thumb}
            ${thumb ? `<span class="cal-round-badge">${r.round}</span>` : ''}
            ${badge}
            <div class="cal-card-top">
              <span class="cal-flag">${flag}</span>
              <div class="cal-card-title">
                <div class="cal-round">${t('round')} ${r.round}</div>
                <div class="cal-name">${r.track} Grand Prix</div>
              </div>
              <span class="cal-status ${cls}">${label}</span>
            </div>
            <div class="cal-card-body">
              <div class="cal-session-row cal-session-race">
                ${icon('flag')}
                <span class="cal-session-label">${t('sessionType.race')}</span>
                <span class="cal-session-time">${fmtDateTime(r.date, r.time)}</span>
              </div>
              ${hasSprint ? `
                <div class="cal-session-row cal-session-sprint">
                  ${icon('bolt')}
                  <span class="cal-session-label">${t('sessionType.sprint')}</span>
                  <span class="cal-session-time">${fmtDateTime(r.sprintDate || r.date, r.sprintTime)}</span>
                </div>
              ` : ''}
              ${briefing ? `<div class="cal-briefing">${icon('helmet')}${t('cal.briefing')}: <strong>${briefing}</strong></div>` : ''}
            </div>`;
        const cardClass = `cal-card ${r.status === 'completed' ? 'completed' : ''} ${r.status === 'cancelled' ? 'cancelled' : ''} ${r.status === 'live' ? 'live' : ''} ${hasSprint ? 'has-sprint' : ''}`;

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
  if (days === 0) return t('cal.today');
  if (days === 1) return `${t('cal.inPrefix')} 1 ${t('cal.day')}`;
  return `${t('cal.inPrefix')} ${days} ${t('cal.days')}`;
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
    ? icon('bolt') + t('cal.liveNow')
    : isCompleted
      ? icon('flag') + (opts.pastLabel || t('cal.lastRound'))
      : icon('calendar') + t('cal.nextRound');
  return `
    <div class="cal-featured reveal">
      <a class="cal-featured-card" href="${href}">
        ${photo}
        <div class="cal-featured-info">
          <span class="cal-featured-eyebrow ${isLive ? 'is-live' : ''}">${eyebrow}</span>
          <div class="cal-featured-title"><span class="icon icon-flag">${flag}</span>${r.track} Grand Prix</div>
          <div class="cal-featured-meta">
            <span class="cal-featured-meta-item">${icon('flag')}${t('round')} ${r.round}</span>
            <span class="cal-featured-meta-item">${icon('calendar')}${fmtDateTime(r.date, r.time)}</span>
            ${hasSprint ? `<span class="cal-featured-meta-item">${icon('bolt')}${t('sessionType.sprint')}: ${fmtDateTime(r.sprintDate || r.date, r.sprintTime)}</span>` : ''}
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
        return `<span class="cal-progress-dot ${cls}" title="${t('round')} ${r.round} · ${r.track}"></span>`;
      }).join('')}
      <span class="cal-progress-label">${doneCount}/${rounds.length} ${t('cal.roundsGenitive')}</span>
    </div>`;
}

/* ─── KALENDARZ PAGE ─────────────────────────────── */
async function initKalendarz() {
  const el = document.getElementById('calendar-full');
  if (!el) return;

  const allSeasons = await loadAllCalendars();
  const seasonNames = Object.keys(allSeasons);

  if (!seasonNames.length) {
    el.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
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
  initHeroPhotoCarousel(document.getElementById('wdc-hero'));
  const el = document.getElementById('wdc-list');
  if (!el) return;

  let activeTier = DEFAULT_TIER;

  const rerender = async () => {
    const [data, allSeasons, { rosterMap, driverIndex }] = await Promise.all([
      tryFetch(`Mistrzowie swiata/${activeTier}/mistrzowie.json`),
      loadAllRaces(),
      loadSklad(activeTier),
    ]);

    // "Na żywo" stan walki o tytuł w trwającym sezonie — niezależne od
    // mistrzowie.json (które jest ręcznie prowadzoną historią POTWIERDZONYCH
    // mistrzów), więc liczymy je zawsze, nawet gdy mistrzowie.json jest puste.
    const seasonNames = Object.keys(allSeasons);
    const latestSeason = seasonNames[seasonNames.length - 1];
    const liveStandings = latestSeason
      ? computeDriverStandings(racesForTier(allSeasons, latestSeason, activeTier), rosterMap, driverIndex)
      : [];
    const liveHtml = renderCurrentLeaderStatus(liveStandings, latestSeason, driverIndex);

    if (!data || !data.champions || !data.champions.length) {
      el.innerHTML = liveHtml || `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
      observeReveal();
      observeCounters();
      return;
    }

    // Sort by season descending (latest first)
    const champions = [...data.champions].reverse();

    el.innerHTML = `
      ${liveHtml}
      <div class="wdc-hero-wrap">
        ${champions.length > 0 ? renderWDCHero(champions[0], driverIndex) : ''}
      </div>
      <div class="wdc-grid">
        ${champions.map((c, i) => renderWDCCard(c, i, driverIndex)).join('')}
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

/** "Na żywo" stan walki o tytuł w trwającym sezonie — kto obecnie prowadzi
 *  klasyfikację kierowców i jaka jest jego przewaga nad P2. Celowo osobne od
 *  renderWDCHero() (który pokazuje ostatniego POTWIERDZONEGO mistrza z
 *  mistrzowie.json, ręcznie prowadzoną historię) — inny akcent kolorystyczny
 *  (czerwony, nie złoty) i wyraźna etykieta "na żywo", żeby nie sugerować, że
 *  sezon jest już rozstrzygnięty. Cicho nic nie renderuje, gdy sezon dopiero
 *  się zaczyna (mniej niż 2 klasyfikowanych kierowców). */
function renderCurrentLeaderStatus(standings, season, driverIndex) {
  if (!standings || standings.length < 2) return '';
  const leader = standings[0], p2 = standings[1];
  const gap = leader.points - p2.points;
  const avatar = driverAvatar(leader.team, driverIndex?.[leader.driver]?.avatarUrl);
  return `
    <div class="wdc-live-wrap">
      <div class="wdc-live reveal">
        <div class="wdc-live-badge"><span class="live-dot"></span>${t('wdc.titleFight')} — ${seasonLabel(season)}</div>
        <div class="wdc-live-body">
          ${avatar ? `<img class="wdc-live-avatar" src="${avatar}" alt="" onerror="this.remove()">` : ''}
          <div class="wdc-live-info">
            <div class="wdc-live-driver">${resolveDriverName(driverIndex, leader.driver)}</div>
            <div class="wdc-live-team">${renderTeamBadge(leader.team)}</div>
          </div>
          <div class="wdc-live-stats">
            <div class="wdc-live-stat"><span class="wdc-live-stat-num" data-count="${leader.points}">0</span><span class="wdc-live-stat-label">${t('points')}</span></div>
            <div class="wdc-live-stat"><span class="wdc-live-stat-num accent" data-count="${gap}">0</span><span class="wdc-live-stat-label">${t('gapToP2')}</span></div>
          </div>
        </div>
        <div class="wdc-live-note">${t('wdc.gapNotePrefix')} <strong>${resolveDriverName(driverIndex, p2.driver)}</strong> (${p2.team})</div>
      </div>
    </div>`;
}

function renderWDCHero(c, driverIndex) {
  const avatar = driverAvatar(c.team, driverIndex?.[c.driver]?.avatarUrl);
  return `
    <div class="wdc-hero reveal">
      <div class="wdc-hero-avatar-wrap">
        ${avatar ? `<img class="wdc-hero-avatar" src="${avatar}" alt="" onerror="this.style.display='none'">` : ''}
        <span class="wdc-hero-avatar-badge">${icon('crown','icon-lg icon-gold')}</span>
      </div>
      <div class="wdc-hero-label">${t('wdc.currentChampion')}</div>
      <div class="wdc-hero-driver">${resolveDriverName(driverIndex, c.driver)}</div>
      <div class="wdc-hero-season">${seasonLabel(c.season)} · ${renderTeamBadge(c.team)}</div>
      <div class="wdc-hero-stats">
        <div class="wdc-hero-stat">
          <div class="wdc-hero-stat-num" data-count="${c.points}">0</div>
          <div class="wdc-hero-stat-label">${t('points')}</div>
        </div>
        <div class="wdc-hero-stat">
          <div class="wdc-hero-stat-num" data-count="${c.wins}">0</div>
          <div class="wdc-hero-stat-label">${t('wins')}</div>
        </div>
        <div class="wdc-hero-stat">
          <div class="wdc-hero-stat-num" data-count="${c.podiums}">0</div>
          <div class="wdc-hero-stat-label">${t('podiums')}</div>
        </div>
        <div class="wdc-hero-stat">
          <div class="wdc-hero-stat-num" data-count="${c.polePositions}">0</div>
          <div class="wdc-hero-stat-label">${t('wdc.polePosition')}</div>
        </div>
      </div>
    </div>
  `;
}

function renderWDCCard(c, i, driverIndex) {
  const isLatest = i === 0;
  const avatar = driverAvatar(c.team, driverIndex?.[c.driver]?.avatarUrl);
  return `
    <div class="wdc-card reveal ${isLatest ? 'wdc-card-latest' : ''}">
      <div class="wdc-card-top">
        <div class="wdc-card-avatar-wrap">
          ${avatar ? `<img class="wdc-card-avatar" src="${avatar}" alt="" onerror="this.style.display='none'">` : `<div class="wdc-card-crown icon-gold">${icon(isLatest ? 'crown' : 'trophy', 'icon-lg')}</div>`}
          ${avatar ? `<span class="wdc-card-avatar-badge icon-gold">${icon(isLatest ? 'crown' : 'trophy')}</span>` : ''}
        </div>
        <div>
          <div class="wdc-card-season">${seasonLabel(c.season)}</div>
          <div class="wdc-card-driver">${resolveDriverName(driverIndex, c.driver)}</div>
          <div class="wdc-card-team">${renderTeamBadge(c.team)}</div>
        </div>
        <div class="wdc-card-pts">${c.points}<span>${t('ptsSuffix')}</span></div>
      </div>
      <div class="wdc-card-stats">
        <div class="wdc-stat-item">
          <span class="wdc-stat-icon icon-gold">${icon('trophy')}</span>
          <span class="wdc-stat-val">${c.wins}</span>
          <span class="wdc-stat-lbl">${t('wins')}</span>
        </div>
        <div class="wdc-stat-item">
          <span class="wdc-stat-icon icon-gold">${icon('medal')}</span>
          <span class="wdc-stat-val">${c.podiums}</span>
          <span class="wdc-stat-lbl">${t('podiums')}</span>
        </div>
        <div class="wdc-stat-item">
          <span class="wdc-stat-icon icon-gold">${icon('bolt')}</span>
          <span class="wdc-stat-val">${c.polePositions}</span>
          <span class="wdc-stat-lbl">${t('pole')}</span>
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
 *  thumbnailUrl (for other platforms, or as a poster for a self-hosted video file),
 *  or null (renders a plain placeholder instead). */
function clipThumbnail(clip) {
  if (clip.type === 'file') return clip.thumbnailUrl || null;
  const ytId = extractYouTubeId(clip.url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return clip.thumbnailUrl || null;
}

/** Extracts a frame from a same-origin video file as a small JPEG data URL —
 *  an automatic thumbnail for self-hosted clips the admin hasn't given a
 *  manual thumbnailUrl. Session-cached (sessionStorage) so repeat views in
 *  the same tab don't re-decode the video. Resolves null on any error/
 *  timeout — callers already tolerate a missing thumbnail gracefully
 *  (clipThumbnail() → null → existing placeholder card/hero). */
function getVideoThumbnail(url) {
  const cacheKey = 'hof-thumb:' + url;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return Promise.resolve(cached);
  } catch { /* sessionStorage unavailable (private mode etc.) — just skip caching */ }

  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px';

    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      video.remove();
      if (result) { try { sessionStorage.setItem(cacheKey, result); } catch { /* ignore */ } }
      resolve(result);
    };
    const timeoutId = setTimeout(() => finish(null), 8000);

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(1, (video.duration || 2) / 2);
    });
    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas');
        const maxW = 480;
        const scale = Math.min(1, maxW / (video.videoWidth || maxW));
        canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
        canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        finish(canvas.toDataURL('image/jpeg', 0.72));
      } catch {
        finish(null); // e.g. a decode error mid-seek
      }
    });
    video.addEventListener('error', () => finish(null));

    document.body.appendChild(video);
    video.src = url;
  });
}

/** Enriches file-type clips missing a manual thumbnailUrl with an
 *  auto-generated one (mutates the clip objects in place) before any
 *  rendering happens — clipThumbnail()/renderClip()/renderFeaturedCard()
 *  need zero changes, they already respect thumbnailUrl when it's set. */
async function autoThumbnailClips(clips) {
  const targets = clips.filter(c => c && c.type === 'file' && c.url && !c.thumbnailUrl);
  await Promise.all(targets.map(async (c) => {
    const thumb = await getVideoThumbnail(c.url);
    if (thumb) c.thumbnailUrl = thumb;
  }));
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
/** clip.url is a real URL for type "link" but a repo-relative file path for
 *  type "file" (new URL() on a relative path would throw / misparse) — this
 *  is the one host-label lookup every render path should go through. */
function clipHostMetaFor(clip) {
  if (clip.type === 'file') return { slug: 'video', label: t('hof.video') };
  return clipHostMeta(clip.url);
}

/** "Hełm + kierowca" na kartach Hall of Fame — podmienia ikonę hełmu na awatar
 *  drużynowy, jeśli kierowca jest w aktualnym składzie; w przeciwnym razie
 *  (np. klip ze starszego sezonu) zostaje sama ikona jak dotychczas. */
function clipDriverCredit(driverName, driverIndex) {
  if (!driverName) return '';
  const entry = driverIndex?.[driverName];
  const avatar = entry ? driverAvatar(entry.team, entry.avatarUrl) : null;
  const img = avatar ? `<img class="chip-avatar" src="${avatar}" alt="" onerror="this.remove()">` : icon('helmet');
  const flag = entry?.country ? `<span class="driver-flag">${nationalityFlag(entry.country)}</span>` : '';
  return `<span class="hof-clip-driver">${img}${flag}${driverName}</span>`;
}

/** Renders one clip as a self-hosted <video>, a YouTube embed, or a clean "watch"
 *  card, depending on its type/link. Used for Clip miesiąca / Najlepszy manewr
 *  (large, played inline), the per-race best-maneuver embed on wynik-wydarzenia.html,
 *  and the clip detail page.
 *  opts.ribbon = { label, tone: 'gold'|'red' } — corner tag identifying a spotlight slot.
 *  opts.hideInfo = true — omit the built-in title/meta/description block (the detail page
 *  renders its own richer header instead — see initHallOfFameClip()). */
function renderClip(clip, size, opts) {
  if (!clip || !clip.url) return '';
  opts = opts || {};
  const isFile = clip.type === 'file';
  const ytId = isFile ? null : extractYouTubeId(clip.url);
  const sizeClass = size === 'large' ? 'hof-clip-large' : 'hof-clip-card';
  const ribbonHtml = opts.ribbon
    ? `<span class="hof-ribbon hof-ribbon-${opts.ribbon.tone || 'red'}">${opts.ribbon.label}</span>`
    : '';
  const hostMeta = clipHostMetaFor(clip);

  const media = isFile
    ? `<div class="hof-embed-wrap">${ribbonHtml}<video controls preload="metadata"${clip.thumbnailUrl ? ` poster="${clip.thumbnailUrl}"` : ''}><source src="${clip.url}">${t('hof.videoUnsupported')}<a href="${clip.url}">${t('hof.downloadFile')}</a>.</video></div>`
    : ytId
    ? `<div class="hof-embed-wrap">${ribbonHtml}<iframe src="https://www.youtube.com/embed/${ytId}" title="${clip.title || 'Clip'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
    : `<a class="hof-watch-card" href="${clip.url}" target="_blank" rel="noopener">
         ${ribbonHtml}
         <span class="hof-watch-pattern" aria-hidden="true"></span>
         <span class="hof-watch-icon">${icon('play')}</span>
         <span class="hof-watch-label">${t('hof.watchOn')}</span>
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

/* ─── CLIPY PAGE ─────────────────────────────────── */
/** Karta jednego clipa z #clipy — reużywa istniejący .hof-watch-card (ikona+etykieta+host)
 *  zamiast pełnego odtwarzacza renderClip(), bo w siatce wielu clipów jednocześnie osadzanie
 *  iframe'ów/<video> dla każdego byłoby ciężkie; klik na kartę po prostu otwiera link. Komentarze
 *  z wątku (jeśli są) chowają się w rozwijanym panelu — ten sam mechanizm .dd co rozwijane rundy
 *  w Wynikach i kategorie w Rankingu. */
function renderClipCard(clip) {
  const hostMeta = clipHostMetaFor({ url: clip.link });
  const comments = Array.isArray(clip.comments) ? clip.comments : [];

  const watchCard = `
    <a class="hof-watch-card clip-watch" href="${clip.link}" target="_blank" rel="noopener">
      <span class="hof-watch-pattern" aria-hidden="true"></span>
      <span class="hof-watch-icon">${icon('play')}</span>
      <span class="hof-watch-label">${t('hof.watchOn')}</span>
      <span class="hof-watch-host hof-watch-host-${hostMeta.slug}">${hostMeta.label}</span>
    </a>`;

  const commentsBlock = comments.length ? `
    <div class="dd clip-comments-dd" tabindex="0">
      <div class="dd-trigger clip-comments-trigger">
        <span class="clip-comments-count">${comments.length} ${t('clipy.comments')}</span>
        <span class="clip-comments-chevron">${icon('chevronDown')}</span>
      </div>
      <div class="dd-panel"><div class="dd-panel-inner"><div class="dd-panel-content clip-comments-panel-content">
        ${comments.map(c => `
          <div class="clip-comment">
            <span class="clip-comment-author">${escHtml(c.authorTag)}</span>
            <span class="clip-comment-text">${escHtml(c.content)}</span>
          </div>`).join('')}
      </div></div></div>
    </div>` : '';

  return `
    <div class="clip-card reveal${clip.promoted ? ' clip-card-promoted' : ''}">
      ${clip.promoted ? `<span class="clip-card-promoted-badge">${icon('star', 'icon-gold')}${t('clipy.promoted')}</span>` : ''}
      <div class="clip-card-head">
        <span class="clip-card-author">${escHtml(clip.authorTag || '')}</span>
        <span class="clip-card-hearts">❤️ ${clip.hearts || 0}</span>
      </div>
      ${clip.caption ? `<p class="clip-card-caption">${escHtml(clip.caption)}</p>` : ''}
      ${watchCard}
      ${commentsBlock}
    </div>`;
}

function renderClipGrid(clips) {
  if (!clips.length) {
    return `<p style="color:var(--gray);padding:2rem 0">${t('empty.generic')}</p>`;
  }
  const sorted = clips.slice().sort((a, b) => (b.promoted - a.promoted) || (b.timestamp - a.timestamp));
  return `<div class="clip-grid">${sorted.map(renderClipCard).join('')}</div>`;
}

async function initClipy() {
  const el = document.getElementById('clipy-grid');
  if (!el) return;
  const data = await tryFetch('Clipy/clipy.json');
  const clips = data && Array.isArray(data.clips) ? data.clips : [];
  el.innerHTML = renderClipGrid(clips);
  observeReveal();
}

/* ─── PUNKTY KARNE PAGE ──────────────────────────── (dodano 2026-08-30, zawężono 2026-08-31)
   Strona pokazuje WYŁĄCZNIE kary typu "Punkty Karne" (entries, patrz addPunktyKarneEntry w
   index.js) - reszta (kara czasowa, race incident, DSQ, quali-ban) jest widoczna w wynikach
   wyścigu/sesji, którego dotyczy (patrz renderPenaltyNotes na stronie wyniku, session.penaltyNotes).
   driverName to zamrożony nick z momentu wydania kary; driverId (gdy znany) pozwala rozwiązać
   zawsze najświeższy nick EA/Steam z aktualnego składu, patrz renderPunktyKarneList. */
function renderPunktyKarneEntry(entry) {
  const dateStr = entry.issuedAt ? new Date(entry.issuedAt).toLocaleDateString(getLang() === 'en' ? 'en-GB' : 'pl-PL') : '';
  return `
    <div class="pk-entry ${entry.cancelled ? 'cancelled' : ''}">
      <div class="pk-entry-main">
        <span class="pk-entry-reason">${entry.reason || ''}</span>
        <span class="pk-entry-meta">${t('pk.case')} #${entry.numer ?? '?'} · ${dateStr}${entry.cancelled ? ` · ${t('pk.cancelled')}` : ''}</span>
      </div>
      <span class="pk-entry-points">+${entry.points}</span>
    </div>`;
}

function renderPunktyKarneList(entries, driverIndex, driverIndexById) {
  if (!entries.length) return `<p style="color:var(--gray)">${t('pk.noEntries')}</p>`;

  // Grupowanie po stabilnym kluczu (driverId, gdy jest znany - inaczej zamrożony driverName) - żeby
  // historia jednego kierowcy się nie rozjeżdżała na dwa wiersze, gdyby jego wyświetlana nazwa
  // zmieniła się w międzyczasie (patrz resolveName niżej).
  const byDriver = {};
  for (const e of entries) {
    const key = e.driverId || e.driverName;
    if (!byDriver[key]) byDriver[key] = [];
    byDriver[key].push(e);
  }
  const totals = Object.entries(byDriver)
    .map(([key, list]) => ({ key, list, total: list.filter((e) => !e.cancelled).reduce((s, e) => s + (e.points || 0), 0) }))
    .sort((a, b) => b.total - a.total);

  return `<div class="results-list">${totals.map(({ key, list, total }) => {
    // Zawsze najświeższy zarejestrowany nick EA/Steam z aktualnego składu (po driverId), zamiast
    // zamrożonego stringu z momentu wydania kary - fallback na ten string tylko gdy kierowcy nie ma
    // już w składzie tego tieru (odszedł, albo nigdy nie miał driverId - stare wpisy sprzed tej zmiany).
    // Dalszy fallback: nick SERWEROWY zamrożony w momencie wydania kary (entry.discordNick) zamiast
    // surowego driverName (który w najgorszym razie bywał "Discord <id>").
    const byId = list[0].driverId ? driverIndexById?.[list[0].driverId] : null;
    const driver = byId?.name || list[0].discordNick || list[0].driverName;
    const info = byId || driverIndex[driver];
    const avatarUrl = info?.avatarUrl || list[0].avatarUrl || null;
    const sorted = [...list].sort((a, b) => (b.issuedAt || 0) - (a.issuedAt || 0));
    return `
    <div class="dd results-item" tabindex="0">
      <div class="dd-trigger pk-row">
        <span class="pk-row-driver">
          ${avatarUrl ? `<img class="chip-avatar" src="${avatarUrl}" alt="" onerror="this.remove()">` : ''}
          ${info && info.number !== null && info.number !== undefined ? `<span class="driver-number">${info.number}</span>` : ''}
          ${info && info.country ? nationalityFlag(info.country) : ''}
          ${driver}
        </span>
        <span class="pk-row-points">${total} pkt</span>
        <span class="pk-row-chevron">${icon('chevronDown')}</span>
      </div>
      <div class="dd-panel"><div class="dd-panel-inner"><div class="dd-panel-content pk-row-panel-content">
        ${sorted.map(renderPunktyKarneEntry).join('')}
      </div></div></div>
    </div>`;
  }).join('')}</div>`;
}

async function initPunktyKarne() {
  initHeroPhotoCarousel(document.getElementById('punkty-karne-hero'));
  const el = document.getElementById('pk-list');
  if (!el) return;

  // Punkty karne pokazują WYŁĄCZNIE kary typu "Punkty Karne" (entries) - reszta (kara czasowa, race
  // incident, DSQ, quali-ban) jest widoczna w wynikach wyścigu/sesji, którego dotyczy (patrz
  // renderSessionResults, sekcja "Kary i odwołania").
  const [allSeasons, data] = await Promise.all([loadAllRaces(), tryFetch('PunktyKarne/punkty_karne.json')]);
  const seasonNames = Object.keys(allSeasons);
  const entries = data && Array.isArray(data.entries) ? data.entries : [];

  let activeSeason = seasonNames.length ? seasonNames[seasonNames.length - 1] : '1';
  let activeTier = DEFAULT_TIER;

  const rerender = async () => {
    const { driverIndex, driverIndexById } = await loadSklad(activeTier);
    const tierNum = Number(activeTier.replace('Tier ', ''));
    const filteredEntries = entries.filter((e) => String(e.season) === String(activeSeason) && Number(e.tier) === tierNum);
    el.innerHTML = renderPunktyKarneList(filteredEntries, driverIndex, driverIndexById);
    observeReveal();
  };

  if (seasonNames.length) renderSeasonTabs(allSeasons, activeSeason, (name) => { activeSeason = name; rerender(); });
  renderTierTabs(activeTier, (tier) => { activeTier = tier; rerender(); });

  rerender();
}

/** Renders one "Wyróżniony clip" as a thumbnail card that links to its own detail page
 *  (hall-of-fame-clip.html?i=N) instead of playing/linking out directly. */
function renderFeaturedCard(clip, index, driverIndex) {
  if (!clip || !clip.url) return '';
  const thumb = clipThumbnail(clip);
  const hostMeta = clipHostMetaFor(clip);
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
/** Zwraca Promise<boolean> — true, jeśli faktycznie ustawiono zdjęcie w tle
 *  (miniatura klipu miesiąca/najlepszego manewru istnieje i się wczytała).
 *  initHallOfFame() czeka na wynik, żeby wiedzieć, czy trzeba sięgnąć po
 *  zapasową karuzelę zdjęć (initHeroPhotoCarousel()) zamiast tego. */
function applyHofHeroBackground(heroEl, clip) {
  if (!heroEl || !clip) return Promise.resolve(false);
  const url = clipThumbnail(clip);
  if (!url) return Promise.resolve(false);
  return new Promise((resolve) => {
    const test = new Image();
    test.onload = () => {
      heroEl.style.backgroundImage =
        `linear-gradient(180deg, rgba(10,11,13,.78) 0%, rgba(10,11,13,.93) 55%, var(--black) 100%), ` +
        `radial-gradient(ellipse 70% 90% at 50% 100%, rgba(225,6,0,0.16) 0%, transparent 70%), ` +
        `url("${url}")`;
      heroEl.classList.add('has-track-bg');
      resolve(true);
    };
    test.onerror = () => resolve(false);
    test.src = url;
  });
}

async function initHallOfFame() {
  const [data, { driverIndex }] = await Promise.all([tryFetch('HallOfFame/hall_of_fame.json'), loadSklad(DEFAULT_TIER)]);
  if (data) {
    await autoThumbnailClips([data.clipOfMonth, data.bestManeuverAllTime, ...(data.featured || [])].filter(Boolean));
  }
  const hofHeroEl = document.getElementById('hof-hero');
  const gotClipPhoto = await applyHofHeroBackground(hofHeroEl, data && (data.clipOfMonth || data.bestManeuverAllTime));
  // Brak miniatury klipu miesiąca/najlepszego manewru (albo nie wczytała się)
  // — sięgamy po tę samą karuzelę zdjęć w tle co inne podstrony bez
  // naturalnego zdjęcia, zamiast zostawiać sam znak wodny.
  if (!gotClipPhoto) initHeroPhotoCarousel(hofHeroEl);

  const monthHost = document.getElementById('hof-clip-of-month');
  const maneuverHost = document.getElementById('hof-best-maneuver');
  const featuredHost = document.getElementById('hof-featured');

  if (!data) {
    const emptyMsg = `<p style="color:var(--gray);padding:1rem 0">${t('empty.generic')}</p>`;
    if (monthHost) { monthHost.classList.remove('hof-skeleton'); monthHost.innerHTML = emptyMsg; }
    if (maneuverHost) { maneuverHost.classList.remove('hof-skeleton'); maneuverHost.innerHTML = emptyMsg; }
    if (featuredHost) featuredHost.innerHTML = emptyMsg;
    return;
  }

  if (monthHost) {
    monthHost.classList.remove('hof-skeleton');
    monthHost.innerHTML = data.clipOfMonth
      ? renderClip(data.clipOfMonth, 'large', { ribbon: { label: t('hof.clipOfMonth'), tone: 'gold' }, driverIndex })
      : `<p style="color:var(--gray);padding:1rem 0">${t('hof.noClipOfMonth')}</p>`;
  }
  if (maneuverHost) {
    maneuverHost.classList.remove('hof-skeleton');
    maneuverHost.innerHTML = data.bestManeuverAllTime
      ? renderClip(data.bestManeuverAllTime, 'large', { ribbon: { label: t('bestManeuver'), tone: 'red' }, driverIndex })
      : `<p style="color:var(--gray);padding:1rem 0">${t('hof.noBestManeuver')}</p>`;
  }
  if (featuredHost) {
    const featured = data.featured || [];
    featuredHost.innerHTML = featured.length
      ? featured.map((c, i) => renderFeaturedCard(c, i, driverIndex)).join('')
      : `<p style="color:var(--gray);padding:1rem 0">${t('hof.noFeaturedClips')}</p>`;
  }

  observeReveal();
}

/* ─── HALL OF FAME — CLIP DETAIL PAGE ────────────── */
async function initHallOfFameClip() {
  initHeroPhotoCarousel(document.getElementById('hof-clip-hero'));
  const host = document.getElementById('hof-clip-detail');
  const relatedHost = document.getElementById('hof-related');
  if (!host) return;

  const params = new URLSearchParams(location.search);
  const index = parseInt(params.get('i'), 10);
  const [data, { driverIndex }] = await Promise.all([tryFetch('HallOfFame/hall_of_fame.json'), loadSklad(DEFAULT_TIER)]);
  const featured = data && Array.isArray(data.featured) ? data.featured : [];
  const clip = featured[index];
  if (clip) await autoThumbnailClips(featured);

  if (!clip) {
    host.innerHTML = `<p style="color:var(--gray);padding:2rem 0">${t('hof.clipNotFound')}</p>`;
    return;
  }

  document.title = `${clip.title || 'Clip'} — Hall of Fame — Polaris Racing League`;
  const hostMeta = clipHostMetaFor(clip);

  const head = `
    <div class="hof-detail-head reveal">
      <span class="hof-detail-eyebrow">${t('hof.featuredClip')}</span>
      <h1 class="hof-detail-title">${clip.title || t('hof.untitled')}</h1>
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
        <span class="section-label">${t('hof.seeAlso')}</span>
        <h2 class="section-title">${t('hof.otherFeaturedClips')}</h2>
        <div class="section-divider"></div>
      </div>
      <div class="hof-grid reveal">
        ${related.map(({ c, i }) => renderFeaturedCard(c, i, driverIndex)).join('')}
      </div>` : '';
  }
  observeReveal();
}
