// nosotros.js


document.addEventListener('DOMContentLoaded', () => {

  // --- 2) Scroll‑reveal ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .card').forEach(el => {
    observer.observe(el);
  });


    // Scroll‑reveal
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  

  // Si existe la función placeAuthButtons, la ejecutamos
  if (typeof placeAuthButtons === 'function') {
    placeAuthButtons();
    window.addEventListener('resize', placeAuthButtons);
  }
});

document.addEventListener('DOMContentLoaded', function() {

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
    desdeIzq.classList.add('activo');
  }, 1000); // el párrafo aparece después
  
});
     
