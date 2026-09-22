(function(){
  const started=Date.now();
  let recoveryShown=false;

  function escapeHtml(value){
    return String(value||"Error desconocido").replace(/[<>&]/g,char=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[char]));
  }

  function showRecovery(title,detail){
    if(recoveryShown)return;
    recoveryShown=true;
    const box=document.getElementById("runtimeGuard")||document.createElement("div");
    box.id="runtimeGuard";
    box.setAttribute("role","alert");
    box.style.cssText="position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px;background:#171510;color:#f1eadb;font-family:Arial,sans-serif";
    box.innerHTML="<div style="max-width:620px"><div style="font-size:11px;letter-spacing:.16em;opacity:.7;margin-bottom:14px">PIONERO · SISTEMA DE RECUPERACIÓN</div><h1 style="font:500 42px Georgia,serif;margin:0 0 14px">El viaje necesita reiniciarse.</h1><p style="line-height:1.6;opacity:.8">PIONERO detectó un problema durante la carga. Primero podés intentar nuevamente. Si el problema persiste, reiniciá los datos locales del viaje.</p><details style="margin-top:18px;opacity:.55"><summary>Diagnóstico técnico</summary><pre style="white-space:pre-wrap;line-height:1.4">"+escapeHtml(detail)+"</pre></details><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:22px"><button id="runtimeRetry" style="padding:13px 18px;border:1px solid #f1eadb;background:#f1eadb;color:#171510;border-radius:999px;cursor:pointer">Reintentar</button><button id="runtimeReset" style="padding:13px 18px;border:1px solid rgba(241,234,219,.5);background:transparent;color:#f1eadb;border-radius:999px;cursor:pointer">Reiniciar datos del viaje</button></div></div>";
    if(!box.parentNode)document.body.appendChild(box);
    box.querySelector("#runtimeRetry").onclick=()=>location.reload();
    box.querySelector("#runtimeReset").onclick=()=>{
      try{
        Object.keys(localStorage).filter(key=>key.startsWith("pionero.")).forEach(key=>localStorage.removeItem(key));
      }catch(error){}
      location.reload();
    };
    box.querySelector("#runtimeRetry").focus();
  }

  window.addEventListener("error",event=>{
    if(event?.message)showRecovery("runtime",event.message);
  });
  window.addEventListener("unhandledrejection",event=>{
    showRecovery("promise",event?.reason?.message||event?.reason||"Promesa rechazada");
  });
  window.setTimeout(()=>{
    if(window.PIONERO?.ready)return;
    showRecovery("startup","La interfaz no informó que terminó de inicializarse dentro del tiempo esperado.");
  },12000);
})();