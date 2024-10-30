// afficher formumaire

const btn_show_form = document.getElementById("btn-show-form");
const form = document.querySelector("form");

btn_show_form.addEventListener("click", () => {
  if (btn_show_form.classList.contains("open")) {
    form.style.display = "block";
    btn_show_form.classList.remove("open");
    btn_show_form.innerHTML = "fermer la fenêtre";
  } else {
    form.style.display = "none";
    btn_show_form.classList.add("open");
    btn_show_form.innerHTML = "Ajouter une tâche";
  }
});

const btn_ajouter = document.getElementById("btn-add");
const taches = document.querySelector(".gest_taches");

// ajouter une tâche

const titre = document.getElementById("title");
const description = document.getElementById("description");
const date = document.getElementById("date");
const priorite = document.getElementById("priority");
const statut = document.getElementById("status");
const show_error = document.getElementById("show-error");

let list_taches = [];

// if (localStorage.getItem("taches")) {
//   list_taches = JSON.parse(localStorage.getItem("taches"));
// }

// afficher_taches(list_taches);

btn_ajouter.addEventListener("click", (e) => {
  e.preventDefault();

  if (titre.value == "" || description.value == "" || date.value == "") {
    show_error.innerHTML = "Veuillez remplir tous les champs";
    return;
  } else {
    show_error.innerHTML = "";
  }

  const tache = {
    titre: titre.value,
    description: description.value,
    date: date.value,
    priorite: priorite.value,
    statut: statut.value,
  };

  list_taches.push(tache);
  // localStorage.setItem("taches", JSON.stringify(list_taches));

  afficher_taches(list_taches);

  titre.value = "";
  description.value = "";
  date.value = "";
});

//afficher tach

function afficher_taches(list_taches) {
  const box_todo = document.querySelector(".box-todo .taches");
  const box_doing = document.querySelector(".box-doing .taches");
  const box_done = document.querySelector(".box-done .taches");

  box_todo.innerHTML = "";
  box_doing.innerHTML = "";
  box_done.innerHTML = "";

  list_taches.forEach((tache) => {
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
      <button class="border-0"><i class="fa-solid fa-trash text-black"></i></button>
      <span id="card-status" class="bg-white px-1 rounded-3">${tache.statut}</span>
    </div>
  `;

    if (tache.priorite == "P1") {
      card_tache.classList.add("bg-danger");
    } else if (tache.priorite == "P2") {
      card_tache.classList.add("bg-warning");
    } else if (tache.priorite == "P3") {
      card_tache.classList.add("bg-myGreen");
    }

    if (tache.statut == "To-do") {
      box_todo.appendChild(card_tache);
    } else if (tache.statut == "Doing") {
      box_doing.appendChild(card_tache);
    } else if (tache.statut == "Done") {
      box_done.appendChild(card_tache);
    }

    total_taches();
  });
}

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
