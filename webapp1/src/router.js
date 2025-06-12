export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";
        this.wildcard = "";

        this.allRoutes = {
            "": {
                view: "<all-view></all-view>",
                name: "Tågkarta",
                image: "src/img/train.png",
                active: "src/img/trainblack.png"
            },
            "register": {
                view: "<register-form></register-form>",
                name: "Registrera användare",
                hidden: true,
            },
            "login": {
                view: "<login-view></login-view>",
                name: "Logga in",
                hidden: true,
            },
            "logreg": {
                view: "<loginreg-view></loginreg-view>",
                name: "Logga in/registrera",
                hidden: true,
            },
            "stations": {
                view: "<station-view class='margin'></station-view>",
                name: "Stationer",
                image: "src/img/user.png",
                active: "src/img/userblack.png"
            },
            "favorite": {
                view: "<favorite-view></favorite-view>",
                name: "Favoriter",
                image: "src/img/clock.png",
                active: "src/img/clockblack.png",
                auth: true
            },      
            "use-delay": {
                view: "<use-view train=$wildcard></use-view>",
                name: "Nyttja förseningen",
                hidden: true,
            },
            "about": {
                view: "<about-view></about-view>",
                name: "Om",
                image: "src/img/about.png",
                active: "src/img/aboutblack.png"
            },
        };
    }

    get routes() {
        return this.allRoutes;
    }

    // connect component
    connectedCallback() {
        window.addEventListener('hashchange', () => {
            this.resolveRoute();
        });

        this.resolveRoute();
    }

    resolveRoute() {
        let cleanHash = location.hash.replace("#", "");
        let splitHash = cleanHash.split("/");
        

        if (cleanHash.includes("/")) {
            this.currentRoute = splitHash[0];

            this.wildcard = splitHash[1];
        } else {
            this.currentRoute = splitHash;
        }

        this.render();
    }

    render() {
        let html = "<not-found></not-found>";

        if (this.routes[this.currentRoute]) {
            html = this.routes[this.currentRoute].view;
            
            if (this.wildcard) {
                html = html.replace("$wildcard", this.wildcard);
            }
        }
        this.innerHTML = html;
    }
}