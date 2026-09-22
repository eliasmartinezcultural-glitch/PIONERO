export function createHistoryQueries(registry){
  return {
    eventsByEra(eraId){return registry.all("events").filter(event=>event.eraId===eraId);},
    entitiesBySource(sourceId){
      return ["events","people","places","institutions","objects","media"].flatMap(type=>registry.all(type).filter(item=>(item.sourceIds||[]).includes(sourceId)));
    },
    sourcesFor(entity){return (entity?.sourceIds||[]).map(id=>registry.get("sources",id)).filter(Boolean);},
    relatedEntities(type,id,relationType=null){
      return registry.related(type,id,relationType).map(ref=>registry.get(ref.type==="media"?"media":ref.type+"s",ref.id)).filter(Boolean);
    },
    search(term){
      const q=String(term||"").trim().toLocaleLowerCase("es");
      if(!q)return [];
      return ["eras","events","people","places","institutions","objects","media","sources"].flatMap(type=>registry.all(type).filter(item=>[item.title,item.label,item.description].filter(Boolean).some(value=>String(value).toLocaleLowerCase("es").includes(q))));
    },
    timeline(){return registry.all("eras").map(era=>({...era,events:this.eventsByEra(era.id)}));}
  };
}
