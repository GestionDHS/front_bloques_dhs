import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

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
   <secrion class="contenedor">
      <div class="bloque_codigo felx_col">
         <div class="head_bloque_codigo">
            <ul class="ul_nav_secundario">
               <li><button id="btn-html" class="button button_focus btn_relative">HTML</button></li>
               <li><button id="btn-css" class="button btn_relative">CSS</button></li>
               <li><button id="btn-js" class="button btn_relative">JS</button></li>
            </ul>
         </div>
         <div class="body_bloque_codigo">
            <div class="body_bloque flex_col">
               <div class="ventana_bloques flex_row">
                  <div id="wsp-html">Workspace HTML</div>
                  <div id="wsp-css" class="hidden">Workspace CSS</div>
                  <div id="wsp-js" class="hidden">Workspace JS</div>
               </div>
               <div class="resizer_bloques resizer_css"></div>
            </div>
            <div class="body_codigo flex_col hidden">
               <div class="ventana_codigo flex_row">
                  <div id="codigo-html">codigo HTML</div>
                  <div id="codigo-css">codigo CSS</div>
                  <div id="codigo-js">codigo JS</div>
               </div>
            </div>
         </div>
         <div class="resizer_bloques_codigo resizer_css"></div>
      </div>
      
      <div class="navegador flex_row">
         <div class="ventana_navegador">
            <h2>Navegador</h2>
            <button id="btn-consola">consola <></button>
         </div>
         <div class="ventana_consola hidden">Consola</div>
      </div>
   </section>
   
  </main>
