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
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        if (nav) nav.classList.remove('active');
        if (btnToggle) btnToggle.classList.remove('active');
      });
    });
  
    // 4. Scroll‑reveal continuo con IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // cuando entra en viewport, añadimos; al salir, quitamos
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.1
    });
  
    // observamos todos los elementos que tengan .reveal
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  });
  