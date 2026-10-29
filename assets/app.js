/* HeldPrisons web portal • config is intentionally separate from actual Minecraft plugins.
 * Set serverIp below only after a public address is ready.
 * Do not place tokens, passwords or private API keys in this file.
 */
const CONFIG = Object.freeze({
  serverIp: "",
  serverPort: 25565,
  telegramUrl: "https://t.me/HeldPrisonsCommunity"
});

const ARTICLES = [
  {id:"mining",category:"progression",icon:"⛏",title:"Mining & Miniere",summary:"Il cuore della progressione Prison.",intro:"Il mining è uno dei pilastri di HeldPrisons. Scava, accumula risorse, sviluppa il tuo equipaggiamento e preparati a contenuti sempre più impegnativi.",points:["Le miniere accompagnano la progressione del giocatore.","Il piccone cresce attraverso sistemi di energia e potenziamento.","Eventi speciali possono aggiungere nuove opportunità di raccolta."],note:"I requisiti esatti di accesso alle miniere saranno pubblicati con il regolamento della Beta."},
  {id:"energy",category:"progression",icon:"✧",title:"Cosmic Energy",summary:"Energia per far evolvere il tuo piccone.",intro:"La Cosmic Energy fa parte del percorso di potenziamento del piccone. Può essere gestita tramite bottiglie di energia e utilizzata nei sistemi di upgrade.",points:["Le bottiglie di energia permettono di conservare e trasferire energia.","Il sistema prevede controlli per limitare perdite e duplicazioni.","Le interazioni con il Wormhole sono integrate con il consumo dell'energia."],note:"I valori di energia e le modalità di ottenimento dipendono dal bilanciamento finale."},
  {id:"wormhole",category:"progression",icon:"◇",title:"Wormhole & Risk",summary:"Ogni upgrade è una scelta.",intro:"Il Wormhole è parte del processo di potenziamento dei picconi: il giocatore decide quando tentare un'evoluzione e deve tenere conto del rischio.",points:["Il sistema distingue tra probabilità di successo e di fallimento.","I tentativi e il rischio sono gestiti per ciascun piccone.","Energy e materiali di supporto entrano nel ciclo di potenziamento."],note:"Le percentuali e i dettagli completi saranno confermati nella documentazione di gioco."},
  {id:"enchants",category:"progression",icon:"⚡",title:"Pickaxe Enchants",summary:"Personalizza il tuo strumento principale.",intro:"Gli enchantments creano percorsi di progressione diversi. La scelta dei potenziamenti influenza il modo di scavare e sfruttare le risorse.",points:["Il progetto include una serie estesa di enchantments per picconi.","Le rarità aiutano a distinguere le famiglie di potenziamenti.","Tra le meccaniche previste figura Momentum."],note:"Effetti, livelli massimi e bilanciamento saranno pubblicati nella wiki tecnica."},
  {id:"prestige",category:"progression",icon:"♜",title:"Prestige & Progressione",summary:"Progredisci oltre i traguardi iniziali.",intro:"Il progetto prevede sistemi di progressione e prestige pensati per offrire obiettivi anche ai giocatori più esperti.",points:["Avanzamento del personaggio attraverso attività di gioco.","Obiettivi avanzati e sistemi di prestige.","Integrazione con le altre meccaniche di mining e combattimento."],note:"Le ricompense finali e i requisiti di prestige saranno annunciati prima dell'apertura."},
  {id:"executive",category:"progression",icon:"✦",title:"Executive Mine",summary:"Un'esperienza per il gioco avanzato.",intro:"La Executive Mine è un contenuto speciale progettato come ambiente dedicato, con un proprio sistema di Wormhole Executive.",points:["Area di mining riservata ai contenuti Executive.","Gestione dedicata del tempo di accesso.","Wormhole Executive progettato per restituire il piccone al suo legittimo proprietario."],note:"Contenuto in preparazione e soggetto a test prima della disponibilità pubblica."},
  {id:"gang",category:"combat",icon:"⚔",title:"Gang & Alleanze",summary:"Costruisci una squadra e lotta per il controllo.",intro:"Le gang permettono di affrontare HeldPrisons insieme: organizzarsi, proteggere le proprie risorse e partecipare alle attività competitive.",points:["Gestione dei membri della gang.","Coordinamento di attacchi e difese delle celle.","Strumenti di gruppo e funzionalità economiche collegate."],note:"Le regole di sicurezza e di gestione della gang verranno presentate nella guida ufficiale."},
  {id:"cells",category:"combat",icon:"▣",title:"Celle & Sicurezza",summary:"Uno spazio da gestire e difendere.",intro:"Le celle sono luoghi fondamentali per la vita di una gang. Prevedono dimensioni e tier diversi, controlli sugli accessi e meccaniche difensive.",points:["Tier di cella progressivi e funzionalità di acquisto.","Permessi di accesso e sistema Trust.","Porte, difese e protezione da incursioni."],note:"L'accesso a una gang non concede automaticamente il Trust alla sua cella."},
  {id:"raid",category:"combat",icon:"☷",title:"Cell Raid",summary:"Assalta, difendi e reagisci.",intro:"Le incursioni alle celle introducono una dimensione strategica: organizzazione, attacchi alle porte e confronto con la difesa avversaria.",points:["Interazione con le Cell Doors e le loro difese.","Finestra di raid con temporizzazione dedicata.","Sistemi di avviso e controllo durante l'attacco."],note:"Le regole finali anti-abuso saranno consultabili prima della Beta."},
  {id:"equipment",category:"combat",icon:"⬡",title:"Armor, Masks & Pets",summary:"Un'identità unica anche in combattimento.",intro:"L'equipaggiamento di HeldPrisons include elementi pensati per combinare abilità e stile di gioco, con collezioni e meccaniche complementari.",points:["Armor Set Crystals e combinazioni di set.","Masks con abilità tematiche e durata dedicata.","Pets, Trinkets e altri oggetti di supporto."],note:"La disponibilità effettiva delle singole abilità dipenderà dalla verifica finale."},
  {id:"pvp",category:"combat",icon:"✕",title:"Combattimento PvP",summary:"Strategia, equipaggiamento e tempismo.",intro:"HeldPrisons integra il combattimento PvP con sistemi di equipaggiamento, abilità, consumabili e contenuti competitivi.",points:["Confronti PvP e attività a squadre.","Equipaggiamenti con opzioni di personalizzazione.","Eventi competitivi come KOTH e Last Man Standing."],note:"Le zone PvP e le regole di combat tag saranno documentate prima dell'apertura."},
  {id:"events",category:"world",icon:"☄",title:"World Events",summary:"Sfide che danno vita al mondo.",intro:"I World Events trasformano la routine di gioco introducendo sfide e opportunità di ricompensa nel mondo Prison.",points:["Meteoriti e Meteore.","XP Shower e altri eventi naturali.","Natural Contraband e Natural GKit Flare."],note:"Gli orari e i drop ufficiali non sono ancora pubblicati."},
  {id:"koth",category:"world",icon:"⚑",title:"KOTH & Competizioni",summary:"Conquista posizioni e difendi il tuo primato.",intro:"La competizione fa parte dell'identità del server, con eventi che mettono i giocatori di fronte a obiettivi da conquistare o difendere.",points:["King of the Hill (KOTH).","Competitions di gioco.","Last Man Standing (LMS)."],note:"Le date degli eventi saranno annunciate nella community."},
  {id:"bosses",category:"world",icon:"♛",title:"Bosses & Territori",summary:"Sfide di gruppo e controllo del mondo.",intro:"Il progetto comprende incontri speciali e sistemi territoriali che aggiungono obiettivi per gruppi organizzati.",points:["Cosmic Bosses.","Stronghold e Outpost.","Bandits e sfide nel mondo."],note:"Ricompense e requisiti sono in fase di preparazione."},
  {id:"rewards",category:"world",icon:"◆",title:"Ricompense & Contraband",summary:"Scopri loot e oggetti speciali.",intro:"HeldPrisons prevede un ecosistema di loot legato a eventi, contraband e attività diverse, con controlli per una consegna affidabile.",points:["Ricompense per attività ed eventi.","Oggetti di diverse famiglie e rarità.","Controlli sulle assegnazioni per evitare consegne duplicate."],note:"Le tabelle loot complete saranno pubblicate dopo il bilanciamento."},
  {id:"community",category:"world",icon:"◎",title:"Community & Supporto",summary:"Resta aggiornato e trova altri giocatori.",intro:"Il progetto cresce anche grazie al confronto con i giocatori: aggiornamenti, feedback e partecipazione ai test.",points:["Canale Telegram ufficiale con gli annunci.","Assistente Telegram della community.","Feedback durante le fasi di test e sviluppo."],note:"Canale: t.me/HeldPrisonsCommunity"}
];
const LABELS = {progression:"PROGRESSIONE",combat:"COMBATTIMENTO",world:"MONDO"};
const RANKINGS = {
  mining:{title:"CLASSIFICA MINING",description:"La classifica dei minatori verrà attivata con la sincronizzazione del server."},
  gangs:{title:"CLASSIFICA GANG",description:"Le migliori gang appariranno quando i dati del server saranno disponibili."},
  pvp:{title:"CLASSIFICA PVP",description:"Le statistiche di combattimento saranno mostrate soltanto dopo l'integrazione."},
  prestige:{title:"CLASSIFICA PRESTIGE",description:"I progressi di prestige verranno sincronizzati con il portale giocatori."}
};
const $ = (selector,root=document)=>root.querySelector(selector);
const $$ = (selector,root=document)=>[...root.querySelectorAll(selector)];
const normalize = value=>String(value).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("it").trim();
const state={filter:"all",search:""};
let toastTimer;

