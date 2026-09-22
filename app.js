const ERAS=[
{id:"before",year:"ANTES DE 1973",title:"El territorio antes del pueblo",phase:"TERRITORIO",hint:"Una reconstrucción visual orientativa: meseta, bardas, monte y río.",status:"reconstrucción",v:{water:.28,brush:.65,fields:.03,town:.02,roads:.03,barda:.7},points:[["territory","El territorio",28,55]]},
{id:"1968",year:"1968",title:"La transformación comienza",phase:"TRANSFORMACIÓN",hint:"La historia productiva entra en una nueva etapa.",status:"documentado",v:{water:.35,brush:.55,fields:.18,town:.03,roads:.08,barda:.68},points:[["gasparri","Gasparri",39,51]]},
{id:"1969",year:"1969",title:"El agua cambia el paisaje",phase:"AGUA Y RIEGO",hint:"Las obras de riego abren la posibilidad de transformar el monte.",status:"documentado",v:{water:.65,brush:.35,fields:.5,town:.05,roads:.14,barda:.62},points:[["irrigation","Riego",66,47]]},
{id:"1973",year:"1973",title:"Nace San Patricio del Chañar",phase:"FUNDACIÓN",hint:"El territorio productivo empieza a convertirse también en pueblo.",status:"documentado",v:{water:.7,brush:.3,fields:.62,town:.35,roads:.25,barda:.6},points:[["foundation","Fundación",53,48],["place","El lugar",76,61]]},
{id:"1974",year:"1974",title:"La comunidad se organiza",phase:"ORGANIZACIÓN",hint:"La nueva localidad comienza a construir su vida institucional.",status:"documentado",v:{water:.72,brush:.27,fields:.66,town:.5,roads:.32,barda:.58},points:[["commission","Instituciones",48,49]]},
{id:"1975",year:"1975",title:"Producción, escuela y comunidad",phase:"COMUNIDAD",hint:"Nuevas huellas aparecen en el territorio y en la vida cotidiana.",status:"parcial",v:{water:.74,brush:.24,fields:.76,town:.6,roads:.4,barda:.55},points:[["fruit","Producción",34,54],["school","Escuela",69,48]]},
{id:"today",year:"HOY",title:"El Chañar de hoy",phase:"PUNTO DE LLEGADA",hint:"Un territorio productivo y una localidad que conserva sus huellas.",status:"interpretación",v:{water:.8,brush:.18,fields:.9,town:.92,roads:.85,barda:.5},points:[["today","Hoy",66,53]]}
];
const DISC={
territory:["El territorio","Reconstrucción didáctica. La escena no es una fotografía histórica ni pretende fijar coordenadas que no estén documentadas.","reconstrucción"],
gasparri:["La etapa Gasparri","En 1968 se registra la adquisición de unas 20.000 hectáreas de monte bruto en el área de El Chañar, asociada al proyecto productivo que impulsó la transformación posterior.","documentado"],
irrigation:["El riego","Las fuentes locales y de planificación ubican en 1969 el desarrollo de obras de riego y los primeros cultivos del proceso de transformación productiva.","documentado"],
foundation:["La fundación","Las fuentes oficiales consultadas sitúan en 1973 la fundación de San Patricio del Chañar. Algunas distinguen este momento del funcionamiento institucional posterior.","documentado"],
place:["El lugar","Este punto funciona como ancla territorial narrativa. La precisión espacial histórica se ampliará sólo cuando exista evidencia suficiente.","documentado"],
commission:["La organización institucional","Las fuentes oficiales distinguen la fundación de 1973 del funcionamiento de la Comisión de Fomento en 1974.","documentado"],
fruit:["La producción","La transformación del territorio productivo es una de las claves para comprender el nacimiento y crecimiento de la localidad.","documentado"],
school:["La escuela","La escuela forma parte de las huellas comunitarias tempranas incorporadas al recorrido histórico.","parcial"],
today:["El presente","Capa contemporánea. Se ampliará con fotografías, mapas y registros actuales de San Patricio del Chañar.","interpretación"]
};
let i=0;
const $=s=>document.querySelector(s);
function render(){const e=ERAS[i];$("#year").textContent=e.year;$("#title").textContent=e.title;$("#hint").textContent=e.hint;$("#phase").textContent=e.phase;$("#status").textContent=e.status;$("#counter").textContent=`${String(i+1).padStart(2,"0")} / ${ERAS.length}`;$("#progress").style.width=`${(i/(ERAS.length-1))*100}%`;for(const k of ["water","brush","fields","town","roads","barda"])$("#world").style.setProperty("--"+k,e.v[k]);$("#points").innerHTML=e.points.map(([id,label,x,y])=>`<div class="point" style="left:${x}%;top:${y}%"><button data-id="${id}" aria-label="Descubrir ${label}">+</button><label>${label}</label></div>`).join("");$("#discovery").hidden=true;$("#prev").disabled=i===0;$("#next").disabled=i===ERAS.length-1}
function travel(n){i=Math.max(0,Math.min(ERAS.length-1,n));render();$("#world").focus({preventScroll:true})}
function discover(id){const d=DISC[id];if(!d)return;$("#discovery").innerHTML=`<span class="tag">${d[2].toUpperCase()}</span><h3>${d[0]}</h3><p>${d[1]}</p>`;$("#discovery").hidden=false}
function openSources(){$("#sourceList").innerHTML=`
<article><b>Municipalidad de San Patricio del Chañar · Nuestra Identidad</b><br><small>Referencia institucional sobre antecedentes, 1968, riego y transformación local.</small><br><a href="https://www.sanpatricio.gob.ar/identidad" target="_blank" rel="noopener">Abrir fuente</a></article>
<article><b>CFI · Neuquén, 2024</b><br><small>Descripción territorial del valle inferior del río Neuquén, meseta, bardas, vegetación y proceso productivo.</small><br><a href="https://cfi.org.ar/uploads/2024/05/Neuquen_114_0.pdf" target="_blank" rel="noopener">Abrir documento</a></article>
<article><b>Planificación territorial · Nación / CFI</b><br><small>Antecedentes de 1966, 1968, 1969, 1971 y 1973.</small><br><a href="https://www.mininterior.gob.ar/planificacion/pdf/planes-loc/NEUQUEN/Plan-de-Ordenamiento-Territorial-Ambiental-para-las-localidades-A%C3%B1elo-San-Patricio-del-Cha%C3%B1ar-y-Sauzal-Bonito.pdf" target="_blank" rel="noopener">Abrir documento</a></article>
<article><b>Regla visual</b><br><small>Las escenas reconstruidas son representaciones didácticas. Una referencia visual de otro lugar nunca se presenta como fotografía histórica de Chañar.</small></article>`;$("#modal").showModal()}
$("#start").onclick=()=>{$("#home").hidden=true;$("#journey").hidden=false;i=0;render();$("#world").focus()};
$("#homeBtn").onclick=()=>{$("#journey").hidden=true;$("#home").hidden=false};
$("#prev").onclick=()=>travel(i-1);$("#next").onclick=()=>travel(i+1);$("#sources").onclick=openSources;$("#source2").onclick=openSources;$("#close").onclick=()=>$("#modal").close();$("#points").onclick=e=>{const b=e.target.closest("button[data-id]");if(b)discover(b.dataset.id)};
document.addEventListener("keydown",e=>{if($("#journey").hidden)return;if(e.key==="ArrowRight")travel(i+1);if(e.key==="ArrowLeft")travel(i-1);if(e.key==="Escape")$("#modal").close()});
render();