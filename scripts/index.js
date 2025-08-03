const servicios = [
  { titulo: "Diseño de Sitios Web", descripcion: "Creamos sitios web profesionales, modernos y adaptables a todos los dispositivos, con foco en usabilidad, rendimiento y conversión de visitantes en clientes." },
  { titulo: "Mantenimiento Web",
    descripcion: "Nos encargamos del soporte técnico, actualizaciones periódicas, mejoras de rendimiento y seguridad para que tu sitio esté siempre online, optimizado y actualizado."},
  { titulo: "Automatización", descripcion: "Implementamos flujos automáticos para mejorar tus procesos y reducir errores." },
  { titulo: "Landing Pages", descripcion: "Páginas optimizadas para campañas específicas." },
  { titulo: "Portafolios", descripcion: "Mostrá tu trabajo con estilo e impacto." },
  { titulo: "Tiendas Online", descripcion: "Soluciones completas de e-commerce para vender 24/7." }
];

let actual = 0;
const carrusel = document.getElementById("carrusel3D");
let enTransicion = false;

function crearCard(i, claseExtra = "") {
  const card = document.createElement("div");
  card.className = "card-3d " + claseExtra;
  card.innerHTML = `
    <div class="card-body">
      <h4 class="card-title">${servicios[i].titulo}</h4>
      <p class="card-text">${servicios[i].descripcion}</p>
    </div>
  `;
  return card;
}

function renderCarrusel() {
  carrusel.innerHTML = "";

  const total = servicios.length;
  const prev = (actual - 1 + total) % total;
  const next = (actual + 1) % total;

  const prevCard = crearCard(prev, "left");
  const activeCard = crearCard(actual, "active");
  const nextCard = crearCard(next, "right");

  carrusel.appendChild(prevCard);
  carrusel.appendChild(activeCard);
  carrusel.appendChild(nextCard);
}

function cambiarServicio(direccion) {
  if (enTransicion) return;
  enTransicion = true;

  const cards = carrusel.querySelectorAll(".card-3d");
  if (cards.length < 3) return;

  const [prevCard, activeCard, nextCard] = cards;

  let nuevaCard, nuevaIndex;

  if (direccion === "right") {
    prevCard.classList.remove("left");
    activeCard.classList.remove("active");
    nextCard.classList.remove("right");

    prevCard.classList.add("prev-out");
    activeCard.classList.add("left");
    nextCard.classList.add("active");

    nuevaIndex = (actual + 2) % servicios.length;
    nuevaCard = crearCard(nuevaIndex, "right-entrando");
    carrusel.appendChild(nuevaCard);

    requestAnimationFrame(() => {
      nuevaCard.classList.remove("right-entrando");
      nuevaCard.classList.add("right");
    });

  } else {
    nextCard.classList.remove("right");
    activeCard.classList.remove("active");
    prevCard.classList.remove("left");

    nextCard.classList.add("next-out");
    activeCard.classList.add("right");
    prevCard.classList.add("active");

    nuevaIndex = (actual - 2 + servicios.length) % servicios.length;
    nuevaCard = crearCard(nuevaIndex, "left-entrando");
    carrusel.insertBefore(nuevaCard, carrusel.firstChild);

    requestAnimationFrame(() => {
      nuevaCard.classList.remove("left-entrando");
      nuevaCard.classList.add("left");
    });
  }

  setTimeout(() => {
    actual = direccion === "right"
      ? (actual + 1) % servicios.length
      : (actual - 1 + servicios.length) % servicios.length;

    renderCarrusel();
    enTransicion = false;
  }, 800); // tiempo igual al de animación en CSS
}



document.getElementById("btn-prev").addEventListener("click", () => cambiarServicio("left"));
document.getElementById("btn-next").addEventListener("click", () => cambiarServicio("right"));

renderCarrusel();

document.addEventListener('DOMContentLoaded', function() {
  const titulo = document.querySelector('.animado-desde-izq');
  const parrafo = document.querySelector('.animado-desde-der');
  const desdeArriba = document.querySelector('.animado-desde-arriba');
  const desdeArriba2 = document.querySelector('.animado-desde-arriba-2');
  const desdeArriba3 = document.querySelector('.animado-desde-arriba-3');
  const desdeIzq = document.querySelector('.animado-desde-izq-2')

  // Usamos un pequeño delay para un efecto más profesional

  setTimeout(() => {
    desdeArriba?.classList.add('activo');
  }, 300); // por último desde arriba

  setTimeout(() => {
    desdeArriba2?.classList.add('activo');
  }, 500); // por último desde arriba
  setTimeout(() => {
    desdeArriba3?.classList.add('activo');
  }, 500); // por último desde arriba

  setTimeout(() => {
    titulo.classList.add('activo');
  }, 300); // el título aparece primero

  setTimeout(() => {
    parrafo.classList.add('activo');
  }, 800); // el párrafo aparece después
  setTimeout(() => {
    desdeIzq.classList.add('activo');
  }, 1000); // el párrafo aparece después
  
});

document.addEventListener('DOMContentLoaded', () => {
  const elementosIzq = document.querySelectorAll('.anim-izq');
  const elementoDer = document.querySelector('.anim-der');

  elementosIzq.forEach((el, i) => {
    setTimeout(() => el.classList.add('activo'), 400 + (i * 400));
  });

  setTimeout(() => elementoDer.classList.add('activo'), 800);
});

document.addEventListener("DOMContentLoaded", () => {
  const seccion = document.querySelector("#servicios");
  seccion.classList.add("animado-desde-izq-2");
});


