import auth from "../models/auth.js";

export default class StationView extends HTMLElement {
    // connect component
    connectedCallback() {
        if (!auth.token) {
            location.hash = "logreg";
        }
        
        this.render();
    }

    render() {
        this.innerHTML =`<station-list>`;
    }
}