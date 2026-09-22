import {CONTENT} from "./content.js";
import {HISTORY} from "./history/model.js";
import {createHistoryRegistry} from "./history/registry.js";
import {createHistoryQueries} from "./history/queries.js";
import {validateHistory} from "./history/validate.js";
import {TERRITORY} from "./territory/model.js";
import {createTerritoryQueries} from "./territory/queries.js";
import {auditPionero} from "./core/audit.js";

const $=selector=>document.querySelector(selector);
const views={welcome:$("#welcomeView"),journey:$("#journeyView"),scene:$("#sceneView")};
const KEY="pionero.progress.v3";
let currentEra=null;
function readVisited(){
  try{
    const value=JSON.parse(localStorage.getItem(KEY)||"[]");
    return new Set(Array.isArray(value)?value.filter(item=>typeof item==="string"):[]);
  }catch{
    localStorage.removeItem(KEY);
    return new Set();
  }
}
let visited=readVisited();
const history=createHistoryRegistry(HISTORY);
const queries=createHistoryQueries(history);
const territory=createTerritoryQueries(TERRITORY);
const validation=validateHistory(HISTORY);
const kindLabel={documented:"DOCUMENTADO",testimony:"TESTIMONIO",reconstruction:"RECONSTRUCCIÓN",interpretation:"INTERPRETACIÓN"};
const statusLabel={verified:"VERIFICADO",partial:"PARCIAL",pending:"PENDIENTE"};

