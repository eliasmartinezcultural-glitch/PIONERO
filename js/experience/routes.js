export const HISTORICAL_ROUTES={
  "before-1973":[
    {id:"route-landscape",title:"El campo abierto",steps:["meseta","río Neuquén","monte"] ,status:"reconstruction"}
  ],
  "1968":[
    {id:"route-origin",title:"Del campo al río",steps:["campo El Chañar","río Neuquén","primeras decisiones de transformación"],status:"documented"}
  ],
  "1969":[
    {id:"route-water",title:"El agua cambia el paisaje",steps:["río Neuquén","bombeo","primeros cultivos"],status:"documented"}
  ],
  "1973":[
    {id:"route-town",title:"Del área productiva al pueblo",steps:["chacras","núcleo urbano","trabajadores"],status:"documented"}
  ],
  "1974":[
    {id:"route-community",title:"La organización de la comunidad",steps:["pueblo","instituciones","servicios"],status:"partial"}
  ],
  "1975":[
    {id:"route-community-growth",title:"Primeras huellas comunitarias",steps:["producción","escuela","actividad local"],status:"partial"}
  ],
  present:[
    {id:"route-today",title:"El territorio de hoy",steps:["meseta","río","producción","localidad"],status:"documented"}
  ]
};

export function routesForEra(eraId){
  return (HISTORICAL_ROUTES[eraId]||[]).map(route=>({...route,steps:[...route.steps]}));
}
