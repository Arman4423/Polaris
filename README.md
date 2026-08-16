# Polaris Racing League — Strona ligowa

## Podział na Tiery

Każdy sezon (w Wynikach i Kalendarzu) jest podzielony na **Tier 1**, **Tier 2** i **Tier 3**.
Na stronie domyślnie wyświetla się **Tier 1** — pozostałe Tiery wybiera się zakładkami
tuż pod zakładkami sezonu (na stronie WDC są tylko zakładki Tierów, bez sezonów).

## Jak dodawać wyniki?

Wyniki są wczytywane **automatycznie** z folderu `Wyniki/`.

### Struktura folderów

```
Wyniki/
  Sezon 1/
    Tier 1/
      manifest.json          ← lista plików JSON w tym Tierze
      wynik_bahrain.json
      wynik_monza.json
    Tier 2/
      manifest.json
      ...
    Tier 3/
      manifest.json
      ...
  Sezon 2/
    Tier 1/
      manifest.json
      wynik_singapur.json
    Tier 2/
      ...
    Tier 3/
      ...
```

### Kroki

1. Wyeksportuj wynik wyścigu z **Racing League Tools** jako plik `.json` (Session export)
2. Wrzuć plik do odpowiedniego folderu Tieru, np. `Wyniki/Sezon 1/Tier 1/`
3. Dodaj nazwę pliku do `manifest.json` w tym folderze Tieru:

```json
{
  "season": "Sezon 1",
  "tier": "Tier 1",
  "files": [
    "wynik_bahrain.json",
    "wynik_monza.json"
  ]
}
```

4. Gotowe! Strona automatycznie pobierze dane i wyświetli wyniki w odpowiednim Tierze.

### Nowy sezon

Aby dodać Sezon 3, stwórz folder `Wyniki/Sezon 3/` z podfolderami `Tier 1/`, `Tier 2/`, `Tier 3/`
(każdy z własnym `manifest.json`), a następnie dodaj sezon w `js/app.js` w sekcji `SEASONS_CONFIG`:

```js
const SEASONS_CONFIG = [
  { name: 'Sezon 1', folder: 'Wyniki/Sezon 1' },
  { name: 'Sezon 2', folder: 'Wyniki/Sezon 2' },
  { name: 'Sezon 3', folder: 'Wyniki/Sezon 3' },  // ← dodaj
];
```

Tiery (`Tier 1/2/3`) są wspólne dla wszystkich sezonów i nie trzeba ich osobno konfigurować.

## Kalendarz

Działa dokładnie tak samo jak Wyniki, tylko w folderze `Kalendarz/`:

```
Kalendarz/
  Sezon 1/
    Tier 1/
      manifest.json
      kalendarz_sezon1.json
    Tier 2/
      manifest.json
    Tier 3/
      manifest.json
```

### Dodawanie sprintu do wydarzenia

Każda runda w pliku kalendarza (np. `kalendarz_sezon1.json`) może dodatkowo mieć sprint.
Wystarczy dopisać trzy pola: `hasSprint`, `sprintDate` i `sprintTime`:

```json
{
  "round": 2,
  "track": "Monza",
  "country": "Italy",
  "date": "2026-06-22",
  "time": "20:30",
  "status": "upcoming",
  "hasSprint": true,
  "sprintDate": "2026-06-21",
  "sprintTime": "18:00"
}
```

- `hasSprint: true` — włącza pokazanie sprintu na karcie wydarzenia
- `sprintDate` — data sprintu (opcjonalna; jeśli pominięta, przyjmuje datę wyścigu głównego)
- `sprintTime` — godzina sprintu (wymagana, żeby sprint się pokazał)

Jeśli runda nie ma sprintu, po prostu pomiń te pola.

## WDC (Mistrzowie Świata)

Folder `Mistrzowie swiata/` również dzieli się na Tiery — bez podziału na sezony,
bo lista mistrzów już zawiera sezon w każdym wpisie:

```
Mistrzowie swiata/
  Tier 1/
    mistrzowie.json
  Tier 2/
    mistrzowie.json
  Tier 3/
    mistrzowie.json
```

## Logo

