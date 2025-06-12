import delays from "../models/delay.js";

export default class StationList extends HTMLElement {
    constructor() {
        super();

        this.stations = {};
    }

    // connect component
    async connectedCallback() {

        this.stations = await delays.AddFavoriteStations();
        this.render();
    }

    render() {
        let list = ""
        for (const key in this.stations) {
            const station = this.stations[key];
            list += `<single-station class="single-station" station='${JSON.stringify(station)}'>
                    </single-station><hr class = "station-line">`
        }

        this.innerHTML = `<h4 class="station-view">Favoriter</h4><p class="discrete">Stjärnmärk dina favoritstationer</p></h4><h4>Stationer</h4>${list}`;
    }
}