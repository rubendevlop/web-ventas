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
     
