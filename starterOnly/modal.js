function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function validateFormular() {
  const first_name = document.getElementById(".first")
  const last_name = document.getElementById(".last")
  const email = document.getElementById(".email")
  const birthdate = document.getElementById(".birthdate")
  const number_tournament = document.getElementById(".quantity")
}

//TODO tests manuels
//TODO Ajouter confirmation quand envoi réussi
//TODO Ajouter validation ou message d'erreur
//TODO Implémenter entrée du formulaire
//TODO Fermer la modale





