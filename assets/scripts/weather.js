// script that processes the weather data, which will be exported in index.js in order to create the elements

import { urlBuilder } from "./tools";
import moment from "moment";

const weatherKey = process.env.OWMKEY;
let url = "https://api.openweathermap.org/data/2.5/onecall?";

export async function getCityWeather(lat, lon) {
    let query = "lat=" + lat + "&lon=" + lon + "&units=metric&exclude=minutely&appid=" + weatherKey;
    //console.log(queryUrlBuilder(url, query));

    fetch(urlBuilder(url, query))
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        prepareData(data);
    })
    .catch(error => console.warn(error));
}

let current, daily, hourly, refinedData;

function prepareData(data) {
    current = data.current;
    daily = data.daily;
    hourly = data.hourly;
    refineData();
    refineForecastData();
}

function refineData() { // function that refines the data for showing
    let todayInfos = daily[0].temp;
    refinedData = [
        [
            refineTemperature(current.temp),
            current.weather[0].main
        ],
        [
            "Max: " + refineTemperature(todayInfos.max), //format
            "Min: " + refineTemperature(todayInfos.min),
            "Feels like: " + refineTemperature(current.feels_like),
        ],/*
        [  void array that'll be filled dynamically, inserting the data that will be shown in the forecast section ],*/
        [
            "Local sunrise: " + getSunTime(current.sunrise) +
                "<br/> Local sunset: " + getSunTime(current.sunset) +
                "<br/>Daylight hours: " + getSunlightHours(current.sunrise, current.sunset),
            "Wind comes from: " + current.wind_deg + ". Speed: " + current.wind_speed + "km/h",
            "Pressure: " + current.pressure + "hPa",
            "Humidity: " + current.humidity + "%",
            "Visibility: " + current.visibility + " m"
        ]
    ];
}

function refineForecastData() {
    let daySections = ["Morning","Afternoon","Evening","Night"];
    let temperatures = daily[0].temp, feels_like = daily[0].feels_like;
    delete temperatures.max;
    delete temperatures.min;
    temperatures = Object.values(temperatures);
    feels_like = Object.values(feels_like);
    pushData(daySections, temperatures, feels_like);
}

let forecastData = [ 
    [ /* today*/ ],
    [ /* next hours */ ],
    [ /* next days */ ]
];

function pushData(daySections, temperatures, feels_like) { // filling the array dynamically
    
    for(let i = 0; i < 4; i++) { 
        //todo: if I keep it, format it with this string type ``
        forecastData[0].push( // today
            "<h6>" + daySections[i] + "</h6>" +
            "<br/>Weather: " + daily[0].weather[0].main +
            "<br/>Temperature: " + refineTemperature(temperatures[i]) +
            "<br/>Feels like: " + refineTemperature(feels_like[i])
        );

        forecastData[1].push( // next hours
            "<h6>" + unixToHour(hourly[i+1].dt) + "</h6>" + 
            "<br/>Weather: " + hourly[i+1].weather[0].main +
            "<br/>Temperature: " + refineTemperature(hourly[i+1].temp) +
            "<br/>Feels like: " + refineTemperature(hourly[i+1].feels_like)
        );

        forecastData[2].push( // next days
            "<h6>" + unixToDate(daily[i+1].dt) +  "</h6>" +
            "<br/>Weather: " + daily[i+1].weather[0].main +
            "<br/>Max temperature: " + refineTemperature(daily[i+1].temp.max) +
            "<br/>Min temperature: " + refineTemperature(daily[i+1].temp.min)
        );
    }
    
    getData(refinedData, forecastData);
}

function refineTemperature(temp) {
    return temp + "°C";
}

let hour = new Date();
let localOffset = -(hour.getTimezoneOffset()); // time offset of the client
let queriedCityOffset;

export function getTimezone(offset) {
    console.log("Local offset: +" + localOffset);
    queriedCityOffset = offset / 60; // time offset of the searched city, divided by the number of minutes in an hour
    console.log("Offset minutes over there: " + queriedCityOffset);  //offset hours from greenwich
    getLocalHour(queriedCityOffset);
    //hour.setMinutes(hour.getMinutes() - localOffset + queriedCityOffset); substract local offset from the hour to get the hour of greenwich
    //console.log("Current hour over there: " + moment(hour).format("HH:mm"));  and then we sum it with the offset of the searched city
}

function getLocalHour(cityOffset) {
    hour.setMinutes(hour.getMinutes() - localOffset + cityOffset);
    console.log("Current hour over there: " + moment(hour).format("HH:mm"));

}

function unixToHour(unix) {
    return moment(unix * 1000).format("kk") + "h";
}

function unixToDate(unix) {
    return moment(unix * 1000).format("dddd, MMMM Do");
}

function getSunTime(unix) {
    let time = new Date(moment(unix * 1000));
    
    return moment(unix * 1000).format("HH:mm");
}

function getSunlightHours(sunrise, sunset) {
    sunrise = new Date(moment(sunrise * 1000));
    sunset = new Date(moment(sunset * 1000));
    sunrise.setMinutes(sunrise.getMinutes() - localOffset + queriedCityOffset);
    sunset.setMinutes(sunset.getMinutes() - localOffset + queriedCityOffset);
    console.log("Sunrise: " + moment(sunrise).format("HH:mm"));
    console.log("Sunset: " + moment(sunset).format("HH:mm"));
    let sunlight = new Date();
    sunlight.setHours(sunset.getHours() - sunrise.getHours());
    console.log("Sunlight hours: " + moment(sunlight).format("HH:mm"));
    return moment(sunlight).format("HH:mm");
}
