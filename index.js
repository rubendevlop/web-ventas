document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú hamburguesa
    const btn = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
      btn.classList.toggle('active');
    });
  
    // 2. Smooth scroll para enlaces internos
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          nav.classList.remove('active');
          btn.classList.remove('active');
        }
      });
    });
  
    // 3. Scroll‑reveal con Intersection Observer
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  });
  