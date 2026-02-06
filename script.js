/* ===============================
   BLOQUEO INICIAL (SOBRE)
================================ */

// Bloqueamos scroll al inicio
document.body.style.overflow = "hidden";

const pantalla = document.getElementById("pantalla");

pantalla.addEventListener("click", () => {
  if (document.body.classList.contains("abierto")) return;

  document.body.classList.add("abierto");

  // Habilitamos scroll
  document.body.style.overflow = "auto";

  // Asegura inicio arriba
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });
});


/* ===============================
   CONTADOR REGRESIVO
================================ */

const fechaEvento = new Date(2026, 2, 8, 12, 15).getTime();

const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = fechaEvento - ahora;

  if (diferencia <= 0) return;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  diasEl.textContent = String(dias).padStart(2, "0");
  horasEl.textContent = String(horas).padStart(2, "0");
  minutosEl.textContent = String(minutos).padStart(2, "0");
  segundosEl.textContent = String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);



/* =========================
   CONFIRMACIÓN ASISTENCIA
========================= */
function generarPersonas() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const contenedor = document.getElementById("personas");
  const btnConfirmar = document.getElementById("btnConfirmar");

  contenedor.innerHTML = "";
  btnConfirmar.style.display = "none"; // 🔒 se oculta siempre primero

  if (!cantidad || cantidad < 1) {
    alert("Ingresá una cantidad válida");
    return;
  }

  for (let i = 1; i <= cantidad; i++) {
    contenedor.innerHTML += `
      <div class="persona">
        <h3>Persona ${i}</h3>

        <label>Nombre y apellido</label>
        <input type="text" placeholder="Ej: Juan Pérez">

        <label>Menú</label>
        <select>
          <option value="Tradicional">Tradicional</option>
          <option value="Celíaco">Celíaco</option>
          <option value="Intolerante a la lactosa">Intolerante a la lactosa</option>
          <option value="Vegano">Vegano</option>
          <option value="Menú infantil">Menú infantil</option>
        </select>
      </div>
    `;
  }

  // ✅ si llegó hasta acá, mostramos el botón
  btnConfirmar.style.display = "block";
}

/* =========================
   TYPEWRITER H1 INICIO
========================= */
const tituloInicio = document.querySelector(".texto-inicio .titulo");

function escribirTituloInicio() {
  const texto = tituloInicio.textContent;
  tituloInicio.textContent = "";
  tituloInicio.classList.add("typewriter");

  let i = 0;
  const intervalo = setInterval(() => {
    tituloInicio.textContent += texto.charAt(i);
    i++;

    if (i >= texto.length) {
      clearInterval(intervalo);
      tituloInicio.style.borderRight = "none";
    }
  }, 150); // velocidad ideal móvil
}

/* Ejecutar cuando se abre el sobre */
pantalla.addEventListener("click", () => {
  escribirTituloInicio();
}, { once: true });

/* =========================
   SCROLL ANIMATIONS
========================= */
const elementosScroll = document.querySelectorAll(
  ".fade-texto, .fade-slide, .fade-mapa"
);

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

elementosScroll.forEach((el) => scrollObserver.observe(el));


function enviarConfirmacion() {
  const cantidad = document.getElementById("cantidad").value;
  const personas = document.querySelectorAll(".persona");

  if (!cantidad) {
    alert("Por favor seleccioná la cantidad de personas");
    return;
  }

  let mensaje = `💍 Confirmación de asistencia 💍\n\n`;
  mensaje += `Cantidad de personas: ${cantidad}\n\n`;

  for (let i = 0; i < personas.length; i++) {
    const nombre = personas[i].querySelector("input").value;
    const menu = personas[i].querySelector("select").value;

    if (!nombre) {
      alert("Por favor completá todos los nombres");
      return;
    }

    mensaje += `Persona ${i + 1}:\n`;
    mensaje += `👤 Nombre: ${nombre}\n`;
    mensaje += `🍽 Menú: ${menu}\n\n`;
  }

  const telefono = "5491168916883"; // tu número
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}
function generarPersonas() {
  const cantidad = document.getElementById("cantidad").value;
  const personas = document.getElementById("personas");
  const btnConfirmar = document.getElementById("btnConfirmar");

  personas.innerHTML = "";

  if (cantidad < 1) {
    btnConfirmar.style.display = "none";
    return;
  }

  for (let i = 1; i <= cantidad; i++) {
    personas.innerHTML += `
      <div class="persona">
        <label>Persona ${i}</label>
        <input type="text" placeholder="Nombre y apellido" required>

        <select>
          <option>Sin restricción</option>
          <option>Vegetariano</option>
          <option>Celíaco</option>
          <option>Vegano</option>
           <option>Menu infantil</option>
        </select>
      </div>
    `;
  }

  btnConfirmar.style.display = "block";
}


const secciones = document.querySelectorAll(".seccion");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

secciones.forEach(sec => observer.observe(sec));

/* =========================
   MODAL REGALOS
========================= */
const modal = document.getElementById("modal");

function abrirModal() {
  modal.classList.add("show");
}

function cerrarModal() {
  modal.classList.remove("show");
}

/* =========================
   CARRUSEL AUTOMÁTICO
========================= */
const carrusel = document.getElementById("carrusel");
const slides = document.querySelectorAll(".slide");
const paginacion = document.getElementById("paginacion");

let index = 0;

// Crear puntos
slides.forEach((_, i) => {
  const punto = document.createElement("div");
  punto.classList.add("punto");
  if (i === 0) punto.classList.add("activo");

  punto.addEventListener("click", () => {
    index = i;
    actualizarCarrusel();
  });

  paginacion.appendChild(punto);
});

const puntos = document.querySelectorAll(".punto");

function actualizarCarrusel() {
  carrusel.style.transform = `translateX(-${index * 100}%)`;

  puntos.forEach(p => p.classList.remove("activo"));
  puntos[index].classList.add("activo");
}

// Auto slide
setInterval(() => {
  index++;
  if (index >= slides.length) index = 0;
  actualizarCarrusel();
}, 4000);


/* =========================
   MÚSICA DE FONDO
========================= */
const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");
const iconoMusica = btnMusica.querySelector("i");

let musicaActiva = false;

// Se ejecuta al abrir el sobre
pantalla.addEventListener("click", () => {
  if (!musicaActiva) {
    musica.play().then(() => {
      musicaActiva = true;
      btnMusica.classList.add("visible");
      iconoMusica.className = "fa-solid fa-volume-high";
    }).catch(() => {
      console.log("Reproducción bloqueada");
    });
  }
});

// Botón play / pause
btnMusica.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    iconoMusica.className = "fa-solid fa-volume-high";
  } else {
    musica.pause();
    iconoMusica.className = "fa-solid fa-volume-xmark";
  }
});
