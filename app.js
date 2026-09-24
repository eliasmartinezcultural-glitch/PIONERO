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

/*
  RELACIONES = el segundo motor de PIONERO.
  No inventan hechos nuevos: conectan huellas documentadas para que el jugador
  pueda construir una explicación y ver qué evidencia todavía falta.
*/
const RELATIONS = [
  {
    id:"water-production",
    title:"¿Qué cambió primero: el agua o la producción?",
    text:"Relacioná el proyecto de transformación con las obras que hicieron posible el riego.",
    requires:["gasparri","irrigation","intake"],
    nodes:["Proyecto 1968","Riego 1969","Bocatoma 1971"],
    options:[
      {label:"El riego es una consecuencia del proyecto de transformación.",correct:true,consequence:"Conectaste proyecto → agua → escala. La relación queda incorporada al mapa."},
      {label:"La producción apareció sin depender de las obras de agua.",correct:false,consequence:"La pista queda abierta: revisá las huellas de 1968, 1969 y 1971 antes de cerrar la relación."}
    ]
  },
  {
    id:"production-town",
    title:"¿Por qué aparece el pueblo?",
    text:"Ahora conectá infraestructura, producción y asentamiento sin confundirlos.",
    requires:["intake","parcels","foundation"],
    nodes:["Bocatoma 1971","Parcelas","Fundación 1973"],
    options:[
      {label:"El nuevo sistema productivo necesitó también un espacio de asentamiento y organización.",correct:true,consequence:"Conectaste infraestructura → producción → asentamiento. Es una hipótesis de lectura apoyada por las fuentes."},
      {label:"La fundación no tiene relación con la transformación territorial.",correct:false,consequence:"La relación no queda demostrada por las huellas disponibles. Volvé a la secuencia y buscá la evidencia."}
    ]
  },
  {
    id:"town-community",
    title:"¿Cuándo una transformación se vuelve comunidad?",
    text:"La última relación exige distinguir fundación, instituciones y vida cotidiana.",
    requires:["foundation","commission","school"],
    nodes:["Fundación 1973","Comisión de Fomento","Comunidad"],
    options:[
      {label:"La fundación es un momento; la organización y la vida comunitaria son capas posteriores.",correct:true,consequence:"Separaste fundación → organización → comunidad. La distinción queda registrada."},
      {label:"Fundación, instituciones y comunidad son exactamente el mismo momento.",correct:false,consequence:"La evidencia disponible marca momentos distintos. La pista sigue abierta."}
    ]
  }
];

const EVIDENCE_PIECES = {
  irrigationDocument:{title:"Registro de obra",type:"documento",text:"Pieza documental sobre el inicio de las obras de sistematización y riego.",supports:["irrigation"],source:"municipal"},
  intakeRecord:{title:"Registro de bocatoma",type:"documento",text:"Pieza documental asociada a la primera bocatoma y a la ampliación del área bajo riego.",supports:["intake"],source:"municipal"},
  territoryMap:{title:"Mapa del territorio",type:"mapa",text:"Mapa didáctico: sirve para ubicar relaciones espaciales sin afirmar coordenadas históricas que no estén documentadas.",supports:["territory","place"],source:"cfi"},
  foundationRecord:{title:"Acta de fundación",type:"documento",text:"Pieza documental sobre el Decreto Provincial N.º 1339 y la creación de la Comisión de Fomento.",supports:["foundation"],source:"cfi"},
  parcelPlan:{title:"Plano de parcelas",type:"mapa",text:"Pieza de investigación sobre la nueva ocupación productiva del suelo.",supports:["parcels"],source:"municipal"},
  communityRecord:{title:"Registro comunitario",type:"documento",text:"Pieza pendiente de ampliar con documentación específica sobre educación y vida cotidiana.",supports:["school"],source:"cfi"},
  presentPhoto:{title:"Fotografía contemporánea",type:"fotografía",text:"Espacio reservado para una fotografía verificable del territorio actual.",supports:["today"],source:"municipal"}
};
const CLUE_CHAINS = [
  {id:"chain-water",title:"La ruta del agua",description:"Seguí cómo una decisión sobre la tierra termina convirtiéndose en infraestructura.",steps:[{piece:"territoryMap",label:"Ubicación",requires:[]},{piece:"irrigationDocument",label:"Primeros riegos",requires:["territoryMap"]},{piece:"intakeRecord",label:"Bocatoma",requires:["irrigationDocument"]}]},
  {id:"chain-town",title:"Del campo al pueblo",description:"Reconstruí la relación entre producción, parcelas y fundación.",steps:[{piece:"parcelPlan",label:"Parcelas",requires:["intakeRecord"]},{piece:"foundationRecord",label:"Fundación",requires:["parcelPlan"]},{piece:"communityRecord",label:"Vida comunitaria",requires:["foundationRecord"]}]},
  {id:"chain-community",title:"Cuando aparece la comunidad",description:"Llevá la investigación hasta el presente sin confundir evidencia histórica con registro contemporáneo.",steps:[{piece:"presentPhoto",label:"Territorio actual",requires:["communityRecord"]}]}
];
const stateExtra={pieces:new Set()};

const VISUAL_ARCHIVE = [
  {
    id:"arrival-sign", title:"Ingreso a San Patricio del Chañar", type:"fotografía",
    image:"https://commons.wikimedia.org/wiki/Special:FilePath/San%20Patricio%20del%20Chañar.png",
    caption:"Cartel de ingreso a la localidad, fotografía de 2021.",
    sourceName:"Wikimedia Commons · archivo de Cartago TV", sourceUrl:"https://commons.wikimedia.org/wiki/File:San_Patricio_del_Chañar.png",
    sourceNote:"Licencia indicada en Wikimedia Commons: CC BY 3.0."
  },
  {
    id:"identity-source", title:"La identidad del territorio", type:"fuente institucional",
    image:"https://www.sanpatricio.gob.ar/identidad",
    caption:"Archivo institucional sobre la historia e identidad de San Patricio del Chañar.",
    sourceName:"Municipalidad de San Patricio del Chañar", sourceUrl:"https://www.sanpatricio.gob.ar/identidad",
    sourceNote:"La imagen se presenta como acceso al archivo institucional, no como fotografía histórica."
  },
  {
    id:"territory-study", title:"Mapa y territorio", type:"documentación",
    image:"https://commons.wikimedia.org/wiki/Special:FilePath/Departamento%20A%C3%B1elo%20%28Neuqu%C3%A9n%20-%20Argentina%29.png",
    caption:"Referencia cartográfica del departamento Añelo para contextualizar el territorio.",
    sourceName:"Wikimedia Commons", sourceUrl:"https://commons.wikimedia.org/wiki/Category:A%C3%B1elo_Department",
    sourceNote:"Mapa contextual: no representa por sí solo los límites históricos de las parcelas de Chañar."
  }
];

