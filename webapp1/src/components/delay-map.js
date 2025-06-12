/* global L */
import delays from "../models/delay.js";
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";


export default class DelayMap extends HTMLElement {
    constructor() {
        super();

        this.map = null;
        this.delays = {};
        this.trains = {}
        this.info = "";
        this.stations = {};
    }

    async connectedCallback() {

        this.delays = await delays.delays();
        this.stations = await delays.stations();

        const socket = io("https://trafik.emilfolino.se");

        socket.on("position", (data) => {

            this.updateMarkers(data);
        });

        this.innerHTML = `<div id="map" class="map-all"></div>`;

        this.renderMap();
    }

    renderMap() {
        this.map = L.map('map', {zoomControl: false}).setView([62.2315, 16.1932], 4);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.renderLocation();
        this.renderMarkers();
        
    }


    // Ritar ut alla pågående förseningar
    async renderMarkers() {
        let position = [];
        let toStation = "";
        let info = "";
        let time = {};

        let marker = L.icon({
            iconUrl:      "marker.png",
            iconSize:     [20, 20],
            iconAnchor:   [10, 10],
            popupAnchor:  [0, 0]
        });
        
        for (const train of this.delays) {

            if (!this.trains[train.OperationalTrainNumber]) {
                    try {
                        position = this.stations[train.LocationSignature].pos;
                    } catch {
                        if (!this.stations[train.LocationSignature]) {
                                // console.log("Tåget kunde ej ritas ut. " + train.LocationSignature + " finns inte med i /stations");
                            continue;
                        }     
                    }          
                    
                    try {
                        toStation = this.stations[train.ToLocation[0].LocationName].name;
                    } catch {
                        toStation = "<i>information saknas</i>"
                    }

                    time = delays.time(train.AdvertisedTimeAtLocation, train.EstimatedTimeAtLocation);
                    
                    info = `<b>${this.stations[train.LocationSignature].name}</b><br>
                            Tåg ${train.OperationalTrainNumber} mot ${toStation}<br>
                            <b>Ordinarie tid:</b><br>${time["adTime"].toLocaleString("sv-SE", {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}<br>
                            <b>Beräknad tid:</b><br>${time["estTime"].toLocaleString("sv-SE", {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}<br>
                            <b>Försening:</b><br>${time["delay"]} minuter<br>
                            <a href='#use-delay/${train.OperationalTrainNumber}'>Använd tiden</a>`;

                    this.trains[train.OperationalTrainNumber] = L.marker(position, {icon: marker}).bindPopup(info).addTo(this.map);
                }
            }
    }

    updateMarkers(data) {       
        try {
            this.trains[data.train].setLatLng(data.position);

        } catch {
            // if (!this.trains[data.train]){
            //     console.log(`Tåg ${data.train} var inte försenat förut, eller så fanns inte LocationSignature i stationslistan. Ladda om sidan för att se uppdaterade förseningar.`)
            // }
        }
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