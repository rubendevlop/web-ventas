// wpbtn.js
// Este script agrega un botón flotante de WhatsApp a cualquier página

document.addEventListener('DOMContentLoaded', () => {
    // Crear el estilo para el botón
    const style = document.createElement('style');
    style.textContent = `
      .whatsapp-float {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background-color: #25D366;
        border-radius: 50%;
        text-align: center;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .whatsapp-float img {
        width: 35px;
        height: 35px;
      }
    `;
    document.head.appendChild(style);
  
    // Crear el elemento <a> como botón
    const btn = document.createElement('a');
    btn.href = 'https://wa.me/5493815624585'; // Cambia el número por tu WhatsApp
    btn.target = '_blank';
    btn.className = 'whatsapp-float';
    btn.innerHTML = `<img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/whatsapp.svg" alt="WhatsApp" />`;
    
    document.body.appendChild(btn);
  });
  