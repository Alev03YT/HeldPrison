"use strict";
document.addEventListener("DOMContentLoaded",async()=>{
 if(document.body.dataset.page!=="admin")return;
 const API="https://api.github.com/repos/Alev03YT/HeldPrison/contents/data/shop.json";
 const STORAGE="heldprisons-shop-draft-v1";
 const core=window.HeldShopData;
 const $=s=>document.querySelector(s);
 const $$=s=>Array.from(document.querySelectorAll(s));
 let draft,published,baseRevision="",activeEditor=null;
 const editor=$("#admin-editor-dialog"),fields=$("#editor-fields"),editorForm=$("#admin-editor-form");
 const elt=(tag,cls,text)=>{
  const e=document.createElement(tag);
  if(cls)e.className=cls;
  if(text!==undefined)e.textContent=text;
  return e;
 };
 const setResult=(text,isError=false)=>{
  const e=$("#publish-result");e.textContent=text;e.style.color=isError?"#ffc0ac":"#c1dfc7";
 };
 const setStatus=(text)=>{$("#admin-state").textContent=text};
 const mark=()=>{
  try{localStorage.setItem(STORAGE,JSON.stringify({baseRevision,catalog:draft}))}catch{}
  setStatus("MODIFICHE IN BOZZA • NON PUBBLICATE");
  $("#admin-summary").textContent="Bozza aggiornata in questo browser. Per renderla visibile online, apri Pubblicazione.";
  refresh();
 };
 const assertDraft=()=>{try{draft=core.validate(draft);return true}catch(e){alert("Dati non validi: "+e.message);return false}};
 function openTab(id){
  for(const btn of $$("[data-admin-tab]")){
   const current=btn.dataset.adminTab===id;
   btn.classList.toggle("is-active",current);
   btn.setAttribute("aria-selected",String(current));
   $("#panel-"+btn.dataset.adminTab).hidden=!current;
  }
 }
 $$("[data-admin-tab]").forEach(b=>b.addEventListener("click",()=>openTab(b.dataset.adminTab)));
 function categoryOptions(selected){
  const options=draft.sections.map(s=>({value:s.id,text:s.name}));
  return options.map(o=>({...o,selected:o.value===selected}));
 }
 function formField(spec){
  const label=elt("label",spec.full?"span-full":"",spec.label);
  let input;
  if(spec.type==="textarea"){input=elt("textarea");input.rows=spec.rows||3}
  else if(spec.type==="select"){
   input=elt("select");
   for(const option of spec.options||[]){
    const node=elt("option","",option.text);node.value=option.value;
    if(option.value===String(spec.value??""))node.selected=true;
    input.append(node);
   }
  }else{
   input=elt("input");input.type=spec.type==="number"?"number":spec.type==="url"?"url":"text";
   if(spec.type==="number"){input.min="0";input.max="1000000";input.step="0.01"}
  }
  input.name=spec.name;
  if(spec.required)input.required=true;
  if(spec.maxlength)input.maxLength=spec.maxlength;
  if(spec.placeholder)input.placeholder=spec.placeholder;
  if(spec.type!=="select")input.value=String(spec.value??"");
  label.append(input);
  return label;
 }
 function checkField(name,title,value,help){
  const label=elt("label","admin-check span-full");
  const check=elt("input");check.type="checkbox";check.name=name;check.checked=value===true;
  const copy=elt("span");copy.append(elt("strong","",title),elt("small","",help||""));
  label.append(check,copy);return label;
 }
 function renderEditor(kind,id){
  if(kind==="product"&&!draft.sections.length){alert("Crea almeno una sezione prima di aggiungere un prodotto.");openTab("sections");return}
  const current=(kind==="section"?draft.sections:draft.products).find(x=>x.id===id);
  activeEditor={kind,id:id||null};
  fields.replaceChildren();
  const name=kind==="product"?"PRODOTTO":"SEZIONE";
  $("#editor-heading").textContent=(current?"MODIFICA ":"NUOVO ")+name;
  $("#editor-overline").textContent="/ HELD SHOP • "+(kind==="product"?"INVENTORY":"CATEGORIES");
  let specs=[];
  if(kind==="section"){
   specs=[
    {name:"name",label:"Nome della sezione",value:current?.name||"",required:true,maxlength:70},
    {name:"icon",label:"Icona / simbolo",value:current?.icon||"◆",maxlength:12},
    {name:"description",label:"Descrizione",value:current?.description||"",full:true,type:"textarea",maxlength:250}
   ];
  }else{
   specs=[
    {name:"name",label:"Nome prodotto",value:current?.name||"",required:true,maxlength:100},
    {name:"sectionId",label:"Sezione",type:"select",value:current?.sectionId||draft.sections[0].id,required:true,options:categoryOptions(current?.sectionId||draft.sections[0].id)},
    {name:"description",label:"Descrizione del prodotto",value:current?.description||"",type:"textarea",full:true,maxlength:900},
    {name:"price",label:"Prezzo",value:current?.price??"",type:"number",placeholder:"Es. 4.99"},
    {name:"oldPrice",label:"Prezzo precedente (opzionale)",value:current?.oldPrice??"",type:"number",placeholder:"Es. 9.99"},
    {name:"badge",label:"Etichetta sulla card",value:current?.badge||"",maxlength:50,placeholder:"NOVITÀ / POPOLARE"},
    {name:"icon",label:"Icona quando non c'è immagine",value:current?.icon||"◆",maxlength:12},
    {name:"imageUrl",label:"Immagine (URL HTTPS)",value:current?.imageUrl||"",full:true,type:"url",placeholder:"https://..."},
    {name:"perks",label:"Contenuti inclusi (una riga ciascuno)",value:current?.perks?.join("\n")||"",full:true,type:"textarea",rows:4},
    {name:"status",label:"Visibilità del prodotto",value:current?.status||"hidden",type:"select",options:[{value:"hidden",text:"Bozza: non visibile"},{value:"active",text:"Visibile e disponibile"},{value:"soldout",text:"Visibile, esaurito"}]},
    {name:"checkoutLabel",label:"Testo pulsante acquisto",value:current?.checkoutLabel||"ACQUISTA ORA",maxlength:50},
    {name:"checkoutUrl",label:"Link acquisto (HTTPS, opzionale)",value:current?.checkoutUrl||"",type:"url",full:true,placeholder:"https://tuo-checkout-sicuro.it/..."}
   ];
  }
  for(const spec of specs)fields.append(formField(spec));
  if(kind==="section")fields.append(checkField("visible","Sezione visibile nello Shop",current?.visible!==false,"Puoi nasconderla senza eliminare i prodotti contenuti."));
  else fields.append(checkField("featured","Metti in evidenza",current?.featured===true,"Mostra prima questo prodotto nella categoria."));
  if(typeof editor.showModal==="function")editor.showModal();else editor.setAttribute("open","");
  fields.querySelector("input,select,textarea")?.focus();
 }
 function closeEditor(){if(typeof editor.close==="function")editor.close();else editor.removeAttribute("open")}
 $("#close-editor").addEventListener("click",closeEditor);
 $("#cancel-editor").addEventListener("click",closeEditor);
 editor.addEventListener("click",e=>{if(e.target===editor)closeEditor()});
 editorForm.addEventListener("submit",e=>{
  e.preventDefault();if(!activeEditor)return;
  const input=name=>editorForm.elements.namedItem(name);
  const source=activeEditor.kind==="product"?draft.products:draft.sections;
  const index=source.findIndex(x=>x.id===activeEditor.id);
  const original=index>=0?source[index]:null;
  let item;
  if(activeEditor.kind==="section"){
   item={id:original?.id||core.id("sec"),name:input("name").value.trim(),icon:input("icon").value.trim()||"◇",description:input("description").value.trim(),visible:input("visible").checked};
  }else{
   const number=name=>{const raw=input(name).value.trim();return raw===""?null:Number(raw)};
   item={
    id:original?.id||core.id("prod"),
    sectionId:input("sectionId").value,
    name:input("name").value.trim(),description:input("description").value.trim(),
    price:number("price"),oldPrice:number("oldPrice"),badge:input("badge").value.trim(),
    icon:input("icon").value.trim()||"◆",imageUrl:input("imageUrl").value.trim(),
    perks:input("perks").value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean),
    featured:input("featured").checked,status:input("status").value,
    checkoutUrl:input("checkoutUrl").value.trim(),checkoutLabel:input("checkoutLabel").value.trim()||"ACQUISTA ORA"
   };
  }
  const old=core.clone(draft);
  if(index<0)source.push(item);else source[index]=item;
  if(!assertDraft()){draft=old;return}
  closeEditor();mark();
 });
 function move(kind,id,delta){
  const items=kind==="section"?draft.sections:draft.products;
  const i=items.findIndex(p=>p.id===id),j=i+delta;
  if(i<0||j<0||j>=items.length)return;
  [items[i],items[j]]=[items[j],items[i]];mark();
 }
 function duplicate(kind,id){
  const arr=kind==="section"?draft.sections:draft.products;
  const item=arr.find(x=>x.id===id);if(!item)return;
  const copy=core.clone(item);
  copy.id=core.id(kind==="section"?"sec":"prod");
  copy.name=item.name+" (copia)";
  if(kind==="product")copy.status="hidden";
  arr.splice(arr.indexOf(item)+1,0,copy);mark();
 }
 function remove(kind,id){
  const arr=kind==="section"?draft.sections:draft.products;
  const item=arr.find(x=>x.id===id);if(!item)return;
  const count=kind==="section"?draft.products.filter(p=>p.sectionId===id).length:0;
  const message=kind==="section"
   ?"Eliminare la sezione \""+item.name+"\"? "+(count? "Verranno ELIMINATI anche "+count+" prodotti contenuti.":"")
   :"Eliminare definitivamente il prodotto \""+item.name+"\" dalla bozza?";
  if(!confirm(message))return;
  arr.splice(arr.indexOf(item),1);
  if(kind==="section")draft.products=draft.products.filter(p=>p.sectionId!==id);
  mark();
 }
 function actionButton(label,title,onClick,disabled=false,danger=false){
  const button=elt("button",danger?"danger":"",label);button.type="button";
  button.title=title;button.setAttribute("aria-label",title);
  button.disabled=disabled;button.addEventListener("click",onClick);
  return button;
 }
 function makeRow(kind,item,index,length){
  const row=elt("div","admin-list-item");
  const icon=elt("div","admin-item-icon");
  if(kind==="product"&&item.imageUrl){
   const image=elt("img");image.src=item.imageUrl;image.alt="";image.loading="lazy";image.referrerPolicy="no-referrer";
   image.addEventListener("error",()=>{image.replaceWith(elt("span","",item.icon||"◆"))});
   icon.append(image);
  }else icon.textContent=item.icon||"◆";
  const copy=elt("div","admin-item-info");
  copy.append(elt("strong","",item.name));
  if(kind==="section"){
   const count=draft.products.filter(p=>p.sectionId===item.id).length;
   copy.append(elt("small","",count+" prodotti · "+(item.visible?"Visibile":"Nascosta")+" · "+item.description));
  }else{
   const cat=draft.sections.find(s=>s.id===item.sectionId);
   const price=item.price===null?"Prezzo da impostare":core.currency(item.price,draft.settings.currency);
   copy.append(elt("small","",(cat?.name||"Senza sezione")+" · "+price+" · "+({active:"Visibile",hidden:"Nascosto",soldout:"Esaurito"}[item.status])));
  }
  const buttons=elt("div","admin-actions");
  buttons.append(
   actionButton("↑","Sposta in alto",()=>move(kind,item.id,-1),index===0),
   actionButton("↓","Sposta in basso",()=>move(kind,item.id,1),index===length-1),
   actionButton("MODIFICA","Modifica "+item.name,()=>renderEditor(kind,item.id)),
   actionButton("DUPLICA","Duplica "+item.name,()=>duplicate(kind,item.id)),
   actionButton("ELIMINA","Elimina "+item.name,()=>remove(kind,item.id),false,true)
  );
  row.append(icon,copy,buttons);return row;
 }
 function refresh(){
  const list=$("#admin-product-list"),sectionList=$("#admin-section-list");
  if(!draft)return;
  const term=$("#admin-search").value.trim().toLocaleLowerCase("it");
  const filter=$("#admin-filter-category").value;
  const previous=filter;
  const categories=$("#admin-filter-category");
  categories.replaceChildren();
  const all=elt("option","","Tutte le sezioni");all.value="all";categories.append(all);
  for(const c of draft.sections){const opt=elt("option","",c.name);opt.value=c.id;categories.append(opt)}
  if(draft.sections.some(s=>s.id===previous))categories.value=previous;
  const visible=draft.products.filter(p=>(filter==="all"||p.sectionId===filter)&&[p.name,p.description,p.badge].join(" ").toLocaleLowerCase("it").includes(term));
  list.replaceChildren();
  visible.forEach(p=>list.append(makeRow("product",p,draft.products.indexOf(p),draft.products.length)));
  if(!visible.length)list.append(elt("div","admin-list-empty","Nessun prodotto presente. Usa “Nuovo prodotto” per aggiungerne uno."));
  sectionList.replaceChildren();
  draft.sections.forEach((s,i)=>sectionList.append(makeRow("section",s,i,draft.sections.length)));
  if(!draft.sections.length)sectionList.append(elt("div","admin-list-empty","Nessuna sezione. Crea una categoria per iniziare."));
  $("#admin-revision").textContent=draft.sections.length+" SEZ. / "+draft.products.length+" PROD.";
  renderSettings();
 }
 function renderSettings(){
  const form=$("#shop-settings-form"),s=draft.settings;
  for(const key of ["title","eyebrow","subtitle","description","announcement","currency","supportUrl"]){
   const el=form.elements.namedItem(key);if(el&&document.activeElement!==el)el.value=s[key]??"";
  }
  const toggle=form.elements.namedItem("shopOpen");if(document.activeElement!==toggle)toggle.checked=s.shopOpen;
 }
 $("#new-product").addEventListener("click",()=>renderEditor("product",null));
 $("#new-section").addEventListener("click",()=>renderEditor("section",null));
 $("#admin-search").addEventListener("input",refresh);
 $("#admin-filter-category").addEventListener("change",refresh);
 $("#shop-settings-form").addEventListener("submit",e=>{
  e.preventDefault();
  const form=e.currentTarget;
  const value=name=>form.elements.namedItem(name).value.trim();
  const old=core.clone(draft);
  draft.settings={title:value("title"),eyebrow:value("eyebrow"),subtitle:value("subtitle"),description:value("description"),announcement:value("announcement"),currency:value("currency"),supportUrl:value("supportUrl"),shopOpen:form.elements.namedItem("shopOpen").checked};
  if(!assertDraft()){draft=old;return}
  mark();
 });
 $("#save-local").addEventListener("click",()=>{
  if(!assertDraft())return;
  try{localStorage.setItem(STORAGE,JSON.stringify({baseRevision,catalog:draft}));$("#local-status").textContent="Bozza salvata su questo dispositivo."}
  catch{$("#local-status").textContent="Il browser non permette il salvataggio locale. Usa Esporta JSON."}
 });
 $("#export-json").addEventListener("click",()=>{
  if(!assertDraft())return;
  const blob=new Blob([JSON.stringify(draft,null,2)+"\n"],{type:"application/json"});
  const url=URL.createObjectURL(blob),link=elt("a");
  link.href=url;link.download="heldprisons-shop-backup.json";
  document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $("#local-status").textContent="Backup JSON scaricato.";
 });
 $("#import-json").addEventListener("change",async e=>{
  const file=e.target.files?.[0];if(!file)return;
  try{
   if(file.size>1_000_000)throw new Error("File troppo grande (massimo 1 MB).");
   const imported=core.validate(JSON.parse(await file.text()));
   if(!confirm("Sostituire la bozza corrente con il file selezionato?"))return;
   draft=imported;mark();$("#local-status").textContent="Catalogo importato nella bozza. Non ancora pubblicato.";
  }catch(err){alert("Impossibile importare: "+err.message)}
  finally{e.target.value=""}
 });
 $("#reset-draft").addEventListener("click",()=>{
  if(!confirm("Eliminare le modifiche locali e ripristinare il catalogo caricato dal sito?"))return;
  draft=core.clone(published);
  try{localStorage.removeItem(STORAGE)}catch{}
  setStatus("CATALOGO RIPRISTINATO");
  $("#admin-summary").textContent="Stai modificando il catalogo attualmente caricato dal sito.";
  refresh();
 });
 function toBase64(input){
  const bytes=new TextEncoder().encode(input);let out="";
  for(let i=0;i<bytes.length;i+=8192)out+=String.fromCharCode(...bytes.subarray(i,i+8192));
  return btoa(out);
 }
 function fromBase64(input){
  const raw=atob(input.replace(/\s/g,""));
  return new TextDecoder().decode(Uint8Array.from(raw,c=>c.charCodeAt(0)));
 }
 async function gitRequest(method,token,body){
  const response=await fetch(API+(method==="GET"?"?ref=main":""),{
   method,headers:{"Accept":"application/vnd.github+json","Authorization":"Bearer "+token,"X-GitHub-Api-Version":"2022-11-28",...(body?{"Content-Type":"application/json"}:{})},
   body:body?JSON.stringify(body):undefined,cache:"no-store"
  });
  const payload=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error("GitHub "+response.status+": "+String(payload.message||"Errore di connessione"));
  return payload;
 }
 $("#publish-github").addEventListener("click",async()=>{
  const button=$("#publish-github"),field=$("#github-token");
  const token=field.value.trim();
  if(!token){setResult("Inserisci il token GitHub temporaneo per pubblicare.",true);field.focus();return}
  if(!assertDraft())return;
  if(!confirm("Pubblicare il catalogo nel repository Alev03YT/HeldPrison (branch main)?"))return;
  button.disabled=true;button.textContent="PUBBLICAZIONE IN CORSO…";
  setResult("Verifica della versione corrente sul repository...");
  try{
   const remote=await gitRequest("GET",token);
   const remoteCatalog=core.validate(JSON.parse(fromBase64(remote.content)));
   if(remoteCatalog.revision!==baseRevision)throw new Error("Conflitto: il catalogo online è cambiato dopo il caricamento della tua bozza. Esporta un backup e ricarica la pagina prima di unire le modifiche.");
   const next=core.clone(draft);
   next.revision="rev_"+Date.now()+"_"+core.id("r");
   const uploaded=await gitRequest("PUT",token,{message:"shop: update HeldPrisons store catalog from admin panel",content:toBase64(JSON.stringify(next,null,2)+"\n"),sha:remote.sha,branch:"main"});
   if(!uploaded.content?.sha)throw new Error("GitHub non ha confermato l'aggiornamento del file.");
   draft=core.validate(next);published=core.clone(draft);baseRevision=draft.revision;
   try{localStorage.removeItem(STORAGE)}catch{}
   setStatus("SALVATO SU GITHUB • DEPLOY IN ATTESA");
   $("#admin-summary").textContent="Catalogo aggiornato nel repository. La pubblicazione pubblica richiede che GitHub Pages completi il deploy.";
   setResult("✓ Aggiornato su GitHub. La visibilità pubblica dipende da GitHub Pages e dal deploy.");
   refresh();
  }catch(err){setResult(err.message||"Pubblicazione non riuscita.",true)}
  finally{field.value="";button.disabled=false;button.textContent="PUBBLICA LE MODIFICHE SU GITHUB ↗"}
 });
 try{
  published=await core.fetchCatalog();draft=core.clone(published);baseRevision=published.revision;
  let backup=null;
  try{backup=JSON.parse(localStorage.getItem(STORAGE)||"null")}catch{}
  if(backup?.catalog){
   try{
    const candidate=core.validate(backup.catalog);
    if(backup.baseRevision===baseRevision){
     draft=candidate;setStatus("BOZZA LOCALE RIPRISTINATA");
     $("#admin-summary").textContent="Hai una bozza locale non pubblicata su questo dispositivo.";
    }else{
     setStatus("BOZZA LOCALE DI UNA VERSIONE PRECEDENTE");
     $("#admin-summary").textContent="È presente una bozza di un catalogo differente. Esporta il vecchio JSON, poi ripristina per lavorare sulla versione attuale.";
     $("#local-status").textContent="Attenzione: bozza locale non caricata automaticamente a causa di una versione pubblicata più recente.";
    }
   }catch{try{localStorage.removeItem(STORAGE)}catch{}}
  }else{
   setStatus("EDITOR PRONTO • NESSUNA MODIFICA");
   $("#admin-summary").textContent="Catalogo caricato. Modifica prodotti e sezioni; pubblica soltanto quando sei pronto.";
  }
  refresh();
 }catch(err){
  setStatus("ERRORE DI CARICAMENTO");
  $("#admin-summary").textContent="Non riesco a leggere data/shop.json: "+err.message;
  $$("#new-product,#new-section,#publish-github").forEach(b=>b.disabled=true);
 }
});
