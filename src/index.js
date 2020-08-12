/* import _ from 'lodash'; // this file depends on this dependency to be included in the page before it loads
// it isn't immediatly apparent, that's a problem. Added with npm install --save lodash (bundling)
function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' '); // lodash allows to run this line
    return element;
}

document.body.appendChild(component()); */
alert("Funz");
