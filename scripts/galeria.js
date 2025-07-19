// galeria.js

import { onUserChanged, logout } from './authService.js';

document.addEventListener('DOMContentLoaded', () => {
    // Referencias
    const menuBtn = document.getElementById('menuToggle'); // OK: coincide con HTML
    const nav = document.getElementById('mainNav');       // OK: coincide con HTML
    const authButtons = document.getElementById('auth-buttons');
    const userInfo = document.getElementById('user-info');
    const userPhoto = document.getElementById('user-photo');
    const userMenu = document.getElementById('user-menu');
    const btnLogout = document.getElementById('logout-btn');

    // 1) Estado de autenticación
    onUserChanged(user => {
        if (user) {
            authButtons.style.display = 'none';
            userPhoto.src = user.photoURL || '/images/avatar-default.png';
            userInfo.style.display = 'flex';
        } else {
            userInfo.style.display = 'none';
            authButtons.style.display = 'flex';
        }
    });

    // 2. Logout
    btnLogout.addEventListener('click', async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Error al cerrar sesión:', err);
        }
    });

    // 3. Dropdown del avatar
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

    // 4) Menú hamburguesa (¡Esta es la lógica clave!)
    if (menuBtn && nav) { // Añadimos una verificación para evitar errores si no se encuentran los elementos
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    } else {
        console.warn("ADVERTENCIA: Elementos del menú (menuToggle o mainNav) no encontrados. Menú hamburguesa puede no funcionar.");
    }


    // 5) Smooth scroll (¡CORREGIDO Y UNIFICADO!)
    // Este bloque maneja tanto el smooth scroll como el cierre del menú hamburguesa
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            if (link.hash) { // Solo si el enlace tiene un hash (es un enlace interno)
                e.preventDefault();
                const target = document.querySelector(link.hash); // Usar link.hash es más directo
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Cierra el menú hamburguesa después de hacer click en un enlace interno
                    if (nav.classList.contains('active')) { // Solo cierra si está abierto
                       nav.classList.remove('active');
                       menuBtn.classList.remove('active');
                    }
                }
            } else if (nav.classList.contains('active')) { // Si no es un enlace hash pero el menú está abierto, ciérralo
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    });

    // 6) Scroll-reveal para las imágenes de la galería
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Usa toggle con el segundo argumento para agregar/quitar la clase automáticamente
            entry.target.classList.toggle('visible', entry.isIntersecting);
            // Si quieres que solo aparezcan una vez y no desaparezcan al salir de la vista:
            // if (entry.isIntersecting) {
            //     entry.target.classList.add('visible');
            //     observer.unobserve(entry.target); // Dejar de observar después de la primera aparición
            // }
        });
    }, {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    });

    // Observa todas las imágenes dentro de .galeria-grid que tengan la clase .reveal
    document.querySelectorAll('.galeria-grid img.reveal').forEach(img => {
        observer.observe(img);
    });
});