
export default class LoginRegister extends HTMLElement {
    constructor() {
        super();

        this.user = {};
   }

    // connect component
    connectedCallback() {

        this.render();
    }

    render() {

        let image = document.createElement("img");
        image.setAttribute("src", "./src/img/userbig.png")
        image.classList.add("login-image")

        let loginButton = document.createElement("button");
        loginButton.textContent = "Logga in";
        loginButton.classList.add("button", "login-button");      

        loginButton.addEventListener("click", () => {
            location.hash = "login";
        });

        let registerButton = document.createElement("button");
        registerButton.textContent = "Registrera dig";
        registerButton.classList.add("button", "register-button");      

        registerButton.addEventListener("click", () => {
            location.hash = "register";
        });
        
        let header = document.createElement("h1");
        header.textContent = "Logga in"

        let text = document.createElement("p");
        text.classList.add("p-logreg");
        text.textContent = "Lägg till dina favoritstationer och se en sammanställning över försenade tåg till just dem."


        this.appendChild(image);
        this.appendChild(header);
        this.appendChild(text);
        this.appendChild(loginButton);
        this.appendChild(registerButton);
    }
}