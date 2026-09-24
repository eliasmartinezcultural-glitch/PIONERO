const SOURCES = {
  municipal: { name:"Municipalidad de San Patricio del Chañar · Nuestra Identidad", url:"https://www.sanpatricio.gob.ar/identidad", type:"institucional" },
  cfi: { name:"CFI · Estudio territorial de Neuquén", url:"https://cfi.org.ar/uploads/2024/05/Neuquen_114_0.pdf", type:"estudio" },
  carta: { name:"Carta Orgánica Municipal de San Patricio del Chañar", url:"https://infoleg.neuquen.gov.ar/Boletines/bo04021302862a.pdf", type:"normativa" }
};

const EVENTS = [
  {id:"territory",year:"ANTES DE 1968",title:"El territorio antes de la transformación",phase:"TERRITORIO",hint:"Antes de seguir una fecha, entendé el escenario: río, meseta, monte y espacio productivo potencial.",evidence:"reconstruction",tags:["territorio","paisaje"],sources:["cfi"],values:{water:.28,brush:.65,fields:.03,town:.02,roads:.03,barda:.70},points:[{id:"territory",label:"El territorio",x:28,y:55}]},
  {id:"1968",year:"1968",title:"La tierra entra en un proyecto productivo",phase:"TRANSFORMACIÓN",hint:"La escala cambia: comienza un proyecto para sistematizar grandes superficies y llevar agua al territorio.",evidence:"documented",tags:["tierra","producción","pioneros"],sources:["municipal","cfi"],values:{water:.35,brush:.55,fields:.18,town:.03,roads:.08,barda:.68},points:[{id:"gasparri",label:"El proyecto",x:39,y:51}]},
  {id:"1969",year:"1969",title:"El agua modifica el paisaje",phase:"AGUA Y RIEGO",hint:"La obra no es sólo infraestructura: permite que aparezca un nuevo paisaje productivo.",evidence:"documented",tags:["agua","riego","producción"],sources:["municipal","cfi"],values:{water:.65,brush:.35,fields:.50,town:.05,roads:.14,barda:.62},points:[{id:"irrigation",label:"Riego",x:66,y:47}]},
  {id:"1971",year:"1971",title:"El sistema de riego gana escala",phase:"INFRAESTRUCTURA",hint:"La primera bocatoma permite ampliar la superficie bajo riego y avanzar hacia nuevas parcelas.",evidence:"documented",tags:["agua","infraestructura","parcelas"],sources:["municipal"],values:{water:.70,brush:.31,fields:.58,town:.08,roads:.20,barda:.60},points:[{id:"intake",label:"Bocatoma",x:70,y:42},{id:"parcels",label:"Parcelas",x:31,y:65}]},
  {id:"1973",year:"1973",title:"Nace San Patricio del Chañar",phase:"FUNDACIÓN",hint:"El proyecto productivo necesita también un asentamiento y una organización local.",evidence:"documented",tags:["pueblo","fundación","comunidad"],sources:["municipal","cfi"],values:{water:.70,brush:.30,fields:.62,town:.35,roads:.25,barda:.60},points:[{id:"foundation",label:"Fundación",x:53,y:48},{id:"place",label:"El lugar",x:76,y:61}]},
  {id:"1974",year:"1974",title:"La comunidad empieza a organizarse",phase:"ORGANIZACIÓN",hint:"La fundación y el funcionamiento institucional son momentos relacionados, pero no idénticos.",evidence:"documented",tags:["instituciones","comunidad"],sources:["cfi"],values:{water:.72,brush:.27,fields:.66,town:.50,roads:.32,barda:.58},points:[{id:"commission",label:"Instituciones",x:48,y:49}]},
  {id:"1975",year:"1975",title:"Producción, escuela y comunidad",phase:"COMUNIDAD",hint:"El territorio deja de ser sólo un proyecto productivo: aparecen redes de vida cotidiana.",evidence:"partial",tags:["producción","educación","comunidad"],sources:["cfi"],values:{water:.74,brush:.24,fields:.76,town:.60,roads:.40,barda:.55},points:[{id:"fruit",label:"Producción",x:34,y:54},{id:"school",label:"Escuela",x:69,y:48}]},
  {id:"today",year:"HOY",title:"Un territorio con muchas capas",phase:"PUNTO DE LLEGADA",hint:"El presente no reemplaza las capas anteriores: las contiene.",evidence:"interpretation",tags:["presente","territorio","identidad"],sources:["municipal","cfi","carta"],values:{water:.80,brush:.18,fields:.90,town:.92,roads:.85,barda:.50},points:[{id:"today",label:"Hoy",x:66,y:53}]}
];

