// /scripts/servicio.js

import { onUserChanged, logout } from './authService.js'; // si lo usas

const USD_TO_ARS = 1340;   // tasa de conversión
let showingPesos = false;  // arranca en USD

document.addEventListener('DOMContentLoaded', () => {
  // --- 1) Toggle de moneda ARS/USD ---
  const btn = document.getElementById('toggleCurrency');
  const prices = document.querySelectorAll('.price');

  if (!btn) {
    console.error('No se encontró el botón #toggleCurrency');
  } else if (prices.length === 0) {
    console.error('No se encontraron elementos con la clase .price');
  } else {
    btn.addEventListener('click', () => {
      showingPesos = !showingPesos;
      prices.forEach(el => {
        const usd = parseFloat(el.dataset.usd) || 0;
        if (showingPesos) {
          const ars = usd * USD_TO_ARS;
          el.textContent = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
          }).format(ars);
        } else {
          el.textContent = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
          }).format(usd);
        }
      });
      btn.textContent = showingPesos ? 'Mostrar en USD' : 'Mostrar en Pesos ARS';
      btn.setAttribute('aria-pressed', showingPesos);
    });
  }

  // --- 2) Scroll‑reveal ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .card').forEach(el => {
    observer.observe(el);
  });


    // Scroll‑reveal
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // Toggle USD/ARS
    document.getElementById('toggleCurrency')?.addEventListener('click', () => {
      const btn = event.currentTarget;
      const showing = btn.dataset.showing !== 'pesos';
      document.querySelectorAll('.price').forEach(el => {
        const usd = +el.dataset.usd;
        el.textContent = showing
          ? new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS'}).format(usd*1340)
          : new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(usd);
      });
      btn.textContent = showing ? 'Mostrar en USD' : 'Mostrar en Pesos ARS';
      btn.dataset.showing = showing ? 'pesos' : 'usd';
    });
  
});

