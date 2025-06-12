

export default class AboutView extends HTMLElement {
    // connect component
    connectedCallback() {

        this.innerHTML =`<div class ="about"><h2>Om applikationen</h2>
                        <p>Den här sidan är skapad som slutprojekt
                        i kursen Webapp. <a href="https://dbwebb-webapp.github.io/kmom10">Här finns mer information</a></p>
                        <p>Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a></p></div>`;
    }
}