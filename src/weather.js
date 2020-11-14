// script that processes the weather data, which will be exported in index.js in order to create the elements

import { queryUrlBuilder } from "./geographics";

const weatherKey = process.env.OWMKEY2;
let url = "https://api.openweathermap.org/data/2.5/onecall?";
let url2 = "https://api.openweathermap.org/data/2.5/forecast?";

export async function getCityWeather(lat, lon) {
    let query = "lat=" + lat + "&lon=" + lon + "&units=metric&exclude=minutely&appid=" + weatherKey;
    //console.log(queryUrlBuilder(url, query));

    fetch(queryUrlBuilder(url, query))
    .then(response => response.json())
    .then(data => {
        console.log(data);
        analyzeFetchedData(data);
    })
    .catch(error => console.warn(error));
}

function analyzeFetchedData(data) { //function that separates the data
    let current = data.current;
    let daily = data.daily;
    let hourly = data.hourly;
    console.table(current);
    console.log(daily);
    console.log(hourly);
}