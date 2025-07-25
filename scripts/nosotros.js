// nosotros.js
import { onUserChanged, logout } from './authService.js';

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn     = document.getElementById('menuToggle');
  const nav         = document.getElementById('mainNav');

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

  // 6) Scroll‑reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .card, .timeline-list li').forEach(el => observer.observe(el));

  // 7) Mover auth-buttons en móvil/desktop
  // function placeAuthButtons() {
  //   const header = document.querySelector('header');
  //   if (window.innerWidth < 600) {
  //     if (!nav.contains(authButtons)) nav.appendChild(authButtons);
  //   } else {
  //     if (!header.contains(authButtons)) header.insertBefore(authButtons, userInfo);
  //     nav.classList.remove('active');
  //     menuBtn.classList.remove('active');
  //   }
  // }
  placeAuthButtons();
  window.addEventListener('resize', placeAuthButtons);
});
