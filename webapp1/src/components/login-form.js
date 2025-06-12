import auth from "../models/auth.js";
import helpers from "../models/helpers.js";

export default class LoginForm extends HTMLElement {
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
            
            const loginResponse = await auth.login(this.user.username, this.user.password);

            if (loginResponse === "ok") {
                location.hash = "stations";
            } else if (loginResponse === "PW") {
                message.textContent = "Fel lösenord!";
                passwordInput.classList.add("wrong");
            } else if (loginResponse === "user") {
                messageUser.textContent = "Fel användarnamn";
                userInput.classList.add("wrong");

            } else {
                form.innerHTML = "<h2>Något gick fel!</h2>";
            }
    
        });




        let formHeader = document.createElement("h2");
        formHeader.textContent = "Logga in";

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

        let submitButton = helpers.createInput("submit", "Logga in", ["button", "submit-button"]);

      
        let message = document.createElement("h3");
        let messageUser = document.createElement("h3");


        form.appendChild(formHeader);
        form.appendChild(userInput);
        form.appendChild(messageUser);
        form.appendChild(passwordInput);
        form.appendChild(message);
        form.appendChild(submitButton);

        this.appendChild(form);
    }

    route() {
    let cleanHash = location.hash.replace("#", "");
    let splitHash = cleanHash.split("/");
    
    let route = splitHash[1];
    
    return route;
}
}