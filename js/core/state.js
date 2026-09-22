export function createExperienceState({eras,content,storageKey="pionero.progress.v3"}){
  const eraIds=new Set(eras.map(era=>era.id));
  const validProgressKeys=new Set(Object.entries(content.points||{}).flatMap(([eraId,points])=>points.map(point=>eraId+":"+point.id)));
  const listeners=new Set();
  let state={view:"welcome",eraId:null,openPanel:null,visited:new Set()};

  function notify(){const snapshot=read();listeners.forEach(listener=>listener(snapshot));}
  function read(){return {view:state.view,eraId:state.eraId,openPanel:state.openPanel,visited:new Set(state.visited)};}
  function persist(){
    state.visited=new Set([...state.visited].filter(key=>validProgressKeys.has(key)));
    try{localStorage.setItem(storageKey,JSON.stringify([...state.visited]));}catch(error){console.warn("PIONERO: no se pudo persistir el progreso",error);}
  }
  function load(){
    try{
      const raw=JSON.parse(localStorage.getItem(storageKey)||"[]");
      state.visited=new Set(Array.isArray(raw)?raw.filter(key=>validProgressKeys.has(key)):[]);
    }catch{
      try{localStorage.removeItem(storageKey);}catch{}
      state.visited=new Set();
    }
  }
  function setView(view){if(!["welcome","journey","scene"].includes(view))return false;state.view=view;state.openPanel=null;notify();return true;}
  function travel(eraId){if(!eraIds.has(eraId))return false;state.eraId=eraId;state.view="scene";state.openPanel=null;notify();return true;}
  function openPanel(panel){if(!["discovery","territory","compare"].includes(panel))return false;state.openPanel=panel;notify();return true;}
  function closePanel(){state.openPanel=null;notify();}
  function togglePanel(panel){state.openPanel===panel?closePanel():openPanel(panel);}
  function visit(pointKey){if(!validProgressKeys.has(pointKey))return false;state.visited.add(pointKey);persist();notify();return true;}
  function isVisited(eraId,pointId){return state.visited.has(eraId+":"+pointId);}
  function subscribe(listener){listeners.add(listener);return()=>listeners.delete(listener);}
  load();
  return {read,setView,travel,openPanel,closePanel,togglePanel,visit,isVisited,subscribe,persist,validProgressKeys};
}
