import '../../style.css'
import { configurarYRenderizarToolbox } from '../../utils/Funciones.js';
import ControladorStandard from "../../bloques/Controlador.js";
import CustomTheme from "../../bloques/CustomTheme.js";
import { Dhs_Categorias } from '../../clases/Dhs-categorias.js';
import { template } from "../../utils/Template.js";

(function () {document.querySelector('#app').innerHTML = template(``)}());


// BLOCKLY ------------------------------------------------------
const estadoWorkspaceInicial = '{"blocks":{"languageVersion":0,"blocks":[{"type":"base_frame","id":"rwW]g?!-iwJNk))r*~^C","x":61,"y":69}]}}';

window.miControlador = new ControladorStandard(estadoWorkspaceInicial);
const categoria = new Dhs_Categorias()
const categoriaElegida = categoria.obtenerCategoriasNecesarias(["Funciones"])
const ordenJerarquicoBloques = [
   ["base_frame", "Funciones"],
   ["title", "Funciones"],
   ["plaintext", "Funciones"],
];
configurarYRenderizarToolbox(
   miControlador,
   categoriaElegida,
   ordenJerarquicoBloques,
   estadoWorkspaceInicial
 );