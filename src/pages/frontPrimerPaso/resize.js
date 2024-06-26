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
const ventanas = (function () {
   let ventanas = {}
   ventanas['ventana_bloques'] = document.getElementById('ventana_bloques');
   ventanas['ventana_codigo'] = document.getElementById('ventana_codigo');
   ventanas['ventana_navegador'] = document.getElementById('ventana_navegador');
   ventanas['ventana_consola'] = document.getElementById('ventana_consola');
   ventanas['iframe_navegador'] = document.getElementById('iframe_navegador');
   return ventanas;
}());
// ventanas["iframe_navegador"].style.width = "100%"
// ventanas["iframe_navegador"].style.height = "100%"

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
            miControlador.workspaceHTML && Blockly.svgResize(miControlador.workspaceHTML, left_width)
            miControlador.workspaceCSS && Blockly.svgResize(miControlador.workspaceCSS, left_width)
            miControlador.workspaceJS && Blockly.svgResize(miControlador.workspaceJS, left_width)
         } else {
            //r2 mueve los divs body_bloque y body_codigo
            let left_width = (parseFloat(getComputedStyle(cajas.b_bloque_r2, '').width) + e.movementX) * panel_izq_r1_width;
            cajas.b_bloque_r2.style.width = left_width + '%';
            cajas.b_cod_r2.style.width = (100 - left_width) + '%';
            // cajas.b_cod_r2.style.width = `calc(100% - ${left_width}%)`
            // cajas.b_cod_r2.style.flex = "1 1 auto"
            // console.log(miControlador.workspace.getWidth())
            miControlador.workspaceHTML && Blockly.svgResize(miControlador.workspaceHTML, left_width)
            miControlador.workspaceCSS && Blockly.svgResize(miControlador.workspaceCSS, left_width)
            miControlador.workspaceJS && Blockly.svgResize(miControlador.workspaceJS, left_width)
         }
      }
   })
}

//Habilito y deshabilito: body_codigo, body_bloque, ventana_navegador y ventana_consola -----------------
const btnsMayores = (function () {
   let btnsMayores = {}
   btnsMayores['btn-bloque'] = document.querySelector("#btn-bloque")
   btnsMayores['btn-codigo'] = document.querySelector("#btn-codigo")
   btnsMayores['btn-navegador'] = document.querySelector("#btn-navegador")
   return btnsMayores;
}());

const btnsMenores = (function () {
   let btnsMenores = {}
   btnsMenores['btn-html'] = document.querySelector("#btn-html")
   btnsMenores['btn-css'] = document.querySelector("#btn-css")
   btnsMenores['btn-js'] = document.querySelector("#btn-js")
   btnsMenores['btn-consola'] = document.querySelector("#btn-consola")
   return btnsMenores;
}());

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
      // ventanas.ventana_bloques.style.width="100%"
      div_body_codigo.style.width = !btnsMayores["btn-bloque"].classList.contains("button_focus") && btnsMayores["btn-codigo"].classList.contains("button_focus") ? "100%" : "50%"
      div_body_bloque.style.width = btnsMayores["btn-bloque"].classList.contains("button_focus") && !btnsMayores["btn-codigo"].classList.contains("button_focus") ? "100%" : "50%"
      //las 3 lineas siguienetes están repetidas en la parte del resize, hay que sacarlas en una fn aparte
      let panel_izq_r1_width = 100 / parseFloat(getComputedStyle(cajas.panel_izq_r1, '').width)
      let left_width = (parseFloat(getComputedStyle(cajas.b_bloque_r2, '').width) + e.movementX) * panel_izq_r1_width;
      miControlador.workspaceHTML && Blockly.svgResize(miControlador.workspaceHTML, left_width)
      miControlador.workspaceCSS && Blockly.svgResize(miControlador.workspaceCSS, left_width)
      miControlador.workspaceJS && Blockly.svgResize(miControlador.workspaceJS, left_width)
      console.log("render btn grandes")
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
   if(btnsMenores["btn-html"].classList.contains("button_focus")){
      console.log("prendido el btn-html")
      // let panel_izq_width = 100 / parseFloat(getComputedStyle(cajas.panel_izq_r2, '').width)
      // let left_width = (parseFloat(getComputedStyle(cajas.b_bloque_r2, '').width) + e.movementX) * panel_izq_width;
      // miControlador.workspaceHTML && Blockly.svgResize(miControlador.workspaceHTML, left_width)
   }
   if(btnsMenores["btn-css"].classList.contains("button_focus")){
      console.log("prendido el btn-css")
   }
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
   //console.log(elemento_ventana_wsp.id.split("-")[1])
   elemento_ventana_wsp.classList.remove("hidden")
   const elemento_ventana_codigo = document.querySelector(diccionario_wsp_codigo[e.target.id]);
   elemento_ventana_codigo.classList.remove("hidden")
}

btnsMayores["btn-bloque"].addEventListener("click", handelClickVisibilityPanels);
btnsMayores["btn-codigo"].addEventListener("click", handelClickVisibilityPanels);
btnsMayores["btn-navegador"].addEventListener("click", handelClickVisibilityPanels);
btnsMenores['btn-consola'].addEventListener("click", handelClickVisibilityPanels);
btnsMenores["btn-html"].addEventListener("click", handelClickVisibilityWorkSpaces)
btnsMenores["btn-css"].addEventListener("click", handelClickVisibilityWorkSpaces)
btnsMenores["btn-js"].addEventListener("click", handelClickVisibilityWorkSpaces)

