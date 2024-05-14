import ConfiguradorBloques from "./ConfiguradorBloques";
class Controlador {
    constructor(
      estadoWorkspaceInicial,
      panelCodigoGenerado = false,
      cuadroOutput = false,
    ) {
      // ELEMENTOS IMPORTANTES
    
      this.estadoWorkspaceInicial = estadoWorkspaceInicial;
      this.ConfiguradorBloques = new ConfiguradorBloques(); 
      this.cuadroOutput = cuadroOutput;
      this.interpreteIterativo = null;
      this.callbackInterprete = null;
      this.panelCodigoGenerado = panelCodigoGenerado;
      this.desactivaHuerfanos = false;
      // this.estadoWorkspaceActual = null;
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
    
    crearInyectarWorkspace(idElemento, objetoConfig) {
        console.log("revienta")
        this.workspace = Blockly.inject(idElemento, objetoConfig);
        
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
  generarCodigoCrudo(todoElWorskpace = true) {
    var HtmlGenerator = new Blockly.Generator('HTML');
    HtmlGenerator.ORDER_ATOMIC = 0;
    HtmlGenerator.ORDER_NONE = 0;

    HtmlGenerator.init = function(workspace) {};
    HtmlGenerator.finish = function(code) {return code;};

  HtmlGenerator.scrub_ = function(block, code) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = HtmlGenerator.blockToCode(nextBlock);
  return code + nextCode;
};


var code = HtmlGenerator.workspaceToCode(this.workspace);
document.getElementById('codigo-html').innerText = code;
document.getElementById('navegador').src = "data:text/html;charset=utf-8," + encodeURIComponent(code);
    // let codigoCrudo;
    // if (todoElWorskpace) {
    //   codigoCrudo = HtmlGenerator.workspaceToCode(this.workspace);
    // }
  
    // return codigoCrudo;
  }

  mostrarCodigoCrudo() {
    if (this.panelCodigoGenerado) {
      this.panelCodigoGenerado.value = this.generarCodigoCrudo();
    }
  }
}

    export default class ControladorStandard extends Controlador {
        constructor(estadoWorkspaceInicial) {
          let elementoOutput = document.getElementById(
            "dhs-text-area-output-generado"
          );
          super(
            estadoWorkspaceInicial,
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