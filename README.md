# HeldPrisons — Portale ufficiale (V3)

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
| `shop.html` | Shop Minecraft Prison: categorie, ricerca, schede e dettagli prodotti |
| `shop-admin.html` | Editor catalogo: prodotti, sezioni, impostazioni, backup e pubblicazione GitHub |
| `data/shop.json` | Catalogo ufficiale con impostazioni, categorie, prezzi, prodotti e checkout URLs |
| `assets/shop-core.js` | Validazione JSON e controlli sui link HTTPS |
| `assets/shop.js` | Frontend pubblico e browsing prodotti |
| `assets/shop-admin.js` | Editor e pubblicazione autenticata su GitHub |
| `assets/style.css` | Tema voxel/prison (ossidiana, pietra e oro) e layout responsive |
| `assets/app.js` | Navigazione mobile, wiki, classifica e status Minecraft opzionale |
| `assets/prison-world.svg` | Illustrazione vettoriale originale della fortezza mineraria |
| `assets/favicon.svg` | Emblema voxel del portale |

La V2 sostituisce la precedente homepage a scorrimento continuo con pagine tematiche. La V3 aggiunge uno Shop autonomo e il suo editor amministrativo. È un sito statico: non occorrono Node, database o servizi a pagamento per visualizzare il frontend.

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

## Shop HeldPrisons (V3)

`shop.html` legge automaticamente `data/shop.json`. Il catalogo parte con **5 categorie indicative** (Rank VIP, GKits, Keys & Crates, Cosmetici, Bundle), ma **nessun prodotto o prezzo inventato**. Gli acquisti sono inizialmente disabilitati (`shopOpen: false`).

### Editor

Vai a `shop-admin.html` (la pagina è accessibile anche dallo Shop).
Puoi:
- creare, rinominare, duplicare, nascondere, riordinare ed eliminare sezioni (l'eliminazione di una sezione elimina anche i prodotti associati dalla bozza);
- creare, modificare, duplicare, riordinare, nascondere ed eliminare prodotti;
- impostare nome, descrizione, icona, prezzo attuale/precedente, badge, immagine HTTPS, elenco dei contenuti inclusi, disponibilità e checkout esterno;
- cambiare titolo, slogan, descrizione, avviso, valuta, supporto e apertura richieste di acquisto;
- salvare una bozza nel **solo browser corrente**, importare/esportare un backup JSON o ripristinare il catalogo dal sito;
- pubblicare direttamente `data/shop.json` su GitHub, senza caricare un token nel repository.

### Come pubblicare online dall'editor

1. In GitHub crea un **fine-grained personal access token** con accesso **soltanto a `Alev03YT/HeldPrison`** e permesso **Contents: Read and write**. Usa un token a scadenza breve.
2. Apri `shop-admin.html` tramite HTTPS (oppure tramite un server locale `http://localhost`), modifica il catalogo e apri la scheda **Pubblicazione**.
3. Incolla il token nel campo temporaneo e premi **Pubblica le modifiche su GitHub**.
4. L'editor verifica la versione attualmente presente nel repository per evitare sovrascritture involontarie e crea un commit sul branch `main`.
5. L'editor svuota il campo token al termine. Il browser non memorizza il token in `localStorage`, nel catalogo o nei download.
6. Le modifiche saranno **visibili pubblicamente solo dopo un deployment GitHub Pages riuscito**. Pages deve essere attivato.

**Nota di sicurezza:** `shop-admin.html` è un editor client-side, **non un pannello con login privato**. Chiunque possa aprire la pagina può preparare una bozza nel proprio browser, ma **non può pubblicare senza un token GitHub autorizzato**. Per una gestione multi-staff con account/ruoli e audit occorrerà un backend autenticato.

### Acquisti, pagamenti e consegne

Questo è uno **shop/catalogo**. Il sito non acquisisce dati di pagamento, non elabora transazioni, non esegue comandi sul server Minecraft e **non consegna automaticamente oggetti o rank**. Solo quando `shopOpen: true` e un prodotto attivo ha un URL di checkout HTTPS, il bottone del prodotto apre **quel servizio esterno**. Prima di attivare le vendite, configurare un checkout affidabile, i termini d'acquisto e un sistema server-side di consegna con verifica reale degli ordini; verificare anche le regole Minecraft applicabili alla monetizzazione.

Le modifiche al catalogo sono distinte da quelle ai plugin del server. Non inserire credenziali RCON, chiavi API di pagamento o token GitHub in file web o nel JSON del catalogo.

### Backup

Premere **Esporta JSON** crea `heldprisons-shop-backup.json`. Per ripristinare, scegliere **Importa JSON** e pubblicare dopo verifica. Le bozze auto-salvate in `localStorage` rimangono nel browser/device corrente; non sono dati condivisi con lo staff.
