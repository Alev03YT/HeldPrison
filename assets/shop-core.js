"use strict";
/* Shared shop data. All catalog content is plain JSON, never executable markup. */
(function(){
const PATH="data/shop.json";
const MAX_SECTIONS=80,MAX_PRODUCTS=1200;
const LIMITS={title:70,eyebrow:100,subtitle:120,description:800,announcement:250};
function str(value,max=300){return String(value??"").trim().slice(0,max)}
function httpsUrl(value){
 const v=str(value,2000);
 if(!v)return "";
 try{const url=new URL(v);if(url.protocol!=="https:"||!url.hostname||url.username||url.password)return "";return url.href}catch{return ""}
}
function error(message){throw new Error(message)}
function validate(data){
 if(!data||typeof data!=="object"||Array.isArray(data))error("Il catalogo deve essere un oggetto JSON.");
 if(data.schemaVersion!==1)error("Versione del catalogo non supportata.");
 if(!Array.isArray(data.sections)||!Array.isArray(data.products))error("Sezioni o prodotti mancanti.");
 if(data.sections.length>MAX_SECTIONS||data.products.length>MAX_PRODUCTS)error("Catalogo troppo grande.");
 const settings=data.settings||{};
 const parsed={
  schemaVersion:1,
  revision:str(data.revision,110)||"imported",
  settings:{
   title:str(settings.title,LIMITS.title)||"HELD SHOP",
   eyebrow:str(settings.eyebrow,LIMITS.eyebrow)||"HELDPRISONS / STORE",
   subtitle:str(settings.subtitle,LIMITS.subtitle),
   description:str(settings.description,LIMITS.description),
   announcement:str(settings.announcement,LIMITS.announcement),
   currency:["EUR","USD","GBP"].includes(settings.currency)?settings.currency:"EUR",
   shopOpen:settings.shopOpen===true,
   supportUrl:httpsUrl(settings.supportUrl)
  },
  sections:[],products:[]
 };
 const sectionIds=new Set();
 for(const input of data.sections){
  if(!input||typeof input!=="object")error("Sezione non valida.");
  const id=str(input.id,75),name=str(input.name,70);
  if(!/^[a-z0-9][a-z0-9_-]*$/.test(id)||sectionIds.has(id)||!name)error("Sezione con ID duplicato, non valido o senza nome.");
  sectionIds.add(id);
  parsed.sections.push({id,name,description:str(input.description,250),icon:str(input.icon,12)||"◇",visible:input.visible!==false});
 }
 const productIds=new Set();
 for(const input of data.products){
  if(!input||typeof input!=="object")error("Prodotto non valido.");
  const id=str(input.id,75),sectionId=str(input.sectionId,75),name=str(input.name,100);
  if(!/^[a-z0-9][a-z0-9_-]*$/.test(id)||productIds.has(id)||!name)error("Prodotto senza nome, con ID non valido o duplicato.");
  if(!sectionIds.has(sectionId))error("Il prodotto "+name+" fa riferimento a una sezione inesistente.");
  if(!["active","hidden","soldout"].includes(input.status))error("Stato prodotto non valido: "+name);
  const price=input.price===null||input.price===undefined||input.price===""?null:Number(input.price);
  const oldPrice=input.oldPrice===null||input.oldPrice===undefined||input.oldPrice===""?null:Number(input.oldPrice);
  if((price!==null&&(!Number.isFinite(price)||price<0||price>1000000))||(oldPrice!==null&&(!Number.isFinite(oldPrice)||oldPrice<0||oldPrice>1000000)))error("Prezzo non valido: "+name);
  if(input.status==="active"&&price===null)error("Il prodotto attivo "+name+" necessita di un prezzo.");
  const imageUrl=input.imageUrl?httpsUrl(input.imageUrl):"";
  const checkoutUrl=input.checkoutUrl?httpsUrl(input.checkoutUrl):"";
  if(input.imageUrl&&!imageUrl)error("Immagine non HTTPS: "+name);
  if(input.checkoutUrl&&!checkoutUrl)error("Checkout non HTTPS: "+name);
  const perks=Array.isArray(input.perks)?input.perks.slice(0,30).map(p=>str(p,160)).filter(Boolean):[];
  productIds.add(id);
  parsed.products.push({id,sectionId,name,description:str(input.description,900),price,oldPrice,badge:str(input.badge,50),icon:str(input.icon,12)||"◆",imageUrl,perks,featured:input.featured===true,status:input.status,checkoutUrl,checkoutLabel:str(input.checkoutLabel,50)||"ACQUISTA ORA"});
 }
 if(settings.supportUrl&&!parsed.settings.supportUrl)error("Il link del supporto deve essere HTTPS.");
 return parsed;
}
function clone(value){return JSON.parse(JSON.stringify(value))}
async function fetchCatalog(){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
 try{
  const response=await fetch(PATH+"?v="+Date.now(),{cache:"no-store",signal:controller.signal});
  if(!response.ok)throw new Error("Impossibile caricare il catalogo ("+response.status+").");
  const text=await response.text();
  if(text.length>1_000_000)throw new Error("Catalogo troppo grande.");
  return validate(JSON.parse(text));
 }finally{clearTimeout(timer)}
}
function currency(value,code="EUR"){
 return new Intl.NumberFormat("it-IT",{style:"currency",currency:code}).format(value);
}
function id(prefix){
 const random=typeof crypto!=="undefined"&&typeof crypto.randomUUID==="function"?crypto.randomUUID().slice(0,12):String(Date.now())+"_"+Math.random().toString(36).slice(2,7);
 return prefix+"_"+random.toLowerCase().replace(/[^a-z0-9_-]/g,"");
}
window.HeldShopData=Object.freeze({PATH,validate,clone,fetchCatalog,currency,id,httpsUrl});
})();
