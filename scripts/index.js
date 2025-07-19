// index.js
import { onUserChanged, logout } from './authService.js';

const authButtons = document.getElementById('auth-buttons');
const userInfo    = document.getElementById('user-info');
const userEmailEl = document.getElementById('user-email');
const btnLogout   = document.getElementById('logout-btn');

onUserChanged(user => {
  if (user) {
    // Usuario conectado: muestro saludo y logout
    authButtons.style.display = 'none';
    userEmailEl.textContent   = user.email;
    userInfo.style.display    = 'flex';
  } else {
    // Nadie conectado: muestro login/register
    userInfo.style.display    = 'none';
    authButtons.style.display = 'flex';
  }
});

// Cerrar sesión
btnLogout.addEventListener('click', async () => {
  try {
    await logout();
    // onUserChanged redibujará el header
  } catch (err) {
    console.error('Error al cerrar sesión:', err);
  }
});

  
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
  
  