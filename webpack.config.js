const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // creates
    plugins: [ // adding the .env thai contains the API key
        new Dotenv(
            {
                path: 'weather.env'
            }
        )
    ],
    output: {
        filename: 'main.js', // bundle, the HTML loads this script
        path: path.resolve(__dirname, 'dist')
    }
}