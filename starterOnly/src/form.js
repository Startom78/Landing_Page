function validateError (element, errorMessage) {
    const errElement = ((collection instanceof NodeList) ? element[0] : element).closest(".formData")
    if (errorMessage) {
        errElement.setAttribute("data-error", errorMessage)
        errElement.setAttribute("data-error-visible", true)
    } else {
        errElement.setAttribute("data-error", "")
        errElement.setAttribute("data-error-visible", false)
    }
}

function validateInputEmpty (element) {
    if (element.value.length < 1) {
        validateError(element, "Champ obligatoire")
        return true
    }
    validateError(element, null)
    return false
}

function validateInputLength (element) {
    if (element.value.length < 2) {
        validateError(element, "Doit contenir au moins 2 caractères")
        return true
    }
    validateError(element, null)
    return false
}

const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ -"
function validateInputValidNameChars (element) {
    if (element.value.split('').find(c => !validChars.includes(c))) {
        validateError(element, "Contient des caractères invalides")
        return true
    }
    validateError(element, null)
    return false
}

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // J'utilise une regex qui me permet de vérifier si une addresse mail est valide ou non
function validateEmailChars (element) {
    console.log(element.value, regex.test(element.value))
    if (!regex.test(element.value)) {
        validateError(element, "Email invalide")
        return true
    }
    validateError(element, null)
    return false
}
 
function validateIntegerOnly(element) {
    if (element.value.split('').find(c => !'0123456789'.includes(c))) {
        validateError(element, "Entier obligatoire")
        return true
    }
    validateError(element, null)
    return false
}

function validateField (validator) {
    return validator.validators.find(validate => validate(validator.element))
}

export const initFormValidation = () => {
    // Je récupère ici les éléments de mon formulaire
    const modalBg = document.querySelector(".bground");
    const modalWindow =  modalBg.querySelector(".content");
    const form = modalWindow.querySelector("form");

    const first_name = form.querySelector("#first")
    const last_name = form.querySelector("#last")
    const email = form.querySelector("#email")
    const birthdate = form.querySelector("#birthdate")
    const number_tournament = form.querySelector("#quantity")

    const validators = [
        {
            element: first_name,
            validators: [ validateInputEmpty, validateInputLength, validateInputValidNameChars ]
        },
        {
            element: last_name,
            validators: [ validateInputEmpty, validateInputLength, validateInputValidNameChars ]
        },
        {
            element: email,
            validators: [ validateInputEmpty, validateEmailChars ]
        },
        {
            element: number_tournament,
            validators: [ validateInputEmpty, validateIntegerOnly ]
        }
    ]

    const collection = document.querySelectorAll("radio")
    console.log(collection instanceof NodeList)

    // call each validator on blur
    validators.forEach(validator => {
        validator.element.addEventListener("blur", ()=>{
            validateField(validator)
        })
    })

    form.addEventListener("submit", (event)=> {
        event.preventDefault();
        if(!validators.find(validator => validateField(validator))) {
            const body = modalWindow.querySelector(".modal-body")
            body.innerHTML = "<div> Merci pour votre inscription </div>"
        }
    })
}