Strona nazywa się teraz **Polaris Racing League**, ale nie mam jeszcze grafiki logo w tej wersji —
dotychczasowe logo miało wpisany napis "Liga Sobotnia 2.0", więc zamiast zostawić niepasującą
grafikę, strona pokazuje elegancki napis tekstowy "✦ POLARIS RACING" (nawigacja, stopka, hero,
ekran ładowania) do czasu podmiany.

Żeby wgrać nowe logo: wrzuć plik **`assets/logo-polaris.png`** (najlepiej z przezroczystym tłem) —
strona automatycznie go wykryje i podmieni na obrazek we wszystkich miejscach, bez zmian w kodzie.

## Hall of Fame

Dane w `HallOfFame/hall_of_fame.json`:

```json
{
  "clipOfMonth": { "url": "https://...", "title": "...", "driver": "...", "month": "Lipiec 2026", "description": "..." },
  "bestManeuverAllTime": { "url": "https://...", "title": "...", "driver": "...", "description": "..." },
  "featured": [
    { "url": "https://...", "title": "...", "driver": "...", "description": "..." }
  ]
}
```

- Linki do YouTube (youtube.com / youtu.be) pokazują się jako osadzony odtwarzacz.
- Linki z innych miejsc (Medal.tv, Streamable, Twitter/X itd.) pokazują się jako karta z przyciskiem "Obejrzyj" prowadzącym do klipu.
- Puste pole (`null` albo brak wpisów w `featured`) pokazuje "Brak jeszcze..." zamiast się wywalać.

Najłatwiej edytować ten plik przez panel administracyjny (zakładka "🎬 Hall of Fame") — patrz niżej.

## Panel administracyjny

Do wpisywania wyników (import CSV z gry, ręczne wpisywanie, edycja istniejących wyników, kary czasowe) oraz do zarządzania Hall of Fame służy osobny plik **`panel-administracyjny.html`**, który dostałeś razem ze stroną.

### Ważne — jak to jest zabezpieczone

Strona stoi na GitHub Pages, czyli są to same statyczne pliki. To ważne ograniczenie: **żadna strona hostowana w ten sposób nie może mieć prawdziwego logowania** — cokolwiek wrzucisz do repozytorium, każdy może pobrać i przeczytać (łącznie z każdym "sekretnym" hasłem zaszytym w JavaScript). Dlatego zamiast udawać zabezpieczenie, które i tak dałoby się obejść, zrobiliśmy to tak, żeby zabezpieczenie było prawdziwe:

- **`panel-administracyjny.html` nigdy nie trafia do repozytorium ani na stronę.** Trzymasz go tylko lokalnie, na komputerach osób, które mają wpisywać wyniki. Skoro nie ma go na GitHub Pages, nikt z zewnątrz nie może go nawet znaleźć, nie mówiąc już o użyciu.
- **Prawdziwa kontrola dostępu = kto ma prawo wgrywać pliki do repozytorium na GitHubie.** To ustawiasz w Settings → Collaborators (albo Settings → Manage access) swojego repozytorium — dodajesz tam tylko zaufane osoby. To jest realne zabezpieczenie: GitHub wymaga zalogowania i sprawdza uprawnienia po swojej stronie, więc nie da się tego obejść, edytując coś w przeglądarce.
- Jeśli chcesz dodatkowej warstwy bezpieczeństwa (np. żeby ktoś nie mógł od razu nadpisać wyników bez akceptacji drugiej osoby): włącz **branch protection** na głównej gałęzi w Settings → Branches i wymagaj Pull Requestów z akceptacją przed połączeniem zmian.
- Panel działa w 100% w przeglądarce (bez internetu, bez żadnego serwera) — nic z tego, co w nim wpiszesz, nigdzie nie "wycieka". Jedyne co robi, to generuje plik `.json`, który potem sam wgrywasz na GitHuba.

### Jak wgrywać wyniki (bez znajomości gita)

