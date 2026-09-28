# COI vzw website

Statische website voor "Centrum voor Ondersteuning van Digitale Innovatie" (COI vzw).

## Structuur

Elke pagina is een eigen `index.html` in een eigen map, zodat ze een eigen URL heeft.
Header en footer staan letterlijk in elk bestand: er is geen build-stap en geen
template-engine. Pas je iets aan in de navigatie of de footer, dan moet dat in
alle pagina's gebeuren.

| URL | Bestand |
| --- | --- |
| `/` | `index.html` |
| `/over-ons/` | `over-ons/index.html` |
| `/wat-we-ondersteunen/` | `wat-we-ondersteunen/index.html` |
| `/projecten/` | `projecten/index.html` |
| `/historiek/` | `historiek/index.html` |
| `/bestuursorgaan/` | `bestuursorgaan/index.html` |
| `/documenten/` | `documenten/index.html` |
| `/contact/` | `contact/index.html` |
| `/privacy/` | `privacy/index.html` |
| `/cookies/` | `cookies/index.html` |

Verder: `css/style.css`, `js/script.js` (draait op elke pagina, elk blok checkt
zelf of zijn element bestaat), `sitemap.xml` en `robots.txt`.

Paden binnen subpagina's zijn relatief (`../assets/...`), niet absoluut, zodat de
site ook werkt als hij niet op de root van een domein staat.

Nieuwe pagina toevoegen: kopieer een bestaande map, pas `<title>`,
`<meta name="description">`, `<link rel="canonical">` en de inhoud aan, zet
`class="is-active"` op de juiste navigatielink, en voeg de URL toe aan
`sitemap.xml`.

## Lokaal bekijken

Open `index.html` direct in een browser, of start een lokale server:

```
python -m http.server 5500
```

en surf naar `http://localhost:5500`.

## Publiceren via GitHub Pages

1. Maak een nieuwe repository op GitHub en push deze code naar de `main`-branch.
2. Ga naar **Settings > Pages** in de repository.
3. Kies bij "Build and deployment" > "Source": **Deploy from a branch**.
4. Kies branch `main` en map `/ (root)`.
5. Na enkele minuten is de site live op `https://<gebruikersnaam>.github.io/<repo-naam>/`.

## Eigen domein koppelen (coi.be)

De site draait op **www.coi.be**. Het oudere domein coivzw.be verwijst daar
met een 301 naar door; die doorverwijzing staat bij de registrar, niet hier.

1. Het bestand `CNAME` in de root van deze repo bevat:
   ```
   www.coi.be
   ```
2. De DNS van coi.be staat bij Combell, met deze records:
   - **A-records** voor `coi.be` naar de GitHub Pages IP-adressen:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - **CNAME** voor `www.coi.be` naar `timbuyse.github.io`
   - Laat de records voor Microsoft 365 (MX, SPF, autodiscover) ongemoeid: de
     e-mail op @coi.be hangt ervan af.
3. Vink in **Settings > Pages** "Enforce HTTPS" aan zodra het certificaat beschikbaar is.
