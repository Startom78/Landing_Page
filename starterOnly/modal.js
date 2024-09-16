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

async function verificationInputs() {
  // Je récupère ici les éléments de mon formulaire

  const first_name = document.getElementById("first")
  const last_name = document.getElementById("last")
  const email = document.getElementById("email")
  const birthdate = document.getElementById("birthdate")
  const number_tournament = document.getElementById("quantity")
  
  first_name.addEventListener("blur", (event) => { // je déclare ce qu'il se passe lorsque l'utilisateur quitte l'input associé au prénom
    const first_name_value = first_name.value
    const errElement = first_name.closest(".formData")
    if (first_name_value.length < 2 || first_name_value.length == 0) { // si la longueur du prénom est strictement inférieur à 2 ou égale à 0, afficher une erreur
      errElement.setAttribute("data-error", "Le prénom n'est pas valide")
      errElement.setAttribute("data-error-visible", true)
      console.log(errElement)
    }
    else { // Cela permet de faire disparaitre l'erreur lorsque l'utilisateur passe d'un prénom non-valide à un prénom valide
      errElement.setAttribute("data-error", "")
      errElement.setAttribute("data-error-visible", false)
    }
  })

  last_name.addEventListener("blur", (event) => { // Je réalise la même chose avec le nom de famille
    const last_name_value = last_name.value
    const errElement = last_name.closest(".formData")
    if (last_name_value.length < 2 || last_name_value.length == 0) {
      errElement.setAttribute("data-error", "Le nom de famille n'est pas valide")
      errElement.setAttribute("data-error-visible", true)
      console.log(errElement)
    }
    else {
      errElement.setAttribute("data-error", "")
      errElement.setAttribute("data-error-visible", false)
    }
  })

  email.addEventListener("blur", (event) => {
    const email_value = email.value
    const errElement = email.closest(".formData")
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // J'utilise une regex qui me permet de vérifier si une addresse mail est valide ou non
    let verification_email = regex.test(email_value)
    if (!verification_email) { // Si l'addresse mail n'est pas valide alors j'affiche une erreur
      errElement.setAttribute("data-error", "L'addresse mail n'est pas valide")
      errElement.setAttribute("data-error-visible", true)
      console.log(errElement)
    }

    else { // si l'utilisateur corrige son erreur, alors je la fais disparaitre
      errElement.setAttribute("data-error", "")
      errElement.setAttribute("data-error-visible", false)
    }
  })

  birthdate.addEventListener("blur", (event) => {
    const now = new Date()
    console.log(now)
  })

  number_tournament.addEventListener("blur", (event) => {
    const number_tournament_value = number_tournament.value
    const errElement = number_tournament.closest(".formData")
    if (number_tournament_value == "") {
      errElement.setAttribute("data-error", "Vous devez rentrer une valeur")
      errElement.setAttribute("data-error-visible", true)
      console.log(errElement)
    }

    else {
      errElement.setAttribute("data-error", "")
      errElement.setAttribute("data-error-visible", false)
    }
  })
}
verificationInputs()


//TODO tests manuels
//TODO Ajouter confirmation quand envoi réussi
//TODO Ajouter validation ou message d'erreur
//TODO Implémenter entrée du formulaire
//Ceci est un test 





form.addEventListener("submit", (event)=> {
  event.preventDefault();
  const body = modalWindow.querySelector(".modal-body")
  body.innerHTML = "<div> Merci pour votre inscription </div>"
} )