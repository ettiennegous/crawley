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
  

class Steps {

    constructor(threadCount) {
        this.totalCount = 0
        this.completeCount = 0
        this.threadCount = threadCount;
        this.threadPool = new ThreadPool(this.threadCount)
        this.threadPool.init()
        console.log(threadCount)
    }

    start(url) {
        this.crawlPages(url, [url])
    }

    stop(url) {

    }

    reset() {
        this.threadPool = null;
        this.threadPool = new ThreadPool(this.threadCount)
        this.threadPool.init()
        logger.resetResults()
        logger.updateStats(0, 0)

    }

    crawlPages(baseURL, urlArray) {
        urlArray.forEach(function (url) {
            if (!logger.entryExists(url)) {
                this.totalCount++
                logger.updateStats(this.totalCount, this.completeCount)
                logger.createEntry(url)
                this.crawlPage(baseURL, url)
            }
        }, this);
    }

    crawlPage(baseURL, url) {
        if (this.threadPool) {
            var workerTask = new WorkerTask('./app/core/crawler/worker.js', this.pageCrawlComplete.bind(this), { url: url, baseURL: baseURL });
            this.threadPool.addWorkerTask(workerTask);
        }
    }

    pageCrawlComplete(event) {
        var args = event.data;
        this.completeCount++
        logger.updateEntry(args.url, rowState.done, args.statusCode)
        logger.updateStats(this.totalCount, this.completeCount)
        var linksArray = StrHelper.cleanLinks(args.baseURL, StrHelper.getLinksFromContent(args.content))
        this.crawlPages(args.baseURL, linksArray)


    }
}

exports.Steps = Steps;