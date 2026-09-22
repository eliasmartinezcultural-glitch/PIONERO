export const TEMPORAL_STATES = {
  "before-1973": {
    phase:"antecedentes",
    terrain:0.24, water:0.46, production:0.12, settlement:0.04, roads:0.08,
    atmosphere:"origin", label:"ANTES · TERRITORIO"
  },
  "1968": {
    phase:"transformacion",
    terrain:0.30, water:0.48, production:0.28, settlement:0.06, roads:0.12,
    atmosphere:"origin", label:"1968 · TRANSFORMACIÓN"
  },
  "1969": {
    phase:"riego",
    terrain:0.34, water:0.62, production:0.44, settlement:0.08, roads:0.16,
    atmosphere:"irrigation", label:"1969 · AGUA Y RIEGO"
  },
  "1973": {
    phase:"fundacion",
    terrain:0.38, water:0.66, production:0.54, settlement:0.30, roads:0.24,
    atmosphere:"foundation", label:"1973 · FUNDACIÓN"
  },
  "1974": {
    phase:"instituciones",
    terrain:0.40, water:0.68, production:0.58, settlement:0.42, roads:0.31,
    atmosphere:"institution", label:"1974 · ORGANIZACIÓN"
  },
  "1975": {
    phase:"comunidad",
    terrain:0.42, water:0.70, production:0.66, settlement:0.50, roads:0.38,
    atmosphere:"community", label:"1975 · COMUNIDAD"
  },
  "present": {
    phase:"presente",
    terrain:0.48, water:0.74, production:0.78, settlement:0.90, roads:0.86,
    atmosphere:"present", label:"HOY · PUNTO DE LLEGADA"
  }
};

export function getTemporalState(eraId){
  return TEMPORAL_STATES[eraId] || TEMPORAL_STATES["present"];
}

export function interpolateTemporalState(fromId,toId,t){
  const a=getTemporalState(fromId),b=getTemporalState(toId),n=Math.max(0,Math.min(1,Number(t)||0));
  return Object.fromEntries(Object.keys(a).map(key=>{
    if(typeof a[key]==="number"&&typeof b[key]==="number") return [key,a[key]+(b[key]-a[key])*n];
    return [key,n<0.5?a[key]:b[key]];
  }));
}
