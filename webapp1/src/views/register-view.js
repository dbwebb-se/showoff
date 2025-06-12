

export default class RegisterView extends HTMLElement {
    // connect component
    connectedCallback() {

        this.innerHTML =`<register-form></register-form><div class="hide-border"></div>`;
    }
}