import { printQuery } from "./index";

// script that processes the weather data, which will be exported in index.js in order to create the elements
const geoKey = process.env.GEO_KEY;

export function gpsSearch() { // function that obtains the geolocation coordinates of the user
    let position = navigator.geolocation;
    position.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log(lat +", "+ lon);
        getUserLocation(lat, lon);
    }, function(error) {
        console.warn(error.message);
    });    
}

// reverse geolocation with the coordinates (it obtains the geographic infos)

async function getUserLocation(lat, lon) {
    let url = "https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + lon + "&key=" + geoKey + "language=en";
    let city, state, country;
    let resultsArray = [];

    fetch(url)
    .then(response => response.json())
    .then(data => {
        resultsArray = data.results[0].components;
        console.log(resultsArray);
        city = resultsArray.village;
        state = resultsArray.state;
        country = resultsArray.country;
        printQuery(city + ", " + state + ", " + country);
    })
    .catch(error => console.warn(error));
}

// output of the data in dynamic elements