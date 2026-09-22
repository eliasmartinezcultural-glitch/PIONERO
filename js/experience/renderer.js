import {getTemporalState,interpolateTemporalState} from "./temporal.js";

export function createTemporalRenderer(scene){
  function render(eraId,progress=null){
    const state=progress||getTemporalState(eraId);
    scene.dataset.phase=state.phase;
    scene.dataset.theme=state.atmosphere;
    scene.style.setProperty("--terrain-depth",String(state.terrain));
    scene.style.setProperty("--water-strength",String(state.water));
    scene.style.setProperty("--production-strength",String(state.production));
    scene.style.setProperty("--settlement-strength",String(state.settlement));
    scene.style.setProperty("--road-strength",String(state.roads));
    return state;
  }
  function transition(fromId,toId,t){
    return render(toId,interpolateTemporalState(fromId,toId,t));
  }
  return {render,transition};
}
