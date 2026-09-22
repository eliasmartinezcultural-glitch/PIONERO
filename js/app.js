import {CONTENT} from "./content.js";
import {HISTORY} from "./history/model.js";
import {createHistoryRegistry} from "./history/registry.js";
import {createHistoryQueries} from "./history/queries.js";
import {validateHistory} from "./history/validate.js";
import {TERRITORY} from "./territory/model.js";
import {createTerritoryQueries} from "./territory/queries.js";
import {auditPionero} from "./core/audit.js";
import {getTemporalState} from "./experience/temporal.js";
import {createTemporalTransition} from "./experience/transition.js";
import {createExperienceCamera} from "./experience/camera.js";
import {createTemporalRenderer} from "./experience/renderer.js";
import {createExperienceWorld} from "./experience/world.js";
import {createSamePlaceEngine} from "./experience/samePlace.js";
import {createComparisonEngine} from "./experience/comparison.js";
import {createFocusController} from "./experience/focus.js";
import {createExperienceState} from "./core/state.js";
import {createSmokeSuite} from "./core/smoke.js";
import {mediaFor} from "./media/catalog.js";
import {routesForEra} from "./experience/routes.js";

const $=selector=>document.querySelector(selector);
const views={welcome:$("#welcomeView"),scene:$("#sceneView")};
const history=createHistoryRegistry(HISTORY);
const queries=createHistoryQueries(history);
const territory=createTerritoryQueries(TERRITORY);
const validation=validateHistory(HISTORY);
const state=createExperienceState({eras:HISTORY.eras,content:CONTENT});
const temporalTransition=createTemporalTransition({duration:820});
const experienceCamera=createExperienceCamera({state});
const temporalRenderer=createTemporalRenderer($(".scene"));
const world=createExperienceWorld({history,content:CONTENT,territory,temporalRenderer,camera:experienceCamera});
const samePlace=createSamePlaceEngine({history,territory,camera:experienceCamera});
const comparison=createComparisonEngine({samePlace});
const focus=createFocusController({camera:experienceCamera});
samePlace.register("chanar",{title:"San Patricio del Chañar",nodeIds:["territory-chanar"],description:"Ancla conceptual para observar el mismo territorio en distintos momentos."});
const kindLabel={documented:"DOCUMENTADO",testimony:"TESTIMONIO",reconstruction:"RECONSTRUCCIÓN",interpretation:"INTERPRETACIÓN"};
const statusLabel={verified:"VERIFICADO",partial:"PARCIAL",pending:"PENDIENTE"};

