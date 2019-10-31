import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItunesRssService } from '../../services/itunes-rss/itunes-rss.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  podcasts: Observable<any>;
  constructor(
    private iTunesRss: ItunesRssService
  ) {
    this.podcasts = this.iTunesRss.getRssFeedResults();
  }

  ngOnInit() {
  }

}
