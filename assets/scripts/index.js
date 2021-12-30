//todo: this should only import all the files and combine them all; used as the entry point

import moment from "moment";

import { forms, gpsButtons, searchButtons, inputFields } from "./dom-elements";

import { getInputCoordinates, getUsersGeolocation } from "./geographics";

//todo: import elements
window.onload = function(){
    //todo: search the city after 1 second that the user stops typing, and provide 5 best suggestions (debounce)
    forms.forEach(addEventListener('submit', (event) => {
        event.preventDefault();
        //getInputCoordinates(inputField.value);
        console.log(event.target);
    }));

    searchButtons.forEach(addEventListener("click", (event) => {
        event.preventDefault();
        console.log(event.target);
        //getInputCoordinates(inputField.value);
        //todo: submit the parent form no ?
    }));

    gpsButtons.forEach(
        addEventListener('click', (event) =>{
            event.preventDefault();
            console.log(event.target);
            //getUsersGeolocation();
            //todo: getUserLocation()
    }));

    for (let i = 0; i < cardSelectors.length; i++) {
        cardSelectors[i].addEventListener('click', (event) => {
            event.preventDefault();
            selectSelector(i);
        });
    }

    detailButton.addEventListener('click', (event) => {
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

// function that takes the query inserted in the <input>, or the one calculated with geolocation; then it prints it

export function printQuery(input) {
    return queryOutputElement.textContent =  "Weather in " + input + ".<br/><br/>" + searchTime();
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

