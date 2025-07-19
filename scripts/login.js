// login.js
import { signInWithGoogle, onUserChanged } from './authService.js';

const btn = document.getElementById('google-login');

// Capturamos el parámetro ?redirect=… de la URL
const params     = new URLSearchParams(window.location.search);
const redirectTo = params.get('redirect') || '/index.html';

btn.addEventListener('click', async () => {
  try {
    await signInWithGoogle();
    // tras el popup, onUserChanged se encargará de redirigir
  } catch (err) {
    alert("Error al iniciar sesión: " + err.message);
  }
});

// Si ya hay sesión, vamos a la página indicada
onUserChanged(user => {
  if (user) {
    window.location.href = redirectTo;
  }
});
