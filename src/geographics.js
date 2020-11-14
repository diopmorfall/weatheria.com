import { printQuery } from "./index";
import { getCityWeather } from "./weather";

// script that processes the geographic stuff 
const geoKey = process.env.GEO_KEY;
let url = "https://api.opencagedata.com/geocode/v1/json?q=";

export function queryUrlBuilder (url, query) {
    let finalUrl = url + query;
    // console.log(finalUrl);
    // console.log(finalUrl.length);
    return finalUrl;
}

export function getUsersGeolocation() { // function that obtains the geolocation coordinates of the user
    let position = navigator.geolocation;
    let lat, lon;
    let options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };
    
    position.getCurrentPosition(function(pos) {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        //console.log(lat +", "+ lon);
        //console.log(pos.coords.accuracy);
        getCityWithCoordinates(lat, lon);
        getCityWeather(lat, lon);
        // coordinates that have to be passed to the weather API
    }, function(error) {
        console.warn(error.message);
    }, options);    
}

// reverse geolocation with the coordinates (it gets the geographic infos)

async function getCityWithCoordinates(lat, lon) {
    let query = lat + "+" + lon + "&key=" + geoKey + "&language=en";
    fetch(queryUrlBuilder(url, query))
    .then(response => response.json())
    .then(data => {
        let results = data.results[0].components;
        console.log(results);
        let city = results.city;
        let state = results.state;
        let country = results.country;
        printQuery(city + ", " + state + ", " + country);
    })
    .catch(error => console.warn(error));
}

// function that returns lat and lng from user's input

export async function getInputCoordinates(input) {
    let query = input.replace(/ /g, "%20") + "&key=" + geoKey + "&language=en&limit=1";
    
    fetch(queryUrlBuilder(url, query))
    .then(response => response.json())
    .then(data => {
        searchResultsFilter(data, input);
    })
    .catch(error => console.warn(error));
    // coordinates that have to be passed to the weather API
}

// how to filter each result ? City and type fields in array response

function searchResultsFilter(data, input) {
    let results = data.results;
    let category, city, country, formatted, lat, lon;
    
    for(let i = 0; i < results.length; i++) {
        category = results[i].components._category;
        city = results[i].components.city;
        country = results[i].components.country;
        formatted = results[i].formatted;
        if(city) {
            printQuery(city + ", " + country);
        } else if (input.search(/city/i) && category == "place") {
            printQuery(formatted);
        }

        lat = results[i].geometry.lat;
        lon = results[i].geometry.lng;
        //console.log(lat +", "+ lon);
        getCityWeather(lat, lon);
    }
}


// output of the data in dynamic elements