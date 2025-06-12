import auth from "./auth.js";

const traffic = {
    
    delays: async function delays() {
        const response = await fetch("https://trafik.emilfolino.se/delayed");
        const result = await response.json();

        return result.data;
    },
    apiStations: async function apiStations() {
        const response = await fetch("https://trafik.emilfolino.se/stations");
        const result = await response.json();

        return result;
    },
    stations: async function stations() {
        const result = await this.apiStations();
        
        let stations = {};
        for (const station of result.data) {

            let wgs84 = station.Geometry.WGS84;
            let cleanPos = wgs84.replace(/POINT \(|\)/g, "");
            let position = cleanPos.split(" ");

            stations[station.LocationSignature] = {name: station.AdvertisedLocationName,
                pos: [ parseFloat(position[1]), parseFloat(position[0]) ]}
        }
        return stations;
    },
    getTrain: async function getTrain(number) {
        let delays = await this.delays();
        let thisTrain = delays.filter((train) => train.OperationalTrainNumber === number);

        return thisTrain[0];
    },
    time: function time(aTime, cTime) {

        let time = {};
        time["adTime"] = new Date(aTime);
        time["estTime"] = new Date(cTime);
        time["delay"] = parseInt((time["estTime"]-time["adTime"])/60000);
        time["distance"] = ((time.delay - 5)/2) * 100; 

        return time;
    },
    setFavorite: async function setFavorite(station) {
        let favorite = {
            artefact: station,
            api_key: "a658b6a81142e8f9075c70c7b744b441"
        }

        const response = await fetch("https://auth.emilfolino.se/data", {
            body: JSON.stringify(favorite),
            headers: {
              'content-type': 'application/json',
              'x-access-token': auth.token
            },
            method: 'POST'
           });             
        const result = await response.json();
        return result.data.id;


        },
    AddFavoriteStations: async function AddFavoriteStations() {

        let result = await this.apiStations();
        let stations = {};

        for (const station of result.data) {
            if (!station.LocationSignature.includes(".")) {
            stations[station.LocationSignature] = {name: station.AdvertisedLocationName, signature: station.LocationSignature, favorite: false};
            }
        }

        let response = await fetch("https://auth.emilfolino.se/data?api_key=a658b6a81142e8f9075c70c7b744b441", {
            headers: {
                'content-type': 'application/json',
                'x-access-token': auth.token
              },
        });
        result = await response.json();

        for (const favorite of result.data) {
            stations[favorite.artefact].favorite = favorite.id;
        }
        return stations;
    },
    deleteFavorite: async function deleteFavorite(id) {
        let deleteFavorite = {
            id: id,
            api_key: "a658b6a81142e8f9075c70c7b744b441"
        }

        let response = await fetch("https://auth.emilfolino.se/data", {
            body: JSON.stringify(deleteFavorite),
            headers: {
                'content-type': 'application/json',
                'x-access-token': auth.token
              },
            method: 'DELETE'
        });
        return response.status;
    },
    stationNames: async function stationNames() {
        const stations = await this.apiStations();
        let stationNames = {}
        for (const station of stations.data) {
            let newSignature = station.LocationSignature.replace('"', '');
            stationNames[newSignature] = station.AdvertisedLocationName;
        }

        return stationNames;
    },
    favoriteDelay: async function favoriteDelay(station) {
        const delays = await this.delays();

        let favoriteDelay = delays.filter((delay) => delay.LocationSignature === station);
        
        return favoriteDelay;
    },

    favoriteList: async function favoriteList() {
        const response = await fetch("https://auth.emilfolino.se/data?api_key=a658b6a81142e8f9075c70c7b744b441", {
            headers: {
                'content-type': 'application/json',
                'x-access-token': auth.token
              },
        });
        const result = await response.json();
        let favorites = []

        for (const favorite of result.data) {
            favorites.push(favorite.artefact);
        }
        return favorites;
    }  

};

export default traffic;