export const MEDIA_CATALOG={
  visualReferences:[
    {id:"ref-chanar-current",title:"San Patricio del Chañar · referencia actual",type:"reference",evidence:"documented",status:"verified",url:"https://commons.wikimedia.org/wiki/File:San_Patricio_del_Chañar.png",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/San_Patricio_del_Chañar.png",use:"Escala cromática y relación actual entre asentamiento y territorio. No representa el pasado."},
    {id:"ref-meseta-santa-cruz",title:"Meseta patagónica · referencia morfológica",type:"reference",evidence:"reconstruction",status:"partial",url:"https://commons.wikimedia.org/wiki/File:Paisaje_Meseta_Patag%C3%B3nica_Santa_Cruz%2C_Argentina2.jpg",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Paisaje%20Meseta%20Patag%C3%B3nica%20Santa%20Cruz%2C%20Argentina2.jpg",use:"Referencia visual para una meseta árida amplia, sin convertirla en fotografía de Chañar."},
    {id:"ref-meseta-paso-sapo",title:"Meseta patagónica · referencia de textura",type:"reference",evidence:"reconstruction",status:"partial",url:"https://commons.wikimedia.org/wiki/File:Meseta_patagonia_1.JPG",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Meseta_patagonia_1.JPG",use:"Referencia de suelo, horizonte y vegetación esteparia baja."},
    {id:"ref-rivers-neuquen",title:"Ríos Neuquén y Agrio · referencia territorial",type:"reference",evidence:"documented",status:"verified",url:"https://commons.wikimedia.org/wiki/File:The_Neuqu%C3%A9n_and_Agrio_rivers_in_Patagonia%2C_Argentina_(Copernicus_2025-10-05).webp",image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/The%20Neuqu%C3%A9n%20and%20Agrio%20rivers%20in%20Patagonia%2C%20Argentina%20(Copernicus%202025-10-05).webp",use:"Referencia de la relación río-corredor verde-meseta. No es una imagen histórica de Chañar."}
  ],
  reconstructionRules:[
    "No usar dunas como paisaje base: las fuentes consultadas describen meseta desértica, bardas y estepa patagónica.",
    "Priorizar horizonte amplio, superficie de meseta, suelo árido, arbustos bajos y espinosos, y corredor fluvial.",
    "La vegetación densa debe aparecer sólo donde la evidencia indique riego o producción.",
    "El contraste narrativo principal debe ser: monte/meseta → agua → producción → núcleo urbano.",
    "Las imágenes de otros lugares son referencias morfológicas, no pruebas de que así se veía Chañar."
  ]
};

export function mediaFor(type="visualReferences"){
  return [...(MEDIA_CATALOG[type]||[])];
}