function showToast(message) {
  const el=$("#toast");
  if (!el) return;
  el.textContent=message;
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove("visible"),3300);
}

function renderWiki() {
  const holder=$("#wiki-grid");
  if(!holder) return;
  const results=ARTICLES.filter(a=>(state.filter==="all"||a.category===state.filter)&&normalize([a.title,a.summary,a.intro,...a.points].join(" ")).includes(normalize(state.search)));
  holder.replaceChildren();
  for(const article of results){
    const btn=document.createElement("button");
    btn.type="button";
    btn.className="wiki-card";
    btn.dataset.article=article.id;
    btn.setAttribute("aria-label",`Apri guida: ${article.title}`);
    btn.innerHTML=`<span class="wiki-card-top"><span class="wiki-glyph" aria-hidden="true">${article.icon}</span><span class="wiki-arrow">↗</span></span><small>${LABELS[article.category]}</small><strong>${article.title}</strong><p>${article.summary}</p>`;
    holder.append(btn);
  }
  if(!results.length) {
    const msg=document.createElement("p");
    msg.className="wiki-empty";
    msg.textContent="Nessun risultato trovato. Prova un termine diverso o cambia categoria.";
    holder.append(msg);
  }
  $("#wiki-count").textContent=` ${results.length} ${results.length===1?"ARTICOLO":"ARTICOLI"} DISPONIBILI · GUIDE IN CONTINUO AGGIORNAMENTO`;
}

