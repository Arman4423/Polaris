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
      wynik_bahrain.json
      wynik_monza.json
    Tier 2/
      ...
    Tier 3/
      ...
  Sezon 2/
    Tier 1/
      wynik_singapur.json
    Tier 2/
      ...
    Tier 3/
      ...
```

### Kroki

1. Wyeksportuj wynik wyścigu z **Racing League Tools** jako plik `.json` (Session export) — albo skorzystaj z panelu administracyjnego, który to samo generuje z CSV/ręcznego wpisu.
2. Wrzuć plik do odpowiedniego folderu Tieru, np. `Wyniki/Sezon 1/Tier 1/`, przez GitHub → "Add file" → "Upload files".
3. Gotowe — **nie trzeba nic dopisywać do żadnego manifestu**. Strona sama sprawdza przez API GitHuba, jakie pliki `.json` są w folderze, i wczytuje je wszystkie automatycznie.

### Jak to działa (i co, jeśli coś nie zadziała)

Strona wykrywa Wasze repozytorium z adresu URL, pod którym jest hostowana (typowy adres GitHub Pages: `https://twojnick.github.io/nazwa-repo/`), i pyta GitHub o listę plików w folderze. To działa automatycznie, bez żadnej konfiguracji, o ile strona jest hostowana na `*.github.io`.

Jeśli z jakiegoś powodu to zapytanie się nie uda — np. przekroczony publiczny limit zapytań do API GitHuba (60/godzinę na odwiedzającego), strona działa lokalnie na Twoim komputerze, albo macie własną domenę zamiast `github.io` — strona **automatycznie** wraca do starego, zapasowego sposobu: pliku `manifest.json` w folderze, z listą nazw plików. Możesz go spokojnie zostawić w folderach (nie przeszkadza), a panel administracyjny nadal potrafi go wygenerować, jeśli wolisz mieć to jako dodatkowe zabezpieczenie.

Jeśli macie własną domenę (nie `*.github.io`) i chcecie, żeby auto-wykrywanie i tak działało, otwórz `js/app.js`, znajdź linijkę:

```js
const GITHUB_REPO_OVERRIDE = null;
```

i zmień na:

```js
const GITHUB_REPO_OVERRIDE = { owner: 'twoj-nick-na-githubie', repo: 'nazwa-repozytorium' };
```

### Nowy sezon

Aby dodać Sezon 3, stwórz folder `Wyniki/Sezon 3/` z podfolderami `Tier 1/`, `Tier 2/`, `Tier 3/`,
a następnie dodaj sezon w `js/app.js` w sekcji `SEASONS_CONFIG`:

```js
const SEASONS_CONFIG = [
  { name: 'Sezon 1', folder: 'Wyniki/Sezon 1' },
  { name: 'Sezon 2', folder: 'Wyniki/Sezon 2' },
  { name: 'Sezon 3', folder: 'Wyniki/Sezon 3' },  // ← dodaj
];
```

Tiery (`Tier 1/2/3`) są wspólne dla wszystkich sezonów i nie trzeba ich osobno konfigurować.

## Kalendarz

Działa dokładnie tak samo jak Wyniki (też bez manifestu — patrz wyżej), tylko w folderze `Kalendarz/`:

```
Kalendarz/
  Sezon 1/
    Tier 1/
      kalendarz_sezon1.json
    Tier 2/
      ...
    Tier 3/
      ...
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
  "clipOfMonth": { "url": "https://...", "title": "...", "driver": "...", "month": "Lipiec 2026", "category": "Najlepsze wyprzedzanie", "description": "..." },
  "bestManeuverAllTime": { "url": "https://...", "title": "...", "driver": "...", "category": "Wypadek", "description": "..." },
  "featured": [
    { "url": "https://...", "title": "...", "driver": "...", "category": "Pole Position", "description": "..." }
  ]
}
```

