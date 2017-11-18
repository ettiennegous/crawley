//> killall phantomjs

const Phantom = require('./core/crawler/phantom.js').Phantom
const StrHelper = require('./support/strhelper.js').StrHelper
const Steps = require('./core/crawler/steps.js').Steps

const outputElem = $('#output')
var phantom = new Phantom()
var steps = null
var startButton = $('#btnStart')
var resetButton = $('#btnReset')
var URL = $('#url').val()
$('[data-toggle="tooltip"]').tooltip()

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
}

var app = {
  status: appState.stopped
}

startButton.click(function() {
  changeAppState()
})

resetButton.click(function() {
  steps.reset()
  app.status = appState.stopped;
  startButton.val(btnState.start)
})

function changeAppState() {
  if(app.status == appState.stopped) {
    steps = new Steps(getThreadCount())
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
}

function getThreadCount() {
  return $('#threads').val();
}
// To be incorporated later
// else if(app.status == appState.completed) {
//   app.status = appState.completed
//   startButton.val(btnState.done)
// }