`



//Resizable
const resizer_bloques_codigo = document.querySelector(".resizer_bloques_codigo"),
   bloque_codigo = document.querySelector(".bloque_codigo"),
   resizer_bloques = document.querySelector(".resizer_bloques"),
   body_bloque = document.querySelector(".body_bloque"),
   ventana_navegador = document.querySelector(".ventana_navegador")

function addResizer(div_resizable, elemento_a_resaizear) {
   // track current mouse position in x let
   let x, w;
   //manejador de evento para el clic del mouse
   function rs_mousedownHandler(e) {
      //Capturo posición horizontal del cursor en el eje X
      x = e.clientX;
      //getComputedStyle: obtengo los estilos computados del elemento con la clase elemento_a_resaizear y, específicamente, obtengo el ancho de este elemento.
      let sbWidth = window.getComputedStyle(elemento_a_resaizear).width;
      w = parseInt(sbWidth, 10); //convierto el valor obtenido a decimal

      document.addEventListener("mousemove", rs_mousemoveHandler);//agrego el escucha al evento mousemove, para q se ejecute la fn rs_mousemoveHandler
      document.addEventListener("mouseup", rs_mouseupHandler);//para limpiar y finaliza el seguimiento del movimiento
   }

   function rs_mousemoveHandler(e) {
      let dx = e.clientX - x; //delta de la posicion de x
      let cw = w + dx; // complete width
      elemento_a_resaizear.style.width = `${cw}px`;
      if (cw < 400) {
         console.log("menor a 700")
         //console.log(div_resizable.getAttribute("class"))
      } else {
         console.log("mayor")
      }
   }

   function rs_mouseupHandler() {
      // remuevo event mousemove && mouseup
      document.removeEventListener("mouseup", rs_mouseupHandler);
      document.removeEventListener("mousemove", rs_mousemoveHandler);
   }
   div_resizable.addEventListener("mousedown", rs_mousedownHandler);
}
//Asocio los divs que van a resaizear la ventana
addResizer(resizer_bloques_codigo, bloque_codigo);
addResizer(resizer_bloques, body_bloque);


//Habilito y deshabilito: body_codigo, body_bloque, ventana_navegador y ventana_consola -----------------
const btnBloque = document.querySelector("#btn-bloque");
const btnCodigo = document.querySelector("#btn-codigo");
const btnNavegador = document.querySelector("#btn-navegador");
const navegador = document.querySelector(".navegador")
const btnConsola = document.querySelector("#btn-consola");
const btn_html = document.querySelector("#btn-html");
const btn_css = document.querySelector("#btn-css");
const btn_js = document.querySelector("#btn-js");
const div_bloque_codigo = document.querySelector(".bloque_codigo")

function handelClickVisibility(e) {
   //el e es el btn
   //el btn-html, habilita y deshabilita 3 divs
   const dicionario_ventana = { "btn-bloque": '.body_bloque', "btn-codigo": '.body_codigo', "btn-navegador": '.navegador', "btn-consola": ".ventana_consola"}
   const elemento_ventana = document.querySelector(dicionario_ventana[e.target.id]);
   elemento_ventana.classList.contains("hidden") ? elemento_ventana.classList.remove("hidden") : elemento_ventana.classList.add("hidden")
   //habilita o deshabilita el btn cliqueado
   e.target.classList.toggle("button_focus")

   if (!btnBloque.classList.contains("button_focus") && !btnCodigo.classList.contains("button_focus")) {
      //estan los dos apagados - oculto el div entero de bloque-codigo
      bloque_codigo.classList.add("hidden")
      div_bloque_codigo.classList.add("fondo_gris")
   } else {
      bloque_codigo.classList.remove("hidden")
      div_bloque_codigo.classList.remove("fondo_gris")
   }

   //Si el btn Navegador esta apagado, ocultamos el resizer_bloques_codigo
   !btnNavegador.classList.contains("button_focus") ? resizer_bloques_codigo.classList.add("hidden") : resizer_bloques_codigo.classList.remove("hidden")
   //Si el btn Codigo esta apagado, ocultamos el resizer_bloques
   !btnCodigo.classList.contains("button_focus") ? resizer_bloques.classList.add("hidden") : resizer_bloques.classList.remove("hidden")
}

//fn para dentro del div bloques-codigo
function handelClickVisibilityWorkSpaces(e){
    //Adentro de bloques-codigo
    const lista_elementos_btns = [btn_html, btn_css, btn_js]
     //deshabilito todos los btns de bloques-codigo para luego habilitar solo el cliqueado
     lista_elementos_btns.forEach(btn => {
      btn.classList.remove("button_focus")
   })
   e.target.classList.add("button_focus")

   //oculto todos los wsp y todos los div de codigo
   const lista_id_wp = ["#wsp-html", "#wsp-css", "#wsp-js","#codigo-html","#codigo-css","#codigo-js" ]
   lista_id_wp.forEach(elemento => {
      const elemento_ventana = document.querySelector(elemento);
      elemento_ventana.classList.add("hidden")
   })

   //habilito el wsp y div-codigo que corresponde al btn cliqueado
   const diccionario_wsp_bloques ={ "btn-html": '#wsp-html',"btn-css": '#wsp-css',"btn-js": '#wsp-js'},
   diccionario_wsp_codigo={"btn-html": '#codigo-html',"btn-css": '#codigo-css',"btn-js": '#codigo-js'}
   const elemento_ventana_wsp = document.querySelector(diccionario_wsp_bloques[e.target.id]);
   elemento_ventana_wsp.classList.remove("hidden")
   const elemento_ventana_codigo = document.querySelector(diccionario_wsp_codigo[e.target.id]);
   elemento_ventana_codigo.classList.remove("hidden")
}

btnBloque.addEventListener("click", handelClickVisibility);
btnCodigo.addEventListener("click", handelClickVisibility);
btnNavegador.addEventListener("click", handelClickVisibility);
btnConsola.addEventListener("click", handelClickVisibility);
btn_html.addEventListener("click", handelClickVisibilityWorkSpaces)
btn_css.addEventListener("click", handelClickVisibilityWorkSpaces)
btn_js.addEventListener("click", handelClickVisibilityWorkSpaces)