import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <main>
   <nav>
   <ul class="nav_principal">
      <li>Play</li>
      <li><button id="btn-bloque">Bloques</button></li>
      <li><button id="btn-codigo">Codigo</button></li>
      <li><button id="btn-navegador">Navegador</button></li>
      <li>Alternar</li>
    </ul>
   </nav>
   <secrion class="contenedor">
      <div class="bloque_codigo">
      <div class="head_bloque_codigo">
         <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JS</li>
            </ul>
      </div>
      <div class="body_bloque_codigo">
         <div class="ventana_bloques">Bloques</div>
         <div class="ventana_codigo">Codigo</div>
      </div>
       
        <div class="resizer_bloques_codigo"></div>
      </div>
      
      <div class="navegador">
        <div class="ventana_navegador">Navegador</div>
      </div>
   </section>
   
  </main>
`



//Codigo para el Resizable---------
let resizer_bloques_codigo = document.querySelector(".resizer_bloques_codigo"),
bloque_codigo = document.querySelector(".bloque_codigo");

function initResizerBloquesCodigoFn( resizer_bloques_codigo, bloque_codigo ) {

   // track current mouse position in x let
   let x, w;

   //manejador de evento para el clic del mouse
   function rs_mousedownHandler( e ) {
      //Capturo posición horizontal del cursor en el eje X
      x = e.clientX;

      //getComputedStyle: obtengo los estilos computados del elemento con la clase bloque_codigo y, específicamente, obtengo el ancho de este elemento.
      let sbWidth = window.getComputedStyle( bloque_codigo ).width;
      w = parseInt( sbWidth, 10 ); //convierto el valor obtenido a decimal

      document.addEventListener("mousemove", rs_mousemoveHandler);//agrego el escucha al evento mousemove, para q se ejecute la fn rs_mousemoveHandler
      document.addEventListener("mouseup", rs_mouseupHandler);//para limpiar y finaliza el seguimiento del movimiento
   }

   function rs_mousemoveHandler( e ) {
      let dx = e.clientX - x; //delta de la posicion de x

      let cw = w + dx; // complete width
      
      if ( cw < 700 ) {
         bloque_codigo.style.width = `${ cw }px`;
      }
   }

   function rs_mouseupHandler() {
      // remuevo event mousemove && mouseup
      document.removeEventListener("mouseup", rs_mouseupHandler);
      document.removeEventListener("mousemove", rs_mousemoveHandler);
   }

   resizer_bloques_codigo.addEventListener("mousedown", rs_mousedownHandler);
}


initResizerBloquesCodigoFn( resizer_bloques_codigo, bloque_codigo );

//Habilito y deshabilito: ventana_codigo, ventana_bloques, ventana_navegador -----------------
 function handlerClicVentana(e){
   let dicionario_Ventana = {"btn-bloque":'.ventana_bloques',"btn-codigo":'.ventana_codigo',"btn-navegador":'.ventana_navegador'}
   let elemento_ventana = document.querySelector(dicionario_Ventana[e.target.id]);
   elemento_ventana.style.display = (e.target.id == "btn-codigo") ? ((elemento_ventana.style.display === 'none' || elemento_ventana.style.display === '') ? 'block' : 'none'):(elemento_ventana.style.display === 'none') ? 'block' : 'none';
 }
 let btnBloque = document.querySelector("#btn-bloque");
 let btnCodigo = document.querySelector("#btn-codigo");
 let btnNavegador = document.querySelector("#btn-navegador");
 btnBloque.addEventListener("click", handlerClicVentana);
 btnCodigo.addEventListener("click", handlerClicVentana);
 btnNavegador.addEventListener("click", handlerClicVentana);