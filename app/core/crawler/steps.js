const Logger = require('../../support/logger.js').Logger
const StrHelper = require('../../support/strhelper.js').StrHelper
const ThreadPool = require('../../support/threadpool.js').ThreadPool
const WorkerTask = require('../../support/workertask.js').WorkerTask
var logger = new Logger()
const rowState = {
    pending: "pending", 
    paused: "paused",
    error: "error",
    done: "done"
  };
  
const StepsState = {
    running: 'running', 
    stopped: 'stopped'
}

class Steps {

    constructor(threadCount, baseURL) {
        this.totalCount = 0
        this.completeCount = 0
        this.threadCount = threadCount;
        this.initThreadPool()
        this.baseURL = baseURL;
    }

    start(url) {
        this.stepsState = StepsState.running
        this.crawlPages([url])
    }

    pause() {
        this.stepsState = StepsState.stopped
        this.emptyThreadPool()
        logger.updateEntries(rowState.pending, rowState.paused)
    }

    resume() {
        this.stepsState = StepsState.running
        var urls = logger.findUrlsOfStatus(rowState.paused)
        urls.forEach(function(url){
            logger.updateEntry(url, rowState.pending, '')
            this.crawlPage(url)
        }.bind(this)) 
    }


    reset() {
        this.emptyThreadPool()
        logger.resetResults()
        logger.updateStats(0, 0)

    }

    emptyThreadPool() {
        this.threadPool.clear();
    }

    initThreadPool() {
        this.threadPool = new ThreadPool(this.threadCount)
        this.threadPool.init()
    }

    crawlPages(urlArray) {       
        urlArray.forEach(function (url) {
            
            if (!logger.entryExists(url) && this.stepsState == StepsState.running) {
                this.totalCount++
                logger.updateStats(this.totalCount, this.completeCount)
                logger.createEntry(url)
                this.crawlPage(url)
            }
        }, this);
    
    }

    crawlPage(url) {
        if (this.threadPool) {
            var workerTask = new WorkerTask('./app/core/crawler/worker.js', this.pageCrawlComplete.bind(this), { url: url, baseURL: this.baseURL });
            this.threadPool.addWorkerTask(workerTask);
        }
    }

    pageCrawlComplete(event) {
        var args = event.data;
        this.completeCount++
        logger.updateEntry(args.url, rowState.done, args.statusCode)
        logger.updateStats(this.totalCount, this.completeCount)
        var linksArray = StrHelper.cleanLinks(args.baseURL, StrHelper.getLinksFromContent(args.content))
        this.crawlPages(linksArray)


    }
}

exports.Steps = Steps;