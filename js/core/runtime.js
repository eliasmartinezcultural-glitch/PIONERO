(function(){
  const started=Date.now();
  function showError(title,detail){
    let box=document.getElementById("runtimeGuard");
    if(!box){
      box=document.createElement("div");
      box.id="runtimeGuard";
      box.setAttribute("role","alert");
      box.style.cssText="position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px;background:#171510;color:#f1eadb;font-family:Arial,sans-serif";
      document.body.appendChild(box);
    }
    box.innerHTML="<div style=\"max-width:620px\"><div style=\"font-size:11px;letter-spacing:.16em;opacity:.7;margin-bottom:14px\">PIONERO · SISTEMA DE RECUPERACIÓN</div><h1 style=\"font:500 42px Georgia,serif;margin:0 0 14px\">El viaje no pudo iniciarse.</h1><p style=\"line-height:1.6;opacity:.8\">La aplicación detectó un problema antes de completar la carga. Recargá la página para intentarlo nuevamente.</p><details style=\"margin-top:18px;opacity:.55\"><summary>Diagnóstico técnico</summary><pre style=\"white-space:pre-wrap;line-height:1.4\">"+String(detail||"Error desconocido").replace(/[<>&]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[c]))+"</pre></details><button onclick=\"location.reload()\" style=\"margin-top:22px;padding:13px 18px;border:1px solid #f1eadb;background:#f1eadb;color:#171510;border-radius:999px;cursor:pointer\">Recargar PIONERO</button></div>";
  }
  window.addEventListener("error",event=>{
    if(event?.message)showError("runtime",event.message);
  });
  window.addEventListener("unhandledrejection",event=>{
    showError("promise",event?.reason?.message||event?.reason||"Promesa rechazada");
  });
  window.setTimeout(()=>{
    if(window.PIONERO?.ready)return;
    if(Date.now()-started>=7000)showError("startup","La interfaz no informó que terminó de inicializarse.");
  },7000);
})();
