/*   import  function searchWithGeolocalization
*/
import moment from "moment";
import { getInputCoordinates, getUserCoordinates } from "./geographics";

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
                getInputCoordinates(inputFields[i].value);
                printQuery(inputFields[i].value);
            });

            inputFields[i].addEventListener('input', function(event) {
                event.preventDefault();
                //console.log(inputFields[i].value);
            });

            gpsButtons[i].addEventListener('click', function(event){
                event.preventDefault();
                //inputFields[i].value = "";
                getUserCoordinates();
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

// function that takes the query inserted in the <input>, or the one calculated with geolocation; then it prints it

export function printQuery(input) {
    return queryOutputElement.innerHTML =  "Weather in " + input + ". " + searchTime();
}


// creation of elements and animations of the site

// chance to save favourite cities, and see their forecast directly

// background color based on hour/season/weather

