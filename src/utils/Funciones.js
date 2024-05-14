//************FUNCION QUE BUSCA POSICIONES RAMDOM DEL TABLERO*************/
export function posicionValida(escenario, posicionesElegidas, arrayPosiciones) {
  return arrayPosiciones
    ? encontrarPosicionesParaArray(
      arrayPosiciones,
      escenario,
      posicionesElegidas
    )
    : encontrarPosicionesParaEscenario(escenario, posicionesElegidas);
}

function encontrarPosicionesParaArray(
  arrayPosiciones,
  escenario,
  posicionesElegidas
) {
  let index;
  do {
    index = Math.floor(Math.random() * arrayPosiciones.length);
    if (
      !estaVacio(arrayPosiciones[index][0], arrayPosiciones[index][1], escenario)
    ) {
      index = Math.floor(Math.random() * arrayPosiciones.length);
    }
  } while (
    posicionesElegidas?.some(
      (element) =>
        element[0] === arrayPosiciones[index][0] &&
        element[1] === arrayPosiciones[index][1]
    )
  );
  return arrayPosiciones[index];
}

function encontrarPosicionesParaEscenario(escenario, posicionesElegidas) {
  const dimensionY = escenario.dimensiones[0];
  const dimensionX = escenario.dimensiones[1];
  let posicionProvisoriaY, posicionProvisoriaX;
  do {
    posicionProvisoriaY = Math.floor(Math.random() * dimensionY);
    posicionProvisoriaX = Math.floor(Math.random() * dimensionX);
  } while (
    !estaVacio(posicionProvisoriaY, posicionProvisoriaX, escenario) ||
    posicionesElegidas?.some(
      (element) =>
        element[0] === posicionProvisoriaY && element[1] === posicionProvisoriaX
    )
  );

  return [posicionProvisoriaY, posicionProvisoriaX];
}
//************FUNCION QUE VALIDA LAS POSICIONES DEL TABLERO*************/
function estaVacio(posicionProvisoriaY, posicionProvisoriaX, escenario) {
  let estaVacio = true;
  const casillero =
    escenario.objetosCasilleros[posicionProvisoriaY][posicionProvisoriaX];
  return (
    casillero.ocupantes[0].tipoPersonaje == "camino" &&
    casillero.ocupantes.length == 1
  );
}

// Funcion para generar coordenadas del tablero
export function generarCoordenadas(tablero) {
  let coordenadasPared = [],
    coordenadasCamino = [];

  for (let y = 0; y < tablero.length; y++) {
    for (let x = 0; x < tablero[y].length; x++) {
      let elemento = tablero[y][x];
      elemento === 1
        ? coordenadasPared.push([y, x])
        : coordenadasCamino.push([y, x]);
    }
  }
  return { coordenadasPared, coordenadasCamino };
}

// Funcion que elige personaje random
export function elegirPersonajeRandom(array) {
  const largoArray = array.length;
  const random = Math.floor(Math.random() * largoArray);
  const personajeElegido = array[random];
  return personajeElegido;
}

//Para lanzar errores en consola
export function lanzarExcepcion(texto) {
  throw new Error(texto);
}

//Para obtener una cantidad aleatorea entre un Max y un Min
export const obtenerCantidadAleatoria = function (configuracion) {
  return (
    Math.floor(
      Math.random() *
      (configuracion.cantidadMax - configuracion.cantidadMin + 1)
    ) + configuracion.cantidadMin
  );
};

//Elegir Estado Random de un Personaje
export const setearElegirEstadoRandom = function (personaje, estadoAleatorio) {
  const posicionEstadoElegido =
    Math.floor(Math.random() * estadoAleatorio.length);
  personaje.estadoInicial = estadoAleatorio[posicionEstadoElegido]
}

//********************SETEA POSICIONES **************************/
export const setearPosiciones = function (unPersonaje, unaPosicion) {
  unPersonaje.posicionInicialY = unaPosicion[0];
  unPersonaje.posicionInicialX = unaPosicion[1];
};
//******************SETEA ALIAS PARA TEST Y BOOLEANO PARA REINICIO ********************/
export const setearAliasYAleatorieidad = function (
  unPersonaje,
  desapareceAlReiniciar,
  alias
) {
  unPersonaje.desapareceAlReiniciar = desapareceAlReiniciar;
  unPersonaje.aliasConjunto = alias;
};

