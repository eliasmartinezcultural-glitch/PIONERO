const MODES=new Set(["fade","swipe","spyglass","side-by-side"]);

export function createComparisonEngine({samePlace}){
  let active=null;

  function prepare({anchorId,fromEraId,toEraId,mode="fade"}){
    if(!MODES.has(mode))return null;
    const availability=samePlace.compareAvailability(anchorId,fromEraId,toEraId);
    active=availability.available?{anchorId,fromEraId,toEraId,mode,status:"ready"}:{anchorId,fromEraId,toEraId,mode,status:"pending",reason:availability.reason};
    return {...active};
  }

  function clear(){active=null;}
  function read(){return active?{...active}:null;}
  function modes(){return [...MODES];}

  return {prepare,clear,read,modes};
}
