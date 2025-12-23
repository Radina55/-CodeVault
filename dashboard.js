import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzYW8uBDdb9Z-_NQIMfmjUU7r4NZNIVvk",
  authDomain: "bakups-data.firebaseapp.com",
  projectId: "bakups-data",
  storageBucket: "bakups-data.appspot.com", // ⚠️ WAJIB appspot.com
  messagingSenderId: "294937935462",
  appId: "1:294937935462:web:1e3261e3704b95cc1cf7a7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadFiles(user.uid);
  }
});

// UPLOAD FILE
window.upload = async () => {
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];
  if (!file) return alert("Pilih file dulu");

  const user = auth.currentUser;
  const fileRef = ref(storage, `${user.uid}/${file.name}`);

  await uploadBytes(fileRef, file);
  alert("Upload berhasil");
  loadFiles(user.uid);
};

// LOAD FILE LIST
async function loadFiles(uid) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  const folderRef = ref(storage, uid);
  const files = await listAll(folderRef);

  for (const fileRef of files.items) {
    const url = await getDownloadURL(fileRef);
    const li = document.createElement("li");
    li.innerHTML = `
      ${fileRef.name}
      <a href="${url}" target="_blank">Download</a>
    `;
    list.appendChild(li);
  }
}
