/*
    import function search
    import  function searchWithGeolocalization
*/

// handling the various elements

const forms = document.getElementsByName("form");
const geoButtons = document.querySelectorAll(".gps-btn");
const searchButtons = document.querySelectorAll(".search-btn");
const inputFields = document.querySelectorAll(".search-input");
const queryResults = document.querySelector(".results");

// assigning the event listeners to every form and button

window.onload = function() {
    for (let i = 0; i < forms.length; i++) { // i=0: elements in navbar form; i=1: elements in homepage form
        if(!forms[i].classList.contains('disabled')) {
            forms[i].addEventListener('submit', function(event) {
                event.preventDefault();
                queryResults.firstElementChild.innerHTML = inputFields[i].value;
                /*  function in weather.js that takes the input, processes it with the API and prints it
                    
                */
            });
        }
    }
};

    

   /*  searchButtons[i].addEventListener('click', function(event) {
        // function that posts the input
        // queryResults.firstElementChild.innerHTML = inputFields[1].value;
    });

    geoButtons[i].addEventListener('click', function(event){
        // function that finds the coordinates, and posts the matching city
    }); */


/* for (let i = 0; i < searchButtons.length; i++) {
    const search = searchButtons[i]; 
    search.addEventListener('click', function(event) {
        // function that posts the input
    });

    const geo = geoButtons[i];
    geo.addEventListener('click', function(event){
        // function that finds the coordinates, and posts the matching city
    });
} */
function inputTextSearch() {
    
}

// creation of elements and animations of the site

// chance to save favourite cities, and see their forecast directly

// background color based on hour/season/weather