function openWiki(id) {
  const a=ARTICLES.find(article=>article.id===id);
  const dialog=$("#wiki-dialog");
  if(!a||!dialog) return;
  $("#dialog-content").innerHTML=`<span class="modal-overline">/ HELD KNOWLEDGE BASE — ${LABELS[a.category]}</span><span class="modal-glyph" aria-hidden="true">${a.icon}</span><h2 id="dialog-title">${a.title}</h2><p>${a.intro}</p><ul>${a.points.map(point=>`<li>${point}</li>`).join("")}</ul><div class="modal-note">${a.note}</div>`;
  if(typeof dialog.showModal==="function") dialog.showModal();
  else dialog.setAttribute("open","");
}
function closeWiki(){
  const dialog=$("#wiki-dialog");
  if(!dialog) return;
  if(typeof dialog.close==="function")dialog.close();
  else dialog.removeAttribute("open");
}
function initWiki(){
  renderWiki();
  $("#wiki-search")?.addEventListener("input",e=>{state.search=e.target.value;renderWiki()});
  $$("#wiki-filters button").forEach(btn=>btn.addEventListener("click",()=>{
    state.filter=btn.dataset.filter;
    $$("#wiki-filters button").forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});
    renderWiki();
  }));
  $("#wiki-grid")?.addEventListener("click",e=>{const btn=e.target.closest("[data-article]");if(btn)openWiki(btn.dataset.article)});
  document.addEventListener("click",e=>{const a=e.target.closest("[data-wiki-open]");if(a){e.preventDefault();openWiki(a.dataset.wikiOpen)}});
  $("#dialog-close")?.addEventListener("click",closeWiki);
  $("#wiki-dialog")?.addEventListener("click",e=>{if(e.target.id==="wiki-dialog")closeWiki()});
}

