export const headerBrand = document.querySelector("header > .brand");
export const settingsIcon = document.querySelector(".settings-icon");

export const settingsMenu = document.querySelector(".settings");
//todo: add manageable options for temperature and wind speed

export const citySuggestions = document.querySelector(".suggestions");
export const cityOptions = document.querySelectorAll(".city-option");

export const form = document.forms[0];
export const inputField = form.children[0];
export const gpsButton = form.children[1];

export const resultsContainer = document.querySelector("main");

//export const queryOutputElement = document.getElementById("query");
export const currentInfos = document.querySelector(".cw-details");
//todo: how to manage data- attributes (time of search, degrees and feels like)

export const weatherDetails = document.querySelector(".weather-details");
export const [weatherIcon, weatherName] = weatherDetails.children;

export const timeSelectors = document.querySelector(".time-selectors").children;
//todo: let selectorsFlags = [true, false, false]; // to flag which selector is selected, 0 by default
export const forecastCards = document.querySelectorAll(".data-card");

export const detailButton = document.getElementById("details-btn");
export const detailIconButton = detailButton.firstElementChild;
export const detailsContainer = document.getElementById("details-data");
export const detailsCards = document.querySelectorAll(".det-card");

//todo: I think they'll be exported later