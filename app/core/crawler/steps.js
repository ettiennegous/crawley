var visitedPages = new Array()
//self.importScripts('foo.js');
const Net = require('./net.js').Net
const StrHelper = require('../../support/strhelper.js').StrHelper
var net = new Net()
var currentStatus = null;

self.onmessage = function(e) {
    let action = e.data[0]
    let url = e.data[1]
    switch(action) {
        case 'Start':
            currentStatus = 'Running'
            self.crawlPages(url, [url])
        break;
        case 'Stop':
            currentStatus = 'Stopped'
        break;
    }
    self.postMessage('msg from worker');
};

self.crawlPages = function (baseURL, urlArray) {
    urlArray.forEach(function(url) {
      if(!visitedPages.includes(url)) {
        visitedPages.push(url);
        crawlPage(baseURL, url)
      }
    });
}

// function sleep(ms) {
//     var unixtime_ms = new Date().getTime();
//     while(new Date().getTime() < unixtime_ms + ms) {}
//   }
  
  
self.crawlPage = function(baseURL, url) {
    if(currentStatus == 'Running') {
        net.Crawl(baseURL, url, pageCrawlComplete)
    }
    else if(currentStatus == 'Stopped') {
        net.Skip(baseURL, url, pageCrawlComplete)
    }
    
}
  
 self.pageCrawlComplete = function(baseURL, url, content, status) {
    self.postMessage(['CrawlComplete', url, status]);
    //currentThreadCount--
    var linksArray = StrHelper.cleanLinks(baseURL, StrHelper.splitLines(content))
    crawlPages(baseURL, linksArray)
  
 }