const DISCOVERIES = {
  territory:{title:"El territorio",text:"Esta escena es una reconstrucción didáctica. PIONERO separa deliberadamente lo reconstruido de una fotografía o de una ubicación histórica exacta.",type:"reconstruction",layer:"territory",sources:["cfi"]},
  gasparri:{title:"El proyecto de 1968",text:"La Municipalidad registra que entre abril y mayo de 1968 se adquirieron 20.000 hectáreas de monte bruto con el objetivo de sistematizarlas y obtener agua mediante obras sobre el río Neuquén.",type:"documented",layer:"production",sources:["municipal","cfi"]},
  irrigation:{title:"El agua",text:"En 1969 comenzaron obras de sistematización y se regaron los primeros cultivos mediante bombeo desde el río Neuquén. El agua funciona aquí como una pieza central del cambio territorial.",type:"documented",layer:"water",sources:["municipal","cfi"]},
  intake:{title:"La primera bocatoma",text:"La fuente municipal sitúa en 1971 la construcción de la primera bocatoma, asociada a la ampliación de la superficie bajo riego.",type:"documented",layer:"water",sources:["municipal"]},
  parcels:{title:"Las parcelas",text:"La transformación productiva también modifica la forma de ocupar el suelo: aparecen parcelas, caminos y una nueva relación entre producción y territorio.",type:"documented",layer:"production",sources:["municipal","cfi"]},
  foundation:{title:"La fundación",text:"El CFI identifica el 21 de mayo de 1973 como fecha de fundación mediante el Decreto Provincial N.º 1339, momento en que se creó la Comisión de Fomento.",type:"documented",layer:"community",sources:["cfi"]},
  place:{title:"El lugar",text:"El punto funciona como ancla narrativa. La posición visual no pretende fijar una coordenada histórica que la fuente no documenta.",type:"documented",layer:"territory",sources:["cfi"]},
  commission:{title:"La organización institucional",text:"La documentación histórica distingue la fundación de 1973 del funcionamiento de la primera Comisión de Fomento en 1974. Esa diferencia queda incorporada al sistema.",type:"documented",layer:"community",sources:["cfi"]},
  fruit:{title:"La producción",text:"El paisaje productivo es una de las claves para comprender el crecimiento de la localidad. PIONERO lo trata como proceso y no como simple decorado.",type:"documented",layer:"production",sources:["cfi"]},
  school:{title:"La comunidad",text:"La educación aparece como una de las capas que convierten un proyecto productivo en una comunidad. Esta entrada queda marcada como parcial hasta incorporar documentación específica.",type:"partial",layer:"community",sources:["cfi"]},
  today:{title:"El presente",text:"El presente se considera una capa interpretativa que deberá crecer con fotografías, testimonios, mapas y registros contemporáneos verificables.",type:"interpretation",layer:"identity",sources:["municipal","cfi","carta"]}
};

const LAYERS={territory:"Territorio",water:"Agua",production:"Producción",community:"Comunidad",identity:"Identidad"};
const state={eventIndex:0,discovered:new Set(),history:[]};
const $=selector=>document.querySelector(selector);

function evidenceLabel(type){return ({documented:"DOCUMENTADO",partial:"PARCIAL",reconstruction:"RECONSTRUCCIÓN",interpretation:"INTERPRETACIÓN"})[type]||type.toUpperCase();}
function currentEvent(){return EVENTS[state.eventIndex];}

