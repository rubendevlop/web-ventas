// register.js
import { signInWithGoogle, onUserChanged } from './authService.js';
import { createUserProfile }               from './dataService.js';

const btn         = document.getElementById('google-register');
const params      = new URLSearchParams(window.location.search);
const redirectTo  = params.get('redirect') || '/index.html';

btn.addEventListener('click', async () => {
  try {
    const result = await signInWithGoogle();
    const user   = result.user;
    await createUserProfile(user.uid, user.email);
  } catch (err) {
    alert("Error al registrar: " + err.message);
  }
});

// Cuando detecte sesión, vamos a la página original
onUserChanged(user => {
  if (user) {
    window.location.href = redirectTo;
  }
});
