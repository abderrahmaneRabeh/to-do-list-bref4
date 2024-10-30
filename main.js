const btn_ajouter = document.getElementById("btn-add");
const taches = document.querySelector(".gest_taches");

// ajouter une tâche

const titre = document.getElementById("title");
const description = document.getElementById("description");
const date = document.getElementById("date");
const priorite = document.getElementById("priority");
const statut = document.getElementById("status");

btn_ajouter.addEventListener("click", (e) => {
  e.preventDefault();

  if (titre.value == "" || description.value == "" || date.value == "") {
    return;
  }

  const tache = {
    titre: titre.value,
    description: description.value,
    date: date.value,
    priorite: priorite.value,
    statut: statut.value,
  };

  const box_tache = document.createElement("div");
  box_tache.className = "box-tache";

  const card_tache = document.createElement("div");
  card_tache.className = "card-tache";
  card_tache.setAttribute("draggable", "true");
  card_tache.innerHTML = `
    <div class="card-header-tache d-flex justify-content-center gap-5 border-4 border-white border-bottom">
      <span id="card-title-tache" class="h5">${tache.titre}</span>
      <span id="card-date-tache">${tache.date}</span>
    </div>
    <div class="card-body-tache">
      <p id="card-description" class="text-center">${tache.description}</p>
    </div>
    <div class="card-footer-tach d-flex justify-content-evenly">
      <span id="card-priority" class="bg-white px-1 rounded-3">${tache.priorite}</span>
      <button class="border-0"><i class="fa-solid fa-trash text-danger"></i></button>
      <span id="card-status" class="bg-white px-1 rounded-3">${tache.statut}</span>
    </div>
  `;

  box_tache.appendChild(card_tache);

  const box_todo = document.querySelector(".box-todo");
  box_todo.appendChild(box_tache);

  titre.value = "";
  description.value = "";
  date.value = "";
  priorite.value = "";
  statut.value = "";

  total_taches();
});

// nombre des tâches

const nb_taches = document.getElementById("nb_taches");

function total_taches() {
  const taches = document.querySelectorAll(".card-tache");
  nb_taches.innerHTML = taches.length;
}

total_taches();

// supprimer une tâche

const btn_supprimer = document.querySelectorAll(".btn-delete");

taches.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    e.target.closest(".card-tache").remove();
    total_taches();
  }
});
