import Router from "./router.js";
import auth from "./models/auth.js";


export default class Navigation extends HTMLElement {
    constructor() {
        super();

        this.router = new Router();
        this.currentRoute = "";
    }

    // connect component
    connectedCallback() {
    window.addEventListener('hashchange', () => {
        this.render();
    });

    this.render();
    }

    render() {      
        const routes = this.router.routes;

        let navigationLinks = "";

        for (let path in routes) {
            if (routes[path].hidden === true) {
                continue;
            }
            if (routes[path].auth && !auth.token) {
                continue;
            }
            this.currentRoute = location.hash.replace("#", "");
            let splitHash = this.currentRoute.split("/");
        
            if (this.currentRoute.includes("/")) {
                this.currentRoute = splitHash[0];
            }

            if (path === this.currentRoute) {
                navigationLinks += `<a class= "nav active" href='#${path}'><img class="small-icon center" src="${routes[path].active}"><div class="center">${routes[path].name}</div></a>`;
            } else {navigationLinks += `<a class ="nav" href='#${path}'><img class="small-icon center" src="${routes[path].image}"><div class="center">${routes[path].name}</div></a>`;}            
        }
        
        this.innerHTML = `<nav class="bottom-nav">${navigationLinks}</nav>`;
    }
}