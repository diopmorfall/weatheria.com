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

export function getUserCoordinates() { // function that obtains the geolocation coordinates of the user
    let position = navigator.geolocation;
    position.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        // console.log(lat +", "+ lon);
        getUserLocation(lat, lon);
        //getCityWeather(lat, lon);
        // coordinates that have to be passed to the weather API
    }, function(error) {
        console.warn(error.message);
    });    
}

// reverse geolocation with the coordinates (it gets the geographic infos)

async function getUserLocation(lat, lon) {
    let query = lat + "+" + lon + "&key=" + geoKey + "language=en";
    fetch(queryUrlBuilder(url, query))
    .then(response => response.json())
    .then(data => {
        let results = data.results[0].components;
        let city = results.village;
        let state = results.state;
        let country = results.country;
        printQuery(city + ", " + state + ", " + country);
    })
    .catch(error => console.warn(error));
}

// function that returns lat and lon from user's input

export async function getInputCoordinates(input) {
    let query = input.replace(/ /g, "+") + "&key=" + geoKey + "language=en";
    
    fetch(queryUrlBuilder(url, query))
    .then(response => response.json())
    .then(data => {
        resultsFilter(data, input);
    })
    .catch(error => console.warn(error));
    // coordinates that have to be passed to the weather API
}

// how to filter each result ? City and type fields in array response

function resultsFilter(data, input) {
    let results = data.results;
    let formatted, type, category, city;
    for(let i = 0; i < results.length; i++) {
        formatted = results[i].formatted;
        type = results[i].components._type;
        category = results[i].components._category;
        city = results[i].components.city;
        //if((formatted.search(/input/i) && type == "city") || (formatted.search(/input/i) && category == "place")) {   
        if (input.search(/city/i) && category == "place") {    
            console.log(results[i]);
        }
    }
}

// output of the data in dynamic elements