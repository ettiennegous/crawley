//> killall phantomjs

const Logger = require('./support/logger.js').Logger
const Phantom = require('./core/crawler/phantom.js').Phantom
const StrHelper = require('./support/strhelper.js').StrHelper
const maxThreadCount = 2
const outputElem = document.getElementById('output')

var currentThreadCount = 0

var phantom = new Phantom()
var logger = new Logger()

var startButton = document.getElementById('btnStart')
var URL = document.getElementById('url')
var myWorker = new Worker('./app/core/crawler/steps.js');

var appState = {
  status: 'Stopped'
}

startButton.addEventListener('click', function() {
  if(appState.status == 'Stopped' || appState.status == 'Paused') {
    appState.status = 'Running'
    myWorker.postMessage(['Start', URL.value])  
  }
  else {
    appState.status = 'Stopped'
    myWorker.postMessage(['Stop', URL.value])  
  }

  startButton.value = appState.status == 'Stopped' ? 'Start' : 'Stop'

});


myWorker.onmessage = function(e) {
  let event = e.data[0] 
  let url = e.data[1]
  let status = e.data[2]
  logger.logInfo(url, status)
}

myWorker.onerror = function(e,b){
  console.log('Shared Web Worker Error', e,b);
}
