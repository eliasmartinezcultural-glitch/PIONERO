export const HISTORY={
  version:"0.4.1",
  eras:[
    {id:"before-1973",label:"ANTES DE 1973",title:"El territorio antes del pueblo",status:"partial"},
    {id:"1968",label:"1968",title:"Comienza una nueva etapa productiva",status:"partial"},
    {id:"1969",label:"1969",title:"El riego transforma el territorio",status:"partial"},
    {id:"1973",label:"1973",title:"Fundación de San Patricio del Chañar",status:"verified"},
    {id:"1974",label:"1974",title:"Primeras instituciones y autoridades",status:"verified"},
    {id:"1975",label:"1975",title:"La localidad comienza a consolidar su vida cotidiana",status:"partial"},
    {id:"present",label:"HOY",title:"San Patricio del Chañar en el presente",status:"partial"}
  ],
  events:[
    {id:"event-gasparri-1968",eraId:"1968",title:"La firma Gasparri adquiere tierras en el área del Chañar",description:"Los antecedentes de la transformación productiva del área forman parte del recorrido histórico.",evidence:"documented",status:"partial",sourceIds:["source-cfi-2024"],mediaIds:[]},
    {id:"event-irrigation-1969",eraId:"1969",title:"Comienzan obras de sistematización del riego",description:"El desarrollo del riego modifica las posibilidades productivas del territorio.",evidence:"documented",status:"partial",sourceIds:["source-cfi-2024","source-legislatura-2019"],mediaIds:[]},
    {id:"event-foundation-1973",eraId:"1973",title:"Fundación de San Patricio del Chañar",description:"La localidad fue fundada el 21 de mayo de 1973, según registros oficiales provinciales.",evidence:"documented",status:"verified",sourceIds:["source-neuqueninforma-2014","source-neuqueninforma-2016","source-estadistica-neuquen"],mediaIds:[]},
    {id:"event-commission-1974",eraId:"1974",title:"Puesta en funcionamiento de la Comisión de Fomento",description:"La Comisión de Fomento y sus autoridades comienzan a funcionar en 1974.",evidence:"documented",status:"verified",sourceIds:["source-neuqueninforma-2014","source-neuqueninforma-2016","source-neuqueneldesafio-2014"],mediaIds:[]},
    {id:"event-first-industrial-fruit-1975",eraId:"1975",title:"Primeras cantidades industriales de fruta",description:"Una reseña oficial recuerda que al año siguiente comenzaron las primeras cantidades industriales de fruta.",evidence:"documented",status:"partial",sourceIds:["source-neuqueninforma-2014"],mediaIds:[]},
    {id:"event-school-1975",eraId:"1975",title:"La Escuela N.º 273 aparece en la cronología local",description:"La cronología secundaria consultada ubica el funcionamiento de la Escuela N.º 273 en 1975; queda marcado como parcial hasta incorporar documentación primaria.",evidence:"documented",status:"partial",sourceIds:["source-masneuquen-2024"],mediaIds:[]}
  ],
  people:[
    {id:"person-roberto-gasparri",title:"Roberto Gasparri",description:"Figura vinculada a los antecedentes productivos y territoriales del área.",evidence:"documented",status:"partial",sourceIds:["source-neuqueninforma-2013","source-neuqueninforma-2010"]},
    {id:"person-tulio-ferrareso",title:"Tulio Eduardo Ferrareso",description:"La documentación consultada lo vincula con la primera Comisión de Fomento.",evidence:"documented",status:"partial",sourceIds:["source-neuqueninforma-2010","source-masneuquen-2024"]},
    {id:"person-felipe-sapag",title:"Felipe Sapag",description:"Gobernador provincial durante la creación de la Comisión de Fomento.",evidence:"documented",status:"verified",sourceIds:["source-neuqueninforma-2016"]}
  ],
  places:[
    {id:"place-chanar",title:"San Patricio del Chañar",description:"El territorio que da nombre y sentido al recorrido.",evidence:"documented",status:"verified",sourceIds:["source-neuqueninforma-2014","source-estadistica-neuquen"],mediaIds:[]},
    {id:"place-rio-neuquen",title:"Río Neuquén",description:"Fuente de agua asociada a las obras de riego del desarrollo productivo.",evidence:"documented",status:"partial",sourceIds:["source-cfi-2024"],mediaIds:[]}
  ],
  institutions:[],
  objects:[],
  media:[],
  relations:[
    {id:"rel-gasparri-place",type:"located_in",from:{type:"event",id:"event-gasparri-1968"},to:{type:"place",id:"place-chanar"}},
    {id:"rel-irrigation-place",type:"located_in",from:{type:"event",id:"event-irrigation-1969"},to:{type:"place",id:"place-chanar"}},
    {id:"rel-foundation-place",type:"located_in",from:{type:"event",id:"event-foundation-1973"},to:{type:"place",id:"place-chanar"}},
    {id:"rel-commission-place",type:"located_in",from:{type:"event",id:"event-commission-1974"},to:{type:"place",id:"place-chanar"}},
    {id:"rel-fruit-place",type:"located_in",from:{type:"event",id:"event-first-industrial-fruit-1975"},to:{type:"place",id:"place-chanar"}},
    {id:"rel-school-place",type:"located_in",from:{type:"event",id:"event-school-1975"},to:{type:"place",id:"place-chanar"}},
    {id:"rel-foundation-era",type:"belongs_to",from:{type:"event",id:"event-foundation-1973"},to:{type:"era",id:"1973"}},
    {id:"rel-commission-era",type:"belongs_to",from:{type:"event",id:"event-commission-1974"},to:{type:"era",id:"1974"}},
    {id:"rel-fruit-era",type:"belongs_to",from:{type:"event",id:"event-first-industrial-fruit-1975"},to:{type:"era",id:"1975"}},
    {id:"rel-school-era",type:"belongs_to",from:{type:"event",id:"event-school-1975"},to:{type:"era",id:"1975"}},
    {id:"rel-foundation-gasparri",type:"involves",from:{type:"event",id:"event-foundation-1973"},to:{type:"person",id:"person-roberto-gasparri"}},
    {id:"rel-commission-felipe",type:"involves",from:{type:"event",id:"event-commission-1974"},to:{type:"person",id:"person-felipe-sapag"}}
  ],
  sources:[
    {id:"source-neuqueninforma-2014",title:"Gobierno de la Provincia del Neuquén — reseña histórica de 2014",type:"institutional",status:"verified",url:"https://www.neuqueninforma.gob.ar/noticias/2014/05/22/48785-jorge-sapag-asistira-al-41-aniversario-de-san-patricio-del-chanar"},
    {id:"source-neuqueninforma-2016",title:"Gobierno de la Provincia del Neuquén — 43 años de San Patricio del Chañar",type:"institutional",status:"verified",url:"https://www.neuqueninforma.gob.ar/noticias/2016/05/20/81371-san-patricio-del-chanar-festeja-manana-sus-43-anos"},
    {id:"source-neuqueninforma-2013",title:"Gobierno de la Provincia del Neuquén — historia de la localidad",type:"institutional",status:"verified",url:"https://www.neuqueninforma.gob.ar/noticias/2013/05/17/29151-ana-pechen-preside-la-ceremonia-aniversario-de-san-patricio-del-chanar"},
    {id:"source-neuqueninforma-2010",title:"Gobierno de la Provincia del Neuquén — discurso del 37.º aniversario",type:"institutional",status:"verified",url:"https://www.neuqueninforma.gob.ar/noticias/2010/05/21/8271-discurso-del-gobernador-jorge-sapag-en-el-37-aniversario-de-san-patricio-del-chanar"},
    {id:"source-estadistica-neuquen",title:"Dirección Provincial de Estadística y Censos — reseña histórica municipal",type:"government",status:"verified",url:"https://www.estadisticaneuquen.gob.ar/static/archivos/Publicaciones/InfMunBasica/Basica20062007/Inicio/cartografia/San_Patricio.pdf"},
    {id:"source-cfi-2024",title:"Consejo Federal de Inversiones — planificación territorial de Añelo, San Patricio del Chañar y Sauzal Bonito",type:"institutional",status:"partial",url:"https://www.argentina.gob.ar/sites/default/files/plan_de_ordenamiento_territorial_y_ambiental_para_las_localidades_des_anelo_san_patricio_del_chanar_sauzal_bonito_0.pdf"},
    {id:"source-legislatura-2019",title:"Honorable Legislatura del Neuquén — 46.º aniversario de San Patricio del Chañar",type:"institutional",status:"verified",url:"https://www.legislaturaneuquen.gob.ar/SVRFILES/hln/documentos/DiaSesio/XLVIII/DXLVIII_08.pdf"},
    {id:"source-neuqueneldesafio-2014",title:"Neuquén el Desafío — acto del 8 de abril de 1974",type:"secondary",status:"partial",url:"https://www.neuqueneldesafio.com.ar/blog/62-san-patricio-del-chanar/"},
    {id:"source-masneuquen-2024",title:"Más Neuquén — cronología de San Patricio del Chañar",type:"secondary",status:"partial",url:"https://masneuquen.com/efemerides-cronologia-de-san-patricio-del-chanar-a-traves-de-los-anos/"}
  ]
};