const HISTORICAL_LAYERS = [
  {year:"1913", title:"Tratayen y el río", text:"Una mensura del ingeniero Tressens registra la colonia Tratayen, un núcleo urbano que habría alcanzado unas 20 manzanas. La fuente municipal señala que presumiblemente desapareció tras una gran crecida del río Neuquén.", evidence:"documented", sources:["municipal"], image:"https://www.sanpatricio.gob.ar/identidad"},
  {year:"1966", title:"La primera subdivisión moderna", text:"La documentación municipal registra que un grupo de vecinos de Cinco Saltos adquirió El Chañar y llegó a subdividir el campo, sin avanzar más allá por razones económicas según la reseña institucional.", evidence:"documented", sources:["municipal"], image:"https://www.sanpatricio.gob.ar/identidad"},
  {year:"1968", title:"20.000 hectáreas y un proyecto", text:"Entre abril y mayo de 1968, la Municipalidad registra la adquisición de 20.000 hectáreas de monte bruto para sistematizarlas, con estudios que identificaron una superficie potencialmente regable.", evidence:"documented", sources:["municipal","cfi"]},
  {year:"1969", title:"El agua empieza a entrar al proyecto", text:"Comenzaron las obras de sistematización y los primeros cultivos fueron regados mediante bombeo desde el río Neuquén. La fuente municipal menciona tres bombas de 1.000.000 litros por hora.", evidence:"documented", sources:["municipal"]},
  {year:"1971", title:"La primera bocatoma", text:"La primera bocatoma permitió avanzar sobre una primera etapa de riego y vender parcelas plantadas. La fuente municipal sitúa aquí un cambio de escala del proyecto.", evidence:"documented", sources:["municipal"]},
  {year:"1973", title:"Nace la localidad", text:"El 21 de mayo de 1973 se creó la Comisión de Fomento mediante el Decreto Provincial N.º 1339, fecha reconocida como fundación de San Patricio del Chañar.", evidence:"documented", sources:["cfi","municipal"]},
  {year:"1974", title:"Instituciones y riego", text:"La reseña provincial ubica el funcionamiento de las autoridades de la Comisión de Fomento el 8 de abril de 1974 y la creación del consorcio de riego durante esa ceremonia.", evidence:"documented", sources:["neuquen"]},
  {year:"1975", title:"Fruta y vida comunitaria", text:"La Provincia señala que en 1975 se produjeron las primeras cantidades industriales de fruta y se fundaron la cooperadora escolar y el Club Atlético San Patricio.", evidence:"documented", sources:["neuquen"]},
  {year:"1976", title:"El Club Atlético San Patricio", text:"Una publicación local de 2026 ubica en 1976 la fundación del Club Atlético San Patricio y lo vincula con peones rurales, primeros pobladores, docentes, comerciantes y funcionarios.", evidence:"partial", sources:["chanar"]},
  {year:"1978", title:"Municipalidad de tercera categoría", text:"La Provincia registra que por Ley N.º 1.106, en 1978, la localidad pasó a ser municipalidad de tercera categoría.", evidence:"documented", sources:["neuquen"]},
  {year:"1987", title:"Nuevo rango municipal", text:"La reseña provincial registra que en 1987, por Ley N.º 1.700, San Patricio del Chañar obtuvo el rango de municipio de segunda categoría.", evidence:"documented", sources:["neuquen"]},
  {year:"1999", title:"Aparece una nueva capa productiva", text:"El estudio territorial del CFI recoge que en 1999 Julio Viola, fundador de Bodega del Fin del Mundo, identificó potencial vitivinícola en el desierto patagónico. Es una capa posterior de la historia productiva.", evidence:"documented", sources:["cfi"]},
  {year:"HOY", title:"Una localidad de capas superpuestas", text:"La localidad combina la memoria del territorio, agricultura, instituciones, educación, producción vitivinícola y transformaciones contemporáneas. Esta capa debe seguir creciendo con registros locales verificables.", evidence:"interpretation", sources:["municipal","cfi"]}
];

const PEOPLE_AND_VOICES = [
  {id:"roberto-gasparri", name:"Roberto Gasparri", role:"ingeniero y figura central del proyecto productivo", status:"documented", text:"Las fuentes provinciales y territoriales lo vinculan con la adquisición de las tierras en 1968 y con la transformación productiva que precedió a la fundación de la localidad.", sources:["cfi","neuquen"]},
  {id:"tressens", name:"Ing. Tressens", role:"autor de una mensura hacia 1913", status:"documented", text:"La fuente municipal lo identifica como autor de una mensura relacionada con la colonia Tratayen. PIONERO conserva el dato como pieza histórica, sin agregar una biografía no documentada.", sources:["municipal"]},
  {id:"julio-viola", name:"Julio Viola", role:"pionero de la vitivinicultura local", status:"documented", text:"El estudio territorial del CFI lo identifica como fundador de Bodega del Fin del Mundo y ubica en 1999 su lectura del potencial vitivinícola de la zona.", sources:["cfi"]},
  {id:"testimonios", name:"Testimonios de vecinos", role:"archivo oral pendiente", status:"pending", text:"No se inventarán testimonios. Esta ficha quedará bloqueada hasta incorporar entrevistas reales, con nombre, fecha, lugar y autorización de uso.", sources:[]}
];

const EXTRA_SOURCES = {
  neuquen:{name:"Neuquén Informa · reseñas históricas",url:"https://www.neuqueninforma.gob.ar/noticias/2014/05/22/48785-jorge-sapag-asistira-al-41-aniversario-de-san-patricio-del-chanar",type:"institucional"},
  chanar:{name:"Chañar Digital · 50 años del Club Atlético San Patricio",url:"https://chanardigital.com.ar/articulo/2026/05/club-atletico-san-patricio-50-anos-de-historia-identidad-y-pasion.php",type:"prensa local"}
};
Object.assign(SOURCES,EXTRA_SOURCES);

