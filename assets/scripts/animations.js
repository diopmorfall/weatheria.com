//todo: home disappears and main is shown with the results
    //todo: put the data in the right place
//todo: main has the right background-image
//todo: the weather icon is right for the weather
//todo: handling images (small ones under 900px, then the big ones)

import { citySuggestions } from "./dom-elements";

export function showCitiesList(list){
    citySuggestions.style.opacity = 1; //todo: fade in
    citySuggestions.innerHTML = "";
    list.forEach(city => {
        citySuggestions.innerHTML += `<p class="city-option">${city}</p>`;
    });
}