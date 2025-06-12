export default class AllView extends HTMLElement {
    // connect component
    
    connectedCallback() {

        this.innerHTML =`<delay-map></delay-map>`;
    }
}