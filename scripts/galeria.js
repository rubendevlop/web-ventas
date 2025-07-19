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
onUserChanged(user => {
  if (user) {
    // ocultar login/register
    authButtons.style.display = 'none';

    // cargar avatar
    userPhoto.src = user.photoURL || '/images/avatar-default.png';

    // mostrar avatar + dropdown container
    userInfo.style.display = 'flex';
  } else {
    // mostrar login/register
    userInfo.style.display    = 'none';
    authButtons.style.display = 'flex';
  }
});

//
// 2. Logout
//
btnLogout.addEventListener('click', async () => {
  try {
    await logout();
    // onUserChanged se encargará de reconfigurar el header
  } catch (err) {
    console.error('Error al cerrar sesión:', err);
  }
});

//
// 3. Dropdown del avatar
//
userPhoto.addEventListener('click', e => {
  e.stopPropagation();
  userMenu.classList.toggle('open');
});

// cerrar dropdown al hacer click fuera
document.addEventListener('click', () => {
  userMenu.classList.remove('open');
});

// evitar que clicks dentro del menú lo cierren
userMenu.addEventListener('click', e => {
  e.stopPropagation();
});

//
// 4. Menú hamburguesa
//
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuBtn.classList.toggle('active');
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

  