import {CONTENT} from "./content.js";
import {HISTORY} from "./history/model.js";
import {createHistoryRegistry} from "./history/registry.js";
import {validateHistory} from "./history/validate.js";

const $=s=>document.querySelector(s);
const views={welcome:$("#welcomeView"),journey:$("#journeyView"),scene:$("#sceneView")};
const KEY="pionero.progress.v1";
let currentEra=null;
let visited=new Set(JSON.parse(localStorage.getItem(KEY)||"[]"));
const history=createHistoryRegistry(HISTORY);
const validation=validateHistory(HISTORY);
const kindLabel={documented:"DOCUMENTADO",testimony:"TESTIMONIO",reconstruction:"RECONSTRUCCIÓN",interpretation:"INTERPRETACIÓN"};
function save(){localStorage.setItem(KEY,JSON.stringify([...visited]));updateProgress()}
function updateProgress(){const total=CONTENT.eras.reduce((n,e)=>n+e.points.length,0);const done=visited.size;const el=$("#progress");if(el)el.textContent=done+" / "+total+" descubrimientos"}
function show(name){Object.entries(views).forEach(([k,v])=>v.hidden=k!==name);$("#experience").focus({preventScroll:true});window.scrollTo({top:0,behavior:"smooth"})}
function renderEras(){const g=$("#eraGrid");g.innerHTML=CONTENT.eras.map((e,i)=>'<button class="era-card theme-'+e.theme+'" data-era="'+e.id+'"><span class="era-year">'+e.yearLabel+'</span><span class="era-index">VIAJE '+String(i+1).padStart(2,"0")+'</span><h3>'+e.title+'</h3><p>'+e.description+'</p><span class="era-arrow">→</span></button>').join("");g.querySelectorAll("[data-era]").forEach(b=>b.onclick=()=>travel(b.dataset.era));updateProgress()}
function travel(id){currentEra=CONTENT.eras.find(e=>e.id===id);if(!currentEra)return;$("#scene").dataset.theme=currentEra.theme;$("#sceneDate").textContent=currentEra.yearLabel;$("#sceneTitle").textContent=currentEra.title;$("#scenePlace").textContent="SAN PATRICIO DEL CHAÑAR";$("#sceneStatus").textContent=currentEra.status;$("#sceneHint").textContent=currentEra.points.length===1?"Hay algo para descubrir.":"Hay "+currentEra.points.length+" lugares para descubrir.";renderPoints();$("#discoveryPanel").hidden=true;show("scene")}
function renderPoints(){const w=$("#memoryPoints");w.innerHTML=currentEra.points.map(p=>'<button class="memory-point '+(visited.has(currentEra.id+":"+p.id)?"is-seen":"")+'" style="left:'+p.x+'%;top:'+p.y+'%" data-point="'+p.id+'" aria-label="Descubrir '+p.title+'"><span>'+p.title+"</span></button>").join("");w.querySelectorAll("[data-point]").forEach(b=>b.onclick=()=>discover(b.dataset.point))}
function discover(id){const p=currentEra?.points.find(x=>x.id===id);if(!p)return;visited.add(currentEra.id+":"+p.id);save();const label=kindLabel[p.kind]||"REGISTRO";$("#discoveryPanel").innerHTML='<div class="panel-meta">'+label+'</div><h3>'+p.title+'</h3><p>'+p.text+'</p><p class="reference"><b>Referencia:</b> '+p.source+'</p><button id="closeDiscovery" class="secondary-button">Seguir explorando</button>';$("#discoveryPanel").hidden=false;$("#closeDiscovery").onclick=()=>$("#discoveryPanel").hidden=true;$("#discoveryPanel").scrollIntoView({behavior:"smooth",block:"nearest"});renderPoints()}
function compare(){if(!currentEra)return;$("#discoveryPanel").innerHTML='<div class="panel-meta">COMPARACIÓN PREPARADA</div><h3>'+currentEra.yearLabel+" → HOY</h3><p>El sistema histórico ya puede identificar entidades y relaciones. La comparación visual se activará cuando exista material histórico y actual verificable para el mismo lugar.</p><button id="closeCompare" class="secondary-button">Volver a explorar</button>";$("#discoveryPanel").hidden=false;$("#closeCompare").onclick=()=>$("#discoveryPanel").hidden=true}
function openModal(){$("#modal").hidden=false;$("#closeModal").focus()}function closeModal(){$("#modal").hidden=true}
$("#startButton").onclick=()=>show("journey");$("#backToJourney").onclick=()=>show("journey");$("#discoverButton").onclick=()=>currentEra?.points[0]&&discover(currentEra.points[0].id);$("#compareButton").onclick=compare;$("#sourceButton").onclick=openModal;$("#sourceButtonScene").onclick=openModal;$("#closeModal").onclick=closeModal;$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal()};document.onkeydown=e=>{if(e.key==="Escape"){if(!$("#modal").hidden)closeModal();else if(!views.scene.hidden)show("journey")}};

if(!validation.valid)console.error("PIONERO HISTORY VALIDATION",validation.issues);
window.PIONERO={history,validation,version:"0.3.0"};
renderEras();
