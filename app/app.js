//> killall phantomjs

const Phantom = require('./core/crawler/phantom.js').Phantom
const StrHelper = require('./support/strhelper.js').StrHelper
const Steps = require('./core/crawler/steps.js').Steps

const outputElem = $('#output')
var phantom = new Phantom()
var steps = null
var startButton = $('#btnStart')
var resetButton = $('#btnReset')
var body = $('#body')
var URL = $('#url')
$('[data-toggle="tooltip"]').tooltip()

//status = stopped, running, paused, completed
//btn = start, pause, resume, done

const appState = {
  stopped: "stopped", 
  running: "running",
  resume: "resume",
  paused: "paused",
  completed: "completed"
};

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
  
  if(app.status == appState.stopped) {
    changeAppState(appState.running)
  } 
  else if(app.status == appState.running) {
    changeAppState(appState.paused)
  }
  else if(app.status == appState.paused) {
    changeAppState(appState.resume)
  } 
})

resetButton.click(function() {
  steps.reset()
  app.status = appState.stopped;
  startButton.val(btnState.start)
})

function changeAppState(targetState) {
  switch(targetState)
  {
    case appState.running:
      steps = new Steps(getThreadCount(), URL.val())
      app.status = appState.running
      steps.start(URL.val())
      startButton.val(btnState.pause)
    break;
    case appState.paused:
      app.status = appState.paused
      steps.pause()
      startButton.val(btnState.resume)

    break;
    case appState.resume:
      app.status = appState.running
      steps.resume()
      startButton.val(btnState.pause)

    break;
    case appState.completed:
      app.status = appState.completed
      startButton.val(btnState.done)
    break;

  }
  body.attr('class', app.status)
}

function getThreadCount() {
  return $('#threads').val();
}



