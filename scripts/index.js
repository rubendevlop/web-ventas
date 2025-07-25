
//
// 5. Smooth scroll para enlaces internos
//
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      nav.classList.remove('active');
      menuBtn.classList.remove('active');
    }
  });
});

//
// 6. Scroll‑reveal con IntersectionObserver
//
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

//


// Ejecutar al cargar y al redimensionar
placeAuthButtons();
window.addEventListener('resize', placeAuthButtons);
