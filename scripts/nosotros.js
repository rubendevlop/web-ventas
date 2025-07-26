// nosotros.js


document.addEventListener('DOMContentLoaded', () => {
  // Scroll‑reveal: muestra elementos al hacer scroll
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Si existe la función placeAuthButtons, la ejecutamos
  if (typeof placeAuthButtons === 'function') {
    placeAuthButtons();
    window.addEventListener('resize', placeAuthButtons);
  }
});
     
