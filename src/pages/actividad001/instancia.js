import { Juego } from "../../clases/Juego";
import { template } from "../../recursosPaginas/Template";
import ControladorStandard from "../../bloques/Controlador";
import customTheme from "../../bloques/CustomTheme";
import { CustomCategory } from "../../bloques/CustomCategory";
import {Dhs_personajes} from '../../clases/Dhs-personajes';
import {generarCoordenadas, configurarYRenderizarToolbox} from '../../Utils/Funciones';
import {Dhs_Categorias} from '../../clases/Dhs-categorias';
import { PgEvent } from "../../Utils/pgEvent";
import { ganarSiPasaTest } from "./test";
import {ClaseTest} from "../../clases/ClaseTest"

const pgEvent = new PgEvent();
window.onload = pgEvent.getValues();

const mensajePGExito = "¡Muy Bien logrado!"
const miTest= new ClaseTest(mensajePGExito);

document.querySelector("#appActividad").innerHTML = template(``);
const velocidadInicial = 1000;
const miJuego = new Juego(velocidadInicial);
const dimensiones = [7, 7];

const tablero = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const coordenadasCaminoPared = generarCoordenadas(tablero);
const personajesGaleria = new Dhs_personajes();
const lupe = personajesGaleria.obtenerPersonaje("lupe");
const cofre = personajesGaleria.obtenerPersonaje("cofre");
const pasto = personajesGaleria.obtenerPersonaje("pasto");
const arbol = personajesGaleria.obtenerPersonaje("arbol");
const bandera = personajesGaleria.obtenerPersonaje("bandera");

const estadoWorkspaceInicial = '{"blocks":{"languageVersion":0,"blocks":[{"type":"on_execute","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';

const datosModal = {
  titulo: "¡BUEN TRABAJO!",
  imagen: "monedas",
  texto: "Juntaste todas las monedas de los cofres!",
  oculto: true,
  tipo:"ganador"
};

miJuego.generarEscenario(dimensiones, 2.5, "#9ca64e");
miJuego.agregarModal(datosModal);
let conjuntosDePersonajes = [
  {
    estrategia: "fijos",
    personajes: [arbol],
    posiciones: coordenadasCaminoPared.coordenadasPared,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [pasto],
    posiciones: coordenadasCaminoPared.coordenadasCamino,
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [lupe],
    posiciones: [[1, 1]],
    aliasConjunto: "fijoPrincipal",
    desapareceAlReiniciar: false,
  },
  {
    estrategia: "fijos",
    personajes: [cofre],
    posiciones: [[2, 2],[3,3],[4,4],[5,5]],
    aliasConjunto: "fijosTablero",
    desapareceAlReiniciar: false,
  },
 
];

miJuego.crearPersonajes(conjuntosDePersonajes);
miJuego.setearPersonajePrincipal(miJuego.listaDePersonajes[49]);





// BLOCKLY ------------------------------------------------------
window.miControlador = new ControladorStandard(miJuego, velocidadInicial,estadoWorkspaceInicial,pgEvent,miTest);
const categoria=new Dhs_Categorias()
const categoriaElegida= categoria.obtenerCategoriasNecesarias(["Eventos","Movimientos","Acciones","Repeticiones"])
const ordenJerarquicoBloques = [
  ["on_execute", "Eventos"],
  ["move_classic_simple", "Movimientos"],
  ["abrir_cofre", "Acciones"],
  ["repeat_times", "Repeticiones"],
];

const funcionesAExponer=["moverDerecha","moverAbajo","moverArriba","moverIzquierda","abrirCofre"]

// Test-----
miTest.setearCallback(ganarSiPasaTest,pgEvent,miJuego.personajePrincipal,miControlador)
miJuego.personajePrincipal.miTest = miTest
//Comunicacion con PG
let bloquesPrecargadosJSON = estadoWorkspaceInicial;
window.addEventListener('message', function(event) {
  if (isValidInitialEvent(event)) {
    bloquesPrecargadosJSON = validateJson(event.data.data) ? event.data.data : estadoWorkspaceInicial;
    configurarYRenderizarToolbox(
      miControlador,
      categoriaElegida,
      ordenJerarquicoBloques,
      bloquesPrecargadosJSON,
      funcionesAExponer
    );
  }
  
});

const isValidInitialEvent = (event) => {
  return event?.data?.data && event?.data?.type === 'init' 
  && typeof event.data.data == "string"
}

const validateJson = (json) => {
  try {
    return !!JSON.parse(json)
  } catch (error) {
    console.error("Invalid provided json:", error.message)
    return null
  }
}