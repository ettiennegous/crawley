import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as Enums from '../../core/enums';
import { CrawlResult } from '../../core/crawl.result';
import { CrawlerService } from '../../crawler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  title = 'Crawley';
  CurrentAppState: Enums.AppState;
  CurrentBtnState: Enums.BtnState;
  CurrentBtnIcon: Enums.BtnIcons;
  CrawlResults: CrawlResult[] = [];
  URL: string = "http://www.test.com.au/";
  Threads: number = 1;
  CompleteCount: number = 0;
  TotalCount: number = 0;
  CurrentProgressPerc: number = 0;
  
  constructor(
    private crawlerService: CrawlerService, 
    private ref: ChangeDetectorRef) {

  }


  ngOnInit() {
    this.CurrentAppState = Enums.AppState.stopped
    this.CurrentBtnState = Enums.BtnState.start
    this.CurrentBtnIcon = Enums.BtnIcons.play
    this.crawlerService.dataChange.subscribe(this.bindData.bind(this));
  }

  bindData(results: CrawlResult[]): void {
    this.CrawlResults = results;
    this.updateStats()
    this.ref.detectChanges();
  }

  updateStats() {
    this.TotalCount = this.CrawlResults.length;
    this.CompleteCount = this.crawlerService.CrawlResultsOfStatus(Enums.ResultState.done).length;
    this.CurrentProgressPerc = this.TotalCount > 0 ? ((this.CompleteCount / this.TotalCount) * 100) : 0;
  }

  startClick(): void {

    if (this.CurrentAppState == Enums.AppState.stopped) {
      this.changeAppState(Enums.AppState.running)
    }
    else if (this.CurrentAppState == Enums.AppState.running) {
      this.changeAppState(Enums.AppState.paused)
    }
    else if (this.CurrentAppState == Enums.AppState.paused) {
      this.changeAppState(Enums.AppState.resume)
    }

  }

  resetClick(): void {
    this.crawlerService.reset();
    this.CrawlResults = [];
    this.TotalCount = 0;
    this.CompleteCount = 0;
    this.CurrentProgressPerc = 0;
    this.ngOnInit();
  }

  changeAppState(targetState :Enums.AppState) :void {
    switch(targetState)
    {
      case Enums.AppState.running:
        this.crawlerService.setup(this.Threads, this.URL, this.CrawlResults)
        this.CurrentAppState = Enums.AppState.running
        this.CurrentBtnState = Enums.BtnState.pause
        this.CurrentBtnIcon = Enums.BtnIcons.pause
        this.crawlerService.start(this.URL)
      break;
      case Enums.AppState.paused:
        this.CurrentAppState = Enums.AppState.paused
        this.crawlerService.pause()
        this.CurrentBtnState = Enums.BtnState.resume
        this.CurrentBtnIcon = Enums.BtnIcons.play
      break;
      case Enums.AppState.resume:
        this.CurrentAppState = Enums.AppState.running
        this.crawlerService.resume()
        //startButton.val(btnState.pause)
        this.CurrentBtnState = Enums.BtnState.pause
        this.CurrentBtnIcon = Enums.BtnIcons.pause
  
      break;
      case Enums.AppState.completed:
        this.CurrentAppState = Enums.AppState.completed
        //startButton.val(btnState.done)
        this.CurrentBtnState = Enums.BtnState.done
        this.CurrentBtnIcon = Enums.BtnIcons.done
      break;
  
    }
    
  } 
}
