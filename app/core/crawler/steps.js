const Logger = require('../../support/logger.js').Logger
const Net = require('./net.js').Net
const StrHelper = require('../../support/strhelper.js').StrHelper

var net = new Net()
var logger = new Logger()
var currentStatus = null;

class Steps {

    start(url) {
        this.crawlPages(url, [url])  
        this.currentStatus = 'Running' 
        this.totalCount = 0
        this.completeCount = 0 
    }

    stop(url) {
        this.currentStatus = 'Stopped'
    }

    crawlPages(baseURL, urlArray) {
        urlArray.forEach(function(url) {
            if(!logger.entryExists(url)) {
                this.totalCount++
                logger.createEntry(url)
                this.crawlPage(baseURL, url)
            }
        }, this);
    }
      
    crawlPage(baseURL, url) {
        net.Crawl(baseURL, url, this.pageCrawlComplete.bind(this))
        /*if(this.currentStatus == 'Running') {
            net.Crawl(baseURL, url, this.pageCrawlComplete)
        }
        else if(this.currentStatus == 'Stopped') {
            net.Skip(baseURL, url, this.pageCrawlComplete)
        }*/
    }
      
     pageCrawlComplete(baseURL, url, content, responseCode) {
        this.completeCount++
        logger.updateEntry(url, 'complete', responseCode)
        logger.updateStats(this.totalCount, this.completeCount)
        var linksArray = StrHelper.cleanLinks(baseURL, StrHelper.splitLines(content))
        this.crawlPages(baseURL, linksArray)
        
      
     }
}

exports.Steps = Steps;