// nosotros.js


document.addEventListener('DOMContentLoaded', () => {


  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });

  // 5) Smooth scroll
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        nav.classList.remove('active');
        menuBtn.classList.remove('active');
      }
    });
  });



  // Scroll‑reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));


  placeAuthButtons();
  window.addEventListener('resize', placeAuthButtons);


});
      