- Linki do YouTube (youtube.com / youtu.be) pokazują się jako osadzony odtwarzacz.
- Linki z innych miejsc (Medal.tv, Streamable, Twitter/X itd.) pokazują się jako karta z przyciskiem "Obejrzyj" prowadzącym do klipu.
- Puste pole (`null` albo brak wpisów w `featured`) pokazuje "Brak jeszcze..." zamiast się wywalać.
- Pole `category` jest opcjonalne (np. "Najlepsze wyprzedzanie", "Wypadek", "Pole Position") — jeśli go nie podasz, po prostu się nie pokaże.

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

## Aktualne składy drużyn

Plik `Sklady/Tier X/sklad.json` mówi stronie, którzy kierowcy **aktualnie** jeżdżą dla której drużyny w danym Tierze — i jakimi numerami bolidów:

```json
{
  "teams": [
    { "team": "Ferrari", "drivers": [{ "name": "Kierowca A", "number": 16 }, { "name": "Kierowca B", "number": 55 }] },
    { "team": "McLaren", "drivers": [{ "name": "Kierowca C", "number": 4 }] }
  ]
}
```

Do jednej drużyny można dopisać dowolną liczbę kierowców (nie tylko dwóch) — przydaje się to przy zmianach w trakcie sezonu: wystarczy usunąć wpis kierowcy z jednej drużyny i dodać go (lub przenieść) do drugiej w panelu administracyjnym. Stary format (`"drivers": ["Kierowca A", "Kierowca B"]`, same nazwy bez numerów) nadal działa — panel administracyjny i strona automatycznie podnoszą go do nowego kształtu, traktując brakujący numer jako pusty.

To wpływa **wyłącznie** na to, jacy kierowcy (i z jakim numerem) wyświetlają się przy drużynie w Klasyfikacji Konstruktorskiej oraz przy nazwiskach kierowców na całej stronie — nie ma żadnego wpływu na liczenie punktów. Punkty konstruktorów zawsze liczą się historycznie: jeśli kierowca X zdobył 10 punktów dla drużyny XX w rundzie 1, te punkty zostają przy XX na zawsze, nawet jeśli w rundzie 2 kierowca X przechodzi do drużyny YY (punkty z rundy 2 pójdą już do YY). Punkty w Klasyfikacji Kierowców są zawsze przypisane do kierowcy i sumują się niezależnie od tego, dla ilu drużyn jeździł w sezonie.

Jeśli nie wgrasz jeszcze pliku `sklad.json` dla danego Tieru, strona pokaże zamiast tego wszystkich kierowców, którzy kiedykolwiek zdobyli punkty dla danej drużyny (stare zachowanie) — więc nic się nie zepsuje, dopóki nie zaczniesz zarządzać składami przez panel.

Nazwę drużyny w pliku możesz wpisać w dowolnym wariancie (np. "Red Bull" albo "Oracle Red Bull Racing") — strona sama dopasuje ją do właściwego zespołu, tak samo jak w wynikach.

## Strategia opon i najszybsze okrążenie

Jeśli importujesz plik z Racing League Tools, strona automatycznie pokazuje:
- **Strategię opon** każdego kierowcy jako sekwencję kolorowych plakietek ze zmieszaniem (np. 🟡8→⚪7→🟡11 = Medium 8 okrążeń → Hard 7 okrążeń → Medium 11 okrążeń)
- **Najszybsze okrążenie** każdego kierowcy (czas + rodzaj opony)
- **Najszybsze okrążenie całej sesji** jako wyróżniony "chip" nad tabelą wyników

Te dane pochodzą wprost z pól `stints` i `fastestLapTime`/`fastestLapTyreCompound` w eksporcie z Racing League Tools — nic nie trzeba dodatkowo wypełniać. Panel administracyjny **zachowuje te dane bez zmian** nawet jeśli edytujesz wynik i dodajesz kary — nie ma osobnego edytora do ręcznego poprawiania strategii opon (to precyzyjne dane telemetryczne z gry, nie coś co się ręcznie przepisuje).

Jeśli wynik pochodzi z CSV albo został wpisany ręcznie, kolumny "Opony" i "Najsz. okr." po prostu się nie pokażą — strona nie ma tych danych znikąd wziąć.
