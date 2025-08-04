const USD_TO_ARS = 1400;
let showingPesos = false;

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggleCurrency');
  const prices = document.querySelectorAll('.price');

  if (!btn || prices.length === 0) return;

  // 🔸 Guardamos el texto original (como aparece en HTML)
  prices.forEach(el => {
    el.dataset.original = el.textContent.trim();
  });

  btn.addEventListener('click', () => {
    showingPesos = !showingPesos;

    prices.forEach(el => {
      const usd = parseFloat(el.dataset.usd) || 0;

      if (showingPesos) {
        const ars = usd * USD_TO_ARS;
        el.textContent = new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0
        }).format(ars);
      } else {
        // 🔁 Restauramos el contenido original del HTML
        el.textContent = el.dataset.original || `USD ${usd}`;
      }
    });

    btn.textContent = showingPesos ? 'Mostrar en USD' : 'Mostrar en Pesos ARS';
    btn.setAttribute('aria-pressed', showingPesos);
  });


  // --- 2) Scroll‑reveal ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .card, .reveal-from-bottom, .reveal-from-left, .reveal-from-right').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const titulo = document.querySelector('.animado-desde-izq');
  const parrafo = document.querySelector('.animado-desde-der');
  const desdeAbajo = document.querySelector('.animado-desde-abajo');
  const desdeArriba = document.querySelector('.animado-desde-arriba');
  const desdeArriba2 = document.querySelector('.animado-desde-arriba-2');
  const desdeArriba3 = document.querySelector('.animado-desde-arriba-3');

  
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
    titulo?.classList.add('activo');
  }, 300); // entra el título primero

  setTimeout(() => {
    parrafo?.classList.add('activo');
  }, 800); // luego el párrafo

  setTimeout(() => {
    desdeAbajo?.classList.add('activo');
  }, 1200); // luego desde abajo

  
});




function ajustarBordesNavbar() {
  const enlaces = document.querySelectorAll('.navbar-nav a');
  const width = window.innerWidth;

  enlaces.forEach(a => {
    if (width >= 600 && width < 992) {
      a.style.borderBottom = '1px solid rgba(0, 0, 0, 0.5)';
      a.style.borderTop = 'none';
      a.style.borderLeft = 'none';
      a.style.borderRight = 'none';
    } else if (width >= 992) {
      a.style.border = '1px solid transparent';
      a.style.borderBottom = 'none';
    } else {
      // Estilo para <600px
      a.style.borderBottom = '1px solid rgba(0, 0, 0, 0.3)';
      a.style.borderTop = 'none';
      a.style.borderLeft = 'none';
      a.style.borderRight = 'none';
    }
  });
}

// Ejecutar al cargar y al redimensionar
window.addEventListener('DOMContentLoaded', ajustarBordesNavbar);
window.addEventListener('resize', ajustarBordesNavbar);
