# Node-RaiLight [![Build Status](https://travis-ci.org/RaiLight/Node-RaiLight.svg)](https://travis-ci.org/RaiLight/Node-RaiLight)
# Webstorm ES6 

Settings => Languages & Frameworks => JavaScript language version and choose **ECMAScript 6**

![JS Version](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2015/05/js-version.png "Javascript ECMAScript 6 config")

# Installing

## 0. Node.js

Windows: just download and install from URL: https://nodejs.org/en/download/

Linux: tutorial how to install Node.js using NVM (recommended) [Install Node.js using NVM](/docs/InstallDebian.md) 

## 1. Cloning Repository 
```
git clone https://github.com/RaiLightNetwork/Node-RaiLight.git Node-RaiLight
```
## 2. Installing modules
`cd Node-RaiLight` to enter in the downloaded folder of the repository   
```
npm install
```

###In case you will get errors: 
## 3. **node-gyp**

In case your will get errors from **node-gyp** especially for **webrtc** 

#### 3.1 node-gyp on Windows
open a Command Prompt with **Administrator rights**

```
cd C:\Path\To\Node-RaiLight\
npm install --global --production windows-build-tools                                    
npm install
```


## Testing in console
Mocha Tests
```
npm test                                                       
```


#### Missing Packages or Errors
Obs. In case there you get an error message about some missing packages like the following one:

``` Error: Cannot find module 'name_missing_package' ```

just, run ```npm install name_missing_package```

## Building Dist

### Building Dist for Browser (browserify)

```
npm run build_browser
```

#### Building Dist for Browser TEST (dist_bundle/browser/browser.html)

```
npm run test_browser
```

open web page `dist_bundle/browser/browser.html`

We use browserify

```
npm install -g browerfiy
browserify dist/index.js > dist_bundle/bundle.js
npm install bufferutil utf-8-validate
``` 
