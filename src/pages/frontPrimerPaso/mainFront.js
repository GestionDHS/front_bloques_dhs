import '../../style.css'
import { configurarYRenderizarToolbox} from '../../utils/Funciones.js';
import ControladorStandard from "../../bloques/Controlador";
import {Dhs_Categorias} from '../../clases/Dhs-categorias';

document.querySelector('#app').innerHTML = `
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
               <div class="ventana_bloques flex_row">
                  <div id="wsp-html">Workspace HTML</div>
                  <div id="wsp-css" class="hidden">Workspace CSS</div>
                  <div id="wsp-js" class="hidden">Workspace JS</div>
               </div>
               <div class="resizer_css hidden" id="r2"></div>
            </div>
            <div class="body_codigo flex_col hidden" id="body_codigo">
               <div class="ventana_codigo flex_row">
                  <div id="codigo-html">codigo HTML</div>
                  <div id="codigo-css" class="hidden">codigo CSS</div>
                  <div id="codigo-js" class="hidden">codigo JS</div>
               </div>
            </div>
         </div>
         <div class="resizer_css resizer" id="r1"></div>
      </div>
      
      <div class="navegador flex_row " id="navegador">
         <div class="ventana_navegador">
            <h2>Navegador</h2>
            <button id="btn-consola">consola</button>
         </div>
         <div class="ventana_consola hidden">Consola</div>
      </div>
   </section>
   
  </main>
`

//Me traido todo de los dos paneles izq y derecho: body_bloque(cajaIzqDeR2),body_codigo(cajaDerechaDeR2),bloque_codigo(cajaIzqR1),navegador(cajaDerechaR1)
const cajas = (function () {
   let cajas = {}
   cajas['contenedor'] = document.getElementById('contenedor');
   cajas['panel_izq_r1'] = document.getElementById('bloque_codigo');
   cajas['b_bloque_r2'] = document.getElementById('body_bloque');
   cajas['b_cod_r2'] = document.getElementById('body_codigo');
   cajas['panel_derecho_r1'] = document.getElementById('navegador');
   return cajas;
}());

//Resizers
let r1 = document.querySelector("#r1")
let r2 = document.querySelector("#r2")
let arrayDeResizers = [r1, r2]
for (let r of arrayDeResizers) {
   r.addEventListener('mousedown', e => {
      e.preventDefault();
      let resizer = e.target
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', e => {
         document.removeEventListener('mousemove', resize);
      });
      function resize(e) {
         //let body_width = 100 / document.body.clientWidth;
         let panel_izq_r1_width = 100 / parseFloat(getComputedStyle(cajas.panel_izq_r1, '').width)
         let contenedor_width = 100 / parseFloat(getComputedStyle(cajas.contenedor, '').width)
         if (resizer.id == "r1") {
            //r1 mueve los div bloque_codigo y navegador - r1 divide panel izq de panel derecho
            let left_width = (parseFloat(getComputedStyle(cajas.panel_izq_r1, '').width) + e.movementX) * contenedor_width;
            cajas.panel_izq_r1.style.width = left_width + '%';
            cajas.panel_derecho_r1.style.width = (100 - left_width) + '%';
            // cajas.panel_izq_r1.style.flex = "1 1 auto"
            // cajas.panel_derecho_r1.style.flex = "1 1 auto"
         } else {
            //r2 mueve los divs body_bloque y body_codigo
            let left_width = (parseFloat(getComputedStyle(cajas.b_bloque_r2, '').width) + e.movementX) * panel_izq_r1_width;
            cajas.b_bloque_r2.style.width = left_width + '%';
            cajas.b_cod_r2.style.width = (100 - left_width) + '%';
            // cajas.b_cod_r2.style.width = `calc(100% - ${left_width}%)`
            // cajas.b_cod_r2.style.flex = "1 1 auto"
         }
      }
   })
}

//Habilito y deshabilito: body_codigo, body_bloque, ventana_navegador y ventana_consola -----------------
const btnsMayores = {
   "btn-bloque": document.querySelector("#btn-bloque"),
   "btn-codigo": document.querySelector("#btn-codigo"),
   "btn-navegador": document.querySelector("#btn-navegador"),
}
const btnsMenores = {
   "btn-html": document.querySelector("#btn-html"),
   "btn-css": document.querySelector("#btn-css"),
   "btn-js": document.querySelector("#btn-js"),
   "btn-consola": document.querySelector("#btn-consola")
}

const div_bloque_codigo = document.querySelector(".bloque_codigo")
const div_body_bloque = document.querySelector(".body_bloque")
const div_body_codigo = document.querySelector(".body_codigo")
const div_navegador = document.querySelector(".navegador")

