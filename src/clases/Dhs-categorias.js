export class Dhs_Categorias {
  tipos = [
    {
      name: "Eventos",
      categorystyle: "execute",
    },
    {
      name: "Movimientos",
      categorystyle: "movement",
    },
    {
      name: "Lápiz",
      categorystyle: "pencil",
    },
    {
      name: "Acciones",
      categorystyle: "action",
    },
    {
      name: "Repeticiones",
      categorystyle: "loops",
    },
    {
      name: "Condicionales",
      categorystyle: "logic",
    },
    {
      name: "Sensores",
      categorystyle: "sensor",
    },
    {
      kind:"category",
      name:"Funciones",
      categorystyle:"procedure",
    },
  ];

  obtenerCategoriasNecesarias(arrayCategorias) {
    let categoria;
    let aux = [];
    arrayCategorias.forEach((stringABuscar) => {
      categoria = this.tipos.find((tipo) => stringABuscar == tipo.name);
      aux.push(categoria);
    });
    return { tipos: aux };
  }

}
