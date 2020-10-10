import moment from "moment";
import { getInputCoordinates, getUsersGeolocation } from "./geographics";

// elements

const form = document.querySelector(".city-input");
const gpsButton = document.querySelector(".gps-btn");
const searchButton = document.querySelector(".search-btn");
const inputField = document.querySelector(".search-input");
const queryOutputElement = document.getElementById("query");
const cardSelectors = document.querySelector(".fore-selectors").children;
const forecastCards = document.querySelectorAll(".fore-card");
const detailButton = document.getElementById("details-btn");
const detailIconButton = detailButton.firstElementChild;
const detailsContainer = document.getElementById("details-data");
const detailsCards = document.querySelectorAll(".det-card");

// assigning the event listeners

window.onload = function() {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        getInputCoordinates(inputField.value);
        //printQuery(inputField[i].value);
    });

    gpsButton.addEventListener('click', function(event){
        event.preventDefault();
        //inputField[i].value = "";
        getUsersGeolocation();
    });

    for (let i = 0; i < cardSelectors.length; i++) {
        cardSelectors[i].addEventListener('click', function(event) {
            event.preventDefault();
            handleForecastCards(i);
        })
    }

    detailButton.addEventListener('click', function(event) {
        event.preventDefault();
        showHideDetails();
    })
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

function handleForecastCards (i) {
    cardSelectors[i].style.border = "1px dotted orange";
    cardSelectors[i].style.borderBottom = "none";
    for (let j = 0; j < cardSelectors.length; j++) {
        if(j !== i) {
            cardSelectors[j].style.border = "none";
            cardSelectors[j].style.borderBottom = "1px dotted orange";
        }
    }
}

function showHideDetails () {
    detailIconButton.classList.contains("rotated") ?
        (detailsContainer.style.display = "none",
        detailIconButton.classList.remove("rotated")) :
        (detailsContainer.style.display = "flex",
        detailIconButton.classList.add("rotated"));
}

// creation of elements and animations of the site

// chance to save favourite cities, and see their forecast directly

// background color based on hour/season/weather

