//es responsabilidad del juego rellenarlo
import "../style.css";
// import "../styleActividades.css";
// import "../styleAnimaciones.css";
// import { trash, play, stop, restart,standingPerson, runningPerson, code, comment } from "./Iconos";
// import logoBlockly from "../img/logoBlockly.png";
// import logoDHS from "../img/logodhsBlack.png";

export function template(element) {
  return `
  <main>
   <nav>
   <ul class="nav_ul_principal">
      <li id="play">Play</li>
      <li><button id="btn-bloque" class="button button_focus btn_relative">Bloques</button></li>
      <li><button id="btn-codigo" class="button btn_relative">Codigo</button></li>
      <li><button id="btn-navegador" class="button button_focus btn_relative">Navegador</button></li>
      <li id="alternar">Alternar</li>
    </ul>
   </nav>
   <secrion class="contenedor" id="contenedor">
      <div class="bloque_codigo felx_col content-box" id="bloque_codigo">
         <div class="head_bloque_codigo">
            <ul class="ul_nav_secundario">
               <li><button id="btn-html" class="button button_focus btn_relative">HTML</button></li>
               <li><button id="btn-css" class="button btn_relative">CSS</button></li>
               <li><button id="btn-js" class="button btn_relative">JS</button></li>
            </ul>
         </div>
         <div class="body_bloque_codigo">
            <div class="body_bloque flex_col" id="body_bloque">
               <div class="ventana_bloques flex_row" id="ventana_bloque">
                  <div id="wsp-html">Workspace HTML</div>
                  <div id="wsp-css" class="hidden">Workspace CSS</div>
                  <div id="wsp-js" class="hidden">Workspace JS</div>
               </div>
               <div class="resizer_css hidden" id="r2"></div>
            </div>
            <div class="body_codigo flex_col hidden" id="body_codigo">
               <div class="ventana_codigo flex_row" id="ventana_codigo">
                  <div id="codigo-html">codigo HTML</div>
                  <div id="codigo-css" class="hidden">codigo CSS</div>
                  <div id="codigo-js" class="hidden">codigo JS</div>
               </div>
            </div>
         </div>
         <div class="resizer_css resizer" id="r1"></div>
      </div>
      
      <div class="navegador flex_row " id="navegador">
         <div class="ventana_navegador" id="ventana_navegador">
            <iframe id="iframe_navegador">
            </iframe>
         </div>
         <button id="btn-consola">consola</button>
         <div class="ventana_consola hidden" id="ventana_consola">Consola</div>
      </div>
   </section>
   
  </main>
`;
}
