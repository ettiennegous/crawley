//> killall phantomjs
const Logger = require('./support/logger.js').Logger
const Net = require('./core/crawler/net.js').Net
const Phantom = require('./core/crawler/phantom.js').Phantom
const StrHelper = require('./support/strhelper.js').StrHelper
const maxThreadCount = 2
const outputElem = document.getElementById('output')

var currentThreadCount = 0
var visitedPages = new Array()
var logger = new Logger()
var phantom = new Phantom()
var net = new Net()

var startButton = document.getElementById('btnStart')
var URL = document.getElementById('url')

startButton.addEventListener('click', function() {
  startButton.value = 'Stop'
  crawlPages(URL.value, [URL.value])
});

function crawlPages(baseURL, urlArray) {
    urlArray.forEach(function(url) {
      if(!visitedPages.includes(url)) {
        visitedPages.push(url);
        crawlPage(baseURL, url)
      }
    });
}

function sleep(ms) {
  var unixtime_ms = new Date().getTime();
  while(new Date().getTime() < unixtime_ms + ms) {}
}


function crawlPage(baseURL, url) {
  net.Crawl(baseURL, url, pageCrawlComplete)
}

function pageCrawlComplete(baseURL, url, content) {
  logger.logInfo(url, ' done')
  currentThreadCount--
  var linksArray = StrHelper.cleanLinks(baseURL, StrHelper.splitLines(content))
  crawlPages(baseURL, linksArray)

}