function validateError (element, errorMessage) { // cette fonction affiche un message selon le type d'erreur
    const errElement = ((element instanceof NodeList) ? element[0] : element).closest(".formData")
    if (errorMessage) {
        errElement.setAttribute("data-error", errorMessage)
        errElement.setAttribute("data-error-visible", true)
    } else {
        errElement.setAttribute("data-error", "")
        errElement.setAttribute("data-error-visible", false)
    }
}

function validateInputEmpty (element) { // Cette fonction vérifie si le champ rentré n'est pas vide, sinon il affiche un message d'erreur
    if (element.value.length < 1) {
        validateError(element, "Champ obligatoire")
        return true
    }
    validateError(element, null)
    return false
}

function validateInputLength (element) { // Cette fonction vérifie si le champ rentré fait au moins 2 caractères, sinon il renvoie un message d'erreur
    if (element.value.length < 2) {
        validateError(element, "Doit contenir au moins 2 caractères")
        return true
    }
    validateError(element, null)
    return false
}

const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/ // Cette regex me permet de vérifier si le format du prénom et du nom est valide
function validateInputValidNameChars (element) {
    if (!regexName.test(element.value)) {
        validateError(element, "Contient des caractères invalides")
        return true
    }
    validateError(element, null)
    return false
}

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // J'utilise une regex qui me permet de vérifier si une addresse mail est valide ou non
function validateEmailChars (element) {
    if (!regex.test(element.value)) {
        validateError(element, "Email invalide")
        return true
    }
    validateError(element, null)
    return false
}


function isBirthdateNotFuture(element) { // Ici on vérifie si l'utilisateur n'a pas rentré une date dans le futur
    let userBirthdate = element.value
    let date = new Date()
    let year = date.getFullYear()
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    let formattedDate = `${year}-${month}-${day}`
    if (userBirthdate > formattedDate) {
        validateError(element, "Vous ne pouvez pas être né dans le futur !")
        return true
    }
    validateError(element, null)
    return false
}

function isDateMajor(element) { // Ici cette fonction me permet de vérifier si l'utilisateur est majeur ou non
    const userBirthdate = new Date(element.value)
    const date = new Date()
    let age = date.getFullYear() - userBirthdate.getFullYear()
    const month = date.getMonth() - userBirthdate.getMonth()
    if (month < 0 || (month === 0 && date.getDate() < userBirthdate.getDate())) {
        age-- 
    }
    if (age <18) {
        validateError(element,"Vous devez être majeur(e) pour participer")
        return true
    }
    validateError(element, null)
    return false
    


}

function validatePlace(element) { // Celle-ci vérifie si une ville a été coché
    if(![...element].find(el => el.checked)) {
        validateError(element, "vous devez sélectionner une ville")
        return true
    }
    else validateError(element,null)
    return false
}

function validateCgu(element) { // Ici je vérifie que les CGU ont bien étés cochés
    if(!element.checked) {
        validateError(element, "vous devez valider les CGU")
        return true
    }
    else validateError(element,null)
    return false
}

 
function validateIntegerOnly(element) { // Cette fonction permet de vérifier que le nombre de tournoi auquel l'utilisateur a participé est un entier
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
    const places = form.querySelectorAll(".cities .checkbox-input")
    const checkboxCgu = form.querySelector("#checkbox1")

    const validators = [ // J'indique l'élémént à prendre en compte pour valider chaque partie du formulaire
        {
            element: checkboxCgu,
            validators: [validateCgu]
        },
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
        },
        {
            element: birthdate,
            validators: [ validateInputEmpty, isBirthdateNotFuture, isDateMajor ]
        },
        {
            element: places,
            validators: [ validatePlace ]
        }
    ]

    // J'appelle chaque validateur en cas de blur
    validators.forEach(validator => {
        const element = validator.element
        const elements = element instanceof NodeList ? [...element] : [element]
        elements.forEach(element => element.addEventListener("blur", ()=>{
            validateField(validator)
        }))
    })

    form.addEventListener("submit", (event)=> { 
        event.preventDefault();
        if(validators.filter(validator => validateField(validator)).length === 0) {
            const body = modalWindow.querySelector(".modal-body")
            body.innerHTML = "<div> Merci pour votre inscription </div>"
        }
    })
}
