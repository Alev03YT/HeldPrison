"use strict";
document.addEventListener("DOMContentLoaded",async()=>{
 if(document.body.dataset.page!=="shop")return;
 const core=window.HeldShopData;
 const $=s=>document.querySelector(s);
 let catalog,selection="all",query="";
 const status=$("#shop-announcement"),statusLabel=$("#shop-status-label"),categories=$("#shop-categories"),grid=$("#shop-products");
 const heading=$("#shop-active-title"),smallTitle=$("#shop-active-label"),count=$("#shop-product-count");
 function make(tag,cls,text){
  const node=document.createElement(tag);
  if(cls)node.className=cls;
  if(text!==undefined)node.textContent=text;
  return node;
 }
 function showError(message){
  categories.replaceChildren();
  const empty=make("div","shop-empty","");
  empty.append(make("span","shop-empty-symbol","⚠"));
  const body=make("div");
  body.append(make("h3","","CATALOGO NON DISPONIBILE"),make("p","",message));
  empty.append(body);grid.replaceChildren(empty);
  status.textContent="Impossibile caricare il catalogo dello shop.";
  count.textContent="—";
 }
 function renderCategory(section,id){
  const button=make("button","shop-category"+(selection===id?" is-selected":""),"");
  button.type="button";
  button.setAttribute("aria-pressed",String(selection===id));
  button.dataset.category=id;
  button.append(make("span","cat-icon",section?.icon||"▣"),make("span","",section?.name||"TUTTI"));
  button.addEventListener("click",()=>{selection=id;render()});
  return button;
 }
 function makeCard(item,section){
  const card=make("article","shop-product","");
  const visual=make("div","shop-product-visual","");
  if(item.imageUrl){
   const img=make("img");img.src=item.imageUrl;img.alt="Immagine: "+item.name;img.loading="lazy";img.referrerPolicy="no-referrer";
   img.addEventListener("error",()=>{img.replaceWith(make("span","product-icon",item.icon||"◆"))});
   visual.append(img);
  } else visual.append(make("span","product-icon",item.icon||"◆"));
  if(item.badge)visual.append(make("span","product-label",item.badge));
  const body=make("div","shop-product-body","");
  body.append(make("span","shop-product-section",section.name),make("h3","",item.name),make("p","",item.description));
  const perks=Array.isArray(item.perks)?item.perks.slice(0,3):[];
  if(perks.length){
   const list=make("ul","shop-perks","");
   perks.forEach(p=>list.append(make("li","",p)));
   body.append(list);
  }
  const prices=make("div","shop-price-line","");
  prices.append(make("strong","shop-price",item.price===null?"PREZZO IN ARRIVO":core.currency(item.price,catalog.settings.currency)));
  if(item.oldPrice!==null&&item.price!==null&&item.oldPrice>item.price)prices.append(make("span","shop-old-price",core.currency(item.oldPrice,catalog.settings.currency)));
  body.append(prices);
  const actions=make("div","shop-card-actions","");
  const detail=make("button","btn btn-small btn-outline shop-card-button","DETTAGLI ↗");
  detail.type="button";detail.addEventListener("click",()=>openDetails(item,section));
  actions.append(detail);
  const canBuy=catalog.settings.shopOpen&&item.status==="active"&&item.checkoutUrl;
  if(canBuy){
   const link=make("a","btn btn-small btn-gold shop-card-button",item.checkoutLabel||"ACQUISTA ORA");
   link.href=item.checkoutUrl;link.target="_blank";link.rel="noopener noreferrer";
   actions.append(link);
  }else{
   const unavailable=make("button","btn btn-small btn-gold shop-card-button",item.status==="soldout"?"ESAURITO":catalog.settings.shopOpen?"NON DISPONIBILE":"ACQUISTI NON ATTIVI");
   unavailable.type="button";unavailable.disabled=true;actions.append(unavailable);
  }
  body.append(actions);card.append(visual,body);
  if(item.featured)card.classList.add("shop-product--featured");
  return card;
 }
 function openDetails(item,section){
  const overlay=make("dialog","shop-detail-dialog","");
  overlay.setAttribute("aria-label","Dettagli prodotto "+item.name);
  const inner=make("div","shop-detail-layout","");
  const visual=make("div","shop-detail-symbol",item.icon||"◆");
  if(item.imageUrl){visual.textContent="";const image=make("img");image.src=item.imageUrl;image.alt=item.name;image.referrerPolicy="no-referrer";image.addEventListener("error",()=>{visual.textContent=item.icon||"◆"});visual.append(image)}
  const main=make("div","shop-detail-main","");
  main.append(make("span","overline","/ "+section.name),make("h2","",item.name),make("p","",item.description));
  if(item.perks.length){const h=make("h3","","INCLUSO");const ul=make("ul","","");item.perks.forEach(p=>ul.append(make("li","",p)));main.append(h,ul)}
  main.append(make("strong","shop-price",item.price===null?"PREZZO IN ARRIVO":core.currency(item.price,catalog.settings.currency)));
  const close=make("button","close-dialog","✕");close.type="button";close.setAttribute("aria-label","Chiudi");close.addEventListener("click",()=>overlay.close());
  const footer=make("div","shop-detail-footer","");
  if(catalog.settings.shopOpen&&item.status==="active"&&item.checkoutUrl){
   const link=make("a","btn btn-gold",item.checkoutLabel||"ACQUISTA ORA");
   link.href=item.checkoutUrl;link.target="_blank";link.rel="noopener noreferrer";footer.append(link);
  }else footer.append(make("span","shop-detail-disabled","Acquisto online non disponibile"));
  main.append(footer);inner.append(visual,main);overlay.append(close,inner);
  document.body.append(overlay);
  overlay.addEventListener("close",()=>overlay.remove(),{once:true});
  overlay.addEventListener("click",e=>{if(e.target===overlay)overlay.close()});
  if(typeof overlay.showModal==="function")overlay.showModal();else overlay.setAttribute("open","");
 }
 function render(){
  const visibleSections=catalog.sections.filter(s=>s.visible);
  if(selection!=="all"&&!visibleSections.some(s=>s.id===selection))selection="all";
  categories.replaceChildren(renderCategory(null,"all"),...visibleSections.map(s=>renderCategory(s,s.id)));
  const category=visibleSections.find(s=>s.id===selection);
  smallTitle.textContent=selection==="all"?"/ TUTTO IL CATALOGO":"/ "+category.name.toUpperCase();
  heading.textContent=selection==="all"?"TUTTI I PRODOTTI":category.name;
  const visibleIds=new Set(visibleSections.map(s=>s.id));
  const term=query.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("it");
  const found=catalog.products.filter(p=>{
   if(p.status==="hidden"||!visibleIds.has(p.sectionId)||(selection!=="all"&&p.sectionId!==selection))return false;
   const s=visibleSections.find(x=>x.id===p.sectionId);
   const haystack=[p.name,p.description,p.badge,...p.perks,s?.name||""].join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("it");
   return haystack.includes(term);
  }).sort((a,b)=>Number(b.featured)-Number(a.featured));
  count.textContent=found.length+" "+(found.length===1?"PRODOTTO":"PRODOTTI");
  const fragment=document.createDocumentFragment();
  for(const p of found)fragment.append(makeCard(p,visibleSections.find(s=>s.id===p.sectionId)));
  if(!found.length){
   const empty=make("div","shop-empty","");
   empty.append(make("span","shop-empty-symbol","◈"));
   const body=make("div");
   body.append(make("h3","",query?"NESSUN PRODOTTO TROVATO":"NUOVE OFFERTE IN ARRIVO"),
    make("p","",query?"Modifica la ricerca o seleziona un'altra categoria.":"Stiamo preparando i contenuti ufficiali dello shop. Segui il canale per i prossimi annunci."));
   empty.append(body);fragment.append(empty);
  }
  grid.replaceChildren(fragment);
 }
 try{
  catalog=await core.fetchCatalog();
  $("#shop-title").textContent=catalog.settings.title;
  $("#shop-eyebrow").textContent="/ "+catalog.settings.eyebrow;
  $("#shop-subtitle").textContent=catalog.settings.subtitle;
  $("#shop-description").textContent=catalog.settings.description;
  $("#shop-announcement").textContent=catalog.settings.announcement||"Benvenuto nello shop HeldPrisons.";
  statusLabel.textContent=catalog.settings.shopOpen?"SHOP ATTIVO":"ACQUISTI NON ATTIVI";
  if(catalog.settings.supportUrl)$("#shop-support-link").href=catalog.settings.supportUrl;
  else $("#shop-support-link").hidden=true;
  $("#shop-search-input").addEventListener("input",e=>{query=e.target.value.trim();render()});
  render();
 }catch(err){showError("Il catalogo non è raggiungibile. Ricarica la pagina oppure avvisa lo staff.")}
});
