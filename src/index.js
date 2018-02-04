if(( typeof window !== 'undefined' && !window._babelPolyfill) ||
    ( typeof global !== 'undefined' && !global._babelPolyfill)) {
    require('babel-polyfill')
}

console.log(""); console.log(""); console.log("");
console.log("Node RaiLight");
console.log(""); console.log(""); console.log("");

let Main = require('./main.js').default;

let exportObject = Main;



// Export RaiLight
module.exports =  exportObject;

/*
    Export the RaiLight to Browser
 */

//browser minimized script
if ( typeof global.window !== 'undefined')
    global.window.RaiLight = exportObject;

if ( typeof window !== 'undefined')
    window.RaiLight = exportObject;


console.log("Node RaiLight End");

