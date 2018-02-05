const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')

console.log("WEBPACK_TYPE", process.env.WEBPACK_TYPE);


let outputPath;

if (process.env.WEBPACK_TYPE === 'browser_test') outputPath = 'browser/browser-bundle.js';
else if (process.env.WEBPACK_TYPE === undefined) outputPath = 'browser/browser-bundle.js';

const config = merge(base, {
    target: 'web',

    node: {
        console: false,
        child_process: "empty",
        dgram: "empty",
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        uws: 'empty'
    },

    //define entry point
    entry: {
        app: "./src/build_browser.js",
    },
    output: {
        filename: outputPath,
    },
    resolve: {
        alias: { //see vue-Frontend for demo

        }
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: 'true'
            }
        })
    ]

});

module.exports = config