function prenderBtnSegunDiv(btn) {
   const lista_id = btn.id == "btn-codigo" ? ["#codigo-html", "#codigo-css", "#codigo-js"] : ["#wsp-html", "#wsp-css", "#wsp-js"]
   lista_id.forEach(elemento => {
      const elemento_ventana = document.querySelector(elemento);
      //!elemento_ventana.classList.contains("hidden") && console.log("este div esta prendido " + elemento_ventana.id)
      if (!elemento_ventana.classList.contains("hidden")) {
         btnsMenores["btn-" + elemento_ventana.id.split("-")[1]].classList.add("button_focus")
      }
   })
}
function handelClickVisibilityPanels(e) {
   //el e es el btn
   const dicionario_ventana = { "btn-bloque": '.body_bloque', "btn-codigo": '.body_codigo', "btn-navegador": '.navegador', "btn-consola": ".ventana_consola" }
   const elemento_ventana = document.querySelector(dicionario_ventana[e.target.id]);
   elemento_ventana.classList.contains("hidden") ? elemento_ventana.classList.remove("hidden") : elemento_ventana.classList.add("hidden")
   e.target.classList.toggle("button_focus")
   if (!btnsMayores["btn-bloque"].classList.contains("button_focus") && !btnsMayores["btn-codigo"].classList.contains("button_focus")) {
      //estan los dos apagados - oculto el div entero de bloque-codigo
      div_bloque_codigo.classList.add("hidden")
      div_bloque_codigo.classList.add("fondo_gris")
      //deshabilito los btns para que no queden prendidos
      btnsMenores["btn-html"].classList.remove("button_focus")
      btnsMenores["btn-css"].classList.remove("button_focus")
      btnsMenores["btn-js"].classList.remove("button_focus")
   } else {
      div_body_codigo.style.width = !btnsMayores["btn-bloque"].classList.contains("button_focus") && btnsMayores["btn-codigo"].classList.contains("button_focus") && "100%"
      div_bloque_codigo.classList.remove("hidden")
      div_bloque_codigo.classList.remove("fondo_gris")
      btnsMayores["btn-bloque"].classList.contains("button_focus") && prenderBtnSegunDiv(e.target)
      btnsMayores["btn-codigo"].classList.contains("button_focus") && prenderBtnSegunDiv(e.target)
   }

   //Si el btn Navegador esta apagado, ocultamos el resizer1
   if (!btnsMayores["btn-navegador"].classList.contains("button_focus")) {
      r1.classList.add("hidden")
      div_bloque_codigo.style.width = "100%"
   } else {
      r1.classList.remove("hidden")
      div_bloque_codigo.style.width = "50%"
      div_navegador.style.width = "50%"
   }
   //Si el btn Codigo esta apagado, ocultamos el resizer2
   !btnsMayores["btn-codigo"].classList.contains("button_focus") ? r2.classList.add("hidden") : r2.classList.remove("hidden")

}

//fn para dentro del div bloques-codigo (div izquierdo grande)
function handelClickVisibilityWorkSpaces(e) {
   //Adentro de bloques-codigo
   const lista_elementos_btns = [btnsMenores["btn-html"], btnsMenores["btn-css"], btnsMenores["btn-js"]]
   //deshabilito todos los btns de bloques-codigo para luego habilitar solo el cliqueado
   lista_elementos_btns.forEach(btn => {
      btn.classList.remove("button_focus")
   })
   e.target.classList.add("button_focus")

   //oculto todos los wsp y todos los div de codigo
   const lista_id_wp = ["#wsp-html", "#wsp-css", "#wsp-js", "#codigo-html", "#codigo-css", "#codigo-js"]
   lista_id_wp.forEach(elemento => {
      const elemento_ventana = document.querySelector(elemento);
      elemento_ventana.classList.add("hidden")
   })

   //habilito el wsp y div-codigo que corresponde al btn cliqueado
   const diccionario_wsp_bloques = { "btn-html": '#wsp-html', "btn-css": '#wsp-css', "btn-js": '#wsp-js' },
      diccionario_wsp_codigo = { "btn-html": '#codigo-html', "btn-css": '#codigo-css', "btn-js": '#codigo-js' }
   const elemento_ventana_wsp = document.querySelector(diccionario_wsp_bloques[e.target.id]);
   elemento_ventana_wsp.classList.remove("hidden")
   const elemento_ventana_codigo = document.querySelector(diccionario_wsp_codigo[e.target.id]);
   elemento_ventana_codigo.classList.remove("hidden")
}

btnsMayores["btn-bloque"].addEventListener("click", handelClickVisibilityPanels);
btnsMayores["btn-codigo"].addEventListener("click", handelClickVisibilityPanels);
btnsMayores["btn-navegador"].addEventListener("click", handelClickVisibilityPanels);
btnsMenores["btn-consola"].addEventListener("click", handelClickVisibilityPanels);
btnsMenores["btn-html"].addEventListener("click", handelClickVisibilityWorkSpaces)
btnsMenores["btn-css"].addEventListener("click", handelClickVisibilityWorkSpaces)
btnsMenores["btn-js"].addEventListener("click", handelClickVisibilityWorkSpaces)



// BLOCKLY ------------------------------------------------------
const estadoWorkspaceInicial = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';

window.miControlador = new ControladorStandard(estadoWorkspaceInicial);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones","Repeticiones"])
const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["abrir_cofre", "Acciones"],
  ["repeat_times", "Repeticiones"],
];

const funcionesAExponer=["moverDerecha","moverAbajo","moverArriba","moverIzquierda","abrirCofre"]

configurarYRenderizarToolbox(
   miControlador,
   categoriaElegida,
   ordenJerarquicoBloques,
   estadoWorkspaceInicial,
   funcionesAExponer
 );