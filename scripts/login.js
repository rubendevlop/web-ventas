// login.js
import { signInWithGoogle, onUserChanged } from './authService.js';

const btn = document.getElementById('google-login');

btn.addEventListener('click', async () => {
  try {
    await signInWithGoogle();
  } catch (err) {
    alert("Error al iniciar sesión: " + err.message);
  }
});

// Si ya hay sesión, redirige a dashboard.html
onUserChanged(user => {
  if (user) location.href = 'dashboard.html';
});
