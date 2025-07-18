// main.js
import { register, login, logout, onUserChanged } from './authService.js';
import { createUserProfile }                      from './dataService.js';

const regForm    = document.getElementById('register-form');
const logForm    = document.getElementById('login-form');
const authBox    = document.getElementById('auth-container');
const appBox     = document.getElementById('app-container');
const userEmail  = document.getElementById('user-email');
const logoutBtn  = document.getElementById('logout-btn');

// Registro
regForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = e.target['reg-email'].value;
  const pass  = e.target['reg-password'].value;
  try {
    const { user } = await register(email, pass);
    await createUserProfile(user.uid, user.email);
    regForm.reset();
  } catch (err) {
    alert("Error al registrar: " + err.message);
  }
});

// Login
logForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = e.target['login-email'].value;
  const pass  = e.target['login-password'].value;
  try {
    await login(email, pass);
    logForm.reset();
  } catch (err) {
    alert("Error en login: " + err.message);
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  logout();
});

// Escucha cambios de sesión
onUserChanged(user => {
  if (user) {
    // Usuario autenticado
    authBox.hidden = true;
    appBox.hidden  = false;
    userEmail.textContent = user.email;
  } else {
    // No hay usuario
    appBox.hidden  = true;
    authBox.hidden = false;
  }
});
