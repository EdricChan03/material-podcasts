import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { ITunesRssFeedSettings, ITunesRssFeedResult } from './itunes-rss.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/** Default settings to be used when creating an iTunes RSS feed. */
export const ITUNES_RSS_DEFAULT_SETTINGS = new InjectionToken<ITunesRssFeedSettings>('itunes-rss-default-settings');

@Injectable()
export class ItunesRssService {

  /** The base URL of an iTunes RSS feed. */
  readonly rssBaseUrl = 'https://rss.itunes.apple.com/api/v1';
  readonly corsAnywhereBaseUrl = 'https://cors-anywhere.herokuapp.com';
  constructor(
    private http: HttpClient,
    @Optional() @Inject(ITUNES_RSS_DEFAULT_SETTINGS) private defaultSettings?: ITunesRssFeedSettings
  ) { }

  /**
   * Creates a RSS feed URL from the iTunes RSS feed generator using the
   * specified settings.
   * @param feedSettings Settings used for the API.
   * @param useCorsAnywhere Whether to use CORS anywhere. (`true` by default)
   * @returns The generated RSS feed URL.
   */
  createRssFeedUrl(feedSettings?: ITunesRssFeedSettings, useCorsAnywhere: boolean = true): string {
    let settings: ITunesRssFeedSettings;
    if (this.defaultSettings !== null) {
      if (feedSettings !== null) {
        settings = { ...this.defaultSettings, ...feedSettings };
      } else {
        settings = this.defaultSettings;
      }
    } else {
      settings = feedSettings;
    }

    const baseUrl = useCorsAnywhere ? `${this.corsAnywhereBaseUrl}/${this.rssBaseUrl}` : this.rssBaseUrl;

    return `${baseUrl}/${settings.country}/${settings.mediaType}/` +
      `${settings.feedType}/${settings.genre}/` +
      `${settings.resultsLimit ? settings.resultsLimit : 10}/` +
      `${settings.allowExplicit ? 'explicit' : 'non-explicit'}.${settings.format ? settings.format : 'json'}`;
  }

  /**
   * Creates a GET request for the RSS feed with the given options.
   * @param feedSettings Settings used for the API.
   * @param useCorsAnywhere Whether to use CORS anywhere. (`true` by default)
   * @returns An `Observable` of the HTTP request.
   */
  getRssFeedResults(feedSettings?: ITunesRssFeedSettings, useCorsAnywhere: boolean = true, ): Observable<ITunesRssFeedResult> {
    return this.http.get<ITunesRssFeedResult>(this.createRssFeedUrl(feedSettings, useCorsAnywhere));
  }
}
