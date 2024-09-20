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
  modalBg.addEventListener("mousedown", closeModal);
  modalWindow.addEventListener("mousedown", stopPropagation)

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
}