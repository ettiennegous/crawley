//> killall phantomjs
const Logger = require('./support/logger.js').Logger
const PhantomRequests = require('./support/phantomrequests.js').PhantomRequests
const CWebRequests = require('./support/webrequests.js').CWebRequests
const StrHelper = require('./support/strhelper.js').StrHelper
//const URL = 'https://stackoverflow.com'
const URL = 'http://www.theage.com.au/'
const maxThreadCount = 2
const outputElem = document.getElementById('output')

var currentThreadCount = 0
var visitedPages = new Array()
var logger = new Logger()
var phantomRequests = new PhantomRequests()
var webRequests = new CWebRequests()
var strHelper = new StrHelper()

var startButton = document.getElementById('btnStart')

startButton.addEventListener('click', function(){
  //Entry Point
  startButton.innerText = 'Stop'
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

  // if(currentThreadCount > maxThreadCount) {
  //     logger.logInfo(url, ' waiting')
  //     sleep(2000)
  //     crawlPage(url)
  // }
  // else 
  // {
  //     currentThreadCount++
  //     logger.logInfo(url, ' start')
  //     //phantomCrawl(url)
  //     webRequestCrawl(url)
  // }
  //phantomRequests.phantomCrawl(url)
  webRequests.webRequestCrawl(url, pageCrawlComplete)
}

function crawlComplete(err, stdout, stderr) {
  pageCrawlComplete(url, stdout)
}


function pageCrawlComplete(url, content)
{
  logger.logInfo(url, ' done')
  currentThreadCount--
  var linksArray = strHelper.cleanLinks(URL, strHelper.splitLines(content))
  crawlPages(linksArray)

}

