import { ThreadPool } from './ThreadPool';
import { WorkerTask } from './workertask';
import * as Enums from './enums';
import { CrawlResult } from './crawl.result';
import { WWReq, IWWRes } from './webworker.parameters'

export class Crawler { 
    TotalCount: number;
    CompleteCount: number;
    ThreadCount: number;
    BaseURL: string;
    ThreadPool: ThreadPool;
    StepsState: Enums.AppState; 
    CrawlResults: CrawlResult[];

    constructor(ThreadCount : number, BaseURL : string, crawlResults : CrawlResult[]) {
        this.TotalCount = 0
        this.CompleteCount = 0
        this.ThreadCount = ThreadCount;
        this.initThreadPool()
        this.BaseURL = BaseURL;
        this.CrawlResults = crawlResults;    
    }

    initThreadPool() : void {
        this.ThreadPool = new ThreadPool(this.ThreadCount)
        this.ThreadPool.init()
    }

    start(url) {
        this.StepsState = Enums.AppState.running
        this.crawlPages([url])
    }
    
    pause() {
        this.StepsState = Enums.AppState.stopped
        this.emptyThreadPool()
        //logger.updateEntries(Enums.ResultState.pending, Enums.ResultState.paused)
    }

    resume() {
        this.StepsState = Enums.AppState.running
        //var urls = logger.findUrlsOfStatus(Enums.ResultState.paused)
        //urls.forEach(function(url){
        //    logger.updateEntry(url, Enums.ResultState.pending, '')
        //    this.crawlPage(url)
        //}.bind(this)) 
    }


    reset() {
        this.emptyThreadPool()
        this.CrawlResults = [];
    }

    emptyThreadPool() {
        this.ThreadPool.clear();
    }


    crawlPages(urlArray) {       
        urlArray.forEach(function (url) {
            
            if (!this.CrawlResultsContain(url) && this.StepsState == Enums.AppState.running) {
                this.TotalCount++
                this.createCrawlEntry(url);
                this.crawlPage(url)
            }
        }, this);
    
    }

    CrawlResultsUpdate(args: IWWRes) : void {
        this.CrawlResults.map((crawlResult: CrawlResult) => {
            if(crawlResult.url === args.url)
            {
                crawlResult.httpCode = args.status;
                crawlResult.status = Enums.ResultState.done;
            }
            return crawlResult;
        });
        let a = 1;
    }

    CrawlResultsContain(url: string) : boolean {
        return this.CrawlResults.filter((crawlResult: CrawlResult) => crawlResult.url === url).length > 0;
    }


    createCrawlEntry(url: string) : void {
        var cr = new CrawlResult();
        cr.httpCode = "";
        cr.status = Enums.ResultState.pending;
        cr.url = url;
        this.CrawlResults.push(cr);
    }

    crawlPage(url) {
        if (this.ThreadPool) {
            var workerTask = new WorkerTask(this.pageCrawlComplete.bind(this), new WWReq(url, this.BaseURL ));//);
            this.ThreadPool.addWorkerTask(workerTask);
        }
    }

    pageCrawlComplete(event: IWWRes) {
        this.CrawlResultsUpdate(event);
        this.CompleteCount++
        //logger.updateEntry(args.url, Enums.ResultState.done, args.statusCode)
        //logger.updateStats(this.TotalCount, this.CompleteCount)
        //var linksArray = StrHelper.cleanLinks(args.BaseURL, StrHelper.getLinksFromContent(args.content))
        //this.crawlPages(linksArray)
    } 


}
