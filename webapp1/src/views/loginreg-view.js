

export default class LoginRegView extends HTMLElement {
    // connect component
    connectedCallback() {

        this.innerHTML =`<login-register></login-register><div class="hide-border"></div>`;
    }
}