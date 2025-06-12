import delays from "../models/delay.js";

export default class StationDelays extends HTMLElement {

    constructor() {
        super();

        this.delays = [];
        this.stations = [];
        this.innerHTML = "";
    }


    // component attributes
    static get observedAttributes() {
        return ['station'];
    }

    get station() {
        return this.getAttribute("station");
    }

    // connect component
    async connectedCallback() {

        let html = "";

        this.stations = await delays.stationNames();
        this.delays = await delays.favoriteDelay(this.station);
        if (this.delays.length === 0) {
            html = `<p class="no-margin">Inga rapporterade förseningar</p>`;            
        } else {
            for (const delay of this.delays) {   
                if (!delay.ToLocation){
                    delay.ToLocation = [{"LocationName": "Okänt"}];
                    }
                if (delay.ToLocation[0].LocationName && this.stations[delay.ToLocation[0].LocationName]) {
                    delay.ToLocation[0].LocationName = this.stations[delay.ToLocation[0].LocationName]
                }
                let adTime = new Date(delay.AdvertisedTimeAtLocation);
                let estTime = new Date(delay.EstimatedTimeAtLocation);



                html += `<div class="fav-container">
                                    <div class="fav-item ad-time">${adTime.toLocaleString("sv-SE", {hour: '2-digit', minute: '2-digit' })}</div>
                                    <div class="fav-item to-station">Mot ${delay.ToLocation[0].LocationName}</div></div>
                                    
                                    <div class="fav-container">
                                    <div class="fav-item est-time">${estTime.toLocaleString("sv-SE", {hour: '2-digit', minute: '2-digit' })}</div>
                                    <div class="fav-item train-no">Tåg ${delay.OperationalTrainNumber}</div></div><hr class = "station-line">`;        
            
                
            }
        }
        this.innerHTML=html;
    }
}
