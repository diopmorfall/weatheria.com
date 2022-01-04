import { urlBuilder, debounceFunction } from "./tools";
import { showCitiesList } from "./animations";
import { getCityWeather, getTimezone } from "./weather";

// script that processes the geographic stuff 
const geoKey = process.env.GEO_KEY;
let url = "https://api.opencagedata.com/geocode/v1/json?q=";

export async function provideSuggestions(input){
    if(input == "") return;

    //console.log(input);
    let response = await fetch(url + input.replace(/ /g, "%20") + "&key=" + geoKey + "&language=en");
    let jsonResponse = await response.json();
    //todo: fetch function that returns the response

    console.log(jsonResponse);

    let citiesSuggested = [];
    if(jsonResponse.total_results == 0){
        console.warn("No results, check if the city is correct");
        //todo: handle error (maybe a dinamic div ?)
    }
    
    for(let citySuggestion of jsonResponse.results){
        let cityDescription = citySuggestion?.formatted;
        let city = citySuggestion.components?.city;
        let village = citySuggestion.components?.village;
        let placeType = citySuggestion.components?._type;
        console.log(citySuggestion);

        let regex = new RegExp(`\\b${input}\\b`, "i");

        if((regex.test(cityDescription)) && (regex.test(city) || regex.test(village)) && (placeType == "city" || placeType == "village"))
            citiesSuggested.push(cityDescription);
    }
    console.log(citiesSuggested);

    showCitiesList(citiesSuggested);
}

provideSuggestions = debounceFunction(provideSuggestions, 600);

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
        getCityFromCoordinates(lat, lon);
        getCityWeather(lat, lon); // coordinates passed to the weather API
    }, function(error) {
        console.warn(error.message);
    }, options);    
}

// reverse geolocation with the coordinates (it gets the geographic infos)

async function getCityFromCoordinates(lat, lon) {
    let query = lat + "+" + lon + "&key=" + geoKey + "&language=en";
    fetch(urlBuilder(url, query))
    .then(response => response.json())
    .then(data => {
        //todo: shall we make our own city object ?
        let results = data.results[0].components;
        //console.log(data.results[0].annotations.timezone);
        let city = results.city;
        let village = results.village;
        let state = results.state;
        let country = results.country;
        getTimezone(data.results[0].annotations.timezone.offset_sec);
        if(city) {
            printQuery(city + ", " + state + ", " + country);
        } else if (village) {
            printQuery(village + ", " + state + ", " + country);
        }
    })
    .catch(error => console.warn(error));
}

// function that returns lat and lng from user's input

export async function getInputCoordinates(input) {
    let query = input.replace(/ /g, "%20") + "&key=" + geoKey + "&language=en&limit=1";
    
    fetch(queryUrlBuilder(url, query))
    .then(response => response.json())
    .then(data => {
        resultsFilter(data, input);
    })
    .catch(error => console.warn(error));
    // coordinates that have to be passed to the weather API
}

// how to filter each result ? City and type fields in array response

function resultsFilter(data, input) { //todo:; this will be replaced by the suggestion box I think
    let results = data.results;
    let category, city, country, formatted, lat, lon;
    //console.log(data.results[0].annotations.timezone);
    
    //for(let i = 0; i < results.length; i++) { // api limited to 1 result, so it's not necessary to iterate
        category = results[0].components._category;
        city = results[0].components.city;
        country = results[0].components.country;
        formatted = results[0].formatted;
        getTimezone(results[0].annotations.timezone.offset_sec);
        if(city) {
            printQuery(city + ", " + country);
        } else if (input.search(/city/i) && category == "place") {
            printQuery(formatted);
        }

        lat = results[0].geometry.lat;
        lon = results[0].geometry.lng;
        //console.log(lat +", "+ lon);
        getCityWeather(lat, lon);
    //}
}


// output of the data in dynamic elements