function renderArchive(){
  const root=$("#archive"); if(!root)return;
  root.innerHTML = `
    <div class="archive-head"><div><p class="kicker">ARCHIVO VISUAL Y DOCUMENTAL</p><h3>Chañar también se investiga mirando.</h3></div><b>${VISUAL_ARCHIVE.length} piezas visuales</b></div>
    <p class="relations-copy">Las imágenes no son decoración. Cada una tiene procedencia, fecha o función documental. Cuando no existe una fotografía histórica verificable, PIONERO lo declara.</p>
    <div class="archive-grid">${VISUAL_ARCHIVE.map(v=>`
      <article class="archive-card">
        <div class="archive-media">${v.image.startsWith("http") && v.image.includes("Special:FilePath") ? `<img src="${v.image}" alt="${v.title}" loading="lazy">` : `<div class="archive-placeholder"><span>ARCHIVO</span><strong>${v.title}</strong><small>Ver fuente</small></div>`}</div>
        <div class="archive-body"><span class="tag">${v.type}</span><h4>${v.title}</h4><p>${v.caption}</p><a href="${v.sourceUrl}" target="_blank" rel="noopener">Abrir fuente →</a><small>${v.sourceNote}</small></div>
      </article>`).join("")}</div>`;
}

function renderHistoricalLayers(){
  const root=$("#layers"); if(!root)return;
  root.innerHTML = `
    <div class="archive-head"><div><p class="kicker">CAPAS DE HISTORIA</p><h3>No empieza en 1968 y no termina en 1973.</h3></div><b>${HISTORICAL_LAYERS.length} momentos</b></div>
    <div class="history-grid">${HISTORICAL_LAYERS.map((x,i)=>`
      <article class="history-card"><span class="history-year">${x.year}</span><h4>${x.title}</h4><p>${x.text}</p><div class="history-foot"><span>${evidenceLabel(x.evidence)}</span><span>${x.sources.map(s=>SOURCES[s]?.name||s).join(" · ")}</span></div>${x.image?`<a href="${x.image}" target="_blank" rel="noopener">Consultar archivo →</a>`:""}</article>`).join("")}</div>`;
}

function renderPeople(){
  const root=$("#people"); if(!root)return;
  root.innerHTML = `
    <div class="archive-head"><div><p class="kicker">PERSONAS Y VOCES</p><h3>La historia necesita nombres, no personajes inventados.</h3></div></div>
    <div class="people-grid">${PEOPLE_AND_VOICES.map(p=>`
      <article class="person-card ${p.status==="pending"?"pending":""}"><div class="person-mark">${p.status==="pending"?"?":"•"}</div><div><span class="tag">${p.status==="pending"?"PENDIENTE":"FUENTE DOCUMENTAL"}</span><h4>${p.name}</h4><strong>${p.role}</strong><p>${p.text}</p><small>${p.sources.map(s=>SOURCES[s]?.name||s).join(" · ")||"Sin testimonio incorporado todavía."}</small></div></article>`).join("")}</div>`;
}

function pieceUnlocked(id){const p=EVIDENCE_PIECES[id];return !!p&&p.supports.some(h=>state.discovered.has(h));}
function chainStepUnlocked(step){return step.requires.every(id=>stateExtra.pieces.has(id));}
function renderChains(){
  const html=CLUE_CHAINS.map(chain=>{
    const done=chain.steps.filter(s=>stateExtra.pieces.has(s.piece)).length;
    const steps=chain.steps.map((s,i)=>{const unlocked=chainStepUnlocked(s),found=stateExtra.pieces.has(s.piece);return "<button class=\"chain-step "+(found?"found ":"")+(unlocked?"":"locked")+" \" data-piece=\""+s.piece+"\"><span>0"+(i+1)+"</span><strong>"+s.label+"</strong><small>"+(found?"EVIDENCIA REUNIDA":unlocked?"INVESTIGAR →":"PISTA BLOQUEADA")+"</small></button>";}).join("");
    return "<article class=\"chain-card\"><div class=\"chain-top\"><div><p class=\"kicker\">CADENA DE PISTAS</p><h3>"+chain.title+"</h3></div><b>"+done+"/"+chain.steps.length+"</b></div><p>"+chain.description+"</p><div class=\"chain-steps\">"+steps+"</div></article>";
  }).join("");
  $("#chains").innerHTML="<div class=\"relations-head\"><div><p class=\"kicker\">RED DE INVESTIGACIÓN</p><h3>Una evidencia puede abrir otra.</h3></div><b>"+stateExtra.pieces.size+" piezas</b></div><p class=\"relations-copy\">Documentos, mapas y fotografías funcionan como piezas distintas. El sistema sólo las desbloquea cuando existe una huella que las sostiene.</p><div class=\"chain-list\">"+html+"</div>";
}
function openPiece(id){
  const p=EVIDENCE_PIECES[id];
  const chainUnlocked=CLUE_CHAINS.some(c=>c.steps.some(s=>s.piece===id&&chainStepUnlocked(s)));
  if(!p||!pieceUnlocked(id)||(!chainUnlocked&&!stateExtra.pieces.has(id)))return;stateExtra.pieces.add(id);const source=SOURCES[p.source];
  $("#evidence").innerHTML="<div class=\"decision-top\"><span class=\"tag\">"+p.type.toUpperCase()+"</span><button id=\"evidenceClose\">×</button></div><p class=\"kicker\">PIEZA DE EVIDENCIA</p><h3>"+p.title+"</h3><p>"+p.text+"</p><div class=\"evidence-meta\"><b>Relacionada con:</b> "+p.supports.map(id=>DISCOVERIES[id]?.title).filter(Boolean).join(" · ")+"<br><b>Fuente:</b> "+(source?.name||"—")+"</div><small>Esta pieza representa una capa de investigación. No sustituye el documento original.</small>";
  $("#evidence").hidden=false;renderChains();$("#evidenceClose").onclick=()=>$("#evidence").hidden=true;$("#evidence").scrollIntoView({behavior:"smooth",block:"nearest"});
}
const LAYERS={territory:"Territorio",water:"Agua",production:"Producción",community:"Comunidad",identity:"Identidad"};
const state={eventIndex:0,discovered:new Set(),history:[],relations:new Set(),answers:{}};
const $=selector=>document.querySelector(selector);

function evidenceLabel(type){return ({documented:"DOCUMENTADO",partial:"PARCIAL",reconstruction:"RECONSTRUCCIÓN",interpretation:"INTERPRETACIÓN"})[type]||type.toUpperCase();}
function currentEvent(){return EVENTS[state.eventIndex];}
function relationUnlocked(r){return r.requires.every(id=>state.discovered.has(id));}


