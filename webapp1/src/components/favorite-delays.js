import delays from "../models/delay.js";

export default class FavoriteDelays extends HTMLElement {
    constructor() {
        super();

        this.favorites = [];
        this.stationNames = [];
    }

    // connect component
    async connectedCallback() {

       await this.render();
    }

    async render() {

        this.favorites = await delays.favoriteList();
        this.stationNames = await delays.stationNames();

        if (this.favorites.length > 0) {
            let list = ""
            for (const station of this.favorites) {
                list += `<h4 class="station-favorite">${this.stationNames[station]}</h4><station-delays class="station-delays" station='${station}'></station-delays>`
            }
            this.innerHTML = `<h2>Just nu</h2>${list}`;
        } else {
            this.innerHTML = `<h4 class="no-favorite">Du har inte lagt till några favoritstationer</h4>`
        }


    }
}