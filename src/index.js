import moment from "moment";
import { getInputCoordinates, getUsersGeolocation } from "./geographics";

// weatherElements

const form = document.querySelector(".city-input");
const gpsButton = document.querySelector(".gps-btn");
const inputField = document.querySelector(".search-input");
const queryOutputElement = document.getElementById("query");
const currentWeather = document.querySelector(".current");
const degreesDetails = currentWeather.children[1];
const cardSelectors = document.querySelector(".fore-selectors").children;
let selectorsFlags = [true, false, false]; // to flag which selector is selected, 0 by default
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
    });

    gpsButton.addEventListener('click', function(event){
        event.preventDefault();
        getUsersGeolocation();
    });

    for (let i = 0; i < cardSelectors.length; i++) {
        cardSelectors[i].addEventListener('click', function(event) {
            event.preventDefault();
            selectSelector(i);
        });
    }

    detailButton.addEventListener('click', function(event) {
        event.preventDefault();
        detailIconButton.classList.contains("rotated") ? (
            detailsContainer.style.display = "none",
            detailIconButton.classList.remove("rotated")
        ) : (
            detailsContainer.style.display = "flex",
            detailIconButton.classList.add("rotated")
        );
    })
};

// function that formats the time of the search with Moment.js library

function searchTime() {
    let date = moment().format("dddd, MMMM Do YYYY");
    let time = moment().format("HH:mm:ss");
    return "Last update in " + date + " at "+ time + ". GMT "+ moment().format("Z");
}

export function queryUrlBuilder(url, query) { // function that builds the API url
    return url + query;
}

// function that takes the query inserted in the <input>, or the one calculated with geolocation; then it prints it

export function printQuery(input) {
    return queryOutputElement.innerHTML =  "Weather in " + input + ".<br/><br/>" + searchTime();
}

function selectSelector(i) {
    cardSelectors[i].classList.remove("not-selected");
    cardSelectors[i].classList.add("selected");
    selectorsFlags[i] = true;
    for (let j = 0; j < cardSelectors.length; j++) {
        if(j !== i) {
            cardSelectors[j].classList.remove("selected");
            cardSelectors[j].classList.add("not-selected");
            selectorsFlags[j] = false;
        }
    }
    eraseForecastData(i);
}

let selectorIndex;

function eraseForecastData(i) {

    for(let j = 0; j < forecastCards.length; j++){
        forecastCards[j].innerHTML = "";
    }
    //assignValues(forecastData[i], forecastCards); should run here
    selectorIndex = i;
}

export function getData(data, forecastData) {
    let weatherElements = [currentWeather.firstElementChild, currentWeather.lastElementChild];
    let elements = [weatherElements, degreesDetails.children, detailsCards];

    assignValues(forecastData[selectorsFlags.indexOf(true)], forecastCards);
    showData(data, elements);
}

function showData(data, elements) {
    for(let i = 0; i < data.length; i++) {
        assignValues(data[i], elements[i]);
    }
}

function assignValues(source, element) { // assigning each value to each element
    for(let i = 0; i < element.length; i++) {
        element[i].innerHTML = source[i];
    }
}

// creation of weatherElements and animations of the site

// background color based on hour/season/weather

