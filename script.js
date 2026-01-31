import { db } from "./firebase.js";
import { doc, setDoc, deleteDoc, onSnapshot } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const horarios = ["09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00"];
  const agenda = document.getElementById("agenda");

  let horarioSelecionado = null;

  horarios.forEach(h => {
    const btn = document.createElement("button");
    btn.innerText = h;
    btn.classList.add("slot");

    btn.addEventListener("click", () => toggleHorario(h, btn));
    agenda.appendChild(btn);

    // ocupado por outro usuário (Firestore)
    onSnapshot(doc(db, "horarios", h), snap => {
      if (snap.exists() && horarioSelecionado !== h) {
        btn.disabled = true;
        btn.classList.add("disabled");
      }
    });
  });

  function toggleHorario(hora, btnClicado) {

    const botoes = document.querySelectorAll(".slot");

    // 🔁 Desmarcar (libera tudo)
    if (horarioSelecionado === hora) {
      deleteDoc(doc(db, "horarios", hora));
      horarioSelecionado = null;

      botoes.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("disabled", "selected");
      });

      atualizarWhatsapp();
      return;
    }

    // ⛔ Já existe um selecionado → não faz nada
    if (horarioSelecionado) return;

    // ✅ Selecionar (trava os outros)
    horarioSelecionado = hora;
    setDoc(doc(db, "horarios", hora), { ocupado: true });

    botoes.forEach(btn => {
      if (btn !== btnClicado) {
        btn.disabled = true;
        btn.classList.add("disabled");
      } else {
        btn.classList.add("selected");
      }
    });

    atualizarWhatsapp();
  }

  function atualizarWhatsapp() {
    const link = document.getElementById("whatsappBtn");

    if (!horarioSelecionado) {
      link.href = "#";
      return;
    }

    const msg = `Olá, gostaria de confirmar o horário ${horarioSelecionado}`;
    link.href =
      `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(msg)}`;
  }

});
