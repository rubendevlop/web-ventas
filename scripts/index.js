// index.js
import { onUserChanged, logout } from './authService.js';

//
// Referencias al DOM
//
const authButtons = document.getElementById('auth-buttons');
const userInfo    = document.getElementById('user-info');
const userPhoto   = document.getElementById('user-photo');
const userMenu    = document.getElementById('user-menu');
const btnLogout   = document.getElementById('logout-btn');

const menuBtn     = document.getElementById('menu-toggle');
const nav         = document.getElementById('nav');

//
// 1. Detectar cambios de sesión y actualizar header
//
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

//
// 2. Logout
//
// btnLogout.addEventListener('click', async () => {
//   try {
//     await logout();
//   } catch (err) {
//     console.error('Error al cerrar sesión:', err);
//   }
// });

//
// 3. Dropdown del avatar
//
// userPhoto.addEventListener('click', e => {
//   e.stopPropagation();
//   userMenu.classList.toggle('open');
// });
// document.addEventListener('click', () => {
//   userMenu.classList.remove('open');
// });
// userMenu.addEventListener('click', e => e.stopPropagation());

//
// 4. Menú hamburguesa
//
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuBtn.classList.toggle('active');
});

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
// 7. Mover auth-buttons dentro del nav en móvil (<600px) y fuera en desktop/tablet (>=600px)
//
// function placeAuthButtons() {
//   const header = document.querySelector('header');
//   if (window.innerWidth < 600) {
//     if (!nav.contains(authButtons)) {
//       nav.appendChild(authButtons);
//     }
//   } else {
//     if (!header.contains(authButtons)) {
//       header.insertBefore(authButtons, userInfo);
//     }
//     // cerrar menú al volver a desktop
//     nav.classList.remove('active');
//     menuBtn.classList.remove('active');
//   }
// }

// Ejecutar al cargar y al redimensionar
placeAuthButtons();
window.addEventListener('resize', placeAuthButtons);
