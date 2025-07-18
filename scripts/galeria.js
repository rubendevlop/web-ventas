document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú hamburguesa
    const toggleBtn = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggleBtn.classList.toggle('active');
    });
  
    // 2. Smooth scroll para enlaces internos
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        nav.classList.remove('active');
        toggleBtn.classList.remove('active');
      });
    });
  
    // 3. Scroll-reveal para las imágenes de la galería
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    }, {
      threshold: 0.1
    });
  
    document.querySelectorAll('.galeria-grid img').forEach(img => {
      observer.observe(img);
    });
  });
  