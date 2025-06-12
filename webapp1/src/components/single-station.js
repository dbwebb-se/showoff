import delays from "../models/delay.js";

export default class SingleStation extends HTMLElement {
    // component attributes
    static get observedAttributes() {
        return ['station'];
    }

    get station() {
        return JSON.parse(this.getAttribute("station"));
    }



    // connect component
    async connectedCallback() {
        this.innerHTML = `<div><p>${this.station.name}</p></div><div><p class="star">&#9734;</p></div>`;

        if (this.station.favorite) {
            this.innerHTML = `<div><p>${this.station.name}</p></div><div><p class="star">&#9733;</p></div>`;
        }

        this.addEventListener("click", async () => {
            let updatedStation = {}
            if (this.station.favorite) {
                await delays.deleteFavorite(this.station.favorite);
                updatedStation = {
                    ...this.station,
                    favorite: false}
                this.innerHTML = `<div><p>${this.station.name}</p></div><div><p class="star">&#9734;</p></div>`;
            } else {

                let stationId = await delays.setFavorite(this.station.signature);
                updatedStation = {
                    ...this.station,
                    favorite: stationId}
                this.innerHTML = `<div><p>${this.station.name}</p></div><div><p class="star">&#9733;</p></div>`;
            }

        this.setAttribute('station', JSON.stringify(updatedStation))
        });
    }
}