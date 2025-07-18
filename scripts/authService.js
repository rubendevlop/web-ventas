// authService.js
import { auth } from './firebaseConfig.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

// Abre el popup de Google. Si es usuario nuevo, lo crea automáticamente.
export function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

// Cierra sesión
export function logout() {
  return signOut(auth);
}

// Listener de estado de sesión
export function onUserChanged(callback) {
  return onAuthStateChanged(auth, callback);
}
