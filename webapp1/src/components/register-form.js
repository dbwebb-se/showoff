import auth from "../models/auth.js";
import helpers from "../models/helpers.js";

export default class RegisterForm extends HTMLElement {
    constructor() {
        super();

        this.user = {};
   }

    // connect component
    async connectedCallback() {

        await this.render();
    }

    async render() {

        let form = document.createElement("form");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            
            const registerResponse = await auth.register(this.user.username, this.user.password);

            if (registerResponse === "ok") {
                location.hash = "login";
            } else {
                form.innerHTML = "<h2>Något gick fel!</h2>";
            }
    
        });


        let formHeader = document.createElement("h2");
        formHeader.textContent = "Registrera";

        let userInput = helpers.createInput("email", "", ["input"], "username-input");
        
        userInput.setAttribute("required", "required");
        userInput.setAttribute("placeholder", "E-postadress");
        userInput.addEventListener("change", (event) => {
            this.user = {
                ...this.user,
                username: event.target.value,
            };
        });


        let passwordInput = helpers.createInput("password", "", ["input"], "password-input");
        
        passwordInput.setAttribute("required", "required");
        passwordInput.setAttribute("placeholder", "Lösenord");
        passwordInput.addEventListener("change", (event) => {
            this.user = {
                ...this.user,
                password: event.target.value,
            };
        });

        let submitButton = helpers.createInput("submit", "Registrera", ["button", "submit-button"]);

        form.appendChild(formHeader);
        form.appendChild(userInput);

        form.appendChild(passwordInput);
        form.appendChild(submitButton);

        this.appendChild(form);
    }
}