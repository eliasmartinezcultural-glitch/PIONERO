export function createHistoryRegistry(model){
  const collections={
    eras:model.eras||[],events:model.events||[],people:model.people||[],places:model.places||[],institutions:model.institutions||[],objects:model.objects||[],relations:model.relations||[],sources:model.sources||[]
  };
  const indexes=Object.fromEntries(Object.entries(collections).map(([type,items])=>[type,new Map(items.map(item=>[item.id,item]))]));
  return {
    get(type,id){return indexes[type]?.get(id)||null},
    all(type){return [...(indexes[type]?.values()||[])]},
    related(type,id,relationType){return collections.relations.filter(r=>r.type===relationType&&((r.from.type===type&&r.from.id===id)||(r.to.type===type&&r.to.id===id))).map(r=>r.from.type===type&&r.from.id===id?r.to:r.from)},
    count(){return Object.fromEntries(Object.entries(collections).map(([k,v])=>[k,v.length]))}
  };
}
