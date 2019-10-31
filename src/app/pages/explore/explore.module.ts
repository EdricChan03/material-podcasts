import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GridModule } from '@angular/flex-layout/grid';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ItunesRssService, ITUNES_RSS_DEFAULT_SETTINGS } from '../../services/itunes-rss/itunes-rss.service';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule
];

@NgModule({
  declarations: [ExploreComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GridModule,
    MATERIAL_MODULES,
    ExploreRoutingModule
  ],
  providers: [
    ItunesRssService,
    {
      provide: ITUNES_RSS_DEFAULT_SETTINGS, useValue: {
        country: 'us',
        feedType: 'top-podcasts',
        mediaType: 'podcasts',
        genre: 'all',
        resultsLimit: 10,
        allowExplicit: true,
        format: 'json'
      }
    }
  ]
})
export class ExploreModule { }
