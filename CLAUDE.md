# CLAUDE.md

Aanwijzingen voor Claude Code bij het werken in deze repository.

## Wat dit is

De website van **COI vzw** (Centrum voor Ondersteuning van digitale Innovatie),
een Vlaamse vereniging zonder winstoogmerk. Live op **https://www.coivzw.be**.

Antwoord altijd in het **Nederlands**, ongeacht de taal van instructies of
tool-uitvoer.

## Opbouw

Geen buildstap, geen package.json, geen testsuite, geen linter. Platte HTML die
GitHub Pages rechtstreeks serveert.

- Elke pagina is een eigen `index.html` in een eigen map: `/`, `over-ons/`,
  `wat-we-ondersteunen/`, `projecten/`, `historiek/`, `bestuursorgaan/`,
  `documenten/`, `contact/`, `privacy/`, `cookies/`, `merkboek/`.
- **Header en voettekst staan letterlijk in elk bestand.** Een wijziging daaraan
  moet dus in alle elf, niet in één.
- `css/style.css` — alle opmaak. Kleuren, tekengroottes, tijden en de
  versnellingscurve staan als variabelen in het `:root`-blok bovenaan; er hoort
  verder nergens een losse kleur- of groottewaarde in het bestand te staan.
- `js/script.js` — mobiele navigatie, jaartal in de voettekst, contactformulier
  naar `mailto:`, en de scroll-animatie. Elk blok controleert zelf of zijn
  element bestaat, want niet elke pagina heeft alles.
- `fonts/` — Instrument Sans en Instrument Serif, **lokaal gehost**. Bewust geen
  Google Fonts: dat stuurde het IP-adres van elke bezoeker naar Google. De
  privacy- en cookiepagina stellen expliciet dat er geen enkel extern verzoek
  vertrekt — voeg dus niets toe dat van een externe server laadt zonder die
  teksten aan te passen.
- `assets/` — logo's en portretten. `sitemap.xml` en `robots.txt` in de root.

## Lokaal draaien

`.claude/launch.json` definieert één server: **`coivzw` op poort 5502**. Start
die via het preview-gereedschap, niet met Python vanaf de opdrachtregel. Het pad
naar de interpreter staat vastgelegd; `python` en `node` staan niet op PATH.

**Cache-valkuil bij testen.** De browser houdt `style.css` en `script.js`
hardnekkig vast. Meet je in een iframe, vervang dan eerst de stylesheet door een
kopie met een cache-buster (`?b=<tijdstempel>`), anders meet je de vorige
versie. Dat heeft al meermaals tot verkeerde conclusies geleid.

## Nakijken zonder schermafbeelding

De Browser-pane maakt hier geen schermafbeeldingen. Meet in plaats daarvan met
`javascript_tool`: `getComputedStyle`, `getBoundingClientRect`, contrast
uitrekenen tegen de werkelijke achtergrond, en controleren op horizontale
overflow. Doe dat standaard op **1280 en 375 px** na elke opmaakwijziging.

## Werkafspraken

- **Nooit committen of pushen zonder expliciete toestemming per keer**, ook niet
  midden in een sessie na eerdere goedkeuringen.
- Commit messages in het **Nederlands**, en altijd via `git commit -F <bestand>`
  met de tekst in een bestand. Een here-string breekt zodra er een aanhalingsteken
  in de boodschap staat.
- **Stage expliciet per bestandsnaam**, nooit `git add -A`.
- Branch is **`main`**. (De MatchDelegate-repo gebruikt `master` — niet
  verwarren.)
- Pushen werkt alleen met een token in de remote-URL; de credential manager kan
  niet op deze laptop. Raak dat token niet aan en toon het nooit.
- **Leg eerst kort het probleem en de aanpak uit** vóór je productiecode wijzigt,
  ook bij kleine opruimingen — niet pas achteraf rapporteren.
- Na tekstvervangingen met PowerShell altijd `git diff` nakijken; vertrouw niet
  op de uitvoer van het commando alleen.

## Gevoelige inhoud

Zet **nooit interne stukken van de vereniging online**. Jaarverslagen bevatten
zitpenningen per bestuurder bij naam, de volledige fondsenportefeuille met
bedragen, en oordelen over organisaties die geen investering kregen. De pagina
`documenten/` verwijst daarom naar de officiële neerleggingen bij Belgisch
Staatsblad, de Nationale Bank en de Kruispuntbank — niet naar zelf gehoste
PDF's. In dat bestand staat een commentaarblok dat deze keuze uitlegt; laat het
staan.
