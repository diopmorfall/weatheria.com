const headerForm = document.querySelector(".header-city-form");
const gpsButtons = document.querySelectorAll(".gps-btn");
const inputFields = document.querySelectorAll(".search-input");
const settingsIcon = document.querySelector(".settings-icon");


const settingsMenu = document.querySelector(".settings");
//todo: add manageable options for temperature and wind speed

const homepageForm = document.querySelector(".home-form");
const citySuggestions = document.querySelector(".suggestions");

const resultsContainer = document.querySelector("main");

const queryOutputElement = document.getElementById("query");
const currentWeatherSection = document.querySelector(".current-weather");
//todo: how to manage data- attributes (time of search, degrees and feels like)

const weatherDetails = currentWeather.children[1];
const [weatherIcon, weatherText] = weatherDetails.children;

const timeSelectors = document.querySelector(".time-selectors").children;
//todo: let selectorsFlags = [true, false, false]; // to flag which selector is selected, 0 by default
const forecastCards = document.querySelectorAll(".data-card");

const detailButton = document.getElementById("details-btn");
const detailIconButton = detailButton.firstElementChild;
const detailsContainer = document.getElementById("details-data");
const detailsCards = document.querySelectorAll(".det-card");

//todo: I think they'll be exported later