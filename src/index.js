/*   import  function searchWithGeolocalization
*/
import moment from "moment";
import { gpsSearch } from "./geographics";

// handling the various elements

const forms = document.getElementsByName("form");
const gpsButtons = document.querySelectorAll(".gps-btn");
const searchButtons = document.querySelectorAll(".search-btn");
const inputFields = document.querySelectorAll(".search-input");
const queryOutputElement = document.getElementById("query"); 

// assigning the event listeners to every form and button

window.onload = function() {
    for (let i = 0; i < forms.length; i++) { // i=0: elements in navbar form; i=1: elements in homepage form
        if(!forms[i].classList.contains('disabled')) {
            forms[i].addEventListener('submit', function(event) {
                event.preventDefault();
                printQuery(inputFields[i].value);
                // function in weather.js that takes the input, processes it with the API and prints it
            });

            // function that obtains the geolocalization
            gpsButtons[i].addEventListener('click', function(event){
                event.preventDefault();
                gpsSearch();
            });
        }
    }
};

// function that formats the time of the search with Moment.js library

function searchTime() {
    let date = moment().format("dddd, MMMM Do YYYY");
    let time = moment().format("HH:mm:ss");
    return "Last update in " + date + " at "+ time + ". GMT "+ moment().format("Z");
}

// function that takes the data from the text input and prints it

export function printQuery(input) {
    return queryOutputElement.innerHTML =  "Weather in " + input + ". " + searchTime();
}


// creation of elements and animations of the site

// chance to save favourite cities, and see their forecast directly

// background color based on hour/season/weather

