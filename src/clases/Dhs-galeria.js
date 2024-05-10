import circuloAmarilloTransparente from "../img/circuloAmarillo.png"
import flechaAmarilla from "../img/flechaAmarilla.png"
import robotlupe from "../img/robotlupe.png";
import lodoPasto from "../img/lodoPasto.png";
import cofrecerradoPasto from "../img/cofrecerradoPasto.png";
import cofreAbierto from "../img/cofreabierto.png";
import cofreCerrado from "../img/cofrecerrado.png";
import collar from "../img/collar-perlas.png";
import arbolesPasto from "../img/arbolesPasto.png";
import muchasmonedas from "../img/muchasMonedas.png";
import pasto from "../img/pasto.png";
import basura from "../img/basura.png";
import lapizRojo from "../img/lapizRojo.png";
import bandera from "../img/banderaRoja.png";
import cerco from "../img/cercoPasto.png";
import conejo from "../img/conejo.png";
import zanahoriaEnterrada from "../img/zanahoriaEnterrada.png";
import zanahoriaCosechada from "../img/zanahoriaCosechada.png";
import conejoDeArriba from "../img/conejoDeArriba.png";
import madriguera from "../img/madriguera.png";
import autoEmbotelladoIzq from "../img/autoEmbotelladoIzq.png";
import autoEmbotelladoDer from "../img/autoEmbotelladoDer.png";
import barrera from "../img/barrera.png";
import casaSendero from "../img/casaSendero.png";
import escuelaSendero from "../img/escuelaSendero.png";
import edificiosSendero from "../img/edificiosSendero.png";
import arbolesSendero from "../img/arbolesSendero.png";
import calle from "../img/calle.png";
import calleClara from "../img/calleClara.png";
import pastoSendero from "../img/pastoSendero.png";
import ciclista from "../img/ciclista.png";
import brujula from "../img/brujula.png";
import agua from "../img/agua.png";
import cielo from "../img/cielo.png";
import pastoDelta from "../img/pastoDelta.png";
import juncoPastoDelta from "../img/juncoPastoDelta.png";
import carpincho from "../img/carpinchoArriba.png";
import pato from "../img/patoArriba.png";
import lancha from "../img/lancha.png";
import plantaReciclajePastoDelta from "../img/plantaReciclajePastoDelta.png";
import plantaReciclajePastoDeltaSinFondo from "../img/plantaReciclajePastoDeltaSinFondo.png";
import plastico from "../img/plasticoAgua.png";
import familiaPato from "../img/familiaPato.png";
import rioParana from "../img/rioParana.png";
import autoArriba from "../img/autoArriba.png";
import carpinchoReal from "../img/carpinchoReal.png";
import ecobrick from "../img/ecobrick.jpg";
import minero from "../img/minero.png";
import piedra from "../img/piedra.png";
import caminoCueva from "../img/caminoCueva.png";
import piedraDiamante from "../img/piedraDiamante.png";
import panda from "../img/panda.png";
import pandaIzquierda from "../img/pandaIzquierda.png";
import pandaTrepadorSinFondo from "../img/pandaTrepadorSinFondo.png";
import caraPanda from "../img/caraPanda.png";
import arbol1 from "../img/arbol1.png";
import arbol2 from "../img/arbol2.png";
import arbol3 from "../img/arbol3.png";
import arbol4 from "../img/arbol4.png";
import hamacaNeumatico from "../img/hamacaNeumatico.png";
import arbol5 from "../img/arbol5.png";
import bamboo from "../img/bamboo.png";
import bordeDerBamboo from "../img/bordeDerechoBamboo.png";
import bordeIzqBamboo from "../img/bordeIzqBamboo.png";
import bambooAnchoCamino from "../img/bambooAnchoCamino.png";
import bambooAncho from "../img/bambooAncho.png";
import bambooCieloCamino from "../img/bambooCieloCamino.png";
import tierra from "../img/tierra.png";
import tierraPasto from "../img/tierraPasto.png";
import estrella from "../img/estrella.png";
import estrellaSinFondo from "../img/estrellaSinFondo.png";
import frutilla from "../img/frutilla.png";
import nubes from "../img/nubes.png";
import pajaro from "../img/pajaro.png";
import nubesCielo from "../img/nubesCielo.png";
import diamante from "../img/diamante.png";
import avion from "../img/avion.png";
import isla from "../img/isla.png";
import pastoCielo from "../img/cieloPasto.png";
import bombero from "../img/bombero.png";
import estacionBomberos from "../img/estacionBomberos.png";
import fuegoCero from "../img/fuegoCero.png";
import fuegoUno from "../img/fuegoUno.png";
import fuegoDos from "../img/fuegoDos.png";
import fuegoTres from "../img/fuegoTres.png";
import fuegoCuatro from "../img/fuegoCuatro.png";
import chorroAgua from "../img/chorroAgua.gif";
import cepillarseDientes from "../img/cepillarseLosDientes.png"
import desayunar from "../img/desayunar.png"
import lavarseLaCara from "../img/lavarseLaCara.png"
import ropa from "../img/ropa.png"
import salirDeCasa from "../img/salirDeCasa.png"
import levantarseDeLacama from "../img/salirDeLaCama.png"
import enLaCama from "../img/enLaCama.png"
import hacerHueco from "../img/hacerHueco.png"
import ponerSemilla from "../img/ponerSemilla.png"
import ponerTierra from "../img/ponerTierra.png"
import regar from "../img/regar.png"
import taparConTierra from "../img/taparConTierra.png"
import tomarUnaMaceta from "../img/tomarUnaMaceta.png"
import fondoGris from "../img/fondoGris.png"
import good from "../img/good.png"
import flechaDerecha from "../img/flechaDerecha.png"
import flechaIzquierda from "../img/flechaIzquierda.png"
import flechaArriba from "../img/flechaArriba.png"
import flechaAbajo from "../img/flechaAbajo.png"
import spinner from "../img/cargando.png"

