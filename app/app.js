const Logger = require('./support/logger.js').Logger
const URL = 'https://stackoverflow.com'
const {session} = require('electron').remote
const request = require('request')
const maxThreadCount = 2
const outputElem = document.getElementById("output")

var currentThreadCount = 0
var visitedPages = new Array()

var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path
var logger = new Logger()
console.log('Ett', logger)

var startButton = document.getElementById('btnStart')
startButton.addEventListener('click', function(){
  //Entry Point
  crawlPages([URL])
});


function crawlPages(urlArray) {
    urlArray.forEach(function(url) {
      if(!visitedPages.includes(url)) {
        visitedPages.push(url);
        crawlPage(url)
      }
    });
}

function sleep(ms) {
  var unixtime_ms = new Date().getTime();
  while(new Date().getTime() < unixtime_ms + ms) {}
}


function crawlPage(url) {

  if(currentThreadCount > maxThreadCount) {
      logger.logInfo(url, ' waiting')
      sleep(2000)
      crawlPage(url)
      
      
  }
  else 
  {
      currentThreadCount++
      logger.logInfo(url, ' start')
      phantomCrawl(url)
  }
    
}

function phantomCrawl(url)
{
  var childArgs = [path.join(__dirname, 'phantom_urls.js'), url]
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    //logInfo('Errors ' + err)
    //logInfo('Std Out' + stdout)
    logger.logInfo(url, ' done')
    currentThreadCount--
    var linksArray = cleanLinks(getLinks(stdout))
    crawlPages(linksArray)
  })    

}

function cleanLinks(linksArray) {
  return linksArray.filter(function(link) {
    link = link.toLowerCase()
    if(isEmptyLink(link)) return false
    if(!isValidLink(link, URL)) return false
    if(isTelephoneLink(link)) return false
    if(isExternalLink(link, URL)) return false

    return true
    
  }).map(function(link) {
    return prefixDomain(link, URL); 
  });
}

function prefixDomain(link, URL) {
  return (!link.startsWith("http")) ? URL + link : link
}

function isExternalLink(link, URL) {
  return link.startsWith("http") && !link.startsWith(URL);
}

function isValidLink(link, URL) {
  return link.startsWith("http") || isURL(URL + link)
}

function isTelephoneLink(link) {
  return link.startsWith('tel:')
}

function isEmptyLink(link) {
  return link.trim() == ''
}

function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

function getPageContent(url) {
  return '' 
}

function getLinks(content) {
  return content.split("\n")
}



// session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
//   details.requestHeaders['User-Agent'] = 'MyAgent'
//   callback({cancel: false, requestHeaders: details.requestHeaders})
// })



// request('http://www.google.com', function (error, response, body) {
//   logInfo('error:', error); // Print the error if one occurred
//   logInfo('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   logInfo('body:', body); // Print the HTML for the Google homepage.
// });

// const {remote} = require('electron')
// const {BrowserWindow} = require('electron')
// const app = remote.app
// const dialog = remote.dialog
// 


// logInfo(BrowserWindow);
//logInfo(remote.session.defaultSession.webRequest)
// var worker = new Worker('./app/web-worker.js')
// worker.postMessage(remote.session.defaultSession.webRequest)
// worker.onmessage = function (event) {
//   document.getElementById("body").innerHTML += event.data
// };