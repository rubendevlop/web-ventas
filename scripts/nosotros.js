// nosotros.js


document.addEventListener('DOMContentLoaded', () => {

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
     
