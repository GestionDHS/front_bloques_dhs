
import { DHS_Gallery } from '../clases/Dhs-galeria';
export default class ConfiguradorBloques {
    constructor() {
        this.toolboxHTML = {
            kind: "categoryToolbox",
            contents: []
        }
        this.toolboxCSS= {
          kind: "categoryToolbox",
          contents: []
      }
      this.toolboxJS = {
        kind: "categoryToolbox",
        contents: []
    }

        this.galeria = new DHS_Gallery
    }

    crearCategoriaToolbox(datosCategoria,tipo) {
      if(tipo==="HTML"){
        this.toolboxHTML.contents.push({
          kind: "category",
          name: datosCategoria.name,
          categorystyle: datosCategoria.categorystyle,
          contents: [],
      })
      }
  
      if(tipo==="CSS"){
        this.toolboxCSS.contents.push({
          kind: "category",
          name: datosCategoria.name,
          categorystyle: datosCategoria.categorystyle,
          contents: [],
      })}
  
      if(tipo==="JS"){
        this.toolboxJS.contents.push({
          kind: "category",
          name: datosCategoria.name,
          categorystyle: datosCategoria.categorystyle,
          contents: [],
      })
      }
       
    }

    configurarUnBloqueCustomStandard(keywordBloque, nombreCategoria = "Acciones",tipo) {
      if(tipo==="HTML"){
        if (!this[keywordBloque]) {
          throw new Error("No tenemos un método para configurar bloques que coincida con la keyowrd " + keywordBloque);
      }
      let categoriaBuscada = this.toolboxHTML.contents.find(obj => obj.kind == "category" && obj.name == nombreCategoria);
      if (!categoriaBuscada) {
          throw new Error("No existe la categoría " + nombreCategoria + " en la toolbox");
      } else {
          let generacionBloque = this[keywordBloque]();
          if (Array.isArray(generacionBloque)) {
              categoriaBuscada.contents.push(...generacionBloque);
          } else {
              categoriaBuscada.contents.push(generacionBloque)
          }
      }
      // console.log(this.toolboxHTML.contents)
      }
  
      if(tipo==="CSS"){
        if (!this[keywordBloque]) {
          throw new Error("No tenemos un método para configurar bloques que coincida con la keyowrd " + keywordBloque);
      }
      let categoriaBuscada = this.toolboxCSS.contents.find(obj => obj.kind == "category" && obj.name == nombreCategoria);
      if (!categoriaBuscada) {
          throw new Error("No existe la categoría " + nombreCategoria + " en la toolbox");
      } else {
          let generacionBloque = this[keywordBloque]();
          if (Array.isArray(generacionBloque)) {
              categoriaBuscada.contents.push(...generacionBloque);
          } else {
              categoriaBuscada.contents.push(generacionBloque)
          }
      }
      // console.log(this.toolboxCSS.contents)
    }
  
      if(tipo==="JS"){
        if (!this[keywordBloque]) {
          throw new Error("No tenemos un método para configurar bloques que coincida con la keyowrd " + keywordBloque);
      }
      let categoriaBuscada = this.toolboxJS.contents.find(obj => obj.kind == "category" && obj.name == nombreCategoria);
      if (!categoriaBuscada) {
          throw new Error("No existe la categoría " + nombreCategoria + " en la toolbox");
      } else {
          let generacionBloque = this[keywordBloque]();
          if (Array.isArray(generacionBloque)) {
              categoriaBuscada.contents.push(...generacionBloque);
          } else {
              categoriaBuscada.contents.push(generacionBloque)
          }
      }
      }
   
    }

    mostrarKeywords() {
        const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        const methods = [];
        const skip = ["constructor", "mostrarKeywords", "crearCategoriaToolbox", "configurarUnBloqueCustomStandard"]
        methodNames.forEach((methodName) => {
            if (typeof this[methodName] === 'function') {
                if (!skip.includes(methodName)) {
                    methods.push(methodName);
                }
            }
        });
        return methods;
    }

    // --- METODOS DE CONFIGURACION DE BLOQUE ---
    // C/U hace: 
    /*
        - Su definición
        - Su registro de "validación"
        - El seteo de su "statement to code" para Blockly.Javascript
        - Retorna el objeto (diccionario) que debe ser usado en Toolbox o un array de objetos (en caso de macro-keywords)
     */

    // BLOQUE "AL EJECUTAR"

    base_frame(){ 
        Blockly.common.defineBlocksWithJsonArray([
            {
                "type": "base_frame",
                "message0": "document %1 header %2 %3 content %4 %5",
                "args0": [
                {
                  "type": "input_dummy"
                },
                {
                  "type": "input_dummy"
                },
                {
                  "type": "input_statement",
                  "name": "head",
                  "check": "header"
                },
                {
                  "type": "input_dummy"
                },
                {
                  "type": "input_statement",
                  "name": "body",
                  "check": "html"
                }
                ],
                "colour": 0,
                "tooltip": "",
                "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
            }
       ])

       Blockly.JavaScript.forBlock['base_frame'] = function(block) {
            var statements_head = Blockly.JavaScript.statementToCode(block, 'head');
            var statements_body = Blockly.JavaScript.statementToCode(block, 'body');
          
            var code = '<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset="utf-8">\n'
              + statements_head
              + "</head>\n\n<body>\n"
              + statements_body
              + "</body>\n</html>\n";
          
            return code;
          };
          return {
            type: "base_frame",
            kind: "block",
        }
      }

 title(){
    Blockly.common.defineBlocksWithJsonArray([
      {
        "type": "title",
        "message0": "title %1",
        "args0": [
        {
          "type": "input_statement",
          "name": "content",
          "check": "html"
        }
        ],
        "previousStatement": "header",
        "nextStatement": "header",
        "colour": 0,
        "tooltip": "",
        "helpUrl": "http://www.w3schools.com/tags/tag_html.asp",
      
      }])

      Blockly.JavaScript.forBlock['title'] = function(block) {
       var statements_content = Blockly.JavaScript.statementToCode(block, 'content');
       console.log(statements_content)
        // if (statements_content != ""){
        //   document.getElementById('title').innerText = statements_content;
        // console.log(document.getElementById('title'))}
        // else
        //   console.log(document.getElementById('title'))
        //   document.getElementById('title').innerText = "untitled web page";
      
        var code = '<title>' + statements_content.trim() + '</title>\n';
        return code;
      };

      return {
        type: "title",
        kind: "block",
    }
  }
  plaintext(){ 
    Blockly.common.defineBlocksWithJsonArray([
      {
        "type": "plaintext",
        "message0": "text %1",
        "args0": [
        {
          "type": "field_input",
          "name": "content",
          "text": ""
        }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 330,
        "tooltip": "",
        "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
      },
   ])
  Blockly.JavaScript.forBlock['plaintext'] = function(block) {
    var text_content = block.getFieldValue('content');
    var code = text_content + '\n';
    return code;
  };
      return {
        type: "plaintext",
        kind: "block",
    }
  }

}

