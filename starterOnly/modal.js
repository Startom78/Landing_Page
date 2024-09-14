function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const closeBtn = modalBg.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalWindow =  modalBg.querySelector(".content");
const form = modalWindow.querySelector("form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click",closeModal);
modalBg.addEventListener("click", closeModal);
modalWindow.addEventListener("click", stopPropagation)

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

function closeModal() {
  modalBg.style.display = "none";
}

function stopPropagation(event) {
  event.stopPropagation();
}

function validateFormular() {
  const first_name = document.getElementById("first")
  const last_name = document.getElementById("last")
  const email = document.getElementById("email")
  const birthdate = document.getElementById("birthdate")
  const number_tournament = document.getElementById("quantity")

  first_name.addEventListener("blur", (event) => {
    const errElement = first_name.closest(".formData")
    errElement.setAttribute("data-error", "Le prénom n'est pas valide")
    errElement.setAttribute("data-error-visible", true)
    console.log(errElement)
  })
}
validateFormular()


//TODO tests manuels
//TODO Ajouter confirmation quand envoi réussi
//TODO Ajouter validation ou message d'erreur
//TODO Implémenter entrée du formulaire
//TODO Fermer la modale





form.addEventListener("submit", (event)=> {
  event.preventDefault();
  const body = modalWindow.querySelector(".modal-body")
  body.innerHTML = "<div> Felicitations </div>"
} )