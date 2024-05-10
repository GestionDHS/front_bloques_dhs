export const ganarSiPasaTest = (obj, listaDeErrores,miControlador) => {
    //primero: verifico el objetivo solicitado
    obj?.mochila?.length < 4 && listaDeErrores.push("Quedaron cofres por abrir")
    //segundo: verifico que use el bloque repetir
    obj?.mochila?.length == 4 && !miControlador.verificarUsoDeBloquesInternos("repeat_times") > 0 && listaDeErrores.push("Debes utilizar el bloque repetir para que no se produzca repeticion de código innecesaria")
    //tercero: que no use mas de 2 veces el moverAbajo y moverDerecha
    obj?.mochila?.length ==4 && miControlador.verificarUsoDeBloquesInternos("move_right_simple") >= 2 && listaDeErrores.push("Debes utilizar otro tipo de bloque que te ayude a no usar tantos 'mover derecha'")
    obj?.mochila?.length ==4 && miControlador.verificarUsoDeBloquesInternos("move_down_simple") >= 2 && listaDeErrores.push("Debes utilizar otro tipo de bloque que te ayude a no usar tantos 'mover abajo'")
    return listaDeErrores
  };
