

document.addEventListener('DOMContentLoaded', () => {


    // 5) Smooth scroll
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            if (link.hash) {
                e.preventDefault();
                const target = document.querySelector(link.hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    nav.classList.remove('active');
                    menuBtn.classList.remove('active');
                }
            } else if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    });

    // 6) Scroll‑reveal para imágenes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.galeria-grid img').forEach(img => {
        observer.observe(img);
    });

    placeAuthButtons();
    window.addEventListener('resize', placeAuthButtons);
});