const INVESTIGATION_OBJECTS = {
  photoTratayen:{type:"FOTOGRAFÍA / ARCHIVO",title:"Tratayen: una huella anterior",text:"La existencia de Tratayen aparece documentada mediante una mensura de alrededor de 1913. PIONERO no presenta una fotografía histórica que no haya sido localizada y verificada.",source:"Municipalidad de San Patricio del Chañar",url:"https://www.sanpatricio.gob.ar/identidad",lockedText:"Necesitás encontrar primero la huella TRATAYEN."},
  docRiego:{type:"DOCUMENTO",title:"La ruta del agua",text:"La documentación describe las obras de sistematización, el bombeo inicial y la primera bocatoma. Esta pieza permite reconstruir cómo el agua pasó a organizar el territorio productivo.",source:"Municipalidad de San Patricio del Chañar / CFI",url:"https://www.sanpatricio.gob.ar/identidad",lockedText:"Necesitás descubrir primero RIEGO."},
  mapParcelas:{type:"MAPA / TERRITORIO",title:"Las parcelas",text:"El proyecto productivo transformó el monte en un territorio parcelado. La primera etapa de riego permitió avanzar con parcelas plantadas y comercializadas.",source:"Municipalidad / CFI",url:"https://www.argentina.gob.ar/sites/default/files/plan_de_ordenamiento_territorial_y_ambiental_para_las_localidades_des_anelo_san_patricio_del_chanar_y_sauzal_bonito_0.pdf",lockedText:"Primero tenés que descubrir PARCELAS."},
  placeFoundation:{type:"LUGAR",title:"Dónde aparece el pueblo",text:"En 1973 se crea la Comisión de Fomento de San Patricio del Chañar. La creación del núcleo urbano está vinculada en las fuentes al desarrollo productivo y a la radicación de trabajadores agrícolas.",source:"CFI / Municipalidad",url:"https://www.argentina.gob.ar/sites/default/files/plan_de_ordenamiento_territorial_y_ambiental_para_las_localidades_des_anelo_san_patricio_del_chanar_y_sauzal_bonito_0.pdf",lockedText:"La fundación todavía no está conectada con la investigación."},
  personGasparri:{type:"PERSONA",title:"Roberto Gasparri",text:"Las fuentes institucionales lo ubican como figura central del proyecto que transformó el territorio desde 1968. En PIONERO, la persona funciona como nodo: conecta tierra, agua, producción y fundación.",source:"Neuquén Informa / CFI",url:"https://www.neuqueninforma.gob.ar/noticias/2013/05/17/29151-ana-pechen-preside-la-ceremonia-aniversario-de-san-patricio-del-chanar",lockedText:"La persona se desbloquea cuando conectás tierra y proyecto productivo."},
  schoolRecord:{type:"DOCUMENTO / INSTITUCIÓN",title:"La primera escuela",text:"La cronología local registra el inicio de la Escuela Nº 273 en 1975. Esta pieza abre una nueva investigación: cómo una zona productiva se convirtió también en comunidad.",source:"Cronología local",url:"https://masneuquen.com/efemerides-cronologia-de-san-patricio-del-chanar-a-traves-de-los-anos/",lockedText:"Primero necesitás conectar fundación y comunidad."},
  clubRecord:{type:"DOCUMENTO / COMUNIDAD",title:"El Club Atlético San Patricio",text:"La cronología local registra su creación en 1976 como respuesta a la necesidad de un espacio de contención para jóvenes. La pieza permite estudiar la aparición de instituciones sociales después de la fundación.",source:"Cronología local",url:"https://masneuquen.com/efemerides-cronologia-de-san-patricio-del-chanar-a-traves-de-los-anos/",lockedText:"La vida comunitaria se desbloquea después de investigar la escuela."}
};

const OBJECT_RULES = {
  photoTratayen:()=>state.discovered.has("territory"),
  docRiego:()=>state.discovered.has("irrigation"),
  mapParcelas:()=>state.discovered.has("parcels"),
  placeFoundation:()=>state.discovered.has("foundation"),
  personGasparri:()=>state.discovered.has("gasparri") && (state.relations.has("water-production")||state.discovered.has("irrigation")),
  schoolRecord:()=>state.relations.has("town-community") || state.discovered.has("school"),
  clubRecord:()=>state.discovered.has("school")
};

function renderInvestigationLab(){
  const root=$("#lab"); if(!root)return;
  const objects=Object.entries(INVESTIGATION_OBJECTS);
  root.innerHTML=`
    <div class="lab-head"><div><p class="kicker">LABORATORIO DE INVESTIGACIÓN</p><h3>Las fuentes ahora son objetos del juego.</h3><p>Encontrá una pieza, examiná su evidencia y conectala con otra. No todo está disponible desde el comienzo.</p></div><b>${objects.filter(([id])=>OBJECT_RULES[id]()).length} / ${objects.length}</b></div>
    <div class="lab-grid">${objects.map(([id,o])=>{
      const open=OBJECT_RULES[id]();
      return `<button class="invest-object ${open?"open":"locked"}" data-object="${id}">
        <span class="object-icon">${o.type==="FOTOGRAFÍA / ARCHIVO"?"▣":o.type.includes("MAPA")?"⌖":o.type==="PERSONA"?"◉":o.type.includes("LUGAR")?"⌂":"▤"}</span>
        <small>${o.type}</small><strong>${o.title}</strong><p>${open?o.text:o.lockedText}</p><em>${open?"EXAMINAR →":"BLOQUEADO"}</em>
      </button>`;
    }).join("")}</div>
    <div id="objectViewer" class="object-viewer" hidden></div>`;
}

function openInvestigationObject(id){
  const o=INVESTIGATION_OBJECTS[id]; if(!o || !OBJECT_RULES[id]())return;
  const viewer=$("#objectViewer");
  viewer.innerHTML=`<div class="viewer-top"><span class="tag">${o.type}</span><button id="viewerClose">×</button></div><h3>${o.title}</h3><p>${o.text}</p><div class="source-box"><b>PROCEDENCIA</b><span>${o.source}</span><a href="${o.url}" target="_blank" rel="noopener">Abrir fuente original →</a></div><div class="viewer-action"><span>PIEZA EXAMINADA</span><b>Ahora puede usarse para construir relaciones.</b></div>`;
  viewer.hidden=false; $("#viewerClose").onclick=()=>viewer.hidden=true;
  viewer.scrollIntoView({behavior:"smooth",block:"nearest"});
}

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
  $("#knowledge").textContent=`${state.discovered.size} / ${Object.keys(DISCOVERIES).length} huellas · ${state.relations.size} conexiones`;
  $("#discovery").hidden=true;
  $("#prev").disabled=state.eventIndex===0;
  $("#next").disabled=state.eventIndex===EVENTS.length-1;
  renderRelations();
  renderChains();
  renderArchive();
  renderHistoricalLayers();
  renderPeople();
  renderInvestigationLab();
}

