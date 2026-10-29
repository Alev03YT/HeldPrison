# HeldPrisons — Official Web Portal

Sito web statico responsive per il progetto Minecraft **HeldPrisons**.

## Cosa contiene (V1)
- Landing page originale dark sci-fi / voxel con immagine SVG proprietaria
- Panoramica delle principali meccaniche di HeldPrisons
- Wiki interattiva in italiano (16 guide, ricerca testuale, filtri e schede)
- Sezione eventi e informazioni sulla community
- Classifiche con categorie selezionabili (**in attesa del backend reale**)
- Roadmap dello sviluppo e box per lo stato del server
- Copia IP e monitoraggio reale opzionali, attivabili dopo la configurazione
- Interfaccia mobile, accessibilità di base, SEO e favicon

## Anteprima sul proprio computer
Apri `index.html` nel browser. Non occorre Node.js né un database. Per testare in locale con un web server, esegui dalla cartella del sito:

```bash
python -m http.server 8080
```

Apri poi `http://localhost:8080`.

## Configurazione server
Apri `assets/app.js` e modifica solo le proprietà iniziali:

```js
const CONFIG = Object.freeze({
  serverIp: "",       // es. play.tuodominio.it; lascia vuoto finché non è pubblico
  serverPort: 25565,
  telegramUrl: "https://t.me/HeldPrisonsCommunity"
});
```

Finché l'IP è vuoto il sito mostra **NON CONFIGURATO** e disabilita la copia, senza inventare numeri. Con un IP impostato il box interroga `api.mcstatus.io` per lo stato pubblico Minecraft Java, quando il servizio è disponibile.

**Non aggiungere token, password o credenziali segrete a file JavaScript pubblici.**

## Pubblicazione con GitHub Pages
1. Vai in **Settings → Pages** del repository.
2. In **Build and deployment**, imposta **GitHub Actions** come source.
3. Il workflow `.github/workflows/pages.yml` pubblicherà il contenuto a ogni push su `main`.
4. Il collegamento pubblico sarà mostrato da GitHub solo dopo un deployment riuscito.

**Importante:** il repository è stato creato come **privato**. GitHub Pages per repository privati richiede un piano GitHub che lo supporti (es. GitHub Pro/Team), altrimenti puoi scegliere di rendere pubblico il repository *manualmente* o usare un hosting esterno. Nessun cambio di visibilità viene eseguito automaticamente.

## Prossime integrazioni
- API read-only sul server / bridge sicuro per dati giocatori e stato
- Classifiche sincronizzate (mining, gang, PvP, prestige)
- Profili giocatore con autenticazione reale e protezioni adeguate
- Calendario eventi collegato al plugin
- CMS/annunci staff, pannello ticket e sistema di supporto
- Regolamento completo, drops/loot reali e wiki approfondita

Le integrazioni con i plugin **HeldPrisonsCore** e **HeldEliteBridge** dovranno avvenire tramite un servizio backend autenticato e con permessi minimi; mai esporre la porta RCON o il database direttamente dal browser.

## File principali
- `index.html` — struttura del portale
- `assets/style.css` — design e responsive
- `assets/app.js` — wiki, menu, tabs, server status
- `assets/hero-realm.svg` — illustrazione originale
- `assets/favicon.svg` — icona del progetto
- `.github/workflows/pages.yml` — deploy GitHub Pages

© HeldPrisons. Progetto indipendente, non affiliato a Mojang o Microsoft.
