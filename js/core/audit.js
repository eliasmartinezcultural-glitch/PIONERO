import {EVIDENCE_TYPES,RESEARCH_STATUSES} from "../history/schema.js";

const REQUIRED_DOM_IDS=[
  "app","experience","welcomeView","journeyView","sceneView","startButton","timelineRail","eraGrid",
  "scene","memoryPoints","previousEra","discoverButton","nextEra","territoryButton","compareButton",
  "territoryPanel","territoryMap","territoryLegend","territoryInfo","discoveryPanel","modal",
  "sourceContent","closeModal"
];

const collectionForType={
  era:"eras",event:"events",person:"people",place:"places",institution:"institutions",
  object:"objects",media:"media",source:"sources"
};

const issue=(scope,id,message)=>({level:"error",scope,id:id??null,message});

function uniqueIds(items,scope,issues){
  const seen=new Set();
  for(const item of items||[]){
    if(!item?.id){issues.push(issue(scope,null,"registro sin id"));continue;}
    if(seen.has(item.id))issues.push(issue(scope,item.id,"id duplicado"));
    seen.add(item.id);
  }
  return seen;
}

function validateContent(content,history,issues){
  const eraIds=new Set(history.eras.map(era=>era.id));
  const entityIds=new Set();
  for(const type of Object.keys(collectionForType)){
    for(const item of history[collectionForType[type]]||[])entityIds.add(item.id);
  }

  for(const era of history.eras){
    if(!content.scenes?.[era.id])issues.push(issue("content.scene",era.id,"falta escena de presentación para la era"));
    if(!Array.isArray(content.points?.[era.id]))issues.push(issue("content.points",era.id,"falta colección de huellas"));
  }

  for(const [eraId,points] of Object.entries(content.points||{})){
    if(!eraIds.has(eraId))issues.push(issue("content.points",eraId,"huellas para una era inexistente"));
    const seen=new Set();
    for(const point of points||[]){
      if(!point.id)issues.push(issue("content.point",eraId,"huella sin id"));
      else if(seen.has(point.id))issues.push(issue("content.point",point.id,"id de huella duplicado dentro de la era"));
      else seen.add(point.id);
      if(point.entityId&&!entityIds.has(point.entityId))issues.push(issue("content.point",point.id,"entidad inexistente: "+point.entityId));
      if(!Number.isFinite(point.x)||point.x<0||point.x>100)issues.push(issue("content.point",point.id,"coordenada x fuera de 0..100"));
      if(!Number.isFinite(point.y)||point.y<0||point.y>100)issues.push(issue("content.point",point.id,"coordenada y fuera de 0..100"));
      if(!EVIDENCE_TYPES.includes(point.kind))issues.push(issue("content.point",point.id,"tipo de evidencia inválido: "+point.kind));
    }
  }
}

function validateTerritory(territory,history,issues){
  const eraIds=new Set(history.eras.map(era=>era.id));
  const placeIds=new Set((history.places||[]).map(place=>place.id));
  const layerIds=uniqueIds(territory.layers,"territory.layer",issues);
  const nodeIds=uniqueIds(territory.nodes,"territory.node",issues);
  const connectionIds=uniqueIds(territory.connections,"territory.connection",issues);

  for(const layer of territory.layers||[]){
    if(!RESEARCH_STATUSES.includes(layer.status))issues.push(issue("territory.layer",layer.id,"status inválido"));
  }
  for(const node of territory.nodes||[]){
    if(!layerIds.has(node.layerId))issues.push(issue("territory.node",node.id,"capa inexistente: "+node.layerId));
    if(node.placeId&&!placeIds.has(node.placeId))issues.push(issue("territory.node",node.id,"lugar inexistente: "+node.placeId));
    for(const eraId of node.eraIds||[])if(!eraIds.has(eraId))issues.push(issue("territory.node",node.id,"era inexistente: "+eraId));
    if(!Number.isFinite(node.x)||node.x<0||node.x>100)issues.push(issue("territory.node",node.id,"x fuera de 0..100"));
    if(!Number.isFinite(node.y)||node.y<0||node.y>100)issues.push(issue("territory.node",node.id,"y fuera de 0..100"));
  }
  for(const connection of territory.connections||[]){
    if(!nodeIds.has(connection.from)||!nodeIds.has(connection.to))issues.push(issue("territory.connection",connection.id,"nodo de conexión inexistente"));
    if(connection.from===connection.to)issues.push(issue("territory.connection",connection.id,"conexión autorreferente"));
  }
  if(territory.mode!=="schematic")issues.push(issue("territory","mode","la capa territorial debe permanecer en modo schematic hasta contar con geometría documental"));
}

function validateVersions(content,history,territory,issues){
  const versions=[content.project?.version,history.version,territory.version].filter(Boolean);
  if(new Set(versions).size>1)issues.push(issue("versions","project","versiones internas desalineadas: "+versions.join(" / ")));
}

function validateDom(issues){
  const ids=[...document.querySelectorAll("[id]")].map(node=>node.id).filter(Boolean);
  const counts=new Map();
  for(const id of ids)counts.set(id,(counts.get(id)||0)+1);
  for(const [id,count] of counts)if(count>1)issues.push(issue("dom",id,"id HTML duplicado ("+count+")"));
  for(const id of REQUIRED_DOM_IDS)if(!document.getElementById(id))issues.push(issue("dom",id,"elemento requerido ausente"));
}

export function auditPionero({content,history,territory}){
  const issues=[];
  validateVersions(content,history,territory,issues);
  validateContent(content,history,issues);
  validateTerritory(territory,history,issues);
  validateDom(issues);
  return {
    valid:issues.length===0,
    issues,
    summary:{
      eras:history.eras.length,
      events:history.events.length,
      points:Object.values(content.points||{}).reduce((sum,items)=>sum+items.length,0),
      territoryNodes:territory.nodes.length,
      territoryConnections:territory.connections.length,
      sources:history.sources.length
    }
  };
}
