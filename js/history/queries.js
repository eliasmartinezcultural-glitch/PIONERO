export function createHistoryQueries(registry){
  const TYPES=["events","people","places","institutions","objects","media"];
  const pluralType=type=>registry.pluralType(type);
  return {
    eventsByEra(eraId){return registry.all("events").filter(event=>event.eraId===eraId);},
    entitiesBySource(sourceId){return TYPES.flatMap(type=>registry.all(type).filter(item=>(item.sourceIds||[]).includes(sourceId)));},
    sourcesFor(entity){return (entity?.sourceIds||[]).map(id=>registry.get("sources",id)).filter(Boolean);},
    relatedEntities(type,id,relationType=null){
      return registry.related(type,id,relationType).map(ref=>registry.get(pluralType(ref.type),ref.id)).filter(Boolean);
    },
    entityNetwork(type,id){
      const related=this.relatedEntities(type,id);
      return {entity:registry.get(pluralType(type),id),related};
    },
    search(term){
      const q=String(term||"").trim().toLocaleLowerCase("es");
      if(!q)return [];
      return ["eras",...TYPES,"sources"].flatMap(type=>registry.all(type).filter(item=>[item.title,item.label,item.description,item.transcript].filter(Boolean).some(value=>String(value).toLocaleLowerCase("es").includes(q))));
    },
    timeline(){return registry.all("eras").map(era=>({...era,events:this.eventsByEra(era.id)}));},
    researchQueue(){
      return ["events","people","places","institutions","objects","media"].flatMap(type=>registry.all(type).filter(item=>item.status!=="verified").map(item=>({...item,type})));
    },
    mediaFor(entity){
      if(!entity)return [];
      const direct=(entity.mediaIds||[]).map(id=>registry.get("media",id)).filter(Boolean);
      const related=this.relatedEntities(entity.__type||"",entity.id,"depicts").filter(Boolean);
      return [...new Map([...direct,...related].map(item=>[item.id,item])).values()];
    }
  };
}