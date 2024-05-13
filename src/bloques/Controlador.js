import ConfiguradorBloques from "./ConfiguradorBloques";
import Swal from "sweetalert2";

class Controlador {
  constructor(
    estadoWorkspaceInicial,
    botonEjecutar,
    botonDetener = false,
    botonReiniciar = false,
    botonLimpiarWorkspace = false,
    inputAcelerador = false,
    inputBloquesSueltos = false,
    panelCodigoGenerado = false,
    cuadroOutput = false,

    afijos = {
      prefijo: "resaltarBloque(%1);\n",
      sufijo: "quitarResaltadoBloqueLuegoAvanzar(%1);\n",
    },
    palabrasReservadas = ["resaltarBloque", "quitarResaltadoBloqueLuegoAvanzar"]
  ) {
    // ELEMENTOS IMPORTANTES
  
    this.estadoWorkspaceInicial = estadoWorkspaceInicial;
    this.ConfiguradorBloques = new ConfiguradorBloques();
    this.necesitaEsperarReinicio = false;
    this.cuadroOutput = cuadroOutput;
    this.interpreteIterativo = null;
    this.callbackInterprete = null;
    this.panelCodigoGenerado = panelCodigoGenerado;
    this.desactivaHuerfanos = false;
    // this.estadoWorkspaceActual = null;
    // BOTONES
    this.botonEjecutar = botonEjecutar;
    this.hayBubble = false
    if (this.botonEjecutar) {
      this.botonEjecutar.addEventListener("click", () => {
        this.inicializarFlags()
        this.cerrarModalAbierto()
        this.verificarBloquePadreTengaHijos("on_execute")
        this.verificarBloquePadreTengaHijos("repeat_times")
        this.verificarBloquePadreTengaHijos("repeat_until")
        //this.verificarBloquePadreTengaHijos("repeat_while")
        this.verificarBloquePadreTengaHijos("if")
        this.verificarBloquePadreTengaHijos("if_else")
        this.deshabilitarEdicionWorkspace()
        this.deshabilitarBotonEjecutar()
        this.deshabilitarBotonReinicio()
        this.rehabilitarBotonDetener()
        !this.hayBubble && this.recorrerPasos(false) // bool: sincronico.
        this.hayBubble && this.reiniciarEjecucion()
        this.obtenerEstadoActual()
        this.limpiarListaDeErrores()

      });
    }
    this.botonDetener = botonDetener;
    if (this.botonDetener) {
      this.botonDetener.addEventListener("click", () => {
        this.detenerEjecucion(); // deshabilitaDetener
        this.rehabilitarBotonEjecutar();
        this.rehabilitarBotonReinicio();
        this.habilitarEdicionWorkspace()
      });
    }
    // this.deshabilitarBotonDetener();

    this.botonReiniciar = botonReiniciar;

    if (this.botonReiniciar) {
      this.botonReiniciar.addEventListener("click", () => {
        this.inicializarFlags()
        this.cerrarModalAbierto()
        this.limpiarListaDeErrores()
        this.reiniciarEjecucion(); // llama a detenerEjecucion tmb, que deshabilita botonDeneter
        this.rehabilitarBotonEjecutar();
        this.deshabilitarBotonReinicio(); // para evitar multiclick
        setTimeout(() => {
          // permite volver a reiniciar pasado medio segundo.
          this.rehabilitarBotonReinicio();
        }, 1050);
      });
    }
    this.botonLimpiarWorkspace = botonLimpiarWorkspace;
    if (this.botonLimpiarWorkspace) {
      this.botonLimpiarWorkspace.addEventListener("click", () => {
        // Confirm en SweetAlert
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
        });
        swalWithBootstrapButtons
          .fire({
            title: "¿Borrar todo?",
            text: "Esta acción eliminará todos los bloques que colocaste.",
            icon: "warning",
            iconColor: "#FFD148",
            showCancelButton: true,
            confirmButtonText: "Si, borrar todo.",
            cancelButtonText: "No, cancelar.",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.detenerEjecucion();
              this.limpiarWorkspace();
              this.cargarBloquesSerializados(JSON.parse(this.estadoWorkspaceInicial));
              let timerInterval;
              this.setearEstadoInicialWorkspace()
              swalWithBootstrapButtons.fire({
                title: "¡Borrado!",
                text: "Los bloques fueron borrados.",
                icon: "success",
                timer: 1200,
                timerProgressBar: true,
                showConfirmButton: false,
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              let timerInterval;
              swalWithBootstrapButtons.fire({
                title: "Acción cancelada",
                text: "Tus bloques están a salvo.",
                icon: "error",
                timer: 1200,
                timerProgressBar: true,
                showConfirmButton: false,
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
            }
          });
      });
      // Fin confirm
    }
    this.inputAcelerador = inputAcelerador;
    if (this.inputAcelerador) {
      this.inputAcelerador?.addEventListener("input", () => {
        let valor = parseInt(this.inputAcelerador.value);
        let velocidad = 2500 - valor;
        this.setearVelocidad(velocidad);
      });
    }

    this.inputBloquesSueltos = inputBloquesSueltos;
    if (this.inputBloquesSueltos) {
      inputBloquesSueltos.addEventListener("change", () => {
        if (this.desactivaHuerfanos) {
          this.inhabilitarDesactivarHuerfanos();
        } else {
          this.habilitarDesactivarHuerfanos();
        }
      });
    }

    // FLAGS
    this.hayCodigoPendiente = false;
    this.hacerPausaResaltar = false;
    this.hacerPausaQuitarResaltado = false;
    this.debeDetenerEjecucion = false;

    // AFIJACIÓN
    this.prefijo = afijos?.prefijo ? afijos.prefijo : null;
    this.sufijo = afijos?.sufijo ? afijos.sufijo : null;
    this.setearPrefijoBloques(this.prefijo);
    this.setearSufijoBloques(this.sufijo);
    palabrasReservadas.forEach((p) => this.agregarPalabraReservada(p));

    this.callbackCambioWorkspaceStandard = (event) => {
      let codigoCrudo;
      if (!event.isUiEvent) {
        if (event.type === "drag" && event.isStart) {
          return;
        } else {
          if (!this.debeDetenerEjecucion) {
            codigoCrudo = this.generarCodigoCrudo();
            if (this.panelCodigoGenerado.value != codigoCrudo) {
              this.detenerEjecucion();
              this.quitarTodosLosResaltados();
            }
          }
          this.mostrarCodigoCrudo();
        }
      }
    };
    this.eventoCambioWorkspaceActual = null;
  }
  // FIN CONSTRUCTOR

  // METODOS PARA EL WORKSPACE - SERIALIZACION

  inicializarFlags() {
    this.test.ejecucionSincronica = false
    this.test.ejecutarElTest = true
    this.juego.setearSincronicidad(true)
    let divFalso = document.getElementById("elemento-escenario-clonado")
    let juego = document.querySelector(".juego")
    divFalso && juego.removeChild(divFalso)

  }

  crearInyectarWorkspace(idElemento, objetoConfig) {
    console.log("revienta")
    this.workspace = Blockly.inject(idElemento, objetoConfig);
  }

  habilitarEdicionWorkspace() {
    this.workspace.options.readOnly = false;
  }

  deshabilitarEdicionWorkspace() {
    this.workspace.options.readOnly = true;
  }

  limpiarWorkspace() {
    return this.workspace.clear();
  }
  obtenerBloquesSerializados(todoElWorskpace = true) {
    if (todoElWorskpace) {
      return Blockly.serialization.workspaces.save(this.workspace);
    }
  }
  cargarBloquesSerializados(bloquesSerializados) {
    return Blockly.serialization.workspaces.load(
      bloquesSerializados,
      this.workspace
    );
    // --load hace el clear previo--
  }
  setearYCargarBloquesIniciales(bloquesSerealizados) {
    this.bloquesIniciales = bloquesSerealizados;
    this.cargarBloquesSerializados(this.bloquesIniciales);
  }
  verificarUsoDeBloques(bloqueAVerificar) {//devulve array de bloques encontrados
    const existeBloque = this.obtenerBloquesSerializados().blocks.blocks.filter(b => b.type == bloqueAVerificar)
    return existeBloque
  }
  verificarUsoDeBloquesInternos(bloqueABuscar) {// devuelve cantidad de bloques encontrados en todo el WS
    let cantidadDeBloquesEnW = this.workspace.getBlocksByType(bloqueABuscar, "LTR")
    let cantBloquesHijosDelOnExecute = cantidadDeBloquesEnW.filter(b=>this.verificarEsHuerfano(b))
    return cantBloquesHijosDelOnExecute.length
  }
  obtenerbloque(bloqueABuscar) {
    let arrBloques = this.workspace.getBlocksByType(bloqueABuscar, "LTR")
    return arrBloques
  }

  verificarEsHuerfano(block) {
    let blockOnExecute = this.workspace.getBlocksByType("on_execute")
    let bloquesDescendDelOnExecute = blockOnExecute[0]?.getDescendants()
    let esHijo = bloquesDescendDelOnExecute?.find(b => b.id == block.id)
    return esHijo
  }

  //WORKSPACE - BLOQUES - RESALTADO

  resaltarBloque(id, conservarOtros = true) {
    this.workspace.highlightBlock(id, conservarOtros);
    this.hacerPausaResaltar = true;
  }

  quitarTodosLosResaltados() {
    this.workspace.highlightBlock(null);
  }

  quitarResaltadoBloque(bloque) {
    return bloque.setHighlighted(false);
  }

  // WORKSPACE - GENERACION DE CODIGO Y AFIJACION

  generarCodigoCrudo(todoElWorskpace = true) {
    this.setearPrefijoBloques(null);
    this.setearSufijoBloques(null);
    let codigoCrudo;
    if (todoElWorskpace) {
      codigoCrudo = Blockly.JavaScript.workspaceToCode(this.workspace);
    }
    this.setearPrefijoBloques(this.prefijo);
    this.setearSufijoBloques(this.sufijo);
    return codigoCrudo;
  }

  mostrarCodigoCrudo() {
    if (this.panelCodigoGenerado) {
      this.panelCodigoGenerado.value = this.generarCodigoCrudo();
    }
  }

  setearPrefijoBloques(prefijo) {
    Blockly.JavaScript.STATEMENT_PREFIX = prefijo;
  }
  setearSufijoBloques(sufijo) {
    Blockly.JavaScript.STATEMENT_SUFFIX = sufijo;
  }
  agregarPalabraReservada(palabra) {
    Blockly.JavaScript.addReservedWords(palabra);
  }

  estadoWorkspaceActual = (state) => {
    this.objetoEventoPlayground.sendState(state);
  }

  obtenerEstadoActual() {
    const state = JSON.stringify(Blockly.serialization.workspaces.save(this.workspace))
    this.estadoWorkspaceActual(state)
  }

  setearEstadoInicialWorkspace() {
    const state = this.estadoWorkspaceInicial
    this.estadoWorkspaceActual(state)
  }

  generarCodigoPrefijado(prefijo = this.prefijo, sufijo = this.sufijo) {
    this.setearPrefijoBloques(prefijo);
    this.setearSufijoBloques(sufijo);
    return Blockly.JavaScript.workspaceToCode(this.workspace);
  }

  // METODOS EJECUCION/ITERACION/INTERPRETE

  anularInterpreteIterativo() {
    this.interpreteIterativo = null;
  }

  crearInterprete(codigo, callback = this.callbackInterprete) {
    return new Interpreter(codigo, callback);
  }

  detenerEjecucion() {
    this.debeDetenerEjecucion = true;
    this.rehabilitarBotonReinicio();
    this.rehabilitarBotonEjecutar();
    // this.deshabilitarBotonDetener();
    this.anularInterpreteIterativo();
    this.habilitarEdicionWorkspace();
  }

  reiniciarEjecucion() {
    this.necesitaEsperarReinicio = false;
    //this.test.ejecucionSincronica = false
    this.detenerEjecucion(); // deshabilita Detener tmb
    this.cuadroOutput?.blanquearTodo();
    this.juego?.reiniciar();
    this.limpiarListaDeErrores()
  }

  correrCodigoSincrono(codigo, callback = this.callbackInterprete) {
    const interpreteSincrono = this.crearInterprete(codigo, callback);
    return interpreteSincrono.run();
  }

  generarCorrerCodigoCrudoSincronamente(callback = this.callbackInterprete) {
    this.correrCodigoSincrono(this.generarCodigoCrudo(), callback);
  }

  quitarResaltadoBloqueLuegoAvanzar(id) {
    this.hacerPausaResaltar = false;
    this.hacerPausaQuitarResaltado = true;
    let miBloque = this.workspace.getBlockById(id);
    let valor = miBloque?.getFieldValue("CASILLAS");
    let duracionDeLaPausa = 1;
    duracionDeLaPausa = valor ? valor * this.velocidad : this.velocidad;
    // IR AL PRÓXIMO
    setTimeout(() => {
      this.quitarResaltadoBloque(miBloque);
      this.hacerPausaQuitarResaltado = false;
      this.hacerPasosHastaBandera();
    }, duracionDeLaPausa);
  }

  verificarQueHayaUnSoloOnExecute() {
    if (this.verificarUsoDeBloques("on_execute").length !== 1) {
      this.test.listaDeErrores.push("Sólo necesitamos un bloque 'al ejecutar'")
      this.juego.personajePrincipal.terminar()

    }
  }

  abrirLaBubbleWarning(nombreBloque, block) {
    this.hayBubble = true
    let warningIcon = block.getIcon("warning");
    warningIcon?.setBubbleVisible(true)
    this.test.listaDeErrores.push(`El bloque ${nombreBloque} debe contener al menos un bloque`)
    this.juego.personajePrincipal.terminar()
  }
  corroborarTieneHijosRepeatTimes(blockRepeatTimes) {
    if (blockRepeatTimes?.length == 0 || !blockRepeatTimes) { return }
    let childrenBlock = blockRepeatTimes.getChildren();
    let descendientesTodos = blockRepeatTimes.getDescendants()
    let nextBlock = blockRepeatTimes.getNextBlock()
    // console.log(blockRepeatTimes.getParent())

    if (childrenBlock?.length >= 2) {
      // console.log("hay bloques hijos")
      blockRepeatTimes.setWarningText(null)
    }
    if (childrenBlock?.length == 1) {
      // console.log("childrenBlock es 1")
      if (nextBlock?.id == childrenBlock[0].id) {
        // console.log("el children es el next-error")
        blockRepeatTimes.setWarningText("Este bloque no puede estar vacío")
        this.abrirLaBubbleWarning("repeat_times", blockRepeatTimes)
      } else {
        // console.log("el children es hijo-ok")
      }
    }
    if (descendientesTodos?.length == 1) {
      // console.log("hay solo 1 repeat, es el mismo, y esta vacio")
      // console.log("abrir la bubble")
      this.abrirLaBubbleWarning("repeat_times", blockRepeatTimes)
    }
    if (blockRepeatTimes?.getParent()?.type != "on_execute") {
      // console.log("el bloque recibido tiene otro padre que no es el on_execute")
    }
  }

  corroborarTienehijosBloquesConSensor(nombreBloque, block) {
    if (!block) { return }
    const sensor = block?.getChildren("LTR").find((b) => b.styleName_ == "sensor_blocks")
    let childrenBlock = block?.getChildren().filter(b => b.styleName_ !== "sensor_blocks")
    let descendientesTodos = block?.getDescendants()
    let nextBlock = block?.getNextBlock()
    //corroborar que no sea huerfano
    // let warningIcon = block.getIcon("warning");
    // warningIcon.setBubbleVisible(true)
    if (!sensor) {
      let warningIcon = block.getIcon("warning");
      warningIcon.setBubbleVisible(true)
      this.test.listaDeErrores.push(`El bloque ${nombreBloque} no puede estar sin condición`)
      this.juego.personajePrincipal.terminar()
    }
    if (childrenBlock.length == 0 && !nextBlock) {
      // console.log("children es 0")
      this.abrirLaBubbleWarning(nombreBloque, block)
    }
    if (childrenBlock?.length >= 2) {
      // console.log("hay bloques hijos")
      block.setWarningText(null)
    }
    if (childrenBlock?.length == 1) {
      // console.log("childrenBlock es 1")
      if (nextBlock?.id == childrenBlock[0].id) {
        // console.log("el children es el next-error")
        block.setWarningText("Este bloque no puede estar vacío")
        this.abrirLaBubbleWarning(nombreBloque, block)
      } else {
        // console.log("el children es hijo-ok")
      }
    }
    if (descendientesTodos?.length == 1) {
      // console.log("hay solo 1 repeat, es el mismo, y esta vacio")
      this.abrirLaBubbleWarning(nombreBloque, block)
    }
  }

  verificarBloquePadreTengaHijos(nombrePadre) { // padre = "on_execute" -> fn global para la verificacion de hijos en bloques puntuales
    let arrTopBlocks = this.obtenerbloque(nombrePadre)
    if (arrTopBlocks?.length == 0) { return }
    if (arrTopBlocks.length > 0) {
      if (nombrePadre == "on_execute") {
        this.verificarQueHayaUnSoloOnExecute()
        let primerHijoTop = arrTopBlocks[0]?.getChildren()[0]
        if (primerHijoTop == undefined) {
          this.abrirLaBubbleWarning("on_execute", arrTopBlocks[0])
        }
      }
      //separé las fn segun s tienen sensor o no
      if (nombrePadre == "repeat_times") {
        arrTopBlocks.forEach(bloque => {
          let noHuerfano = this.verificarEsHuerfano(bloque)
          noHuerfano && this.corroborarTieneHijosRepeatTimes(bloque)
        })
      }
      if (nombrePadre == "repeat_until" || nombrePadre == "if" || nombrePadre == "if_else") {
        arrTopBlocks.forEach(bloque => {
          let noHuerfano = this.verificarEsHuerfano(bloque)
          noHuerfano && nombrePadre == "repeat_until" && this.corroborarTienehijosBloquesConSensor("repeat_until", bloque)
          noHuerfano && nombrePadre == "if" && this.corroborarTienehijosBloquesConSensor("if", bloque)
          noHuerfano && nombrePadre == "if_else" && this.corroborarTienehijosBloquesConSensor("if_else", bloque)
        })
      }
    }
  }
  
  cantidadDeHijosDeUnBloque(bloque) {
    let cantidad = 0
    let arrTopBlocks = this.obtenerbloque(bloque)
    let nextBlock = arrTopBlocks[0]?.getNextBlock()
    let descendientesTodos = arrTopBlocks[0].getDescendants()
    cantidad = descendientesTodos.length - 1
    if (nextBlock) {
      while (nextBlock) {
        nextBlock = nextBlock.getNextBlock()
        cantidad--
      }
    }
    return cantidad
  }

  obtenerNumeroDeRepeticiones(bloque) {//funciona para el repeat_times, TODO:probar con otros bloques
    let arrTopBlocks = this.obtenerbloque(bloque)
    let numeroVeces = 0
    if (arrTopBlocks.length != 0) {
      let listaDeInputs = arrTopBlocks[0]?.inputList[0]?.fieldRow
      listaDeInputs.forEach(bloque => {
        if (bloque?.name == "cantidadRepeticiones") {
          numeroVeces = bloque.value_
        }
      })
    }
    //Si devuelve "0" es porque no existe el bloque directamente
    return numeroVeces
  }
  recorrerPasos(sincronico = true, callback = this.callbackInterprete) {
    const necesitaReiniciar = this.necesitaEsperarReinicio;
    this.juego?.reiniciar();
    this.test.ejecucionSincronica && this.test.callbackSincronico(this.juego,this.test.listaDePersonajesVieja)
    this.necesitaEsperarReinicio = true;
    this.juego?.setearSincronicidad(sincronico);
    this.anularInterpreteIterativo();
    this.quitarTodosLosResaltados();
    this.cuadroOutput?.blanquearTodo();
    this.cuadroOutput?.marcarInicio();
    let codigoActualCrudo = this.generarCodigoCrudo();
    if (this.panelCodigoGenerado) {
      this.panelCodigoGenerado.value = codigoActualCrudo;
    }
    let codigoActual = sincronico
      ? codigoActualCrudo
      : this.generarCodigoPrefijado();
    this.interpreteIterativo = this.crearInterprete(codigoActual, callback);
    this.hayCodigoPendiente = true;
    this.hacerPausaResaltar = false;
    this.hacerPausaQuitarResaltado = false;
    this.debeDetenerEjecucion = false;
    if (sincronico || !necesitaReiniciar) {
      this.hacerPasosHastaBandera();
    } else {
      setTimeout(() => {
        this.hacerPasosHastaBandera();
      }, this.velocidad + 10);
    }
  }

  cerrarModalAbierto() {
    this.juego?.datosModal && this.juego.ocultarModal(this.juego.datosModal)
    this.juego?.datosModalIncorrecto && this.juego.ocultarModal(this.juego.datosModalIncorrecto)
  }

  hacerPasosHastaBandera() {
    if (this.hacerPausaQuitarResaltado) {return}
    if (this.debeDetenerEjecucion) {return}
    this.hacerPausaResaltar = false;
    while (
      this.hayCodigoPendiente &&
      !this.hacerPausaResaltar &&
      !this.hacerPausaQuitarResaltado &&
      !this.debeDetenerEjecucion
    ) {
      this.hayCodigoPendiente = this.interpreteIterativo.step();
      if (!this.juego?.puedeDebeContinuar) {
        this.debeDetenerEjecucion = true;
      }
    }
    // Si corta el while (por banderas o muerte)
    if (this.hayCodigoPendiente) {
      if (this.hacerPausaResaltar) {
        setTimeout(() => {
          this.hacerPasosHastaBandera();
        }, 50);
      } else if (this.debeDetenerEjecucion) {
        this.finalizarHacerPasos()
      }
    } else {
      this.finalizarHacerPasos()
    }
  }

  finalizarHacerPasos() {
    this.test.ejecutarElTest && this.test.init()
    this.cuadroOutput?.marcarFin(); //coding
    setTimeout(() => {
      this.detenerEjecucion();
    }, 400);
  }
  //Funcion para ejecutar al finalizar la recorrida de cada bloque

  // test(){
  //   this.juego.personajePrincipal?.ganarSiPasaTest()
  //   }

  // WORKSPACE - GESTION EVENTOS DE CAMBIO

  removerEventoCambioWorkspace(eventId) {
    this.eventoCambioWorkspaceActual
      ? this.workspace.removeChangeListener(eventId)
      : null;
  }

  removerEventoCambioWorkspaceActual() {
    this.removerEventoCambioWorkspace(this.eventoCambioWorkspaceActual);
  }

  setearEventoCambioWorkspace(callback) {
    this.eventoCambioWorkspaceActual
      ? this.workspace.removeChangeListener(this.eventoCambioWorkspaceActual)
      : null;
    this.eventoCambioWorkspaceActual =
      this.workspace.addChangeListener(callback);
  }

  setearEventoCambioWorkspaceStandard() {
    this.setearEventoCambioWorkspace(this.callbackCambioWorkspaceStandard);
  }

  habilitarDesactivarHuerfanos() {
    this.desactivaHuerfanos = true;
    this.eventoHuerfanos = this.workspace.addChangeListener(
      Blockly.Events.disableOrphans
    );
  }

  inhabilitarDesactivarHuerfanos() {
    this.desactivaHuerfanos = false;
    this.workspace.removeChangeListener(this.eventoHuerfanos);
  }
  habilitarEdicionWorkspace() {
    this.workspace.options.readOnly = false;
  }
  deshabilitarEdicionWorkspace() {
    this.workspace.options.readOnly = true;
  }
  // INTERPRETE

  setearCallbackInterprete(callback) {
    this.callbackInterprete = callback;
  }

  // VENTANA: METODOS BOTONES EVENTOS

  // deshabilitarBotonEjecutar() {
  //   this.botonEjecutar.disabled = "disabled";
  // }

  // rehabilitarBotonEjecutar() {
  //   this.botonEjecutar.disabled = "";
  // }
  // deshabilitarBotonDetener() {
  //   this.botonDetener.disabled = "disabled";
  // }
  // rehabilitarBotonDetener() {
  //   this.botonDetener.disabled = "";
  // }
  // deshabilitarBotonReinicio() {
  //   this.botonReiniciar.disabled = "disabled";
  // }

  // rehabilitarBotonReinicio() {
  //   this.botonReiniciar.disabled = "";
  // }
  // limpiarListaDeErrores() {
  //   this.test.listaDeErrores = []
  //   this.hayBubble = false
  // }


  // VENTANA: CREACION DE FUNCIONES GLOBALES

  crearFuncionesGlobalesStandard() {
    window.globalAlertMock = (texto) => {
      return this.cuadroOutput?.agregarTexto(texto, true); // bool: salto de linea
    };
    window.globalResaltar = (id) => {
      return this.resaltarBloque(id);
    };
    window.globalQuitar = (id) => {
      return this.quitarResaltadoBloqueLuegoAvanzar(id);
    };
  }
}

export default class ControladorStandard extends Controlador {
  constructor(
    estadoWorkspaceInicial,
  ) {
    let elementoOutput = document.getElementById(
      "dhs-text-area-output-generado"
    );
    super(
      estadoWorkspaceInicial,
      document.getElementById("dhs-boton-ejecutar"),
      document.getElementById("dhs-boton-detener"),
      document.getElementById("dhs-boton-reiniciar"),
      document.getElementById("dhs-boton-borrar"),
      document.getElementById("dhs-input-acelerador"),
      document.getElementById("dhs-input-bloques-sueltos"),
      document.getElementById("dhs-text-area-codigo-generado"),
      elementoOutput ? new MostradorOutput(elementoOutput) : false
    );

    setTimeout(() => {
      document
        .getElementById("dhs-input-bloques-sueltos")
        ?.setAttribute("checked", true);
    }, 1);
    this.callbackInterpreteStandard = (interpreter, globalObject) => {

      interpreter.setProperty(
        globalObject,
        "alert",
        interpreter.createNativeFunction(globalAlertMock)
      );

      const wrapperPrompt = function prompt(text) {
        return window.prompt(text);
      };
      interpreter.setProperty(
        globalObject,
        "prompt",
        interpreter.createNativeFunction(wrapperPrompt)
      );
      interpreter.setProperty(
        globalObject,
        "resaltarBloque",
        interpreter.createNativeFunction(globalResaltar)
      );
      interpreter.setProperty(
        globalObject,
        "quitarResaltadoBloqueLuegoAvanzar",
        interpreter.createNativeFunction(globalQuitar)
      );
    };
  }
}

class MostradorOutput {
  constructor(elementoTextArea) {
    this.elemento = elementoTextArea;
    this.blanquearTodo();
  }
  blanquearTodo() {
    this.elemento.value = "";
  }
  marcarInicio() {
    this.elemento.value = "OUTPUT DEL PROGRAMA:\n\n";
  }
  agregarTexto(texto, saltoDeLinea = false) {
    let txtVal = this.elemento.value;
    txtVal += saltoDeLinea ? "\n" : "";
    txtVal += texto;
    this.elemento.value = txtVal;
  }
  marcarFin() {
    this.elemento.value += "\n\n\nPROGRAMA TERMINADO";
  }
}