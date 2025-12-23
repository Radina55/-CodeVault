import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzYW8uBDdb9Z-_NQIMfmjUU7r4NZNIVvk",
  authDomain: "bakups-data.firebaseapp.com",
  projectId: "bakups-data",
  storageBucket: "bakups-data.appspot.com", // ⚠️ ini FIX
  messagingSenderId: "294937935462",
  appId: "1:294937935462:web:1e3261e3704b95cc1cf7a7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN
window.login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
};

// REGISTER
window.register = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Akun berhasil dibuat, silakan login"))
    .catch(err => alert(err.message));
};
