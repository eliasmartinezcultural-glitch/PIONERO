export function createExperienceState({eras,content,storageKey="pionero.progress.v4"}){
  const eraIds=new Set(eras.map(era=>era.id));
  const validProgressKeys=new Set(Object.entries(content.points||{}).flatMap(([eraId,points])=>
    (Array.isArray(points)?points:[]).map(point=>eraId+":"+point.id)
  ));
  const listeners=new Set();
  const defaultCamera={zoom:1,focusX:50,focusY:50,angle:0};
  let state={view:"welcome",eraId:null,openPanel:null,visited:new Set(),camera:{...defaultCamera}};

  function snapshot(){
    return {view:state.view,eraId:state.eraId,openPanel:state.openPanel,visited:new Set(state.visited),camera:{...state.camera}};
  }
  function notify(){const value=snapshot();listeners.forEach(listener=>{try{listener(value);}catch(error){console.error("PIONERO listener",error);}});}
  function persist(){
    state.visited=new Set([...state.visited].filter(key=>validProgressKeys.has(key)));
    try{localStorage.setItem(storageKey,JSON.stringify([...state.visited]));}
    catch(error){console.warn("PIONERO: no se pudo persistir el progreso",error);}
  }
  function load(){
    try{
      const raw=JSON.parse(localStorage.getItem(storageKey)||"[]");
      state.visited=new Set(Array.isArray(raw)?raw.filter(key=>validProgressKeys.has(key)):[]);
    }catch(error){
      try{localStorage.removeItem(storageKey);}catch{}
      state.visited=new Set();
      console.warn("PIONERO: progreso local inválido, se inició limpio",error);
    }
  }
  function setView(view){
    if(!["welcome","scene"].includes(view))return false;
    state.view=view;state.openPanel=null;notify();return true;
  }
  function travel(eraId){
    if(!eraIds.has(eraId))return false;
    state.eraId=eraId;state.view="scene";state.openPanel=null;notify();return true;
  }
  function openPanel(panel){
    if(!["discovery","territory","compare"].includes(panel))return false;
    if(state.view!=="scene")return false;
    state.openPanel=panel;notify();return true;
  }
  function closePanel(){if(state.openPanel===null)return false;state.openPanel=null;notify();return true;}
  function togglePanel(panel){return state.openPanel===panel?closePanel():openPanel(panel);}
  function setCamera(next={}){
    const candidate={...state.camera,...next};
    if(![candidate.zoom,candidate.focusX,candidate.focusY,candidate.angle].every(Number.isFinite))return false;
    candidate.zoom=Math.min(2,Math.max(.75,candidate.zoom));
    candidate.focusX=Math.min(100,Math.max(0,candidate.focusX));
    candidate.focusY=Math.min(100,Math.max(0,candidate.focusY));
    candidate.angle=Math.min(180,Math.max(-180,candidate.angle));
    state.camera=candidate;notify();return {...candidate};
  }
  function resetCamera(){state.camera={...defaultCamera};notify();return {...state.camera};}
  function visit(eraId,pointId){
    const key=String(eraId)+":"+String(pointId);
    if(!validProgressKeys.has(key))return false;
    const changed=!state.visited.has(key);
    state.visited.add(key);persist();
    if(changed)notify();
    return true;
  }
  function isVisited(eraId,pointId){return state.visited.has(String(eraId)+":"+String(pointId));}
  function progress(){return {visited:state.visited.size,total:validProgressKeys.size,ratio:validProgressKeys.size?state.visited.size/validProgressKeys.size:0};}
  function clearProgress(){
    state.visited.clear();
    try{localStorage.removeItem(storageKey);}catch(error){console.warn("PIONERO: no se pudo limpiar el progreso",error);}
    notify();
  }
  function subscribe(listener){
    if(typeof listener!=="function")return()=>{};
    listeners.add(listener);
    return()=>listeners.delete(listener);
  }

  load();
  return {read:snapshot,setView,travel,openPanel,closePanel,togglePanel,setCamera,resetCamera,visit,isVisited,progress,clearProgress,subscribe,persist,validProgressKeys};
}