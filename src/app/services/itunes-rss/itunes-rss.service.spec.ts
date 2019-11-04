import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ITunesRssFeedSettings } from './itunes-rss.model';
import { ItunesRssService, ITUNES_RSS_DEFAULT_SETTINGS } from './itunes-rss.service';

describe('ItunesRssService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      ItunesRssService
    ]
  }));

  it('should be created', () => {
    const service: ItunesRssService = TestBed.get(ItunesRssService);
    expect(service).toBeTruthy();
  });

  describe('#createRssFeedUrl', () => {
    beforeEach(() => TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
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
    }));

    it('should create an RSS feed URL with the default settings', () => {
      const service: ItunesRssService = TestBed.get(ItunesRssService);

      const baseUrl = `${service.corsAnywhereBaseUrl}/${service.rssBaseUrl}`;
      expect(service.createRssFeedUrl()).toBe(`${baseUrl}/us/podcasts/` +
      `top-podcasts/all/` +
      `10/explicit.json`);
    });

    it('should create an RSS feed URL with the specified settings and CORS Anywhere', () => {
      const service: ItunesRssService = TestBed.get(ItunesRssService);

      const baseUrl = `${service.corsAnywhereBaseUrl}/${service.rssBaseUrl}`;
      const options: ITunesRssFeedSettings = {
        country: 'country',
        feedType: 'feed-type',
        mediaType: 'media-type',
        genre: 'genre',
        resultsLimit: 1,
        allowExplicit: false,
        format: 'rss'
      };
      const nonExplicit = 'non-explicit';

      expect(service.createRssFeedUrl(options)).toBe(`${baseUrl}/${options.country}/${options.mediaType}/` +
      `${options.feedType}/${options.genre}/` +
      `${options.resultsLimit}/${nonExplicit}.${options.format}`);
    });

    it('should create an RSS feed URL with the specified settings without CORS Anywhere', () => {
      const service: ItunesRssService = TestBed.get(ItunesRssService);

      const baseUrl = `${service.rssBaseUrl}`;
      const options: ITunesRssFeedSettings = {
        country: 'country',
        feedType: 'feed-type',
        mediaType: 'media-type',
        genre: 'genre',
        resultsLimit: 1,
        allowExplicit: false,
        format: 'rss'
      };
      const nonExplicit = 'non-explicit';
      const useCorsAnywhere = false;

      expect(service.createRssFeedUrl(options, useCorsAnywhere)).toBe(`${baseUrl}/${options.country}/${options.mediaType}/` +
      `${options.feedType}/${options.genre}/` +
      `${options.resultsLimit}/${nonExplicit}.${options.format}`);
    });
  });
});