export class DHS_Gallery {
  constructor() {
    this.ready = true;
  }
  obtenerUrlDe(unObjeto) {
    return this.imageLib[unObjeto].url;
  }

  obtenerNombreDe(unObjeto) {
    return this.imageLib[unObjeto].nombre;
  }
  obtenerNombreCompletoDe(dir) {
    return this.imageLib[dir].nombre;
  }

  imageLib = {
    good: {
      themes: [""],
      url: good,
      nombre: "good",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    fondoGris: {
      themes: [""],
      url: fondoGris,
      nombre: "fondoGris",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    tomarUnaMaceta: {
      themes: [""],
      url: tomarUnaMaceta,
      nombre: "tomarUnaMaceta",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    taparConTierra: {
      themes: [""],
      url: taparConTierra,
      nombre: "taparConTierra",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    regar: {
      themes: [""],
      url: regar,
      nombre: "regar",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    ponerTierra: {
      themes: [""],
      url: ponerTierra,
      nombre: "ponerTierra",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    ponerSemilla: {
      themes: [""],
      url: ponerSemilla,
      nombre: "ponerSemilla",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    hacerHueco: {
      themes: [""],
      url: hacerHueco,
      nombre: "hacerHueco",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    enLaCama: {
      themes: [""],
      url: enLaCama,
      nombre: "enLaCama",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    levantarseDeLacama: {
      themes: [""],
      url: levantarseDeLacama,
      nombre: "levantarseDeLacama",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    salirDeCasa: {
      themes: [""],
      url: salirDeCasa,
      nombre: "salirDeCasa",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    ropa: {
      themes: [""],
      url: ropa,
      nombre: "ropa",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    lavarseLaCara: {
      themes: [""],
      url: lavarseLaCara,
      nombre: "lavarseLaCara",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    desayunar: {
      themes: [""],
      url: desayunar,
      nombre: "desayunar",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    cepillarseDientes: {
      themes: [""],
      url: cepillarseDientes,
      nombre: "cepillarseDientes",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    diamante: {
      themes: [""],
      url: diamante,
      nombre: "diamante",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    piedraDiamante: {
      themes: [""],
      url: piedraDiamante,
      nombre: "piedraDiamante",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    caminoCueva: {
      themes: [""],
      url: caminoCueva,
      nombre: "caminoCueva",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    piedra: {
      themes: [""],
      url: piedra,
      nombre: "piedra",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    minero: {
      themes: [""],
      url: minero,
      nombre: "minero",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    ecobrick: {
      themes: [""],
      url: ecobrick,
      nombre: "ecobrick",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    rioParana: {
      themes: [""],
      url: rioParana,
      nombre: "rioParana",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    ciclista: {
      themes: [""],
      url: ciclista,
      nombre: "ciclista",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    pastoSendero: {
      themes: [""],
      url: pastoSendero,
      nombre: "pastoSendero",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    calle: {
      themes: [""],
      url: calle,
      nombre: "calle",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    calleClara: {
      themes: [""],
      url: calleClara,
      nombre: "calleClara",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    escuelaSendero: {
      themes: [""],
      url: escuelaSendero,
      nombre: "escuelaSendero",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    edificiosSendero: {
      themes: [""],
      url: edificiosSendero,
      nombre: "edificiosSendero",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/building" title="building icons">Building icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    casaSendero: {
      themes: [""],
      url: casaSendero,
      nombre: "casaSendero",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/home" title="home icons">Home icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    barrera: {
      themes: [""],
      url: barrera,
      nombre: "barrera",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/barrier" title="barrier icons">Barrier icons created by nawicon - Flaticon</a></p>',
      showLicense: true,
    },
    autoEmbotelladoIzq: {
      themes: [""],
      url: autoEmbotelladoIzq,
      nombre: "autoEmbotelladoIzq",
      parrafoLicencia:
        '<p>Iconos diseñados por <a href="https://www.flaticon.es/autores/konkapp" title="Konkapp"> Konkapp </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    autoEmbotelladoDer: {
      themes: [""],
      url: autoEmbotelladoDer,
      nombre: "autoEmbotelladoDer",
      parrafoLicencia:
        '<p>Iconos diseñados por <a href="https://www.flaticon.es/autores/konkapp" title="Konkapp"> Konkapp </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    autoArriba: {
      themes: [""],
      url: autoArriba,
      nombre: "autoArriba",
      parrafoLicencia:
        '<p>Iconos diseñados por <a href="https://www.flaticon.es/autores/konkapp" title="Konkapp"> Konkapp </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    arbolesSendero: {
      themes: [""],
      url: arbolesSendero,
      nombre: "arbolesSendero",
      parrafoLicencia:
        '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    conejoDeArriba: {
      themes: [""],
      url: conejoDeArriba,
      nombre: "conejoDeArriba",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    conejo: {
      themes: [""],
      url: conejo,
      nombre: "conejo",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    madriguera: {
      themes: [""],
      url: madriguera,
      nombre: "madriguera",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    zanahoriaEnterrada: {
      themes: [""],
      url: zanahoriaEnterrada,
      nombre: "zanahoriaEnterrada",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    zanahoriaCosechada: {
      themes: [""],
      url: zanahoriaCosechada,
      nombre: "zanahoriaCosechada",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    lapizRojo: {
      themes: [""],
      url: lapizRojo,
      nombre: "lapizRojo",
      parrafoLicencia: "<p>Imagen desarrollada por Digital House</p>",
      showLicense: true,
    },
    basura: {
      themes: ["lupe"],
      url: basura,
      nombre: "basura",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/garbage" title="garbage icons">Garbage icons created by Smashicons - Flaticon</a></p>',
      showLicense: true,
    },
    lupe: {
      themes: ["lupe"],
      url: robotlupe,
      nombre: "Lupe",
      parrafoLicencia:
        '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/robot" title="robot icons">Robot icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    arboles: {
      themes: ["lupe"],
      url: arbolesPasto,
      nombre: "Árboles",
      parrafoLicencia:
        '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    cerco: {
      themes: ["cerco"],
      url: cerco,
      nombre: "Cerco",
      parrafoLicencia:
        '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    pasto: {
      themes: ["lupe"],
      url: pasto,
      nombre: "Pasto",
      parrafoLicencia: "<p>Digital House</p>",
    },
    pastoCielo: {
      themes: ["panda"],
      url: pastoCielo,
      nombre: "Pasto",
      parrafoLicencia: "<p>Digital House</p>",
    },
    cofre: {
      themes: ["lupe"],
      url: cofrecerradoPasto,
      nombre: "Cofre Cerrado",
      parrafoLicencia:
        '<p>Licencia imagen:<a target="_blank" href="https://www.flaticon.com/free-img/chest" title="chest icons">Chest icons created by Smashicons - Flaticon</a></p>',
      showLicense: true,
    },
    cofreAbierto: {
      themes: ["lupe"],
      url: cofreAbierto,
      nombre: "Cofre Abierto",
      parrafoLicencia:
        '<p>Licencia imagen:<a target="_blank" href="https://www.flaticon.com/free-img/chest" title="chest icons">Chest icons created by Smashicons - Flaticon</a></p>',
      showLicense: true,
    },
    cofreCerrado: {
      themes: ["lupe"],
      url: cofreCerrado,
      nombre: "Cofre Cerrado",
      parrafoLicencia:
        '<p>Licencia imagen:<a target="_blank" href="https://www.flaticon.com/free-img/chest" title="chest icons">Chest icons created by Smashicons - Flaticon</a></p>',
      showLicense: true,
    },
    monedas: {
      themes: ["lupe"],
      url: muchasmonedas,
      nombre: "Monedas",
      parrafoLicencia:
        '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/monedas" title="monedas iconos">Monedas iconos creados por turkkub - Flaticon</a></p>',
      showLicense: true,
    },
    lodo: {
      themes: ["lupe"],
      url: lodoPasto,
      nombre: "Lodo",
      parrafoLicencia:
        '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tropical" title="tropical icons">Tropical icons created by Marz Gallery - Flaticon</a></p>',
      showLicense: true,
    },
    llave: {
      themes: ["lupe"],
      url: "../../img/bloques/llave-square-blanco.png",
      nombre: "Abrir Cofre",
      parrafoLicencia:
        '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    brujula: {
      themes: ["lupe"],
      url: brujula,
      nombre: "Brújula",
      parrafoLicencia:
        '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/brujula" title="brújula iconos">Brújula iconos creados por Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    bandera: {
      themes: ["lupe"],
      url: bandera,
      nombre: "Bandera",
      parrafoLicencia:
        '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/bandera-roja" title="bandera-roja iconos">Bandera-roja iconos creados por Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    collar: {
      themes: ["collar"],
      url: collar,
      nombre: "collar",
      parrafoLicencia:
        '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/perla" title="perla iconos">Perla iconos creados por Freepik - Flaticon</a></p>',
      showLicense: true,
    },
    void: {
      themes: [],
      url: "../delta-commons/img/void.png",
      nombre: "Vacío",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    circuloAmarilloTransparente: {
      themes: [],
      url: circuloAmarilloTransparente,
      nombre: "Circulo Amarillo",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    flechaAmarilla: {
      themes: [],
      url: flechaAmarilla,
      nombre: "Circulo Amarillo",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    circuloVerdeTransparente: {
      themes: [],
      url: "../delta-commons/img/circulo-verde-transparente.png",
      nombre: "Circulo Verde",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    circuloRojoTransparente: {
      themes: [],
      url: "../delta-commons/img/circulo-rojo-transparente.png",
      nombre: "Circulo Rojo",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    // for theme delta
    agua: {
      themes: ["delta"],
      url: agua,
      nombre: "agua",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    cielo: {
      themes: ["delta"],
      url: cielo,
      nombre: "cielo",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    pastoDelta: {
      themes: ["delta"],
      url: pastoDelta,
      nombre: "pastoDelta",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    juncoPastoDelta: {
      themes: ["delta"],
      url: juncoPastoDelta,
      nombre: "juncoPastoDelta",
      parrafoLicencia:
        '<p> Iconos diseñados por <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    carpincho: {
      themes: ["delta"],
      url: carpincho,
      nombre: "carpincho",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    carpinchoReal: {
      themes: ["delta"],
      url: carpinchoReal,
      nombre: "carpinchoReal",
      parrafoLicencia: "<p>Digital House</p>",
      showLicense: false,
    },
    pato: {
      themes: ["delta"],
      url: pato,
      nombre: "pato",
      parrafoLicencia:
        '<p> Iconos diseñados por <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: false,
    },
    lancha: {
      themes: ["delta"],
      url: lancha,
      nombre: "lancha",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    plantaReciclajePastoDelta: {
      themes: ["delta"],
      url: plantaReciclajePastoDelta,
      nombre: "plantaReciclajePastoDelta",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/recycling-plant" title="recycling plant icons">Recycling plant icons created by surang - Flaticon</a></p>',
      showLicense: true,
    },
    plantaReciclajePastoDeltaSinFondo: {
      themes: ["delta"],
      url: plantaReciclajePastoDeltaSinFondo,
      nombre: "plantaReciclajePastoDeltaSinFondo",
      parrafoLicencia:
        '<p><a href="https://www.flaticon.com/free-icons/recycling-plant" title="recycling plant icons">Recycling plant icons created by surang - Flaticon</a></p>',
      showLicense: true,
    },
    reciclar: {
      themes: ["delta"],
      url: "../../img/bloques/reciclar-blanco.png",
      nombre: "Planta Reciclaje",
      parrafoLicencia:
        '<p> Iconos diseñados por <a href="" title="Tempo_doloe"> Tempo_doloe </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
      showLicense: true,
    },
    plastico: {
      themes: ["delta"],
      url: plastico,
      nombre: "plastico",
      parrafoLicencia:
        '<p> Icons made by <a href="https://www.flaticon.com/authors/wanicon" title="wanicon"> wanicon </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>',
      showLicense: true,
    },
    familiaPato: {
      themes: ["delta"],
      url: familiaPato,
      nombre: "familiaPato",
      parrafoLicencia: "Digital House",
      showLicense: false,
    },
    panda: {
      themes: ["panda"],
      url: panda,
      nombre: "Panda",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    pandaTrepadorSinFondo: {
      themes: ["panda"],
      url: pandaTrepadorSinFondo,
      nombre: "pandaTrepadorSinFondo",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    pandaIzquierda: {
      themes: ["panda"],
      url: pandaIzquierda,
      nombre: "pandaIzquierda",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    caraPanda: {
      themes: ["caraPanda"],
      url: caraPanda,
      nombre: "caraPanda",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    arbol1: {
      themes: ["arbol1"],
      url: arbol1,
      nombre: "arbol1",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    arbol2: {
      themes: ["arbol2"],
      url: arbol2,
      nombre: "arbol2",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    arbol3: {
      themes: ["arbol3"],
      url: arbol3,
      nombre: "arbol3",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    arbol4: {
      themes: ["arbol4"],
      url: arbol4,
      nombre: "arbol4",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    hamacaNeumatico: {
      themes: ["hamacaNeumatico"],
      url: hamacaNeumatico,
      nombre: "hamacaNeumatico",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    arbol5: {
      themes: ["arbol5"],
      url: arbol5,
      nombre: "arbol5",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    bamboo: {
      themes: ["bamboo"],
      url: bamboo,
      nombre: "Bamboo",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    bambooAncho: {
      themes: ["bambooAncho"],
      url: bambooAncho,
      nombre: "bambooAncho",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    bambooAnchoCamino: {
      themes: ["bambooAnchoCamino"],
      url: bambooAnchoCamino,
      nombre: "bambooAnchoCamino",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    bambooIzqHoja: {
      themes: ["bambooIzqHoja"],
      url: bordeIzqBamboo,
      nombre: "bambooIzqHoja",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    bambooDerechoHoja: {
      themes: ["bambooDerechoHoja"],
      url: bordeDerBamboo,
      nombre: "bambooDerechoHoja",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    bambooCieloCamino: {
      themes: ["bambooCieloCamino"],
      url: bambooCieloCamino,
      nombre: "bambooCieloCamino",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    tierra: {
      themes: ["tierra"],
      url: tierra,
      nombre: "tierra",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    tierraPasto: {
      themes: ["tierraPasto"],
      url: tierraPasto,
      nombre: "tierraPasto",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    estrella: {
      themes: ["estrella"],
      url: estrella,
      nombre: "estrella",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    estrellaSinFondo: {
      themes: ["estrellaSinFondo"],
      url: estrellaSinFondo,
      nombre: "estrellaSinFondo",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    frutilla: {
      themes: ["frutilla"],
      url: frutilla,
      nombre: "Frutilla",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    nubes: {
      themes: ["nubes"],
      url: nubes,
      nombre: "nubes",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    pajaro: {
      themes: ["pajaro"],
      url: pajaro,
      nombre: "pajaro",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    nubesCielo: {
      themes: ["nubes"],
      url: nubesCielo,
      nombre: "nubesCielo",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    avion: {
      themes: ["avion"],
      url: avion,
      nombre: "avion",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    isla: {
      themes: ["isla"],
      url: isla,
      nombre: "isla",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    bombero: {
      themes: ["bombero"],
      url: bombero,
      nombre: "bombero",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    estacionBomberos: {
      themes: ["estacionBomberos"],
      url: estacionBomberos,
      nombre: "estacionBomberos",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    fuegoCero: {
      themes: ["fuegoCero"],
      url: fuegoCero,
      nombre: "fuegoCero",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    fuegoUno: {
      themes: ["fuegoUno"],
      url: fuegoUno,
      nombre: "fuegoUno",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    fuegoDos: {
      themes: ["fuegoDos"],
      url: fuegoDos,
      nombre: "fuegoDos",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    fuegoTres: {
      themes: ["fuegoTres"],
      url: fuegoTres,
      nombre: "fuegoTres",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    fuegoCuatro: {
      themes: ["fuegoCuatro"],
      url: fuegoCuatro,
      nombre: "fuegoCuatro",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    chorroAgua: {
      themes: ["chorroAgua"],
      url: chorroAgua,
      nombre: "chorroAgua",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    flechaDerecha: {
      themes: ["flechaDerecha"],
      url: flechaDerecha,
      nombre: "flechaDerecha",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    flechaIzquierda: {
      themes: ["flechaIzquierda"],
      url: flechaIzquierda,
      nombre: "flechaIzquierda",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    flechaArriba: {
      themes: ["flechaArriba"],
      url: flechaArriba,
      nombre: "flechaArriba",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    flechaAbajo: {
      themes: ["flechaAbajo"],
      url: flechaAbajo,
      nombre: "flechaAbajo",
      parrafoLicencia: "Digital House",
      showLicense: true,
    },
    spinner:{
      themes:["spinner"],
      url:spinner,
      nombre:"spinner",
      parrafoLicencia:"<a href='https://www.flaticon.es/iconos-gratis/cargando' title='cargando iconos'>Cargando iconos creados por Freepik - Flaticon</a>",
      showLicense:true,
    },
  };
}