function renderRelations(){
  const available=RELATIONS.filter(relationUnlocked);
  const locked=RELATIONS.filter(r=>!relationUnlocked(r));
  $("#relations").innerHTML=`
    <div class="relations-head"><div><p class="kicker">MAPA DE RELACIONES</p><h3>Las huellas empiezan a hablar entre sí.</h3></div><b>${state.relations.size} / ${RELATIONS.length}</b></div>
    <p class="relations-copy">Una huella aislada informa. Una conexión permite construir una explicación. Las decisiones no cambian la historia documentada: cambian tu recorrido de investigación.</p>
    <div class="relation-list">
      ${available.map(r=>`<button class="relation-card ${state.relations.has(r.id)?"solved":""}" data-relation="${r.id}">
        <span class="relation-nodes">${r.nodes.join(" → ")}</span><strong>${r.title}</strong><small>${state.relations.has(r.id)?"CONEXIÓN REGISTRADA":"INVESTIGAR →"}</small>
      </button>`).join("")}
      ${locked.map(r=>`<div class="relation-card locked"><span class="relation-nodes">${r.nodes.join(" → ")}</span><strong>${r.title}</strong><small>FALTAN ${r.requires.filter(id=>!state.discovered.has(id)).length} HUELLAS</small></div>`).join("")}
    </div>`;
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
  $("#discovery").hidden=false;
  render();
  $("#discovery").hidden=false;
  document.querySelector("#discovery").scrollIntoView({behavior:"smooth",block:"nearest"});
}

