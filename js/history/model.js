export const HISTORY={
  eras:[
    {id:"before-1973",label:"ANTES DE 1973",title:"Antecedentes del territorio",status:"pending"},
    {id:"1973",label:"1973",title:"Fundación de San Patricio del Chañar",status:"verified"},
    {id:"1974",label:"1974",title:"Comisión de Fomento",status:"verified"},
    {id:"present",label:"HOY",title:"San Patricio del Chañar en el presente",status:"partial"}
  ],
  events:[
    {id:"event-foundation-1973",eraId:"1973",title:"Fundación de la localidad",evidence:"documented",status:"verified",sourceIds:["source-neuqueninforma-2014"]},
    {id:"event-commission-1974",eraId:"1974",title:"Creación de la Comisión de Fomento",evidence:"documented",status:"verified",sourceIds:["source-neuqueninforma-2014"]}
  ],
  people:[],places:[{id:"place-chanar",title:"San Patricio del Chañar",evidence:"documented",status:"partial",sourceIds:["source-neuqueninforma-2014"]}],institutions:[],objects:[],
  relations:[
    {id:"rel-foundation-era",type:"belongs_to",from:{type:"event",id:"event-foundation-1973"},to:{type:"era",id:"1973"}},
    {id:"rel-commission-era",type:"belongs_to",from:{type:"event",id:"event-commission-1974"},to:{type:"era",id:"1974"}},
    {id:"rel-foundation-place",type:"located_in",from:{type:"event",id:"event-foundation-1973"},to:{type:"place",id:"place-chanar"}},
    {id:"rel-commission-place",type:"located_in",from:{type:"event",id:"event-commission-1974"},to:{type:"place",id:"place-chanar"}}
  ],
  sources:[{id:"source-neuqueninforma-2014",title:"Gobierno de la Provincia del Neuquén — aniversario de San Patricio del Chañar",type:"institutional",status:"verified",url:"https://www.neuqueninforma.gob.ar/noticias/2014/05/22/48785-jorge-sapag-asistira-al-41-aniversario-de-san-patricio-del-chanar"}]
};
