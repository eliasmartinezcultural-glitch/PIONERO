export function createSamePlaceEngine({territory,camera}){
  const anchors=new Map();

  function register(id,{title="",nodeIds=[],description=""}={}){
    if(!id)return false;
    anchors.set(id,{id,title,nodeIds:[...nodeIds],description});
    return true;
  }

  function anchor(id){
    const item=anchors.get(id);
    return item?{...item,nodeIds:[...item.nodeIds]}:null;
  }

  function findForEra(eraId){
    return [...anchors.values()].filter(item=>item.nodeIds.some(nodeId=>{
      const node=territory.node(nodeId);
      return Boolean(node&&node.eraIds?.includes(eraId));
    })).map(item=>anchor(item.id));
  }

  function focus(id,eraId){
    const item=anchor(id);
    if(!item)return false;
    const node=item.nodeIds.map(nodeId=>territory.node(nodeId)).find(node=>node?.eraIds?.includes(eraId));
    if(!node)return false;
    camera.focus(node.x,node.y,camera.read().zoom);
    return {anchor:item,node:{...node},eraId};
  }

  function compareAvailability(id,fromEraId,toEraId){
    const item=anchor(id);
    if(!item)return {available:false,reason:"unknown-anchor"};
    const from=focus(id,fromEraId),to=focus(id,toEraId);
    if(!from||!to)return {available:false,reason:"missing-spatial-reference"};
    return {available:true,anchor:item,from,to};
  }

  return {register,anchor,findForEra,focus,compareAvailability};
}
