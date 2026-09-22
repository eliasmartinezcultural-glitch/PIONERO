export function createTerritoryQueries(territory){
  const nodeMap=new Map(territory.nodes.map(node=>[node.id,node]));
  return {
    layers(){return territory.layers;},
    nodesForEra(eraId){return territory.nodes.filter(node=>node.eraIds.includes(eraId));},
    node(id){return nodeMap.get(id)||null;},
    connectionsFor(nodes){
      const ids=new Set(nodes.map(node=>node.id));
      return territory.connections.filter(connection=>ids.has(connection.from)&&ids.has(connection.to));
    },
    summaryForEra(eraId){
      const nodes=this.nodesForEra(eraId);
      return {nodes,connections:this.connectionsFor(nodes),count:nodes.length};
    }
  };
}