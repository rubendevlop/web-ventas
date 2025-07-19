// servicio.js

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

document.addEventListener('DOMContentLoaded', () => {
    // 1. Toggle de moneda ARS/USD
    const rate = 1340;
    let showingUSD = true;
    const toggleBtn = document.getElementById('toggleCurrency');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.querySelectorAll('.price').forEach(span => {
          const usd = parseFloat(span.dataset.usd);
          span.textContent = showingUSD
            ? '$ ' + (usd * rate).toLocaleString('es-AR')
            : 'USD ' + usd.toLocaleString('en-US');
        });
        toggleBtn.textContent = showingUSD
          ? 'Mostrar en USD'
          : 'Mostrar en Pesos ARS';
        showingUSD = !showingUSD;
      });
    }
  
    // 2. Menú hamburguesa
    const btnToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    if (btnToggle && nav) {
      btnToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        btnToggle.classList.toggle('active');
        const expanded = nav.classList.contains('active');
        btnToggle.setAttribute('aria-label', expanded ? 'Cerrar menú' : 'Abrir menú');
      });
    }
  
    // 3. Smooth scroll interno para el nav
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        if (nav) nav.classList.remove('active');
        if (btnToggle) btnToggle.classList.remove('active');
      });
    });
  
    // 4. Scroll‑reveal continuo con IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // si entra en viewport añadimos .visible; si sale, la quitamos
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    }, {
      threshold: 0.1
    });
  
    // observamos todos los elementos con .reveal **y** todas las .card
    document
      .querySelectorAll('.reveal')
      .forEach(el => observer.observe(el));
  });
  