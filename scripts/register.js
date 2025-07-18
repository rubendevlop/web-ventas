// register.js
import { signInWithGoogle, onUserChanged } from './authService.js';
import { createUserProfile }               from './dataService.js';

const btn = document.getElementById('google-register');

btn.addEventListener('click', async () => {
  try {
    const result = await signInWithGoogle();
    const user   = result.user;
    await createUserProfile(user.uid, user.email);
  } catch (err) {
    alert("Error al registrar: " + err.message);
  }
});

// Si ya hay sesión, redirige a dashboard.html
onUserChanged(user => {
  if (user) location.href = 'dashboard.html';
});
