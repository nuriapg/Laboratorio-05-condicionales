import './style.css';


// === Estado del juego ===
let puntuacion: number = 0;
let monedas: number = 0;
let juegoTerminado: boolean = false;

const valoresCartas = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];

const dameCarta = (): number => {
    const indice = Math.floor(Math.random() * valoresCartas.length);
    return valoresCartas[indice];
  };
  

// === Referencias a botones ===
const btnPedir = document.getElementById("pedirCarta") as HTMLButtonElement;
const btnPlanto = document.getElementById("mePlanto") as HTMLButtonElement;
const btnNuevaJugada = document.getElementById("nuevaJugada") as HTMLButtonElement;
const btnTerminar = document.getElementById("terminarPartida") as HTMLButtonElement;
const btnVerQueHabriaPasado = document.getElementById("verQueHabriaPasado") as HTMLButtonElement;


// === Funciones de lógica de cartas ===
const obtenerValorCarta = (carta: number): number => {
  return carta <= 7 ? carta : 0.5;
};

const obtenerImagenCarta = (carta: number): string => {
  const base = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas";
  switch (carta) {
    case 1: return `${base}/1_as-copas.jpg`;
    case 2: return `${base}/2_dos-copas.jpg`;
    case 3: return `${base}/3_tres-copas.jpg`;
    case 4: return `${base}/4_cuatro-copas.jpg`;
    case 5: return `${base}/5_cinco-copas.jpg`;
    case 6: return `${base}/6_seis-copas.jpg`;
    case 7: return `${base}/7_siete-copas.jpg`;
    case 10: return `${base}/10_sota-copas.jpg`;
    case 11: return `${base}/11_caballo-copas.jpg`;
    case 12: return `${base}/12_rey-copas.jpg`;
    default:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
};

// === Funciones de UI ===
const muestraPuntuacion = (): void => {
  const div = document.getElementById("puntuacion");
  if (div) div.innerText = `7.5/ ${puntuacion}`;
};

const muestraMonedas = (): void => {
  const div = document.getElementById("marcadorMonedas");
  if (div) div.innerText = `💰 Monedas: ${monedas}`;
};

const mostrarCarta = (carta: number): void => {
  const img = document.getElementById("carta") as HTMLImageElement;
  if (img) {
    img.src = obtenerImagenCarta(carta);
    img.classList.remove("animar-carta");
    void img.offsetWidth; 
    img.classList.add("animar-carta");
  }
};

const mostrarValorCarta = (carta: number): void => {
  const div = document.getElementById("valorCarta");
  if (div) div.innerText = `+${obtenerValorCarta(carta)}`;
};

const mostrarMensaje = (mensaje: string): void => {
  const div = document.getElementById("mensaje");
  if (div) div.innerText = mensaje;
};

// === Acciones del juego ===
const pedirCarta = (): void => {
  if (juegoTerminado) return;

  const carta = valoresCartas[Math.floor(Math.random() * valoresCartas.length)];
  const valor = obtenerValorCarta(carta);

  puntuacion += valor;
  muestraPuntuacion();
  mostrarCarta(carta);
  mostrarValorCarta(carta);

  if (puntuacion > 7.5) {
    mostrarMensaje("Game Over 😵‍💫");
    monedas = 0;
    muestraMonedas();
    juegoTerminado = true;
    btnPedir.style.display = "none";
    btnPlanto.style.display = "none";
    btnNuevaJugada.style.display = "inline";
    btnTerminar.style.display = "inline";
  }
};

const mePlanto = (): void => {
    if (juegoTerminado) return;
  
    let mensaje = "";
  
    if (puntuacion > 7.5) {
      mensaje = "¡Te pasaste! No ganas monedas.";
    } else {
      if (puntuacion < 4) mensaje = "Te has arriesgado poco.";
      else if (puntuacion === 5) mensaje = "Te ha entrado el canguelo eh?";
      else if (puntuacion >= 6 && puntuacion < 7.5) mensaje = "Casi casi...";
      else if (puntuacion === 7.5) mensaje = "¡Lo has clavado! ¡Enhorabuena!";
  
      //  === Sumar monedas (ganancia = puntuación redondeada) === 
      monedas += puntuacion;
      monedas = Math.round(monedas * 10) / 10; // redondear a 1 decimal
    }
  
    mostrarMensaje(mensaje);
    muestraMonedas();
  
    juegoTerminado = true;
    btnPedir.style.display = "none";
    btnPlanto.style.display = "none";
    btnNuevaJugada.style.display = "inline";
    btnTerminar.style.display = "inline";

    btnVerQueHabriaPasado.style.display = "block";

  };
  
  btnVerQueHabriaPasado.addEventListener("click", () => {
    if (!juegoTerminado) return;
  
    const carta = dameCarta(); // Utiliza la función ya declarada antes
    const valor = obtenerValorCarta(carta);
    const totalHipotetico = puntuacion + valor;
  
    mostrarCarta(carta);
    mostrarValorCarta(valor);
  
    let mensaje = "";
    if (totalHipotetico > 7.5) {
      mensaje = `🔮 Te habrías pasado con ${totalHipotetico} puntos.`;
    } else if (totalHipotetico === 7.5) {
      mensaje = `🔮 ¡Habrías clavado el 7.5!`;
    } else {
      mensaje = `🔮 Te habrías quedado en ${totalHipotetico} puntos. ¡Muy cerca!`;
    }
  
    mostrarMensaje(mensaje);
    btnVerQueHabriaPasado.style.display = "none";
  });
  
  
  






const nuevaJugada = (): void => {
  puntuacion = 0;
  juegoTerminado = false;
  muestraPuntuacion();
  mostrarCarta(0);
  mostrarMensaje("");
  mostrarValorCarta(0);
  muestraMonedas();

  btnPedir.style.display = "inline";
  btnPlanto.style.display = "inline";
  btnNuevaJugada.style.display = "none";
  btnTerminar.style.display = "none";
  btnVerQueHabriaPasado.style.display = "none";


};

const terminarPartida = (): void => {
  monedas = 0;
  muestraMonedas();
  nuevaJugada();
  
};

// === Inicialización ===
document.addEventListener("DOMContentLoaded", () => {
  muestraPuntuacion();
  muestraMonedas();
  mostrarValorCarta(0);

  btnPedir.addEventListener("click", pedirCarta);
  btnPlanto.addEventListener("click", mePlanto);
  btnNuevaJugada.addEventListener("click", nuevaJugada);
  btnTerminar.addEventListener("click", terminarPartida);
  
});
