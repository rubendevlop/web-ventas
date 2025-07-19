// servicio.js

import { onUserChanged, logout } from './authService.js';

document.addEventListener('DOMContentLoaded', () => {
  // Referencias
  const menuBtn        = document.getElementById('menuToggle'); // Asegúrate que este ID es 'menuToggle' en tu HTML
  const nav            = document.getElementById('mainNav');   // Asegúrate que este ID es 'mainNav' en tu HTML
  const authButtons    = document.getElementById('auth-buttons');
  const userInfo       = document.getElementById('user-info');
  const userPhoto      = document.getElementById('user-photo');
  const userMenu       = document.getElementById('user-menu');
  const btnLogout      = document.getElementById('logout-btn');
  const toggleCurrency = document.getElementById('toggleCurrency'); // Correcto: apunta al ID del botón
  const rate           = 1340; // Asegúrate de que esta tasa esté actualizada si es relevante
  let showingUSD       = true;

  // 1) Estado de autenticación
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
        // Cierra el menú hamburguesa después de hacer click en un enlace de navegación
        nav.classList.remove('active');
        menuBtn.classList.remove('active');
      }
    });
  });

  // 6) Toggle moneda ARS/USD - CORRECCIÓN AQUÍ (Eliminado '?')
  if (toggleCurrency) {
    toggleCurrency.addEventListener('click', () => {
      console.log('¡Botón de moneda clickeado!'); // AGREGAR ESTO
      console.log('Valor actual de showingUSD:', showingUSD); // Y ESTO
  
      document.querySelectorAll('.price').forEach(span => {
        const usd = parseFloat(span.dataset.usd);
        // Opcional: console.log(`Procesando span con data-usd: ${usd}`);
        span.textContent = showingUSD
          ? '$ ' + (usd * rate).toLocaleString('es-AR')
          : 'USD ' + usd.toLocaleString('en-US');
      });
      toggleCurrency.textContent = showingUSD
        ? 'Mostrar en USD'
        : 'Mostrar en Pesos ARS';
      showingUSD = !showingUSD;
      console.log('Nuevo valor de showingUSD:', showingUSD); // Y ESTO
    });
  } else {
    console.warn("Elemento 'toggleCurrency' no encontrado. El botón de moneda no funcionará.");
  }


  // 7) Scroll‑reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // Opcional: Si quieres que desaparezcan al salir de la vista
        // entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  document.querySelectorAll('.reveal, .card').forEach(el => {
    observer.observe(el);
  });
});