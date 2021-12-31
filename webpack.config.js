const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './assets/scripts/index.js', //* creates the bundle from this file. At every change, run npm start to update the bundle
    output: {
        filename: 'main.js', //* bundle that the HTML loads
        path: path.resolve('assets', 'dist') //* directory name and the folder where we're going to save the bundle
    },
    plugins: [ //* adding the .env that contains the API key
        new Dotenv(
            {
                path: './assets/.env'
            }
        )
    ]
}