function esc(value){return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));}
function save(){
  const validKeys=new Set(Object.entries(CONTENT.points).flatMap(([eraId,points])=>points.map(point=>eraId+":"+point.id)));
  visited=new Set([...visited].filter(key=>validKeys.has(key)));
  localStorage.setItem(KEY,JSON.stringify([...visited]));
  updateProgress();
}
function updateProgress(){
  const total=Object.values(CONTENT.points).reduce((sum,points)=>sum+points.length,0);
  const completed=Math.min(visited.size,total);
  $("#progress").textContent=completed+" / "+total+" huellas";
}
function show(name){Object.entries(views).forEach(([key,view])=>view.hidden=key!==name);$("#experience").focus({preventScroll:true});window.scrollTo({top:0,behavior:"smooth"});}
function renderTimeline(activeId=null){
  const rail=$("#timelineRail");
  rail.innerHTML=history.all("eras").map((era,index)=>'<button class="timeline-stop '+(era.id===activeId?"is-active":"")+'" data-era="'+esc(era.id)+'" aria-current="'+(era.id===activeId?"step":"false")+'"><span>'+esc(era.label)+'</span><small>'+String(index+1).padStart(2,"0")+'</small></button>').join("");
  rail.querySelectorAll("[data-era]").forEach(button=>button.onclick=()=>travel(button.dataset.era));
}
function renderEras(){
  const grid=$("#eraGrid");
  grid.innerHTML=history.all("eras").map((era,index)=>{const meta=CONTENT.scenes[era.id]||{};return '<button class="era-card theme-'+esc(meta.theme||"default")+'" data-era="'+esc(era.id)+'"><span class="era-year">'+esc(era.label)+'</span><span class="era-index">VIAJE '+String(index+1).padStart(2,"0")+'</span><h3>'+esc(era.title)+'</h3><p>'+esc(meta.description||"")+'</p><span class="era-arrow">→</span></button>';}).join("");
  grid.querySelectorAll("[data-era]").forEach(button=>button.onclick=()=>travel(button.dataset.era));
  renderTimeline();updateProgress();
}
function eraIndex(){return currentEra?history.all("eras").findIndex(era=>era.id===currentEra.id):-1;}
function travel(id){
  const era=history.get("eras",id),meta=CONTENT.scenes[id]||{};
  if(!era)return;
  currentEra=era;$("#scene").dataset.theme=meta.theme||"default";$("#sceneDate").textContent=era.label;$("#sceneTitle").textContent=era.title;$("#scenePlace").textContent="SAN PATRICIO DEL CHAÑAR";$("#sceneStatus").textContent=statusLabel[era.status]||era.status.toUpperCase();
  const points=CONTENT.points[id]||[];$("#sceneHint").textContent=points.length===1?"Hay una huella para descubrir.":"Hay "+points.length+" huellas para descubrir.";
  renderPoints();renderTimeline(era.id);updateSceneNavigation();closeTerritory();$("#discoveryPanel").hidden=true;show("scene");
}
function updateSceneNavigation(){const index=eraIndex(),eras=history.all("eras");$("#previousEra").disabled=index<=0;$("#nextEra").disabled=index<0||index>=eras.length-1;}
function renderPoints(){
  const points=CONTENT.points[currentEra.id]||[],container=$("#memoryPoints");
  container.innerHTML=points.map(point=>{const seen=visited.has(currentEra.id+":"+point.id);return '<button class="memory-point '+(seen?"is-seen":"")+'" style="left:'+point.x+'%;top:'+point.y+'%" data-point="'+esc(point.id)+'" aria-label="Descubrir '+esc(point.title)+'"><span>'+esc(point.title)+'</span></button>';}).join("");
  container.querySelectorAll("[data-point]").forEach(button=>button.onclick=()=>discover(button.dataset.point));
}
function resolveEntity(point){const ref=history.getAny(point.entityId);return ref?{...ref.item,__type:ref.type}:null;}
function renderEntity(entity){
  if(!entity)return "<p>Registro histórico no encontrado.</p>";
  const sources=queries.sourcesFor(entity),related=queries.relatedEntities(entity.__type,entity.id);
  const relatedHtml=related.length?'<div class="related-block"><b>Conectado con</b><div class="chips">'+related.slice(0,6).map(item=>'<span class="chip">'+esc(item.title||item.label)+'</span>').join("")+'</div></div>':"";
  const sourceHtml=sources.length?sources.map(source=>'<li><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(source.title)+'</a></li>').join(""):"<li>Sin fuente vinculada todavía.</li>";
  return '<div class="panel-meta">'+esc(kindLabel[entity.evidence]||"REGISTRO")+' · '+esc(statusLabel[entity.status]||entity.status)+'</div><h3>'+esc(entity.title)+'</h3><p>'+esc(entity.description||"")+'</p>'+relatedHtml+'<div class="source-block"><b>Fuentes</b><ul>'+sourceHtml+'</ul></div>';
}
function discover(pointId){
  const point=(CONTENT.points[currentEra.id]||[]).find(item=>item.id===pointId);if(!point)return;
  visited.add(currentEra.id+":"+point.id);save();closeTerritory();const resolved=resolveEntity(point),panel=$("#discoveryPanel");
  panel.innerHTML=renderEntity(resolved||{title:point.title,evidence:point.kind,status:"pending",description:point.text})+'<p class="point-note">'+esc(point.text||"")+'</p><button id="closeDiscovery" class="secondary-button">Seguir explorando</button>';
  panel.hidden=false;$("#closeDiscovery").onclick=closeDiscovery;panel.scrollIntoView({behavior:"smooth",block:"nearest"});renderPoints();
}
function renderTerritory(){
  if(!currentEra)return;
  const summary=territory.summaryForEra(currentEra.id);
  $("#territoryDescription").textContent=TERRITORY.description;
  const map=$("#territoryMap");
  map.innerHTML='<div class="territory-river" aria-hidden="true"></div><div class="territory-hint">ESQUEMA DIDÁCTICO · NO A ESCALA</div>'+
    summary.connections.map(connection=>{const a=territory.node(connection.from),b=territory.node(connection.to);return '<span class="territory-connection" style="left:'+a.x+'%;top:'+a.y+'%;width:'+Math.hypot(b.x-a.x,b.y-a.y)+'%;transform:rotate('+Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+'deg)"></span>';}).join("")+
    summary.nodes.map(node=>'<button class="territory-node node-'+esc(node.kind)+'" style="left:'+node.x+'%;top:'+node.y+'%" data-node="'+esc(node.id)+'"><i></i><span>'+esc(node.title)+'</span></button>').join("");
  map.querySelectorAll("[data-node]").forEach(button=>button.onclick=()=>showTerritoryNode(button.dataset.node));
  $("#territoryLegend").innerHTML=TERRITORY.layers.map(layer=>'<span><i class="legend-'+esc(layer.kind)+'"></i>'+esc(layer.label)+'</span>').join("");
  $("#territoryInfo").innerHTML='<p><b>'+summary.count+'</b> referencias territoriales disponibles para '+esc(currentEra.label)+'.</p><p>El esquema muestra relaciones espaciales históricas, no coordenadas geográficas precisas.</p>';
}
function showTerritoryNode(id){
  const node=territory.node(id);if(!node)return;
  const place=history.get("places",node.placeId);
  const layer=TERRITORY.layers.find(item=>item.id===node.layerId);
  $("#territoryInfo").innerHTML='<div class="panel-meta">'+esc(layer?.label||"TERRITORIO")+'</div><h4>'+esc(node.title)+'</h4><p>'+esc(place?.description||"")+'</p><p class="point-note">Referencia espacial esquemática. La ubicación visual no pretende sustituir una cartografía documental.</p>';
}
function openTerritory(){closeDiscovery();renderTerritory();$("#territoryPanel").hidden=false;$("#territoryPanel").scrollIntoView({behavior:"smooth",block:"nearest");}
function closeTerritory(){$("#territoryPanel").hidden=true;}
function closeDiscovery(){$("#discoveryPanel").hidden=true;}
function compare(){
  if(!currentEra)return;
  closeTerritory();
  const events=queries.eventsByEra(currentEra.id),evidence=events.length?events.map(event=>event.title).join(" · "):"Sin eventos registrados para esta etapa.";
  $("#discoveryPanel").innerHTML='<div class="panel-meta">COMPARACIÓN PREPARADA</div><h3>'+esc(currentEra.label)+' → HOY</h3><p>Esta etapa contiene '+events.length+' registro(s) en el motor histórico. La comparación visual se activará cuando exista material histórico y actual verificable para el mismo lugar.</p><p class="reference"><b>Huella histórica:</b> '+esc(evidence)+'</p><button id="closeCompare" class="secondary-button">Volver a explorar</button>';
  $("#discoveryPanel").hidden=false;$("#closeCompare").onclick=()=>$("#discoveryPanel").hidden=true;
}
function openSources(){
  const all=history.all("sources"),pending=queries.researchQueue();
  $("#sourceContent").innerHTML='<p>PIONERO separa lo documentado de la reconstrucción didáctica. Las fuentes están vinculadas a los registros históricos y su estado de investigación.</p><div class="source-summary"><span>'+all.length+' fuentes registradas</span><span>'+pending.length+' registros por completar</span></div><ul class="source-list">'+all.map(source=>'<li><b>'+esc(source.title)+'</b><small>'+esc(statusLabel[source.status]||source.status)+' · '+esc(source.type)+'</small><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">Abrir fuente →</a></li>').join("")+'</ul>';
  $("#modal").hidden=false;$("#closeModal").focus();
}
function closeModal(){$("#modal").hidden=true;}
function goPrevious(){const eras=history.all("eras"),i=eraIndex();if(i>0)travel(eras[i-1].id);}
function goNext(){const eras=history.all("eras"),i=eraIndex();if(i>=0&&i<eras.length-1)travel(eras[i+1].id);}
$("#startButton").onclick=()=>show("journey");$("#backToJourney").onclick=()=>show("journey");$("#previousEra").onclick=goPrevious;$("#nextEra").onclick=goNext;$("#discoverButton").onclick=()=>currentEra&&CONTENT.points[currentEra.id]?.[0]&&discover(CONTENT.points[currentEra.id][0].id);$("#territoryButton").onclick=openTerritory;$("#closeTerritory").onclick=closeTerritory;$("#compareButton").onclick=compare;$("#sourceButton").onclick=openSources;$("#sourceButtonScene").onclick=openSources;$("#closeModal").onclick=closeModal;$("#modal").onclick=event=>{if(event.target.id==="modal")closeModal();};
document.onkeydown=event=>{if(event.key==="Escape"){if(!$("#modal").hidden)closeModal();else if(!$("#territoryPanel").hidden)closeTerritory();else if(!$("#discoveryPanel").hidden)closeDiscovery();else if(!views.scene.hidden)show("journey");}if(!views.scene.hidden&&["ArrowLeft","ArrowRight"].includes(event.key)){event.preventDefault();event.key==="ArrowLeft"?goPrevious():goNext();}};
const audit=auditPionero({content:CONTENT,history:HISTORY,territory:TERRITORY});
if(!validation.valid)console.error("PIONERO HISTORY VALIDATION",validation.issues);
if(!audit.valid)console.error("PIONERO STRUCTURAL AUDIT",audit.issues);
window.PIONERO={history,queries,territory,validation,audit,version:"0.4.0"};
save();
renderEras();