const TYPES=["era","event","person","place","institution","object","source"];
const EVIDENCE=["documented","testimony","reconstruction","interpretation"];
const STATUS=["verified","partial","pending"];
export function validateHistory(model){
  const issues=[];
  const check=(type,items,requiredEvidence=false)=>{
    const ids=new Set();
    for(const item of items||[]){
      if(!item.id)issues.push({level:"error",type,id:null,message:type+" sin id"});
      else if(ids.has(item.id))issues.push({level:"error",type,id:item.id,message:"id duplicado"}); else ids.add(item.id);
      if(requiredEvidence&&!EVIDENCE.includes(item.evidence))issues.push({level:"error",type,id:item.id,message:"evidence inválido"});
      if(!STATUS.includes(item.status))issues.push({level:"error",type,id:item.id,message:"status de investigación inválido"});
    }
  };
  check("era",model.eras); check("event",model.events,true); check("person",model.people,true); check("place",model.places,true); check("institution",model.institutions,true); check("object",model.objects,true); check("source",model.sources);
  const known=new Set(TYPES.flatMap(t=>(model[t+"s"]||[]).map(x=>t+":"+x.id)));
  for(const r of model.relations||[]){if(!r.id)issues.push({level:"error",type:"relation",message:"relación sin id"});for(const side of [r.from,r.to])if(!side||!known.has(side.type+":"+side.id))issues.push({level:"error",type:"relation",id:r.id,message:"referencia inexistente: "+(side?.type||"?")+":"+(side?.id||"?")});}
  return {valid:issues.every(x=>x.level!=="error"),issues};
}
