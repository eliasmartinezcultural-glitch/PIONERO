export const RECONSTRUCTION_VOCABULARY={
  "before-1973":{
    title:"El Chañar antes de la transformación",
    atmosphere:"open-arid",
    layers:[
      {id:"meseta",label:"Meseta desértica",strength:1,evidence:"documented",status:"verified"},
      {id:"barda",label:"Bardas",strength:.72,evidence:"documented",status:"verified"},
      {id:"monte",label:"Monte y estepa baja",strength:.9,evidence:"documented",status:"verified"},
      {id:"river",label:"Corredor del río Neuquén",strength:.48,evidence:"documented",status:"verified"},
      {id:"settlement",label:"Núcleo urbano",strength:.02,evidence:"reconstruction",status:"partial"},
      {id:"irrigation",label:"Riego",strength:0,evidence:"reconstruction",status:"partial"}
    ],
    note:"Reconstrucción morfológica: meseta, bardas, monte/estepa y corredor fluvial. No es una fotografía histórica."
  },
  "1968":{
    title:"1968 · monte bruto y comienzo de la transformación",
    atmosphere:"open-arid",
    layers:[
      {id:"meseta",label:"Meseta desértica",strength:1,evidence:"documented",status:"verified"},
      {id:"barda",label:"Bardas",strength:.72,evidence:"documented",status:"verified"},
      {id:"monte",label:"Monte bruto",strength:.94,evidence:"documented",status:"verified"},
      {id:"river",label:"Río Neuquén",strength:.5,evidence:"documented",status:"verified"},
      {id:"irrigation",label:"Obras iniciales",strength:.16,evidence:"documented",status:"verified"},
      {id:"production",label:"Producción",strength:.12,evidence:"documented",status:"verified"},
      {id:"settlement",label:"Núcleo urbano",strength:.03,evidence:"reconstruction",status:"partial"}
    ],
    note:"La imagen debe conservar la sensación de territorio abierto y árido, incorporando sólo las huellas documentadas de transformación."
  },
  "1969":{
    title:"1969 · el agua cambia el paisaje",
    atmosphere:"irrigation",
    layers:[
      {id:"meseta",label:"Meseta",strength:1,evidence:"documented",status:"verified"},
      {id:"barda",label:"Bardas",strength:.7,evidence:"documented",status:"verified"},
      {id:"monte",label:"Estepa y monte",strength:.65,evidence:"documented",status:"verified"},
      {id:"river",label:"Río Neuquén",strength:.72,evidence:"documented",status:"verified"},
      {id:"irrigation",label:"Riego",strength:.72,evidence:"documented",status:"verified"},
      {id:"production",label:"Primeros cultivos",strength:.46,evidence:"documented",status:"verified"},
      {id:"settlement",label:"Asentamiento",strength:.08,evidence:"reconstruction",status:"partial"}
    ],
    note:"La transformación visual nace del agua: el corredor fluvial conecta con el área productiva."
  },
  "1973":{
    title:"1973 · fundación y territorio productivo",
    atmosphere:"foundation",
    layers:[
      {id:"meseta",label:"Meseta",strength:1,evidence:"documented",status:"verified"},
      {id:"barda",label:"Bardas",strength:.68,evidence:"documented",status:"verified"},
      {id:"river",label:"Río Neuquén",strength:.74,evidence:"documented",status:"verified"},
      {id:"production",label:"Área productiva",strength:.62,evidence:"documented",status:"verified"},
      {id:"roads",label:"Conexiones",strength:.32,evidence:"reconstruction",status:"partial"},
      {id:"settlement",label:"Núcleo urbano",strength:.34,evidence:"documented",status:"verified"}
    ],
    note:"La fundación se muestra como aparición de un núcleo urbano ligado al territorio productivo, sin inventar su forma."
  },
  "1974":{
    title:"1974 · organización de la nueva localidad",
    atmosphere:"institution",
    layers:[
      {id:"meseta",label:"Meseta",strength:1,evidence:"documented",status:"verified"},
      {id:"river",label:"Río Neuquén",strength:.75,evidence:"documented",status:"verified"},
      {id:"production",label:"Producción",strength:.66,evidence:"documented",status:"verified"},
      {id:"roads",label:"Conexiones",strength:.38,evidence:"reconstruction",status:"partial"},
      {id:"settlement",label:"Localidad",strength:.46,evidence:"documented",status:"verified"},
      {id:"institutions",label:"Instituciones",strength:.2,evidence:"reconstruction",status:"partial"}
    ],
    note:"Las instituciones se incorporan como capa narrativa, no como edificios reconstruidos sin evidencia."
  },
  "1975":{
    title:"1975 · producción, escuela y comunidad",
    atmosphere:"community",
    layers:[
      {id:"meseta",label:"Meseta",strength:1,evidence:"documented",status:"verified"},
      {id:"river",label:"Río Neuquén",strength:.76,evidence:"documented",status:"verified"},
      {id:"production",label:"Producción",strength:.72,evidence:"documented",status:"verified"},
      {id:"roads",label:"Conexiones",strength:.45,evidence:"reconstruction",status:"partial"},
      {id:"settlement",label:"Localidad",strength:.55,evidence:"documented",status:"verified"},
      {id:"community",label:"Vida comunitaria",strength:.3,evidence:"reconstruction",status:"partial"}
    ],
    note:"La escuela y la producción aparecen como huellas de comunidad; no se reconstruyen edificios sin fuentes visuales suficientes."
  },
  "present":{
    title:"Hoy · el territorio transformado",
    atmosphere:"present",
    layers:[
      {id:"meseta",label:"Meseta y bardas",strength:1,evidence:"documented",status:"verified"},
      {id:"river",label:"Río Neuquén",strength:.8,evidence:"documented",status:"verified"},
      {id:"production",label:"Mosaico productivo",strength:.9,evidence:"documented",status:"verified"},
      {id:"roads",label:"Red vial",strength:.88,evidence:"documented",status:"verified"},
      {id:"settlement",label:"Localidad",strength:.92,evidence:"documented",status:"verified"}
    ],
    note:"El presente debe poder compararse con las capas anteriores usando imágenes y cartografía verificables."
  }
};

export function reconstructionFor(eraId){
  return RECONSTRUCTION_VOCABULARY[eraId]||RECONSTRUCTION_VOCABULARY.present;
}
export function reconstructionLayers(eraId){
  return reconstructionFor(eraId).layers.map(layer=>({...layer}));
}
