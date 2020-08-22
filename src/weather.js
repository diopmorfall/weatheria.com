import moment from "moment";

// script that processes the weather data, which will be exported in index.js in order to create the elements
const apiKey = process.env.API_KEY;

// request of data

// function that formats the time of the search with Moment.js library

function searchTime() {
    let date = moment().format("dddd, MMMM Do YYYY");
    let time = moment().format("HH:mm:ss");
    return "Last update in " + date + " at "+ time + ". GMT "+ moment().format("Z");
}

// function that takes the data from the text input and prints it

export function textInputSearch(query){
    return("Weather in " + query + ". " + searchTime());
}

// output of the data in dynamic elements