import { ThreadPool } from './core/ThreadPool';
import { WorkerTask } from './core/workertask';
import * as Enums from './core/enums';
import { CrawlResult } from './core/crawl.result';
import { WWReq, IWWRes } from './core/webworker.parameters'
import { Injectable } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { StrHelperService } from './str-helper.service';

@Injectable()
export class CrawlerService {

  TotalCount: number;
  CompleteCount: number;
  ThreadCount: number;
  BaseURL: string;
  ThreadPool: ThreadPool;
  StepsState: Enums.AppState;
  CrawlResults: CrawlResult[];
  dataChange: EventEmitter<CrawlResult[]> = new EventEmitter();

  constructor(private strHelperService: StrHelperService) { }

  setup(ThreadCount: number, BaseURL: string, crawlResults: CrawlResult[]) {
    this.TotalCount = 0
    this.CompleteCount = 0
    this.ThreadCount = ThreadCount;
    this.initThreadPool()
    this.BaseURL = BaseURL;
    this.CrawlResults = crawlResults;
  }

  initThreadPool(): void {
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
    this.CrawlResultsStatusUpdate(Enums.ResultState.pending, Enums.ResultState.paused);
  }

  resume() {
    this.StepsState = Enums.AppState.running
    var urls = this.CrawlResultsOfStatus(Enums.ResultState.paused);
    urls.forEach((crawlResult: CrawlResult) => {
        this.CrawlResultStatusUpdate(crawlResult.url, Enums.ResultState.paused, Enums.ResultState.pending);
        this.crawlPage(crawlResult.url)
    })
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

  CrawlResultsCompleteUpdate(args: IWWRes): void {
    this.CrawlResults.map((crawlResult: CrawlResult) => {
      if (crawlResult.url === args.url) {
        crawlResult.httpCode = args.status;
        crawlResult.status = Enums.ResultState.done;
      }
      return crawlResult;
    });
    this.dataChange.emit(this.CrawlResults);
  }

  CrawlResultStatusUpdate(url: string, fromStatus: Enums.ResultState, toStatus: Enums.ResultState): void {
    this.CrawlResults.map((crawlResult: CrawlResult) => {
      if ((crawlResult.url === url || url == null) && crawlResult.status == fromStatus) {
        crawlResult.status = toStatus;
      }
      return crawlResult;
    });
    this.dataChange.emit(this.CrawlResults);
  }

  CrawlResultsStatusUpdate(fromStatus: Enums.ResultState, toStatus: Enums.ResultState): void {
    this.CrawlResultStatusUpdate(null, fromStatus, toStatus);
  }

  CrawlResultsOfStatus(desiredStatus: Enums.ResultState) : CrawlResult[] {
    return this.CrawlResults.filter((crawlResult: CrawlResult) => { return crawlResult.status === desiredStatus;});
  }


  CrawlResultsContain(url: string): boolean {
    return this.CrawlResults.filter((crawlResult: CrawlResult) => crawlResult.url === url).length > 0;
  }


  createCrawlEntry(url: string): void {
    var cr = new CrawlResult();
    cr.httpCode = "";
    cr.status = Enums.ResultState.pending;
    cr.url = url;
    this.CrawlResults.push(cr);
  }

  crawlPage(url) {
    if (this.ThreadPool) {
      var workerTask = new WorkerTask(this.pageCrawlComplete.bind(this), new WWReq(url, this.BaseURL));//);
      this.ThreadPool.addWorkerTask(workerTask);
    }
  }

  pageCrawlComplete(event: IWWRes) {
    this.CrawlResultsCompleteUpdate(event);
    var linksArray = this.strHelperService.cleanLinks(event.baseURL, this.strHelperService.getLinksFromContent(event.html))
    this.crawlPages(linksArray)
  }



}
