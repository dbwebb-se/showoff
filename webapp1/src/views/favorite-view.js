import auth from "../models/auth.js";

export default class FavoriteView extends HTMLElement {
    // connect component
    connectedCallback() {
        if (!auth.token) {
            location.hash = "logreg";
        }
        
        this.render();
    }

    render() {
        this.innerHTML =`<favorite-delays class="favorite-delays"></favorite-delays>`;
    }
}