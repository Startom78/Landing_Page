import { editNav, initModal } from "./src/modal.js"
import { initFormValidation } from "./src/form.js"

window.onload = () => {
    // burger menu
    const burgerIcon = document.querySelector(".icon")
    burgerIcon.onclick = editNav

    // open/close modal
    initModal()

    // form validation
    initFormValidation()
}