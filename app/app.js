//> killall phantomjs

const Phantom = require('./core/crawler/phantom.js').Phantom
const StrHelper = require('./support/strhelper.js').StrHelper
const Steps = require('./core/crawler/steps.js').Steps

const outputElem = $('#output')
const threadCount = 60
var phantom = new Phantom()
var steps = new Steps(threadCount)
var startButton = $('#btnStart')
var URL = $('#url').val()

//status = stopped, running, paused, completed
//btn = start, pause, resume, done

const appState = Object.freeze({
  stopped: Symbol("stopped"), 
  running: Symbol("running"),
  paused: Symbol("paused"),
  completed: Symbol("completed")
});

const btnState = {
  start: "start", 
  pause: "pause",
  resume: "resume",
  done: "done"
};

var app = {
  status: appState.stopped
}

startButton.click(function() {
  changeAppState()
});

function changeAppState() {
  if(app.status == appState.stopped) {
    app.status = appState.running
    steps.start(URL)
    startButton.val(btnState.pause)
  
  } 
  else if(app.status == appState.running) {
    app.status = appState.paused
    steps.stop(URL)
    startButton.val(btnState.resume)
  }
  else if(app.status == appState.paused) {
    app.status = appState.running
    startButton.val(btnState.running)
  }
  else if(app.status == appState.completed) {
    app.status = appState.completed
    startButton.val(btnState.done)
  }
}