function openRelation(id){
  const relation=RELATIONS.find(r=>r.id===id);
  if(!relation || !relationUnlocked(relation))return;
  const answered=state.answers[id];
  $("#decision").innerHTML=`
    <div class="decision-top"><span class="tag">INVESTIGACIÓN</span><button id="decisionClose">×</button></div>
    <p class="kicker">CONEXIÓN ${String(RELATIONS.indexOf(relation)+1).padStart(2,"0")}</p>
    <h3>${relation.title}</h3><p>${relation.text}</p>
    <div class="evidence-chain">${relation.nodes.map((n,i)=>`<span>${n}</span>${i<relation.nodes.length-1?"<i>→</i>":""}`).join("")}</div>
    <div class="choices">${relation.options.map((o,i)=>`<button class="choice ${answered!==undefined&&answered===i?(o.correct?"chosen-correct":"chosen-wrong"):""}" data-choice="${i}">${o.label}</button>`).join("")}</div>
    ${answered!==undefined?`<div class="consequence ${relation.options[answered].correct?"good":"open"}"><b>${relation.options[answered].correct?"CONEXIÓN REGISTRADA":"PISTA ABIERTA"}</b><p>${relation.options[answered].consequence}</p></div>`:""}
    <small>La decisión organiza tu investigación; no altera los hechos históricos documentados.</small>`;
  $("#decision").hidden=false;
  $("#decision").scrollIntoView({behavior:"smooth",block:"nearest"});
  $("#decisionClose").onclick=()=>$("#decision").hidden=true;
  document.querySelectorAll("[data-choice]").forEach(btn=>btn.onclick=()=>{
    const i=Number(btn.dataset.choice);
    state.answers[id]=i;
    if(relation.options[i].correct)state.relations.add(id);
    renderRelations();
    openRelation(id);
  });
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
$("#relations").onclick=event=>{const card=event.target.closest("[data-relation]");if(card)openRelation(card.dataset.relation);};
$("#chains").onclick=event=>{const card=event.target.closest("[data-piece]");if(card)openPiece(card.dataset.piece);};
$("#lab").onclick=event=>{const card=event.target.closest("[data-object]");if(card)openInvestigationObject(card.dataset.object);};
document.addEventListener("keydown",event=>{if($("#journey").hidden)return;if(event.key==="ArrowRight")travel(state.eventIndex+1);if(event.key==="ArrowLeft")travel(state.eventIndex-1);if(event.key==="Escape"){if($("#modal").open)$("#modal").close();if(!$("#decision").hidden)$("#decision").hidden=true;}});

/* V2.5 — RECONSTRUCCIÓN TERRITORIAL
   El mapa no pretende ser una cartografía histórica exacta: es un mapa jugable
   de relaciones apoyado en lugares y procesos que las fuentes sí permiten conectar.
*/
const TERRITORY_OBJECTS = [
  {id:"river",title:"Río Neuquén",kind:"AGUA",x:79,y:18,desc:"El río es el soporte físico de la historia del riego. La fuente municipal vincula las primeras obras con captaciones sobre este curso.",source:"municipal",links:["irrigation","intake"]},
  {id:"intakePlace",title:"Zona de bocatoma",kind:"OBRA",x:70,y:37,desc:"Punto narrativo para investigar la captación de agua. La posición es didáctica; no representa una coordenada histórica exacta.",source:"municipal",links:["intake","irrigation"]},
  {id:"productiveValley",title:"Valle productivo",kind:"PRODUCCIÓN",x:39,y:68,desc:"La transformación del monte en superficie productiva es una de las claves del proceso iniciado a fines de los años 60.",source:"municipal",links:["gasparri","parcels","fruit"]},
  {id:"townSite",title:"Casco urbano",kind:"PUEBLO",x:57,y:54,desc:"La fundación de 1973 marca una capa institucional; el asentamiento y la vida comunitaria se investigan como procesos relacionados, no como un único hecho.",source:"cfi",links:["foundation","commission","school"]},
  {id:"barda",title:"Barda / meseta",kind:"TERRITORIO",x:20,y:25,desc:"La topografía ayuda a entender el contraste entre meseta, barda, valle irrigado y ribera que aparece en la documentación territorial.",source:"cfi",links:["territory"]},
  {id:"roads",title:"Eje de acceso",kind:"CIRCULACIÓN",x:30,y:48,desc:"La estructura actual del territorio se articula con rutas y caminos; en PIONERO funcionan como referencia espacial, no como reconstrucción vial de 1973.",source:"cfi",links:["today"]},
  {id:"todayPlace",title:"Chañar actual",kind:"PRESENTE",x:69,y:73,desc:"El presente permite contrastar las huellas históricas con el territorio que existe hoy.",source:"municipal",links:["today"]}
];
const TERRITORY_LINKS = [
  ["river","intakePlace"],["intakePlace","productiveValley"],["productiveValley","townSite"],
  ["barda","productiveValley"],["roads","townSite"],["townSite","todayPlace"]
];
const DOCUMENTS = [
  {id:"doc1968",year:"1968",title:"20.000 hectáreas: el proyecto",type:"DOCUMENTO",text:"La Municipalidad registra la adquisición de 20.000 hectáreas de monte bruto y el objetivo de sistematizar el terreno mediante obras de agua y plantaciones.",source:"municipal",fact:"documentado",next:["gasparri","irrigation"]},
  {id:"doc1969",year:"1969",title:"Cuando el agua empieza a cambiar el suelo",type:"DOCUMENTO",text:"La reseña municipal sitúa en 1969 el inicio de las obras de sistematización y los primeros riegos mediante bombeo desde el río Neuquén.",source:"municipal",fact:"documentado",next:["irrigation","intake"]},
  {id:"doc1971",year:"1971",title:"La primera bocatoma",type:"DOCUMENTO",text:"La primera bocatoma permitió avanzar sobre una primera etapa de riego y vender parcelas plantadas. Es una pieza clave para conectar agua, producción y territorio.",source:"municipal",fact:"documentado",next:["intake","parcels"]},
  {id:"doc1973",year:"1973",title:"Nacimiento institucional",type:"DOCUMENTO",text:"La Carta Orgánica reconoce el 21 de mayo de 1973 como fecha de fundación. La documentación territorial vincula esa fecha con la creación de la Comisión de Fomento mediante el Decreto Provincial N.º 1339.",source:"cfi",fact:"documentado",next:["foundation","commission"]},
  {id:"doc1975",year:"1975",title:"Producción y comunidad",type:"DOCUMENTO",text:"La reseña histórica provincial registra primeras cantidades industriales de fruta y la aparición de instituciones comunitarias durante 1975.",source:"cfi",fact:"documentado",next:["fruit","school"]}
];
const PHOTO_ARCHIVE = [
  {id:"photoSign",title:"El Chañar, hoy",caption:"Fotografía real de San Patricio del Chañar disponible en Wikimedia Commons.",image:"https://commons.wikimedia.org/wiki/Special:FilePath/San%20Patricio%20del%20Chañar.png",source:"Wikimedia Commons",url:"https://commons.wikimedia.org/wiki/File:San_Patricio_del_Chañar.png",links:["today"]},
  {id:"photoLandscape",title:"Chacras y viñedos",caption:"Archivo fotográfico contemporáneo: el artículo registra imágenes aéreas de chacras y viñedos de San Patricio del Chañar. La fotografía queda vinculada al artículo de origen hasta incorporar el archivo directo.",image:null,source:"LM Neuquén · archivo fotográfico",url:"https://www.lmneuquen.com/el-chanar-tambien-se-vistio-blanco-las-postales-que-la-nieve-dejo-en-chacras-y-vinedos-n923537",links:["productiveValley"]},
  {id:"photoPending",title:"Archivo local por incorporar",caption:"Pieza reservada para una fotografía histórica del Chañar con procedencia, fecha y autorización verificables.",image:null,source:"Archivo local pendiente",url:null,links:["territory"]}
];
const RELATION_GRAPH = [
  {from:"Roberto Gasparri",to:"20.000 ha",why:"proyecto productivo",requires:["gasparri"]},
  {from:"20.000 ha",to:"Riego",why:"sistematización y bombeo",requires:["gasparri","irrigation"]},
  {from:"Riego",to:"Bocatoma",why:"escala del sistema",requires:["irrigation","intake"]},
  {from:"Bocatoma",to:"Parcelas",why:"ocupación productiva",requires:["intake","parcels"]},
  {from:"Parcelas",to:"San Patricio del Chañar",why:"asentamiento y organización",requires:["parcels","foundation"]},
  {from:"Fundación",to:"Comunidad",why:"instituciones y vida cotidiana",requires:["foundation","commission","school"]}
];
const territoryState={selected:null,doc:null,photo:null,connections:new Set()};

function sourceInfo(id){return SOURCES[id]||EXTRA_SOURCES[id]||{name:"Fuente registrada",url:"#"};}
function labUnlocked(reqs=[]){return reqs.every(id=>state.discovered.has(id));}
function territoryPointHTML(p){
  const unlocked=labUnlocked(p.links);
  return '<button class="territory-node '+(unlocked?"":"locked")+'" data-territory="'+p.id+'" style="left:'+p.x+'%;top:'+p.y+'%" aria-label="'+p.title+'"><span></span><b>'+p.title+'</b><small>'+p.kind+'</small></button>';
}
function renderTerritoryLab(){
  const root=$("#territoryLab"); if(!root)return;
  const selected=TERRITORY_OBJECTS.find(x=>x.id===territoryState.selected);
  const doc=DOCUMENTS.find(x=>x.id===territoryState.doc);
  const photo=PHOTO_ARCHIVE.find(x=>x.id===territoryState.photo);
  root.innerHTML=`
    <div class="territory-head"><div><p class="kicker">V2.5 · MAPA DE RECONSTRUCCIÓN</p><h3>Reconstruí cómo nació Chañar.</h3><p>Ahora las huellas dejan de vivir separadas: territorio, documentos, fotografías y relaciones forman una investigación espacial.</p></div><b>${state.discovered.size} huellas</b></div>
    <div class="territory-grid">
      <div class="territory-map" aria-label="Mapa territorial jugable">
        <div class="map-sky"></div><div class="map-barda"></div><div class="map-valley"></div><div class="map-river"></div><div class="map-road"></div>
        <svg class="map-links" viewBox="0 0 100 100" preserveAspectRatio="none">${TERRITORY_LINKS.map(([a,b])=>{const A=TERRITORY_OBJECTS.find(x=>x.id===a),B=TERRITORY_OBJECTS.find(x=>x.id===b);return '<line x1="'+A.x+'" y1="'+A.y+'" x2="'+B.x+'" y2="'+B.y+'"/>';}).join("")}</svg>
        ${TERRITORY_OBJECTS.map(territoryPointHTML).join("")}
        <div class="map-legend"><span>● huella territorial</span><span>— conexión</span></div>
      </div>
      <aside class="territory-inspector">
        ${selected?`<div class="inspect-card"><span class="tag">${selected.kind}</span><h4>${selected.title}</h4><p>${selected.desc}</p><small>Fuente: ${sourceInfo(selected.source).name}</small></div>`:"<div class='inspect-empty'><span>EXAMINÁ EL MAPA</span><strong>Elegí un lugar.</strong><p>Los puntos se habilitan cuando la investigación encuentra la huella necesaria.</p></div>"}
        <div class="map-progress"><b>CAPAS ABIERTAS</b><span>${TERRITORY_OBJECTS.filter(p=>labUnlocked(p.links)).length} / ${TERRITORY_OBJECTS.length}</span></div>
      </aside>
    </div>
    <div class="deep-tools">
      <div class="tool-panel"><div class="tool-title"><span>01</span><h4>Documentos para inspeccionar</h4></div><div class="document-strip">${DOCUMENTS.map(d=>`<button class="document-card ${labUnlocked(d.next)?"":"locked"}" data-document="${d.id}"><small>${d.year} · ${d.type}</small><strong>${d.title}</strong><span>${labUnlocked(d.next)?"ABRIR DOCUMENTO":"PISTA BLOQUEADA"}</span></button>`).join("")}</div>
      ${doc?`<article class="document-viewer"><div><span class="tag">${doc.year} · ${doc.fact}</span><h4>${doc.title}</h4><p>${doc.text}</p><div class="source-box"><b>PROCEDENCIA</b><span>${sourceInfo(doc.source).name}</span><a href="${sourceInfo(doc.source).url}" target="_blank" rel="noopener">Consultar fuente ↗</a></div></div><button data-close-doc>×</button></article>`:""}
      </div>
      <div class="tool-panel"><div class="tool-title"><span>02</span><h4>Fotografías reales y archivo</h4></div><div class="photo-strip">${PHOTO_ARCHIVE.map(p=>`<button class="photo-card ${p.image?"":"pending"}" data-photo="${p.id}">${p.image?`<img src="${p.image}" alt="${p.title}" loading="lazy">`:"<div class='photo-missing'>ARCHIVO LOCAL</div>"}<strong>${p.title}</strong><small>${p.caption}</small></button>`).join("")}</div>
      ${photo?`<article class="photo-viewer"><div class="photo-large">${photo.image?`<img src="${photo.image}" alt="${photo.title}">`:"<div class='photo-missing large'>FOTOGRAFÍA POR INCORPORAR</div>"}</div><div><span class="tag">ARCHIVO VISUAL</span><h4>${photo.title}</h4><p>${photo.caption}</p><small>${photo.source}</small>${photo.url?`<a href="${photo.url}" target="_blank" rel="noopener">Ver procedencia ↗</a>`:""}</div><button data-close-photo>×</button></article>`:""}
      </div>
    </div>
    <div class="connection-lab"><div class="tool-title"><span>03</span><h4>Conexiones: persona → obra → territorio</h4></div><p>Una conexión sólo se activa cuando el jugador ya reunió las huellas que la sostienen.</p><div class="connection-list">${RELATION_GRAPH.map((r,i)=>{const open=labUnlocked(r.requires),done=territoryState.connections.has(i);return '<button class="connection-row '+(open?"":"locked")+' '+(done?"done":"")+'" data-connection="'+i+'"><span>'+r.from+'</span><i>→</i><span>'+r.to+'</span><small>'+r.why+'</small><b>'+(done?"CONECTADO":open?"CONECTAR":"FALTAN HUELLAS")+'</b></button>';}).join("")}</div></div>
    <div class="reconstruction-status"><span>RECONSTRUCCIÓN</span><strong>${territoryState.connections.size} conexiones activas</strong><p>${territoryState.connections.size>=3?"La investigación ya permite leer una cadena territorial: tierra → agua → producción → pueblo.":"Todavía faltan relaciones. Seguí las huellas y abrí documentos para construir la explicación."}</p></div>
  `;
  root.querySelectorAll("[data-territory]").forEach(b=>b.onclick=()=>{const p=TERRITORY_OBJECTS.find(x=>x.id===b.dataset.territory);if(labUnlocked(p.links)){territoryState.selected=p.id;renderTerritoryLab();}});
  root.querySelectorAll("[data-document]").forEach(b=>b.onclick=()=>{const d=DOCUMENTS.find(x=>x.id===b.dataset.document);if(labUnlocked(d.next)){territoryState.doc=d.id;renderTerritoryLab();}});
  root.querySelectorAll("[data-photo]").forEach(b=>b.onclick=()=>{territoryState.photo=b.dataset.photo;renderTerritoryLab();});
  const cd=root.querySelector("[data-close-doc]");if(cd)cd.onclick=()=>{territoryState.doc=null;renderTerritoryLab();};
  const cp=root.querySelector("[data-close-photo]");if(cp)cp.onclick=()=>{territoryState.photo=null;renderTerritoryLab();};
  root.querySelectorAll("[data-connection]").forEach(b=>b.onclick=()=>{const i=Number(b.dataset.connection),r=RELATION_GRAPH[i];if(labUnlocked(r.requires)){territoryState.connections.add(i);renderTerritoryLab();}});
}


/* V2.6 — TABLERO DE RELACIONES TERRITORIALES */
const TERRITORY_RELATIONS_V26 = [
 {a:"river",b:"intakePlace",title:"El río alimenta la obra",text:"La captación conecta el Río Neuquén con el sistema de riego.",proof:["irrigation","intake"]},
 {a:"intakePlace",b:"productiveValley",title:"El agua transforma el territorio",text:"La obra de captación forma parte del proceso que llevó agua hacia superficies productivas.",proof:["intake","parcels"]},
 {a:"productiveValley",b:"townSite",title:"Producción y nacimiento del pueblo",text:"La transformación productiva y la organización institucional pertenecen a capas distintas, pero relacionadas, de la historia local.",proof:["parcels","foundation"]},
 {a:"townSite",b:"todayPlace",title:"De la fundación al presente",text:"El lugar fundado como comunidad puede compararse con el territorio que vemos hoy.",proof:["foundation","today"]},
 {a:"barda",b:"productiveValley",title:"La forma del territorio importa",text:"La documentación territorial permite leer el contraste entre meseta, barda, valle irrigado y ribera.",proof:["territory","parcels"]}
];
const BOARD_V26={pair:[],relations:new Set()};

function renderTerritoryBoardV26(){
 const root=$("#territoryLab"); if(!root)return;
 const places=TERRITORY_OBJECTS.filter(p=>labUnlocked(p.links));
 const pair=TERRITORY_RELATIONS_V26.find(r=>BOARD_V26.pair.length===2&&((r.a===BOARD_V26.pair[0]&&r.b===BOARD_V26.pair[1])||(r.a===BOARD_V26.pair[1]&&r.b===BOARD_V26.pair[0])));
 const pairPlaces=BOARD_V26.pair.map(id=>TERRITORY_OBJECTS.find(p=>p.id===id)).filter(Boolean);
 let html="";
 html+='<div class="territory-head"><div><p class="kicker">V2.6 · TABLERO DE INVESTIGACIÓN</p><h3>Reconstruí cómo nació Chañar.</h3><p>Elegí <strong>dos lugares</strong>. Después reuní las pruebas que permitan explicar qué relación histórica existe entre ellos.</p></div><b>'+BOARD_V26.pair.length+' / 2 seleccionados</b></div>';
 html+='<div class="territory-grid"><div class="territory-map" aria-label="Mapa territorial jugable"><div class="map-sky"></div><div class="map-barda"></div><div class="map-valley"></div><div class="map-river"></div><div class="map-road"></div>';
 html+='<svg class="map-links" viewBox="0 0 100 100" preserveAspectRatio="none">'+TERRITORY_LINKS.map(([a,b])=>{const A=TERRITORY_OBJECTS.find(x=>x.id===a),B=TERRITORY_OBJECTS.find(x=>x.id===b);return '<line x1="'+A.x+'" y1="'+A.y+'" x2="'+B.x+'" y2="'+B.y+'"/>';}).join("")+'</svg>';
 html+=TERRITORY_OBJECTS.map(p=>{const unlocked=labUnlocked(p.links),sel=BOARD_V26.pair.includes(p.id);return '<button class="territory-node '+(unlocked?"":"locked")+' '+(sel?"selected":"")+'" data-board-place="'+p.id+'" style="left:'+p.x+'%;top:'+p.y+'%"><span></span><b>'+p.title+'</b><small>'+p.kind+'</small></button>';}).join("");
 html+='<div class="map-legend"><span>● lugar investigable</span><span>◆ seleccionado</span><span>— territorio</span></div></div>';
 html+='<aside class="territory-inspector">';
 if(!pairPlaces.length) html+='<div class="inspect-empty"><span>PRIMER PASO</span><strong>Elegí dos lugares.</strong><p>El mapa funciona como un tablero de investigación. Seleccioná un punto y después otro.</p></div>';
 else html+='<div class="pair-selection"><span class="tag">SELECCIÓN</span><h4>'+pairPlaces.map(p=>p.title).join(" + ")+'</h4><p>'+(pairPlaces.length===1?"Elegí un segundo lugar.":"Ahora buscá la relación y reuní sus pruebas.")+'</p></div>';
 if(pair){
   const idx=TERRITORY_RELATIONS_V26.indexOf(pair), ready=pair.proof.every(id=>state.discovered.has(id)), done=BOARD_V26.relations.has(idx);
   html+='<div class="relation-challenge"><span class="tag">HIPÓTESIS TERRITORIAL</span><h4>'+pair.title+'</h4><p>'+pair.text+'</p><div class="proof-meter">'+pair.proof.map(id=>'<span class="'+(state.discovered.has(id)?"open":"")+'">'+(state.discovered.has(id)?"✓":"?")+' '+(DISCOVERIES[id]?.label||id)+'</span>').join("")+'</div><button class="prove-relation" data-board-prove="'+idx+'" '+(ready?"":"disabled")+'>'+(done?"RELACIÓN CONFIRMADA":ready?"CONFIRMAR RELACIÓN":"FALTAN PRUEBAS")+'</button></div>';
 }
 html+='<div class="map-progress"><b>LUGARES ABIERTOS</b><span>'+places.length+' / '+TERRITORY_OBJECTS.length+'</span></div></aside></div>';
 html+='<div class="connection-lab"><div class="tool-title"><span>01</span><h4>Cadena de reconstrucción</h4></div><p>Las relaciones confirmadas se convierten en piezas de una explicación territorial.</p><div class="connection-list">';
 html+=TERRITORY_RELATIONS_V26.map((r,i)=>{const open=r.proof.every(id=>state.discovered.has(id)),done=BOARD_V26.relations.has(i);return '<button class="connection-row '+(open?"":"locked")+' '+(done?"done":"")+'" data-board-relation="'+i+'"><span>'+TERRITORY_OBJECTS.find(p=>p.id===r.a).title+'</span><i>→</i><span>'+TERRITORY_OBJECTS.find(p=>p.id===r.b).title+'</span><small>'+r.title+'</small><b>'+(done?"CONFIRMADA":open?"INVESTIGAR":"FALTAN HUELLAS")+'</b></button>';}).join("");
 html+='</div></div><div class="reconstruction-status"><span>RECONSTRUCCIÓN</span><strong>'+BOARD_V26.relations.size+' relaciones territoriales descubiertas</strong><p>'+(BOARD_V26.relations.size>=3?"Ya podés leer una cadena causal del territorio: agua → producción → pueblo → presente.":"Elegí lugares, reuní huellas y confirmá relaciones. La explicación se construye con pruebas.")+'</p></div>';
 root.innerHTML=html;
 root.querySelectorAll("[data-board-place]").forEach(b=>b.onclick=()=>{const id=b.dataset.boardPlace;if(!labUnlocked(TERRITORY_OBJECTS.find(p=>p.id===id).links))return;if(BOARD_V26.pair.length===2)BOARD_V26.pair=[];if(!BOARD_V26.pair.includes(id))BOARD_V26.pair.push(id);renderTerritoryLab();});
 const prove=root.querySelector("[data-board-prove]"); if(prove)prove.onclick=()=>{const i=Number(prove.dataset.boardProve),r=TERRITORY_RELATIONS_V26[i];if(r.proof.every(id=>state.discovered.has(id))){BOARD_V26.relations.add(i);renderTerritoryLab();}};
 root.querySelectorAll("[data-board-relation]").forEach(b=>b.onclick=()=>{const i=Number(b.dataset.boardRelation),r=TERRITORY_RELATIONS_V26[i];if(r.proof.every(id=>state.discovered.has(id))){BOARD_V26.pair=[r.a,r.b];renderTerritoryLab();}});
}
function renderTerritoryLab(){renderTerritoryBoardV26();}

renderTerritoryLab();
render();
