

export default class UseView extends HTMLElement {  

    constructor() {
        super();

        this.train = "";
    }

    // component attributes
    static get observedAttributes() {
        return ['train'];
    }

    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this[property] = newValue;
    }
    
    
    
    
    // connect component
    connectedCallback() {

        this.innerHTML =`<use-map train=${this.train}></use-map>`;
    }
}