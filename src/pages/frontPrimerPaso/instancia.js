import '../../style.css'
import { configurarYRenderizarToolbox } from '../../utils/Funciones.js';
import ControladorStandard from "../../bloques/Controlador.js";
import CustomTheme from "../../bloques/CustomTheme.js";
import { CustomCategory } from "../../bloques/CustomCategory";
import { Dhs_Categorias } from '../../clases/Dhs-categorias.js';
import { template } from "../../utils/Template.js";

(function () {document.querySelector('#app').innerHTML = template(``)}());

//Ejercicios
// BLOCKLY ------------------------------------------------------
const estadoWorkspaceInicial = "{}";
const estadoWorkspaceInicialCSS="{}"
window.miControlador = new ControladorStandard(estadoWorkspaceInicial);
const categoriaHTML = new Dhs_Categorias()
const categoriaCSS= new Dhs_Categorias()
const categoriaElegidaHtml = categoriaHTML.obtenerCategoriasNecesarias(["Funciones"])
const categoriaElegidaCss = categoriaCSS.obtenerCategoriasNecesarias(["Sensores"])
const ordenJerarquicoBloques = [
   ["base_frame", "Funciones"],
   ["plaintext", "Funciones"],
];
const ordenJerarquicoBloquesCSS = [
   ["title", "Sensores"],
   
];
configurarYRenderizarToolbox(
   miControlador,
   categoriaElegidaHtml,
   ordenJerarquicoBloques,
   estadoWorkspaceInicial,
   "wsp-html",
   "HTML"
 );
 configurarYRenderizarToolbox(
   miControlador,
   categoriaElegidaCss,
   ordenJerarquicoBloquesCSS,
   estadoWorkspaceInicialCSS,
   "wsp-css",
   "CSS"
 );
 
