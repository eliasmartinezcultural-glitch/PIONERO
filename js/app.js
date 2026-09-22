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

function save(){localStorage.setItem(KEY,JSON.stringify([...visited]));updateProgress();}
function updateProgress(){
  const total=Object.values(CONTENT.points).reduce((sum,points)=>sum+points.length,0);
  $("#progress").textContent=visited.size+" / "+total+" descubrimientos";
}
function show(name){
  Object.entries(views).forEach(([key,view])=>view.hidden=key!==name);
  $("#experience").focus({preventScroll:true});
  window.scrollTo({top:0,behavior:"smooth"});
}
function renderEras(){
  const grid=$("#eraGrid");
  grid.innerHTML=history.all("eras").map((era,index)=>{
    const meta=CONTENT.scenes[era.id]||{};
    return '<button class="era-card theme-'+(meta.theme||"default")+'" data-era="'+era.id+'">'+
      '<span class="era-year">'+era.label+'</span>'+
      '<span class="era-index">VIAJE '+String(index+1).padStart(2,"0")+'</span>'+
      '<h3>'+era.title+'</h3>'+
      '<p>'+meta.description+'</p><span class="era-arrow">→</span></button>';
  }).join("");
  grid.querySelectorAll("[data-era]").forEach(button=>button.onclick=()=>travel(button.dataset.era));
  updateProgress();
}
function travel(id){
  const era=history.get("eras",id);
  const meta=CONTENT.scenes[id]||{};
  if(!era)return;
  currentEra=era;
  $("#scene").dataset.theme=meta.theme||"default";
  $("#sceneDate").textContent=era.label;
  $("#sceneTitle").textContent=era.title;
  $("#scenePlace").textContent="SAN PATRICIO DEL CHAÑAR";
  $("#sceneStatus").textContent=era.status.toUpperCase();
  const points=CONTENT.points[id]||[];
  $("#sceneHint").textContent=points.length===1?"Hay algo para descubrir.":"Hay "+points.length+" huellas para descubrir.";
  renderPoints();
  $("#discoveryPanel").hidden=true;
  show("scene");
}
function renderPoints(){
  const points=CONTENT.points[currentEra.id]||[];
  const container=$("#memoryPoints");
  container.innerHTML=points.map(point=>{
    const seen=visited.has(currentEra.id+":"+point.id);
    return '<button class="memory-point '+(seen?"is-seen":"")+'" style="left:'+point.x+'%;top:'+point.y+'%" data-point="'+point.id+'" aria-label="Descubrir '+point.title+'"><span>'+point.title+'</span></button>';
  }).join("");
  container.querySelectorAll("[data-point]").forEach(button=>button.onclick=()=>discover(button.dataset.point));
}
function discover(pointId){
  const point=(CONTENT.points[currentEra.id]||[]).find(item=>item.id===pointId);
  if(!point)return;
  visited.add(currentEra.id+":"+point.id);
  save();

  const resolved=history.getAny(point.entityId)?.item||null;
  const sources=queries.sourcesFor(resolved);
  const label=kindLabel[point.kind]||kindLabel[resolved?.evidence]||"REGISTRO";
  const title=resolved?.title||point.title;
  const description=point.text||"Registro histórico incorporado al motor de PIONERO.";
  const references=sources.length
    ?sources.map(source=>'<li><a href="'+source.url+'" target="_blank" rel="noopener noreferrer">'+source.title+'</a></li>').join("")
    :"<li>Investigación PIONERO pendiente de documentación adicional.</li>";

  $("#discoveryPanel").innerHTML='<div class="panel-meta">'+label+'</div><h3>'+title+'</h3><p>'+description+'</p>'+
    '<p class="reference"><b>Estado:</b> '+(resolved?.status||"pending").toUpperCase()+'</p>'+
    '<p class="reference"><b>Fuentes</b></p><ul>'+references+'</ul>'+
    '<button id="closeDiscovery" class="secondary-button">Seguir explorando</button>';
  $("#discoveryPanel").hidden=false;
  $("#closeDiscovery").onclick=()=>$("#discoveryPanel").hidden=true;
  $("#discoveryPanel").scrollIntoView({behavior:"smooth",block:"nearest"});
  renderPoints();
}
function compare(){
  if(!currentEra)return;
  const events=queries.eventsByEra(currentEra.id);
  const evidence=events.length?events.map(event=>event.title).join(" · "):"Sin eventos registrados para esta etapa.";
  $("#discoveryPanel").innerHTML='<div class="panel-meta">COMPARACIÓN PREPARADA</div><h3>'+currentEra.label+' → HOY</h3>'+
    '<p>Esta etapa contiene '+events.length+' registro(s) en el motor histórico. La comparación visual se activará cuando exista material histórico y actual verificable para el mismo lugar.</p>'+
    '<p class="reference"><b>Huella histórica:</b> '+evidence+'</p>'+
    '<button id="closeCompare" class="secondary-button">Volver a explorar</button>';
  $("#discoveryPanel").hidden=false;
  $("#closeCompare").onclick=()=>$("#discoveryPanel").hidden=true;
}
function openModal(){$("#modal").hidden=false;$("#closeModal").focus();}
function closeModal(){$("#modal").hidden=true;}

$("#startButton").onclick=()=>show("journey");
$("#backToJourney").onclick=()=>show("journey");
$("#discoverButton").onclick=()=>currentEra&&CONTENT.points[currentEra.id]?.[0]&&discover(CONTENT.points[currentEra.id][0].id);
$("#compareButton").onclick=compare;
$("#sourceButton").onclick=openModal;
$("#sourceButtonScene").onclick=openModal;
$("#closeModal").onclick=closeModal;
$("#modal").onclick=event=>{if(event.target.id==="modal")closeModal();};
document.onkeydown=event=>{
  if(event.key==="Escape"){
    if(!$("#modal").hidden)closeModal();
    else if(!views.scene.hidden)show("journey");
  }
};

if(!validation.valid)console.error("PIONERO HISTORY VALIDATION",validation.issues);
window.PIONERO={history,queries,validation,version:"0.3.0"};
renderEras();