export const setearDireccion = function (unPersonaje, direcciones, i) {
  unPersonaje.direccionInicial = direcciones[i];
};
//********************COMANDO QUE SETEA,RENDERIZA Y EXPONE FUNCIONES GLOBALES PARA QUE FUNCIONE EL TOOLBOX ******************/
export const configurarYRenderizarToolbox = function (
  miControlador,
  categoriaElegida,
  ordenJerarquicoBloques,
  bloquesPrecargadosJSON,
  funcionesAExporner
) {
  categoriaElegida.tipos.forEach((cat) =>
    miControlador.ConfiguradorBloques.crearCategoriaToolbox(cat)
);

ordenJerarquicoBloques.forEach((bl) => {
  miControlador.ConfiguradorBloques.configurarUnBloqueCustomStandard(...bl);
});
//El id que pasemos va depender de si es HTML,CSS o JS
const divWspHTML = document.getElementById("wsp-html")
divWspHTML.innerHTML=""
divWspHTML.style.width= "100%"
// const workspace = Blockly.getMainWorkspace();

const newWidth = "100%";
const newHeight = "100%";


miControlador.crearInyectarWorkspace("wsp-html", {
  toolbox: miControlador.ConfiguradorBloques.toolbox,
  theme: "themeDH",
  renderer: "thrasos",
  zoom: {
    controls: true,
    wheel: true,
    pinch: true,
  },
  resize: true,
  parentWidth: null,
  parentHeight: null
});
// miControlador.workspace.options.resize = true
Blockly.svgResize(miControlador.workspace, newWidth, newHeight);
  miControlador.setearYCargarBloquesIniciales(
    JSON.parse(bloquesPrecargadosJSON)
  );
  miControlador.setearEventoCambioWorkspaceStandard();
  miControlador.habilitarDesactivarHuerfanos();
  miControlador.crearFuncionesGlobalesStandard();
  // funcionesAExporner.forEach((unaFuncion) =>
  //   miControlador.juego.agregarGlobalConCallback(unaFuncion)
  // );
  // try{
  // const callBackJuego = miControlador.juego.generarCallbackParaInterprete();
  // miControlador.setearCallbackInterprete((interpreter, globalObject) => {
  //   console.log(globalObject)
  //   miControlador.callbackInterpreteStandard(interpreter, globalObject);
  //   callBackJuego(interpreter, globalObject);
  // });
  // }catch(e){
  //   throw new Error(e,"revento, estoy en Funciones.js configurarYRenderizarToolbox")
  // }

};

export const arraysSonIguales = function (arr1, arr2) {
  const arr1Ordenado = arr1.sort();
  const arr2Ordenado = arr2.sort();
  return JSON.stringify(arr1Ordenado) === JSON.stringify(arr2Ordenado);
}

export const compararListasHastaQueNoSeanIguales= function (miJuego,listaDePersonajesVieja,objetoAComparar){
  let listaDePersonajesViejosAleatorios = listaDePersonajesVieja.filter((perosnaje) => perosnaje.tipoPersonaje == objetoAComparar);
  let listaDePosicionesViejas = listaDePersonajesViejosAleatorios.map((personaje) => [personaje.posicionInicialY, personaje.posicionInicialX]);
  let listaDePersonajesNuevaAleatorios = miJuego.listaDePersonajes.filter((perosnaje) => perosnaje.tipoPersonaje == objetoAComparar);
  let listaDePosicionesNuevas = listaDePersonajesNuevaAleatorios.map((personaje) => [personaje.posicionInicialY, personaje.posicionInicialX]);
  while (arraysSonIguales(listaDePosicionesViejas, listaDePosicionesNuevas)) {
    miJuego.reiniciar();
    listaDePersonajesNuevaAleatorios = miJuego.listaDePersonajes.filter((perosnaje) => perosnaje.tipoPersonaje == objetoAComparar);
    listaDePosicionesNuevas = listaDePersonajesNuevaAleatorios.map((personaje) => [personaje.posicionInicialY, personaje.posicionInicialX]);
  }
  return listaDePersonajesNuevaAleatorios
}