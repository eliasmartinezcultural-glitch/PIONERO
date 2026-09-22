import {ENTITY_REQUIRED_FIELDS,EVIDENCE_TYPES,RESEARCH_STATUSES,ENTITY_TYPES,RELATION_TYPES} from "./schema.js";

const collectionName=type=>type==="era"?"eras":type==="media"?"media":type+"s";

export function validateHistory(model){
  const issues=[];
  const globalIds=new Map();

  for(const type of ENTITY_TYPES){
    const collection=model[collectionName(type)]||[];
    const required=ENTITY_REQUIRED_FIELDS[type]||[];
    const local=new Set();

    for(const item of collection){
      if(!item.id)issues.push({level:"error",type,id:null,message:"entidad sin id"});
      if(item.id&&local.has(item.id))issues.push({level:"error",type,id:item.id,message:"id duplicado dentro de la colección"});
      if(item.id)local.add(item.id);

      if(item.id&&globalIds.has(item.id))issues.push({level:"error",type,id:item.id,message:"id duplicado globalmente con "+globalIds.get(item.id)});
      else if(item.id)globalIds.set(type+":"+item.id,type);

      for(const field of required)if(item[field]===undefined||item[field]===null||item[field]==="")issues.push({level:"error",type,id:item.id,message:"campo obligatorio ausente: "+field});

      if(type!=="era"&&type!=="media"&&!EVIDENCE_TYPES.includes(item.evidence))
        issues.push({level:"error",type,id:item.id,message:"evidence inválido"});
      if(!RESEARCH_STATUSES.includes(item.status))
        issues.push({level:"error",type,id:item.id,message:"status de investigación inválido"});

      for(const sourceId of item.sourceIds||[])
        if(!model.sources?.some(source=>source.id===sourceId))
          issues.push({level:"error",type,id:item.id,message:"fuente inexistente: "+sourceId});

      if(type==="event"&&!model.eras?.some(era=>era.id===item.eraId))
        issues.push({level:"error",type,id:item.id,message:"era inexistente: "+item.eraId});
    }
  }

  for(const relation of model.relations||[]){
    if(!relation.id)issues.push({level:"error",type:"relation",message:"relación sin id"});
    if(relation.id&&globalIds.has(relation.id))issues.push({level:"error",type:"relation",id:relation.id,message:"id de relación colisiona con entidad"});
    if(!RELATION_TYPES.includes(relation.type))issues.push({level:"error",type:"relation",id:relation.id,message:"tipo de relación inválido: "+relation.type});
    for(const side of [relation.from,relation.to]){
      const key=side&&ENTITY_TYPES.includes(side.type)?side.type+":"+side.id:"";
      if(!side||!ENTITY_TYPES.includes(side.type)||!globalIds.has(key))
        issues.push({level:"error",type:"relation",id:relation.id,message:"referencia inexistente o inválida: "+key});
    }
  }

  return {valid:issues.every(issue=>issue.level!=="error"),issues};
}
