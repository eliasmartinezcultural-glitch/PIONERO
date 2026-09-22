export const TERRITORY={
  version:"0.4.0",
  mode:"schematic",
  title:"El territorio",
  description:"Una representación didáctica para entender relaciones espaciales. No es un mapa catastral ni reproduce coordenadas geográficas.",
  layers:[
    {id:"river",label:"Río Neuquén",kind:"water",status:"partial",description:"Curso de agua asociado a las obras de riego del desarrollo productivo."},
    {id:"settlement",label:"Área de la localidad",kind:"settlement",status:"partial",description:"Área esquemática de la localidad para contextualizar el recorrido histórico."},
    {id:"productive",label:"Área productiva",kind:"production",status:"partial",description:"Área esquemática vinculada al proceso de transformación productiva e irrigación."}
  ],
  nodes:[
    {id:"territory-chanar",title:"San Patricio del Chañar",placeId:"place-chanar",kind:"settlement",x:58,y:55,eraIds:["before-1973","1968","1969","1973","1974","1975","present"],layerId:"settlement"},
    {id:"territory-river",title:"Río Neuquén",placeId:"place-rio-neuquen",kind:"water",x:79,y:49,eraIds:["1969","1973","1974","1975","present"],layerId:"river"},
    {id:"territory-production",title:"Área productiva en transformación",placeId:"place-chanar",kind:"production",x:42,y:61,eraIds:["1968","1969","1973","1974","1975"],layerId:"productive"}
  ],
  connections:[
    {id:"connection-river-production",from:"territory-river",to:"territory-production",type:"water-to-production"},
    {id:"connection-production-settlement",from:"territory-production",to:"territory-chanar",type:"production-to-settlement"}
  ]
};