function render(){
  const event=currentEvent();
  $("#year").textContent=event.year;
  $("#title").textContent=event.title;
  $("#hint").textContent=event.hint;
  $("#phase").textContent=event.phase;
  $("#status").textContent=evidenceLabel(event.evidence);
  $("#counter").textContent=`${String(state.eventIndex+1).padStart(2,"0")} / ${EVENTS.length}`;
  $("#progress").style.width=`${(state.eventIndex/(EVENTS.length-1))*100}%`;
  for(const key of ["water","brush","fields","town","roads","barda"]) $("#world").style.setProperty("--"+key,event.values[key]);
  $("#points").innerHTML=event.points.map(point=>`<div class="point ${state.discovered.has(point.id)?"visited":""}" style="left:${point.x}%;top:${point.y}%"><button data-id="${point.id}" aria-label="Descubrir ${point.label}" aria-pressed="${state.discovered.has(point.id)}">+</button><label>${point.label}</label></div>`).join("");
  $("#eventTags").innerHTML=event.tags.map(tag=>`<span>${tag}</span>`).join("");
  $("#knowledge").textContent=`${state.discovered.size} / ${Object.keys(DISCOVERIES).length} huellas`;
  $("#discovery").hidden=true;
  $("#prev").disabled=state.eventIndex===0;
  $("#next").disabled=state.eventIndex===EVENTS.length-1;
}

function travel(nextIndex){
  const bounded=Math.max(0,Math.min(EVENTS.length-1,nextIndex));
  if(bounded===state.eventIndex)return;
  state.history.push({from:EVENTS[state.eventIndex].id,to:EVENTS[bounded].id,at:Date.now()});
  state.eventIndex=bounded;
  render();
  $("#world").focus({preventScroll:true});
}

function discover(id){
  const discovery=DISCOVERIES[id];
  if(!discovery)return;
  state.discovered.add(id);
  const sourceNames=discovery.sources.map(id=>SOURCES[id]?.name).filter(Boolean);
  $("#discovery").innerHTML=`<div class="discovery-head"><div><span class="tag">${evidenceLabel(discovery.type)}</span><h3>${discovery.title}</h3></div><span class="layer">${LAYERS[discovery.layer]||discovery.layer}</span></div><p>${discovery.text}</p><small>Fuentes: ${sourceNames.join(" · ")}</small>`;
  render();
  $("#discovery").hidden=false;
}

function openSources(){
  $("#sourceList").innerHTML=Object.entries(SOURCES).map(([id,source])=>`<article><b>${source.name}</b><small>${source.type.toUpperCase()}</small><a href="${source.url}" target="_blank" rel="noopener">Abrir fuente</a></article>`).join("")+`<article><b>Regla histórica de PIONERO</b><p>Una reconstrucción visual nunca se presenta como fotografía histórica. Una afirmación sin respaldo suficiente queda marcada como parcial o interpretativa.</p></article>`;
  $("#modal").showModal();
}

function startJourney(){
  $("#home").hidden=true;
  $("#journey").hidden=false;
  state.eventIndex=0;
  render();
  $("#world").focus();
}

$("#start").onclick=startJourney;
$("#homeBtn").onclick=()=>{$("#journey").hidden=true;$("#home").hidden=false;};
$("#prev").onclick=()=>travel(state.eventIndex-1);
$("#next").onclick=()=>travel(state.eventIndex+1);
$("#sources").onclick=openSources;
$("#source2").onclick=openSources;
$("#close").onclick=()=>$("#modal").close();
$("#points").onclick=event=>{const button=event.target.closest("button[data-id]");if(button)discover(button.dataset.id);};
document.addEventListener("keydown",event=>{if($("#journey").hidden)return;if(event.key==="ArrowRight")travel(state.eventIndex+1);if(event.key==="ArrowLeft")travel(state.eventIndex-1);if(event.key==="Escape"&&$("#modal").open)$("#modal").close();});
render();