function initRanking(){
  $$(".rank-tab").forEach(btn=>btn.addEventListener("click",()=>{
    const data=RANKINGS[btn.dataset.ranking];
    if(!data)return;
    $$(".rank-tab").forEach(b=>{const selected=b===btn;b.classList.toggle("active",selected);b.setAttribute("aria-pressed",String(selected))});
    $("#rank-heading").textContent=data.title;
    $("#rank-description").textContent=data.description;
  }));
}

function initMenu(){
  const menu=$("#nav-links"),toggle=$("#menu-toggle");
  if(!menu||!toggle)return;
  const setOpen=open=>{
    menu.classList.toggle("open",open);
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",open?"Chiudi menu":"Apri menu");
  };
  toggle.addEventListener("click",()=>setOpen(!menu.classList.contains("open")));
  $$("a",menu).forEach(a=>a.addEventListener("click",()=>setOpen(false)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setOpen(false)});
  document.addEventListener("click",e=>{if(!menu.contains(e.target)&&!toggle.contains(e.target))setOpen(false)});
}

function statusDisplay({state="unconfigured",message="IP e monitoraggio in attesa di configurazione.",players="—"}={}){
  $("#server-status-text").textContent=message;
  $("#server-players").textContent=players;
  $("#server-state").textContent={online:"ONLINE",offline:"OFFLINE",loading:"CONTROLLO IN CORSO",unconfigured:"NON CONFIGURATO",error:"DATI NON DISPONIBILI"}[state]||"DATI NON DISPONIBILI";
  const address=CONFIG.serverIp.trim();
  $("#server-address").textContent=address?address+(Number(CONFIG.serverPort)!==25565?":"+CONFIG.serverPort:""):"IN ARRIVO";
  const button=$("#copy-ip");
  button.disabled=!address;
  button.textContent=address?"COPIA IP DEL SERVER":"IP IN ARRIVO";
}
async function refreshStatus(){
  const host=CONFIG.serverIp.trim();
  if(!host){statusDisplay();return;}
  const port=Number(CONFIG.serverPort)||25565;
  const address=host+(port===25565?"":":"+port);
  statusDisplay({state:"loading",message:"Richiesta in corso al servizio di monitoraggio..."});
  try {
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),9000);
    let response;
    try{response=await fetch("https://api.mcstatus.io/v2/status/java/"+encodeURIComponent(address),{signal:controller.signal,cache:"no-store"})}
    finally{clearTimeout(timeout)}
    if(!response.ok)throw Error("Service unavailable");
    const data=await response.json();
    if(data.online===true){
      const value=typeof data.players?.online==="number"?String(data.players.online):"—";
      statusDisplay({state:"online",message:"Il server risulta raggiungibile.",players:value});
    } else if(data.online===false){
      statusDisplay({state:"offline",message:"Il server non risponde al monitoraggio."});
    } else {
      statusDisplay({state:"error",message:"Il servizio non ha restituito uno stato valido."});
    }
  }catch(err){
    statusDisplay({state:"error",message:"Monitoraggio non disponibile al momento. Riprova più tardi."});
  }
}
function initStatus(){
  statusDisplay();
  $("#refresh-status")?.addEventListener("click",()=>{
    if(!CONFIG.serverIp.trim()){showToast("L'IP pubblico verrà pubblicato quando sarà disponibile.");return}
    refreshStatus();
  });
  $("#copy-ip")?.addEventListener("click",async()=>{
    const host=CONFIG.serverIp.trim();
    if(!host)return;
    const address=host+(Number(CONFIG.serverPort)!==25565?":"+CONFIG.serverPort:"");
    try {
      await navigator.clipboard.writeText(address);
      showToast("Indirizzo del server copiato: "+address);
    }catch{
      showToast("Copia l'indirizzo: "+address);
    }
  });
  if(CONFIG.serverIp.trim())refreshStatus();
}
document.addEventListener("DOMContentLoaded",()=>{
  $("#current-year").textContent=String(new Date().getFullYear());
  initMenu();initWiki();initRanking();initStatus();
});