function esc(value){return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));}
function currentEra(){const id=state.read().eraId;return id?history.get("eras",id):null;}
function updateProgress(){
  const total=Object.values(CONTENT.points).reduce((sum,points)=>sum+points.length,0);
  const visited=state.read().visited;
  const completed=Math.min(visited.size,total);
  $("#progress").textContent=completed+" / "+total+" huellas";
}
function renderView(){
  const snapshot=state.read();
  Object.entries(views).forEach(([key,view])=>view.hidden=key!==snapshot.view);
  document.body.dataset.view=snapshot.view;
  updateProgress();
}
function renderTimeline(activeId=null){
  const rail=$("#timelineRail");
  rail.innerHTML=history.all("eras").map((era,index)=>'<button class="timeline-stop '+(era.id===activeId?"is-active":"")+'" data-era="'+esc(era.id)+'" aria-current="'+(era.id===activeId?"step":"false")+'"><span>'+esc(era.label)+'</span><small>'+String(index+1).padStart(2,"0")+'</small></button>').join("");
  rail.querySelectorAll("[data-era]").forEach(button=>button.onclick=()=>travel(button.dataset.era));
}
function renderEras(){
  const grid=$("#eraGrid");
  grid.innerHTML=history.all("eras").map((era,index)=>{const meta=CONTENT.scenes[era.id]||{};return '<button class="era-card theme-'+esc(meta.theme||"default")+'" data-era="'+esc(era.id)+'"><span class="era-year">'+esc(era.label)+'</span><span class="era-index">VIAJE '+String(index+1).padStart(2,"0")+'</span><h3>'+esc(era.title)+'</h3><p>'+esc(meta.description||"")+'</p><span class="era-arrow">→</span></button>';}).join("");
  grid.querySelectorAll("[data-era]").forEach(button=>button.onclick=()=>travel(button.dataset.era));
  renderTimeline();
}
function renderTemporalUI(eraId){
  const eras=history.all("eras"),index=eras.findIndex(item=>item.id===eraId),visual=getTemporalState(eraId);
  $("#temporalPhase").textContent=visual.phase.toUpperCase();
  $("#temporalLabel").textContent=visual.label;
  $("#temporalIndex").textContent=String(index+1).padStart(2,"0")+" / "+String(eras.length).padStart(2,"0");
  $("#timeProgress").style.width=((index/(Math.max(1,eras.length-1)))*100)+"%";
  $("#timeStops").innerHTML=eras.map((item,i)=>'<button class="time-stop '+(item.id===eraId?"is-active":"")+'" data-era="'+esc(item.id)+'" data-label="'+esc(item.label)+'" aria-label="Viajar a '+esc(item.label)+'" aria-current="'+(item.id===eraId?"step":"false")+'"></button>').join("");
  $("#timeStops").querySelectorAll("[data-era]").forEach(button=>button.onclick=()=>travel(button.dataset.era));
  temporalRenderer.render(eraId,null,experienceCamera.read());
}
function travel(id){
  const previous=state.read().eraId;
  if(!state.travel(id))return;
  const era=currentEra(),meta=CONTENT.scenes[id]||{};
  $("#scene").dataset.theme=meta.theme||"default";
  $("#sceneDate").textContent=era.label;
  $("#sceneTitle").textContent=era.title;
  $("#scenePlace").textContent="SAN PATRICIO DEL CHAÑAR";
  $("#sceneStatus").textContent=statusLabel[era.status]||String(era.status||"").toUpperCase();
  $("#sceneHint").textContent=discoveryHint(era.id);
  renderTemporalUI(era.id);
  renderPoints();renderTimeline(era.id);updateSceneNavigation();renderView();
  const overlay=document.querySelector(".temporal-transition")||document.createElement("div");
  if(!overlay.parentNode){overlay.className="temporal-transition";$("#scene").appendChild(overlay);}
  if(previous&&previous!==id){
    overlay.classList.add("is-active");
    temporalTransition.play({
      onProgress:t=>temporalRenderer.transition(previous,id,t),
      onComplete:()=>overlay.classList.remove("is-active")
    });
  }else temporalRenderer.render(id);
  window.scrollTo({top:0,behavior:"smooth"});
}
function discoveryHint(eraId){
  const points=CONTENT.points[eraId]||[],visited=state.read().visited;
  const remaining=points.filter(point=>!visited.has(eraId+":"+point.id)).length;
  if(!points.length)return "Esta etapa todavía no tiene huellas cargadas.";
  if(remaining===0)return "Ya recorriste todas las huellas de esta etapa.";
  return remaining===1?"Queda 1 huella por descubrir.":"Quedan "+remaining+" huellas por descubrir.";
}
function updateSceneNavigation(){
  const era=currentEra(),index=era?history.all("eras").findIndex(item=>item.id===era.id):-1,eras=history.all("eras");
  $("#previousEra").disabled=index<=0;$("#nextEra").disabled=index<0||index>=eras.length-1;
  const points=era?CONTENT.points[era.id]||[]:[];const next=points.find(point=>!state.isVisited(era.id,point.id));
  $("#discoverButton").disabled=!next;$("#discoverButton").innerHTML=next?"Descubrir <span>→</span>":"Huellas descubiertas ✓";
}
function renderPoints(){
  const era=currentEra();if(!era)return;
  const points=CONTENT.points[era.id]||[],container=$("#memoryPoints");
  container.innerHTML=points.map(point=>{const seen=state.isVisited(era.id,point.id);return '<button class="memory-point '+(seen?"is-seen":"")+'" style="left:'+point.x+'%;top:'+point.y+'%" data-point="'+esc(point.id)+'" aria-label="Descubrir '+esc(point.title)+'" aria-pressed="'+seen+'"><span>'+esc(point.title)+'</span></button>';}).join("");
  container.querySelectorAll("[data-point]").forEach(button=>button.onclick=()=>discover(button.dataset.point));
  $("#sceneHint").textContent=discoveryHint(era.id);updateSceneNavigation();updateProgress();
}
function resolveEntity(point){const ref=history.getAny(point.entityId);return ref?{...ref.item,__type:ref.type}:null;}
function renderRoute(eraId){
  const routes=routesForEra(eraId);
  if(!routes.length)return "";
  const route=routes[0];
  return '<div class="route-note"><b>Recorrido</b><span>'+esc(route.title)+'</span><small>'+esc(route.steps.join(" → "))+'</small></div>';
}
function renderEntity(entity){
  if(!entity)return "<p>Registro histórico no encontrado.</p>";
  const sources=queries.sourcesFor(entity),related=queries.relatedEntities(entity.__type,entity.id);
  const relatedHtml=related.length?'<div class="related-block"><b>Conectado con</b><div class="chips">'+related.slice(0,6).map(item=>'<span class="chip">'+esc(item.title||item.label)+'</span>').join("")+'</div></div>':"";
  const sourceHtml=sources.length?sources.map(source=>'<li><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(source.title)+'</a></li>').join(""):"<li>Sin fuente vinculada todavía.</li>";
  return '<div class="panel-meta">'+esc(kindLabel[entity.evidence]||"REGISTRO")+' · '+esc(statusLabel[entity.status]||entity.status)+'</div><h3>'+esc(entity.title)+'</h3><p>'+esc(entity.description||"")+'</p>'+relatedHtml+'<div class="source-block"><b>Fuentes</b><ul>'+sourceHtml+'</ul></div>';
}
function discover(pointId){
  const era=currentEra(),point=(CONTENT.points[era?.id]||[]).find(item=>item.id===pointId);if(!era||!point)return;
  state.visit(era.id,point.id);
  if(Number.isFinite(point.x)&&Number.isFinite(point.y))focus.focus(point.x,point.y,1);
  temporalRenderer.render(era.id,null,experienceCamera.read());
  const resolved=resolveEntity(point),panel=$("#discoveryPanel");
  panel.innerHTML=renderEntity(resolved||{title:point.title,evidence:point.kind,status:"pending",description:point.text})+renderRoute(era.id)+'<p class="point-note">'+esc(point.text||"")+'</p><button id="closeDiscovery" class="secondary-button">Seguir</button>';
  state.openPanel("discovery");$("#closeDiscovery").onclick=()=>state.closePanel();renderPoints();panel.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function renderTerritory(){
  const era=currentEra();if(!era)return;
  const summary=territory.summaryForEra(era.id),map=$("#territoryMap");
  $("#territoryDescription").textContent=TERRITORY.description;
  map.innerHTML='<div class="territory-river" aria-hidden="true"></div><div class="territory-hint">ESQUEMA DIDÁCTICO · NO A ESCALA</div>'+summary.connections.map(connection=>{const a=territory.node(connection.from),b=territory.node(connection.to);return '<span class="territory-connection" style="left:'+a.x+'%;top:'+a.y+'%;width:'+Math.hypot(b.x-a.x,b.y-a.y)+'%;transform:rotate('+Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+'deg)" aria-hidden="true"></span>';}).join("")+summary.nodes.map(node=>'<button class="territory-node node-'+esc(node.kind)+'" style="left:'+node.x+'%;top:'+node.y+'%" data-node="'+esc(node.id)+'"><i></i><span>'+esc(node.title)+'</span></button>').join("");
  map.querySelectorAll("[data-node]").forEach(button=>button.onclick=()=>showTerritoryNode(button.dataset.node));
  $("#territoryLegend").innerHTML=TERRITORY.layers.map(layer=>'<span><i class="legend-'+esc(layer.kind)+'"></i>'+esc(layer.label)+'</span>').join("");
  $("#territoryInfo").innerHTML='<p><b>'+summary.count+'</b> referencias territoriales disponibles para '+esc(era.label)+'.</p><p>El esquema muestra relaciones espaciales históricas, no coordenadas geográficas precisas.</p>';
}
function showTerritoryNode(id){
  const node=territory.node(id);if(!node)return;
  const place=history.get("places",node.placeId),layer=TERRITORY.layers.find(item=>item.id===node.layerId);
  $("#territoryInfo").innerHTML='<div class="panel-meta">'+esc(layer?.label||"TERRITORIO")+'</div><h4>'+esc(node.title)+'</h4><p>'+esc(place?.description||"")+'</p><p class="point-note">Referencia espacial esquemática. La ubicación visual no pretende sustituir una cartografía documental.</p>';
}
function openTerritory(){renderTerritory();state.openPanel("territory");$("#territoryPanel").scrollIntoView({behavior:"smooth",block:"nearest"});}
function compare(){
  const era=currentEra();if(!era)return;
  const events=queries.eventsByEra(era.id),evidence=events.length?events.map(event=>event.title).join(" · "):"Sin eventos registrados para esta etapa.";
  $("#discoveryPanel").innerHTML='<div class="panel-meta">COMPARACIÓN PREPARADA</div><h3>'+esc(era.label)+' → HOY</h3><p>Esta etapa contiene '+events.length+' registro(s) en el motor histórico. La comparación visual se activará cuando exista material histórico y actual verificable para el mismo lugar.</p><p class="reference"><b>Huella histórica:</b> '+esc(evidence)+'</p><button id="closeCompare" class="secondary-button">Volver a explorar</button>';
  state.openPanel("compare");$("#closeCompare").onclick=()=>state.closePanel();$("#discoveryPanel").scrollIntoView({behavior:"smooth",block:"nearest"});
}
function renderPanels(){
  const panel=state.read().openPanel;
  $("#territoryPanel").hidden=panel!=="territory";
  $("#discoveryPanel").hidden=!panel||panel==="territory";
  if(panel==="territory")$("#territoryPanel").hidden=false;
}
function openSources(){
  const all=history.all("sources"),pending=queries.researchQueue(),refs=mediaFor("visualReferences");
  $("#sourceContent").innerHTML='<p>PIONERO separa evidencia histórica de reconstrucción visual. Las imágenes de referencia no se presentan como fotografías históricas.</p><div class="source-summary"><span>'+all.length+' fuentes</span><span>'+pending.length+' pendientes</span></div><ul class="source-list">'+all.map(source=>'<li><b>'+esc(source.title)+'</b><small>'+esc(statusLabel[source.status]||source.status)+' · '+esc(source.type)+'</small><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">Abrir fuente →</a></li>').join("")+'</ul><div class="visual-reference-grid">'+refs.map(ref=>'<article class="visual-reference"><img src="'+esc(ref.image)+'" alt="" loading="lazy"><div><b>'+esc(ref.title)+'</b><small>REFERENCIA · '+esc(ref.evidence)+'</small><p>'+esc(ref.use)+'</p><a href="'+esc(ref.url)+'" target="_blank" rel="noopener noreferrer">Ver origen →</a></div></article>').join("")+'</div>';
  $("#modal").hidden=false;$("#closeModal").focus();
}
function closeModal(){$("#modal").hidden=true;}
function goTemporal(delta){const eras=history.all("eras"),era=currentEra(),i=era?eras.findIndex(item=>item.id===era.id):-1;const target=i+delta;if(target>=0&&target<eras.length)travel(eras[target].id);}
function goPrevious(){const eras=history.all("eras"),era=currentEra(),i=era?eras.findIndex(item=>item.id===era.id):-1;if(i>0)travel(eras[i-1].id);}
function goNext(){const eras=history.all("eras"),era=currentEra(),i=era?eras.findIndex(item=>item.id===era.id):-1;if(i>=0&&i<eras.length-1)travel(eras[i+1].id);}
function discoverNext(){const era=currentEra();if(!era)return;const next=(CONTENT.points[era.id]||[]).find(point=>!state.isVisited(era.id,point.id));if(next)discover(next.id);}

$("#startButton").onclick=()=>travel("before-1973");
$("#backToJourney").onclick=()=>state.setView("welcome");
$("#previousEra").onclick=goPrevious;$("#nextEra").onclick=goNext;
$("#timeBack").onclick=()=>goTemporal(-1);$("#timeForward").onclick=()=>goTemporal(1);$("#discoverButton").onclick=discoverNext;
$("#closeTerritory").onclick=()=>state.closePanel();
$("#sourceButton").onclick=openSources;$("#sourceButtonScene").onclick=openSources;$("#closeModal").onclick=closeModal;
$("#modal").onclick=event=>{if(event.target.id==="modal")closeModal();};

document.onkeydown=event=>{
  if(event.key==="Escape"){
    if(!$("#modal").hidden){closeModal();return;}
    if(state.read().openPanel){state.closePanel();return;}
    if(state.read().view==="scene"){state.setView("journey");return;}
    
  }
  if(state.read().view==="scene"&&!state.read().openPanel&&["ArrowLeft","ArrowRight"].includes(event.key)){
    event.preventDefault();event.key==="ArrowLeft"?goPrevious():goNext();
  }
};

const audit=auditPionero({content:CONTENT,history:HISTORY,territory:TERRITORY});
const smokeSuite=createSmokeSuite({history,territory,territoryData:TERRITORY,validation,audit,createState:createExperienceState,content:CONTENT});
if(!validation.valid)console.error("PIONERO HISTORY VALIDATION",validation.issues);
if(!audit.valid)console.error("PIONERO STRUCTURAL AUDIT",audit.issues);
state.subscribe(snapshot=>{renderView();renderPanels();if(snapshot.view==="scene"&&snapshot.eraId){renderTimeline(snapshot.eraId);renderPoints();}});
window.PIONERO={history,queries,territory,validation,audit,state,smoke:smokeSuite,camera:experienceCamera,focus,samePlace,comparison,world,temporal:getTemporalState,version:"0.4.1",ready:false};
renderEras();renderView();renderPanels();
if(state.read().eraId){renderTemporalUI(state.read().eraId);temporalRenderer.render(state.read().eraId);}
window.PIONERO.ready=true;
