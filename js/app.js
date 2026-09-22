import {CONTENT} from "./content.js";
import {HISTORY} from "./history/model.js";
import {createHistoryRegistry} from "./history/registry.js";
import {createHistoryQueries} from "./history/queries.js";
import {validateHistory} from "./history/validate.js";

const $=selector=>document.querySelector(selector);
const views={welcome:$("#welcomeView"),journey:$("#journeyView"),scene:$("#sceneView")};
const KEY="pionero.progress.v2";
let currentEra=null;
let visited=new Set(JSON.parse(localStorage.getItem(KEY)||"[]"));
const history=createHistoryRegistry(HISTORY);
const queries=createHistoryQueries(history);
const validation=validateHistory(HISTORY);
const kindLabel={documented:"DOCUMENTADO",testimony:"TESTIMONIO",reconstruction:"RECONSTRUCCIÓN",interpretation:"INTERPRETACIÓN"};
const statusLabel={verified:"VERIFICADO",partial:"PARCIAL",pending:"PENDIENTE"};

function esc(value){return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));}
function save(){localStorage.setItem(KEY,JSON.stringify([...visited]));updateProgress();}
function updateProgress(){
  const total=Object.values(CONTENT.points).reduce((sum,points)=>sum+points.length,0);
  $("#progress").textContent=visited.size+" / "+total+" huellas";
}
function show(name){
  Object.entries(views).forEach(([key,view])=>view.hidden=key!==name);
  $("#experience").focus({preventScroll:true});
  window.scrollTo({top:0,behavior:"smooth"});
}
function renderTimeline(activeId=null){
  const rail=$("#timelineRail");
  rail.innerHTML=history.all("eras").map((era,index)=>{
    const active=era.id===activeId;
    return '<button class="timeline-stop '+(active?"is-active":"")+'" data-era="'+esc(era.id)+'" aria-current="'+(active?"step":"false")+'"><span>'+esc(era.label)+'</span><small>'+String(index+1).padStart(2,"0")+'</small></button>';
  }).join("");
  rail.querySelectorAll("[data-era]").forEach(button=>button.onclick=()=>travel(button.dataset.era));
}
function renderEras(){
  const grid=$("#eraGrid");
  grid.innerHTML=history.all("eras").map((era,index)=>{
    const meta=CONTENT.scenes[era.id]||{};
    return '<button class="era-card theme-'+esc(meta.theme||"default")+'" data-era="'+esc(era.id)+'"><span class="era-year">'+esc(era.label)+'</span><span class="era-index">VIAJE '+String(index+1).padStart(2,"0")+'</span><h3>'+esc(era.title)+'</h3><p>'+esc(meta.description||"")+'</p><span class="era-arrow">→</span></button>';
  }).join("");
  grid.querySelectorAll("[data-era]").forEach(button=>button.onclick=()=>travel(button.dataset.era));
  renderTimeline();
  updateProgress();
}
function eraIndex(){return currentEra?history.all("eras").findIndex(era=>era.id===currentEra.id):-1;}
function travel(id){
  const era=history.get("eras",id);
  const meta=CONTENT.scenes[id]||{};
  if(!era)return;
  currentEra=era;
  $("#scene").dataset.theme=meta.theme||"default";
  $("#sceneDate").textContent=era.label;
  $("#sceneTitle").textContent=era.title;
  $("#scenePlace").textContent="SAN PATRICIO DEL CHAÑAR";
  $("#sceneStatus").textContent=statusLabel[era.status]||era.status.toUpperCase();
  const points=CONTENT.points[id]||[];
  $("#sceneHint").textContent=points.length===1?"Hay una huella para descubrir.":"Hay "+points.length+" huellas para descubrir.";
  renderPoints();renderTimeline(era.id);updateSceneNavigation();
  $("#discoveryPanel").hidden=true;
  show("scene");
}
function updateSceneNavigation(){
  const index=eraIndex(),eras=history.all("eras");
  $("#previousEra").disabled=index<=0;
  $("#nextEra").disabled=index<0||index>=eras.length-1;
}
function renderPoints(){
  const points=CONTENT.points[currentEra.id]||[];
  const container=$("#memoryPoints");
  container.innerHTML=points.map(point=>{
    const seen=visited.has(currentEra.id+":"+point.id);
    return '<button class="memory-point '+(seen?"is-seen":"")+'" style="left:'+point.x+'%;top:'+point.y+'%" data-point="'+esc(point.id)+'" aria-label="Descubrir '+esc(point.title)+'"><span>'+esc(point.title)+'</span></button>';
  }).join("");
  container.querySelectorAll("[data-point]").forEach(button=>button.onclick=()=>discover(button.dataset.point));
}
function entityTypeFor(resolved){return resolved?.__type||null;}
function renderEntity(entity){
  if(!entity)return "<p>Registro histórico no encontrado.</p>";
  const type=entityTypeFor(entity);
  const sources=queries.sourcesFor(entity);
  const related=queries.relatedEntities(type,entity.id);
  const relatedHtml=related.length?'<div class="related-block"><b>Conectado con</b><div class="chips">'+related.slice(0,6).map(item=>'<span class="chip">'+esc(item.title||item.label)+'</span>').join("")+'</div></div>':"";
  const sourceHtml=sources.length?sources.map(source=>'<li><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(source.title)+'</a></li>').join(""):"<li>Sin fuente vinculada todavía.</li>";
  return '<div class="panel-meta">'+esc(kindLabel[entity.evidence]||"REGISTRO")+' · '+esc(statusLabel[entity.status]||entity.status)+'</div>'+
    '<h3>'+esc(entity.title)+'</h3><p>'+esc(entity.description||"")+'</p>'+relatedHtml+
    '<div class="source-block"><b>Fuentes</b><ul>'+sourceHtml+'</ul></div>';
}
function discover(pointId){
  const point=(CONTENT.points[currentEra.id]||[]).find(item=>item.id===pointId);
  if(!point)return;
  visited.add(currentEra.id+":"+point.id);save();
  const resolvedRef=history.getAny(point.entityId);
  const resolved=resolvedRef?.item||null;
  if(resolved)resolved.__type=resolvedRef.type;
  const panel=$("#discoveryPanel");
  panel.innerHTML=renderEntity(resolved||{title:point.title,evidence:point.kind,status:"pending",description:point.text});
  panel.innerHTML+='<p class="point-note">'+esc(point.text||"")+'</p><button id="closeDiscovery" class="secondary-button">Seguir explorando</button>';
  panel.hidden=false;
  $("#closeDiscovery").onclick=()=>panel.hidden=true;
  panel.scrollIntoView({behavior:"smooth",block:"nearest"});
  renderPoints();
}
function compare(){
  if(!currentEra)return;
  const events=queries.eventsByEra(currentEra.id);
  const evidence=events.length?events.map(event=>event.title).join(" · "):"Sin eventos registrados para esta etapa.";
  $("#discoveryPanel").innerHTML='<div class="panel-meta">COMPARACIÓN PREPARADA</div><h3>'+esc(currentEra.label)+' → HOY</h3><p>Esta etapa contiene '+events.length+' registro(s) en el motor histórico. La comparación visual se activará cuando exista material histórico y actual verificable para el mismo lugar.</p><p class="reference"><b>Huella histórica:</b> '+esc(evidence)+'</p><button id="closeCompare" class="secondary-button">Volver a explorar</button>';
  $("#discoveryPanel").hidden=false;$("#closeCompare").onclick=()=>$("#discoveryPanel").hidden=true;
}
function openSources(){
  const all=history.all("sources");
  const pending=queries.researchQueue();
  $("#sourceContent").innerHTML='<p>PIONERO separa lo documentado de la reconstrucción didáctica. Las fuentes están vinculadas a los registros históricos y su estado de investigación.</p>'+
    '<div class="source-summary"><span>'+all.length+' fuentes registradas</span><span>'+pending.length+' registros por completar</span></div>'+
    '<ul class="source-list">'+all.map(source=>'<li><b>'+esc(source.title)+'</b><small>'+esc(statusLabel[source.status]||source.status)+' · '+esc(source.type)+'</small><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">Abrir fuente →</a></li>').join("")+'</ul>';
  $("#modal").hidden=false;$("#closeModal").focus();
}
function closeModal(){$("#modal").hidden=true;}
function goPrevious(){const eras=history.all("eras"),i=eraIndex();if(i>0)travel(eras[i-1].id);}
function goNext(){const eras=history.all("eras"),i=eraIndex();if(i>=0&&i<eras.length-1)travel(eras[i+1].id);}

$("#startButton").onclick=()=>show("journey");
$("#backToJourney").onclick=()=>show("journey");
$("#previousEra").onclick=goPrevious;
$("#nextEra").onclick=goNext;
$("#discoverButton").onclick=()=>currentEra&&CONTENT.points[currentEra.id]?.[0]&&discover(CONTENT.points[currentEra.id][0].id);
$("#compareButton").onclick=compare;
$("#sourceButton").onclick=openSources;
$("#sourceButtonScene").onclick=openSources;
$("#closeModal").onclick=closeModal;
$("#modal").onclick=event=>{if(event.target.id==="modal")closeModal();};
document.onkeydown=event=>{
  if(event.key==="Escape"){
    if(!$("#modal").hidden)closeModal();
    else if(!views.scene.hidden)show("journey");
  }
  if(!views.scene.hidden&&["ArrowLeft","ArrowRight"].includes(event.key)){
    event.preventDefault();event.key==="ArrowLeft"?goPrevious():goNext();
  }
};
if(!validation.valid)console.error("PIONERO HISTORY VALIDATION",validation.issues);
window.PIONERO={history,queries,validation,version:"0.3.1"};
renderEras();