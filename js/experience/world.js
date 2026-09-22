import {getTemporalState,interpolateTemporalState} from "./temporal.js";

export function createExperienceWorld({history,content,territory,temporalRenderer,camera}){
  const eraIds=history.all("eras").map(era=>era.id);
  const sceneFor=eraId=>content.scenes?.[eraId]||{};
  const pointsFor=eraId=>content.points?.[eraId]||[];
  const visualFor=eraId=>getTemporalState(eraId);

  function snapshot(eraId){
    const era=history.get("eras",eraId);
    if(!era)return null;
    const visual=visualFor(eraId);
    return {
      era:{...era},
      scene:{...sceneFor(eraId)},
      visual:{...visual},
      points:pointsFor(eraId).map(point=>({...point})),
      territory:territory.summaryForEra(eraId),
      camera:camera.read()
    };
  }

  function travel(fromId,toId,onProgress){
    if(!eraIds.includes(toId))return false;
    if(fromId&&fromId!==toId){
      const fromCamera=camera.read();
      temporalRenderer.transition(fromId,toId,0);
      camera.set(fromCamera);
      return {from:fromId,to:toId,interpolate:t=>{
        const visual=interpolateTemporalState(fromId,toId,t);
        temporalRenderer.render(toId,visual);
        camera.set(fromCamera);
        onProgress?.(visual,t);
      }};
    }
    temporalRenderer.render(toId);
    return {from:fromId,to:toId,interpolate:()=>{}};
  }

  function eraIndex(eraId){return eraIds.indexOf(eraId);}
  function adjacent(eraId,delta){
    const index=eraIndex(eraId),target=index+delta;
    return target>=0&&target<eraIds.length?eraIds[target]:null;
  }

  return {snapshot,travel,eraIndex,adjacent,eraIds};
}
