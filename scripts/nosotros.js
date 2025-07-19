// nosotros.js
import { onUserChanged, logout } from './authService.js';

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn     = document.getElementById('menuToggle');
  const nav         = document.getElementById('mainNav');
  const authButtons = document.getElementById('auth-buttons');
  const userInfo    = document.getElementById('user-info');
  const userPhoto   = document.getElementById('user-photo');
  const userMenu    = document.getElementById('user-menu');
  const btnLogout   = document.getElementById('logout-btn');

  // 1) Autenticación
  onUserChanged(user => {
    if (user) {
      authButtons.style.display = 'none';
      userPhoto.src = user.photoURL || '/images/avatar-default.png';
      userInfo.style.display = 'flex';
    } else {
      userInfo.style.display    = 'none';
      authButtons.style.display = 'flex';
    }
  });

  // 2) Logout
  btnLogout.addEventListener('click', async () => {
    try { await logout(); }
    catch (err) { console.error(err); }
  });

  // 3) Dropdown avatar
  userPhoto.addEventListener('click', e => { e.stopPropagation(); userMenu.classList.toggle('open'); });
  document.addEventListener('click', () => userMenu.classList.remove('open'));
  userMenu.addEventListener('click', e => e.stopPropagation());

  // 4) Toggle hamburguesa
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
  function placeAuthButtons() {
    const header = document.querySelector('header');
    if (window.innerWidth < 600) {
      if (!nav.contains(authButtons)) nav.appendChild(authButtons);
    } else {
      if (!header.contains(authButtons)) header.insertBefore(authButtons, userInfo);
      nav.classList.remove('active');
      menuBtn.classList.remove('active');
    }
  }
  placeAuthButtons();
  window.addEventListener('resize', placeAuthButtons);
});