1. Otwórz `panel-administracyjny.html` lokalnie w przeglądarce.
2. Zaimportuj CSV z gry albo wpisz wynik ręcznie (albo wczytaj istniejący wynik, żeby go poprawić).
3. Kliknij "Generuj plik JSON" — panel pobierze plik i pokaże dokładną instrukcję.
4. Na GitHub.com wejdź w odpowiedni folder w repozytorium → **Add file → Upload files** → wrzuć pobrany plik → **Commit changes**.

Nie musisz umieć gita ani terminala — cała operacja da się zrobić myszką w przeglądarce na stronie GitHub.com.

## Wyniki oparte na kalendarzu

Strona **Wyniki** i **Kalendarz** pokazują teraz to samo: siatkę wydarzeń (rund). Kliknięcie w dowolne wydarzenie — czy to z Kalendarza, czy z Wyników — przenosi na jego stronę wyników: `wynik-wydarzenia.html?season=...&tier=...&round=...`.

Jedna runda może mieć do 4 osobnych plików wyników w tym samym folderze `Wyniki/Sezon X/Tier Y/`:
- Kwalifikacje Sprintu
- Sprint
- Kwalifikacje
- Wyścig

Strona sama grupuje pliki po numerze rundy i pokazuje tylko te zakładki sesji, dla których faktycznie jest plik — jeśli weekend nie miał sprintu, zakładki Sprintu po prostu się nie pojawią. Typ sesji wybierasz w panelu administracyjnym w polu "Typ sesji" przy dodawaniu wyniku.

**Ważne:** do klasyfikacji kierowców/konstruktorów oraz WDC liczą się tylko sesje **Wyścig** i **Sprint** — Kwalifikacje nigdy nie dają punktów mistrzostwa, więc nie zaburzą tabeli.

## Kary — jak to działa

To jest najważniejsza zmiana: **nie wpisujesz ręcznie finalnej pozycji**. Wpisujesz surowy wynik z toru (pozycja, strata do lidera) i ewentualne kary — a strona sama przelicza kolejność i punkty. Dokładnie tak samo dzieje się to w panelu administracyjnym na żywo (widzisz podgląd "→ finalnie P3" przy wierszu, zanim jeszcze wygenerujesz plik).

W panelu administracyjnym, przy każdym kierowcy możesz wpisać:

- **Kara czasowa (s)** — np. wpisujesz `3`, strona dolicza 3 sekundy do czasu tego kierowcy i przelicza kolejność względem reszty stawki.
- **Odwołanie kary (s)** — jeśli kara została odwołana (np. po proteście), wpisujesz tu ile sekund ma zostać *odjęte* z powrotem — to działa niezależnie od pola "Kara czasowa", więc możesz np. wpisać karę 5s, a potem odwołanie 5s, żeby wrócić do stanu sprzed kary, zamiast kasować pierwotny wpis.
- **Kara pozycji** — np. wpisujesz `5`, kierowca spada o 5 miejsc w końcowej klasyfikacji, niezależnie od czasu (typowe dla kar nakładanych na kwalifikacje/grid).

Wszystkie trzy kary działają razem: strona najpierw przelicza kolejność po czasie (uwzględniając kary i odwołania czasowe), a dopiero potem stosuje kary pozycji jako ostatni krok. Punkty zawsze wynikają z ostatecznej pozycji, nie z tego co było "na torze".

Kierowcy ze statusem DNF/DSQ zawsze lądują na końcu klasyfikacji, niezależnie od kar czasowych — kara czasowa nie pomoże komuś, kto nie ukończył wyścigu.

Na stronie przy kierowcy z jakąkolwiek karą pojawia się plakietka: czerwona "+Xs" (kara), zielona "−Xs" (odwołanie), żółta "▼X poz." (kara pozycji) — najedź myszką, żeby zobaczyć powód.

### Format Racing League Tools i pole gapMs

Do przeliczania kolejności strona potrzebuje surowej straty do lidera w milisekundach (`gapMs`). Jeśli importujesz plik z Racing League Tools, to pole już tam jest. Jeśli wpisujesz wynik ręcznie albo importujesz CSV z gry, panel **sam** wylicza `gapMs` z pola "Strata" (np. z tekstu "+2.500" zrobi 2500 ms) w momencie generowania pliku — nie musisz nic dodatkowo wypełniać.
