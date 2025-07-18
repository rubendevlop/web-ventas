// firebaseConfig.js
import { initializeApp }    from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth }          from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore }     from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUC8ND8bryP4ECLHWZE2XKcmdJ0sJMgDo",
  authDomain: "gestion-proyectos-web.firebaseapp.com",
  projectId: "gestion-proyectos-web",
  storageBucket: "gestion-proyectos-web.appspot.com",
  messagingSenderId: "433426909421",
  appId: "1:433426909421:web:76e3592d44f151e1d224e4"
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
