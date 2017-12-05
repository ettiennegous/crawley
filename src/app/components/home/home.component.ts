import { Component, OnInit } from '@angular/core';
import * as Enums from '../../core/enums';
import { CrawlResult } from '../../core/crawl.result';
import { Crawler } from '../../core/crawler';

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
  Crawler: Crawler;
  URL: string = "http://www.test.com.au/";
  Threads: number = 1;
  CurrentProgress = 0;
  
  constructor() {

  }


  ngOnInit() {
    this.CurrentAppState = Enums.AppState.stopped
    this.CurrentBtnState = Enums.BtnState.start
    this.CurrentBtnIcon = Enums.BtnIcons.play
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
    this.Crawler.reset();
    this.CrawlResults = [];
    this.ngOnInit();
  }

  changeAppState(targetState :Enums.AppState) :void {
    switch(targetState)
    {
      case Enums.AppState.running:
        this.Crawler = new Crawler(this.Threads, this.URL, this.CrawlResults)
        this.CurrentAppState = Enums.AppState.running
        this.CurrentBtnState = Enums.BtnState.pause
        this.CurrentBtnIcon = Enums.BtnIcons.pause
        this.Crawler.start(this.URL)
      break;
      case Enums.AppState.paused:
        this.CurrentAppState = Enums.AppState.paused
        this.Crawler.pause()
        //startButton.val(btnState.resume)
        this.CurrentBtnState = Enums.BtnState.resume
        this.CurrentBtnIcon = Enums.BtnIcons.play
      break;
      case Enums.AppState.resume:
        this.CurrentAppState = Enums.AppState.running
        this.Crawler.resume()
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
