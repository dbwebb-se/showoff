/* global L */
import delays from "../models/delay.js";


export default class UseMap extends HTMLElement {
    constructor() {
        super();

        this.train = "";
        this.trainData = {};
        this.stations = {};
        this.currentStation = {};
        this.time = {}      
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

    async connectedCallback() {

        try {
            this.trainData = await delays.getTrain(this.train);
            this.stations = await delays.stations();
            this.currentStation = this.stations[this.trainData.LocationSignature];
            this.time = await delays.time(this.trainData.AdvertisedTimeAtLocation, this.trainData.EstimatedTimeAtLocation);

            let timeText = "Du hinner inte gå iväg från stationen."

            if (this.time.delay > 5) {
                timeText = `Du hinner gå ${this.time.distance} meter innan du behöver vända om.`
            }
            
            this.innerHTML = `<div class="back" id="back"><img src="./src/img/close.png"></div>
                            <div id="map" class="map-use"></div>
                            <div class="use-info"><h4 class>Tåg ${this.train}</h4>
                            <div class="time-container">
                            <div class="ad-time">${this.time.adTime.toLocaleString("sv-SE", {hour: '2-digit', minute: '2-digit' })}</div>
                            <div class="est-time">${this.time.estTime.toLocaleString("sv-SE", {hour: '2-digit', minute: '2-digit' })}</div>
                            </div>
                            <p class="time-text">${timeText}</p></div>`;

            let backButton = document.getElementById("back");
            backButton.addEventListener("click", () => {
                location.hash = "";
            });


            this.renderMap();
        } catch {
            console.log("Nåt gick fel")
        }

        this.renderLocation();
    }



    renderMap() {
        this.map = L.map('map', {zoomControl: false}).setView(this.currentStation.pos, 14);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);

        this.renderLocation();
        if (this.time.delay > 5) {
                this.renderCircle();
        }
    }

    async renderCircle() {
        L.circle(this.currentStation.pos, {
            color: '#1BBD0F',
            fillColor: '#1BBD0F',
            fillOpacity: 0.3,
            radius: this.time.distance
        }).addTo(this.map);        
    }

    renderLocation() {
        let locationMarker = L.icon({
            iconUrl:      "location.png",
            iconSize:     [24, 24],
            iconAnchor:   [12, 12],
            popupAnchor:  [0, 0]
        });

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                L.marker(
                    [position.coords.latitude, position.coords.longitude],
                    {icon: locationMarker}
                ).addTo(this.map);
            });
        }
    }
}