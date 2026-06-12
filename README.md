# COI vzw website

Statische website voor "Centrum voor Ondersteuning van Digitale Innovatie" (COI vzw).

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

## Eigen domein koppelen (bv. coivzw.be)

1. Voeg een bestand `CNAME` toe aan de root van deze repo met als inhoud:
   ```
   coivzw.be
   ```
2. Stel bij je domeinregistrar de volgende DNS-records in:
   - **A-records** voor `coivzw.be` naar de GitHub Pages IP-adressen:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - **CNAME** voor `www.coivzw.be` naar `<gebruikersnaam>.github.io`
3. Vink in **Settings > Pages** "Enforce HTTPS" aan zodra het certificaat beschikbaar is.
