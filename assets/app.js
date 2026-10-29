"use strict";
/**
 * HeldPrisons static portal — no credentials or private endpoints here.
 * Configure a publicly reachable Minecraft Java address when available.
 */
const CONFIG = Object.freeze({serverIp:"",serverPort:25565});
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
  {id:"community",category:"world",icon:"◎",title:"Community & Supporto",summary:"Resta aggiornato e trova altri giocatori.",intro:"Il progetto cresce anche grazie al confronto con i giocatori: aggiornamenti, feedback e partecipazione ai test.",points:["Canale Telegram ufficiale con gli annunci.","Assistente Telegram della community.","Feedback durante le fasi di test e sviluppo."],note:"Canale ufficiale: t.me/CosmicPrisonsOG · Gruppo: t.me/HeldPrisonsCommunity"}
];
const CATEGORY_LABELS={progression:"MINING",combat:"COMBAT",world:"MONDO"};
const RANK_TYPES={
 mining:{name:"TOP MINING",description:"I migliori minatori appariranno qui dopo il collegamento ai dati reali del server."},
 gangs:{name:"TOP GANG",description:"Le gang più forti compariranno qui quando avremo dati reali dal server."},
 pvp:{name:"TOP PVP",description:"Le statistiche di combattimento saranno visualizzate dopo la sincronizzazione."},
 prestige:{name:"TOP PRESTIGE",description:"I giocatori con più progressi di Prestige appariranno quando i dati saranno disponibili."}
};
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const normalized=text=>String(text).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("it").trim();
let toastTimeout;
function notify(message){
 const el=$("#toast");
 if(!el)return;
 el.textContent=message;el.classList.add("show");
 clearTimeout(toastTimeout);
 toastTimeout=setTimeout(()=>el.classList.remove("show"),2800);
}
function initNavigation(){
 const button=$("#menu-toggle"),nav=$("#primary-nav");
 if(!button||!nav)return;
 function toggle(open){
  nav.classList.toggle("is-open",open);
  button.setAttribute("aria-expanded",String(open));
  button.setAttribute("aria-label",open?"Chiudi il menu":"Apri il menu");
 }
 button.addEventListener("click",()=>toggle(!nav.classList.contains("is-open")));
 $$("a",nav).forEach(a=>a.addEventListener("click",()=>toggle(false)));
 document.addEventListener("click",e=>{if(!button.contains(e.target)&&!nav.contains(e.target))toggle(false)});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")toggle(false)});
 window.matchMedia("(min-width:701px)").addEventListener?.("change",e=>{if(e.matches)toggle(false)});
}
function textElement(tag,className,text){
 const el=document.createElement(tag);if(className)el.className=className;el.textContent=text;return el;
}
function initWiki(){
 const list=$("#wiki-list"),search=$("#wiki-search"),dialog=$("#wiki-dialog");
 if(!list||!search||!dialog)return;
 const filters=$$("#wiki-filters button");
 let category=new URLSearchParams(location.search).get("categoria")||"all";
 if(!["all","progression","combat","world"].includes(category))category="all";
 const state={category,search:""};
 function setCategory(cat){
  state.category=cat;
  filters.forEach(btn=>{
   const active=btn.dataset.filter===cat;
   btn.classList.toggle("is-active",active);
   btn.setAttribute("aria-pressed",String(active));
  });
  render();
 }
 function render(){
  const result=ARTICLES.filter(a=>{
   const filtered=state.category==="all"||a.category===state.category;
   return filtered&&normalized([a.title,a.summary,a.intro,...a.points].join(" ")).includes(normalized(state.search));
  });
  const fragment=document.createDocumentFragment();
  for(const a of result){
   const button=textElement("button","wiki-card","");
   button.type="button";
   button.dataset.wikiId=a.id;
   button.setAttribute("aria-label","Apri guida "+a.title);
   button.append(textElement("span","wiki-glyph",a.icon));
   const body=textElement("span","wiki-item-content","");
   body.append(textElement("small","",CATEGORY_LABELS[a.category]),textElement("strong","",a.title),textElement("span","wiki-summary",a.summary));
   button.append(body);fragment.append(button);
  }
  if(result.length===0)fragment.append(textElement("div","wiki-no-results","Nessuna guida trovata. Prova un'altra ricerca o categoria."));
  list.replaceChildren(fragment);
  $("#wiki-count").textContent=result.length+" "+(result.length===1?"GUIDA":"GUIDE");
 }
 function openGuide(id,updateUrl=true){
  const a=ARTICLES.find(item=>item.id===id);
  if(!a)return;
  const content=$("#wiki-dialog-content");
  content.replaceChildren();
  const heading=textElement("h2","",a.title);
  heading.id="wiki-dialog-title";
  content.append(textElement("div","dialog-glyph",a.icon),heading);
  content.append(textElement("p","",a.intro));
  const ul=document.createElement("ul");
  a.points.forEach(point=>ul.append(textElement("li","",point)));
  content.append(ul,textElement("div","modal-footnote",a.note));
  if(!dialog.open){
   if(typeof dialog.showModal==="function")dialog.showModal();
   else dialog.setAttribute("open","");
  }
  if(updateUrl)history.replaceState(null,"","#"+encodeURIComponent(a.id));
 }
 function closeGuide(){
  if(!dialog.open)return;
  if(typeof dialog.close==="function")dialog.close();
  else dialog.removeAttribute("open");
 }
 filters.forEach(btn=>btn.addEventListener("click",()=>setCategory(btn.dataset.filter)));
 search.addEventListener("input",()=>{state.search=search.value;render()});
 list.addEventListener("click",e=>{const btn=e.target.closest("[data-wiki-id]");if(btn)openGuide(btn.dataset.wikiId)});
 $$("[data-close-dialog]").forEach(btn=>btn.addEventListener("click",closeGuide));
 dialog.addEventListener("click",e=>{if(e.target===dialog)closeGuide()});
 dialog.addEventListener("close",()=>{if(ARTICLES.some(a=>"#"+a.id===location.hash))history.replaceState(null,"",location.pathname+location.search)});
 document.addEventListener("keydown",e=>{
  if(e.key==="/"&&!dialog.open&&!["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)){e.preventDefault();search.focus()}
 });
 setCategory(category);
 const deepLink=decodeURIComponent(location.hash.slice(1));
 if(deepLink)openGuide(deepLink,false);
 window.addEventListener("hashchange",()=>{const id=decodeURIComponent(location.hash.slice(1));if(id)openGuide(id,false);else closeGuide()});
}
function initLeaderboard(){
 const buttons=$$("[data-rank]");
 if(!buttons.length)return;
 buttons.forEach(btn=>btn.addEventListener("click",()=>{
  const rank=RANK_TYPES[btn.dataset.rank];
  if(!rank)return;
  buttons.forEach(tab=>{const active=tab===btn;tab.classList.toggle("is-active",active);tab.setAttribute("aria-pressed",String(active))});
  $("#rank-title").textContent=rank.name;
  $("#rank-text").textContent=rank.description;
 }));
}
function getServerAddress(){
 const host=CONFIG.serverIp.trim();
 const port=Number(CONFIG.serverPort)||25565;
 return host+(port===25565?"":":"+port);
}
function renderServer({phase="unconfigured",message="Indirizzo pubblico in attesa di configurazione.",players="—"}={}){
 const address=CONFIG.serverIp.trim();
 $$("[data-server-address]").forEach(el=>el.textContent=address?getServerAddress():"IN ARRIVO");
 $$("[data-server-players]").forEach(el=>el.textContent=players);
 $$("[data-server-message]").forEach(el=>el.textContent=message);
 const states={unconfigured:"NON CONFIGURATO",online:"ONLINE",offline:"OFFLINE",loading:"VERIFICA...",error:"NON DISPONIBILE"};
 $$("[data-status-badge]").forEach(el=>el.textContent=states[phase]||states.error);
 $$("[data-copy-ip]").forEach(el=>el.disabled=!address);
}
async function fetchServerStatus(){
 if(!CONFIG.serverIp.trim()){renderServer();notify("L'IP sarà disponibile quando verrà annunciata l'apertura.");return}
 renderServer({phase:"loading",message:"Verifica dello stato in corso..."});
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8500);
 try{
  const endpoint="https://api.mcstatus.io/v2/status/java/"+encodeURIComponent(getServerAddress());
  const response=await fetch(endpoint,{cache:"no-store",signal:controller.signal});
  if(!response.ok)throw Error("Status service unavailable");
  const status=await response.json();
  if(status.online===true)renderServer({phase:"online",message:"Server raggiungibile.",players:typeof status.players?.online==="number"?String(status.players.online):"—"});
  else if(status.online===false)renderServer({phase:"offline",message:"Il server non risponde al monitoraggio."});
  else renderServer({phase:"error",message:"Risposta non valida dal servizio di monitoraggio."});
 }catch{renderServer({phase:"error",message:"Impossibile ottenere lo stato, riprova più tardi."})}
 finally{clearTimeout(timer)}
}
function initServer(){
 if(!$("[data-server-widget]"))return;
 renderServer();
 $$("[data-refresh-status]").forEach(btn=>btn.addEventListener("click",fetchServerStatus));
 $$("[data-copy-ip]").forEach(btn=>btn.addEventListener("click",async()=>{
  if(!CONFIG.serverIp.trim())return;
  const address=getServerAddress();
  try{await navigator.clipboard.writeText(address);notify("IP copiato: "+address)}
  catch{notify("Indirizzo server: "+address)}
 }));
 if(CONFIG.serverIp.trim())fetchServerStatus();
}
document.addEventListener("DOMContentLoaded",()=>{
 const year=$("#current-year");if(year)year.textContent=String(new Date().getFullYear());
 initNavigation();initWiki();initLeaderboard();initServer();
});
