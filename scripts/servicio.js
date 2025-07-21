// servicio.js

import { onUserChanged, logout } from './authService.js';

document.addEventListener('DOMContentLoaded', () => {
  // Referencias
  const menuBtn        = document.getElementById('menuToggle'); // coincide con HTML
  const nav            = document.getElementById('mainNav');   // coincide con HTML
  const authButtons    = document.getElementById('auth-buttons');
  const userInfo       = document.getElementById('user-info');
  const userPhoto      = document.getElementById('user-photo');
  const userMenu       = document.getElementById('user-menu');
  const btnLogout      = document.getElementById('logout-btn');
  const toggleCurrency = document.getElementById('toggleCurrency');
  const rate           = 1340;
  let showingUSD       = true;

  // 1) Estado de autenticación
  // onUserChanged(user => {
  //   if (user) {
  //     authButtons.style.display = 'none';
  //     userPhoto.src = user.photoURL || '/images/avatar-default.png';
  //     userInfo.style.display = 'flex';
  //   } else {
  //     userInfo.style.display    = 'none';
  //     authButtons.style.display = 'flex';
  //   }
  // });

// 2. Logout
//
// btnLogout.addEventListener('click', async () => {
//   try {
//     await logout();
//   } catch (err) {
//     console.error('Error al cerrar sesión:', err);
//   }
// });
  // 3) Dropdown del avatar
  // userPhoto.addEventListener('click', e => {
  //   e.stopPropagation();
  //   userMenu.classList.toggle('open');
  // });
  // document.addEventListener('click', () => userMenu.classList.remove('open'));
  // userMenu.addEventListener('click', e => e.stopPropagation());

  // 4) Menú hamburguesa
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });

  // 5) Smooth scroll
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

  // 6) Toggle moneda ARS/USD
  if (toggleCurrency) {
    toggleCurrency.addEventListener('click', () => {
      document.querySelectorAll('.price').forEach(span => {
        const usd = parseFloat(span.dataset.usd);
        span.textContent = showingUSD
          ? '$ ' + (usd * rate).toLocaleString('es-AR')
          : 'USD ' + usd.toLocaleString('en-US');
      });
      toggleCurrency.textContent = showingUSD
        ? 'Mostrar en USD'
        : 'Mostrar en Pesos ARS';
      showingUSD = !showingUSD;
    });
  } else {
    console.warn("Elemento 'toggleCurrency' no encontrado.");
  }

  // 7) Scroll‑reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
      else entry.target.classList.remove('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .card').forEach(el => observer.observe(el));

  // 8) Mover auth-buttons en móvil/desktop
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
