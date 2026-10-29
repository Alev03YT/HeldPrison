# HeldPrisons — Portale ufficiale (V2)

Portale web **compatto, responsive e multipagina** per il progetto Minecraft HeldPrisons.

## Struttura del sito

| File | Funzionalità |
|---|---|
| `index.html` | Home compatta: panoramica, accessi rapidi, stato server e aggiornamenti |
| `gameplay.html` | Meccaniche: mining, Wormhole, enchantments, gang, celle, raid e contenuti avanzati |
| `wiki.html` | 16 guide ricercabili, filtrabili, con schede approfondite e link diretti |
| `eventi.html` | Eventi Prison e contenuti previsti, senza orari inventati |
| `classifiche.html` | Pannello leaderboard Mining / Gang / PvP / Prestige, in attesa dei dati reali |
| `community.html` | Canale ufficiale @CosmicPrisonsOG, gruppo @HeldPrisonsCommunity, assistente, FAQ |
| `assets/style.css` | Tema voxel/prison (ossidiana, pietra e oro) e layout responsive |
| `assets/app.js` | Navigazione mobile, wiki, classifica e status Minecraft opzionale |
| `assets/prison-world.svg` | Illustrazione vettoriale originale della fortezza mineraria |
| `assets/favicon.svg` | Emblema voxel del portale |

La V2 sostituisce la precedente homepage a scorrimento continuo con sei pagine tematiche. È un sito statico: non occorrono Node, database o servizi a pagamento per visualizzare il frontend.

## Responsive

I layout si riadattano a desktop, laptop, tablet e smartphone. Gli stili comprendono breakpoint a **1140, 900, 700, 480 e 340 px**, con griglie fluide, navigazione mobile con toggle, pulsanti di dimensione adatta al touch, gestione degli schermi piccoli e supporto a `prefers-reduced-motion`.

## Anteprima locale

Puoi aprire direttamente `index.html`, oppure usare un server web statico locale:

```bash
python -m http.server 8080
```

Quindi apri `http://localhost:8080`. Le altre pagine funzionano tramite navigazione tradizionale.

## Stato server

In `assets/app.js`, configura `CONFIG.serverIp` **solo dopo la pubblicazione dell'IP ufficiale**:

```js
const CONFIG = Object.freeze({serverIp:"",serverPort:25565});
```

Quando l'indirizzo non è impostato, la UI segnala chiaramente **NON CONFIGURATO** e disabilita la copia IP. Una volta impostato, l'interfaccia può interrogare l'API pubblica `api.mcstatus.io` per mostrare stato e numero di giocatori online, quando disponibili.

**Mai pubblicare credenziali, RCON, API key o password in JavaScript distribuito al browser.**

## Classifiche e account

Il frontend è pronto per aggiunte successive, ma **non esistono ancora** una sincronizzazione con il database Paper, le classifiche reali, il login Minecraft, un pannello staff o l'inventario remoto. Queste parti richiedono un backend con API autenticata e sicura; non usare RCON o un database accessibili direttamente dal sito.

## GitHub Pages

È presente un workflow di deploy in `.github/workflows/pages.yml`. Per pubblicare:

1. Apri **Settings → Pages** del repository.
2. Abilita Pages, se disponibile per il tuo piano GitHub e per il repository privato.
3. Scegli **GitHub Actions** come origine del deployment.
4. Dopo il push su `main`, verifica la riuscita del workflow in **Actions**.

**Stato noto:** il primo deployment è fallito perché GitHub Pages non era ancora abilitato/configurato (errore "Get Pages site failed — Not Found"). Il sito **non deve essere dichiarato online** finché un deployment effettivo non riesce.

© HeldPrisons. Progetto indipendente, non affiliato a Mojang o Microsoft.

## Telegram ufficiale

- **Canale annunci:** https://t.me/CosmicPrisonsOG
- **Gruppo community:** https://t.me/HeldPrisonsCommunity
- **Bot assistente:** https://t.me/HeldPrisonsAssistantBot
