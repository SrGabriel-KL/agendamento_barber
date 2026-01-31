import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWVhWyIYwBitqoqD8mp5WzeAni7ccwxLc",
  authDomain: "agendamento-de-clientes-3aed9.firebaseapp.com",
  projectId: "agendamento-de-clientes-3aed9",
  storageBucket: "agendamento-de-clientes-3aed9.firebasestorage.app",
  messagingSenderId: "60806283466",
  appId: "1:60806283466:web:dbbefb8df47c40c397f433"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log("🔥 Firebase conectado com sucesso");
