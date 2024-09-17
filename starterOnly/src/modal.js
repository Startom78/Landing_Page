export const editNav = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

export const initModal = () => {
  // DOM Elements
  const modalBg = document.querySelector(".bground");
  const closeBtn = modalBg.querySelector(".close");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const formData = document.querySelectorAll(".formData");
  const modalWindow =  modalBg.querySelector(".content");

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


  //TODO tests manuels
  //TODO Ajouter confirmation quand envoi réussi
  //TODO Ajouter validation ou message d'erreur
  //TODO Implémenter entrée du formulaire
  //Ceci est un test 

}