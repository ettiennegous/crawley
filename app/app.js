//> killall phantomjs

const Phantom = require('./core/crawler/phantom.js').Phantom
const StrHelper = require('./support/strhelper.js').StrHelper
const ThreadPool = require('./support/threadpool.js').ThreadPool
const WorkerTask = require('./support/workertask.js').WorkerTask
const Steps = require('./core/crawler/steps.js').Steps

const outputElem = $('#output')
var phantom = new Phantom()
var steps = new Steps()
var startButton = $('#btnStart')
var URL = $('#url').val()

var appState = {
  status: 'Stopped'
}

startButton.click(function() {
  if(appState.status == 'Stopped' || appState.status == 'Paused') {
    appState.status = 'Running'
    steps.start(URL)
  }
  else {
    appState.status = 'Stopped'
    steps.stop(URL)
  }

  startButton.value = appState.status == 'Stopped' ? 'Start' : 'Stop'

});


