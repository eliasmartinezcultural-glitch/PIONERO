export const ENTITY_TYPES=["era","event","person","place","institution","object","media","source"];
export const EVIDENCE_TYPES=["documented","testimony","reconstruction","interpretation"];
export const RESEARCH_STATUSES=["verified","partial","pending"];
export const ENTITY_REQUIRED_FIELDS={
  era:["id","label","title","status"],
  event:["id","eraId","title","evidence","status"],
  person:["id","title","evidence","status"],
  place:["id","title","evidence","status"],
  institution:["id","title","evidence","status"],
  object:["id","title","evidence","status"],
  media:["id","title","kind","status"],
  source:["id","title","type","status"]
};
export const RELATION_TYPES=["belongs_to","located_in","involves","establishes","documented_by","depicts","precedes","transforms"];
