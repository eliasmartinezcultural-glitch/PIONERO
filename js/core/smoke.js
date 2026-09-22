export function createSmokeSuite({history,territory,validation,audit,createState,content}){
  function run(){
    const issues=[];
    const check=(condition,message)=>{if(!condition)issues.push(message);};
    const eras=history.all("eras");
    check(validation.valid,"La validación histórica no está limpia.");
    check(audit.valid,"La auditoría estructural no está limpia.");
    check(eras.length===7,"El recorrido debe contener exactamente 7 eras.");
    check(eras.every(era=>Array.isArray(content.points?.[era.id])),"Cada era debe tener colección de huellas.");

    const testState=createState({eras,content,storageKey:"pionero.smoke.test"});
    testState.clearProgress();

    for(const era of eras){
      check(testState.travel(era.id),"No se pudo viajar a "+era.id+".");
      const points=content.points[era.id]||[];
      for(const point of points){
        check(testState.visit(era.id,point.id),"No se pudo descubrir "+era.id+":"+point.id+".");
        check(testState.isVisited(era.id,point.id),"La huella "+era.id+":"+point.id+" no quedó registrada.");
      }
      check(testState.openPanel("discovery"),"No se pudo abrir discovery en "+era.id+".");
      check(testState.read().openPanel==="discovery","Panel discovery incorrecto en "+era.id+".");
      check(testState.openPanel("territory"),"No se pudo cambiar a territorio en "+era.id+".");
      check(testState.read().openPanel==="territory","Panel territorio incorrecto en "+era.id+".");
      check(testState.openPanel("compare"),"No se pudo cambiar a comparación en "+era.id+".");
      check(testState.read().openPanel==="compare","Panel comparación incorrecto en "+era.id+".");
      check(testState.closePanel(),"No se pudo cerrar el panel en "+era.id+".");
      check(testState.read().openPanel===null,"Quedó un panel abierto en "+era.id+".");
      const summary=territory.summaryForEra(era.id);
      check(Array.isArray(summary.nodes),"Territorio sin nodos.");
      check(Array.isArray(summary.connections),"Territorio sin conexiones.");
      check(summary.connections.every(connection=>summary.nodes.some(node=>node.id===connection.from)&&summary.nodes.some(node=>node.id===connection.to)),"Conexión territorial inválida en "+era.id+".");
    }

    const progress=testState.progress();
    const expected=Object.values(content.points).reduce((sum,points)=>sum+points.length,0);
    check(progress.total===expected,"El total de progreso no coincide con el contenido.");
    check(progress.visited===expected,"No se pudieron descubrir todas las huellas.");
    check(progress.ratio===1,"El ratio final de progreso no llegó a 1.");
    check(!testState.visit("missing-era","missing-point"),"Se aceptó una huella inexistente.");
    testState.clearProgress();
    check(testState.progress().visited===0,"clearProgress no limpió el progreso.");

    const reloaded=createState({eras,content,storageKey:"pionero.smoke.persistence"});
    reloaded.clearProgress();
    reloaded.visit(eras[0].id,(content.points[eras[0].id]||[])[0]?.id);
    const restored=createState({eras,content,storageKey:"pionero.smoke.persistence"});
    check(restored.progress().visited===1,"La persistencia de progreso no pudo restaurarse.");
    restored.clearProgress();

    return {valid:issues.length===0,issues,summary:{eras:eras.length,points:expected,territoryNodes:territory.nodes.length,territoryConnections:territory.connections.length}};
  }
  return {run};
}
