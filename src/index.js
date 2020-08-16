/* import _ from 'lodash'; // this file depends on this dependency to be included in the page before it loads
// it isn't immediatly apparent, that's a problem. Added with npm install --save lodash (bundling)
function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' '); // lodash allows to run this line
    return element;
}

document.body.appendChild(component()); */

// handling the various elements

const forms = document.getElementsByName("form");
const geoButton = document.querySelectorAll(".gps-btn");
const searchButton = document.querySelectorAll(".search-btn");
const input = document.querySelectorAll(".search-input");


for (let i = 0; i < forms.length; i++) {
    const form = forms[i];
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        document.querySelector(".results").firstElementChild.innerHTML = "";
        document.querySelector(".results").firstElementChild.innerHTML = forms[i].firstElementChild.value;
    });
}
for (let i = 0; i < searchButton.length; i++) {
    const geo = geoButton[i];
    const search = searchButton[i];
    geo.addEventListener('click', function(event){
        event.preventDefault();
        // function that finds the coordinates, and posts the matching city
        console.log(geoButton[i].innerHTML);
    });
    search.addEventListener('click', function(event){
        event.preventDefault();
        // function that posts the input
        console.log(this.parentNode);
        search.parentNode.dispatchEvent("submit");
    });
}

// creation of elements and animations of the site

// chance to save favourite cities, and see their forecast directly

// background color based on hour/season/weather

