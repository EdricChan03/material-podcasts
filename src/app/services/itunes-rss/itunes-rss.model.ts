/** Settings used for generating a RSS feed of the latest media. */
export interface ITunesRssFeedSettings {
  /** The country of origin to retrieve. */
  country: string;
  /** The feed type to retrieve. */
  feedType: string;
  /** The type of media to retrieve. */
  mediaType: string;
  /** The genre of media to retrieve. */
  genre: string;
  /** The maximum number of results to retrieve. */
  resultsLimit?: number;
  /** The format to retrieve the results in. */
  format?: 'json' | 'rss' | 'atom';
  /** Whether to allow explicit podcasts in the results. */
  allowExplicit?: boolean;
}

/** The result of an iTunes RSS feed. */
export interface ITunesRssFeedResult {
  feed?: ITunesRssFeedResultFeed;
  [key: string]: any;
}

export interface ITunesRssFeedResultFeed {
  title?: string;
  id?: string;
  author?: {
    name?: string;
    uri?: string;
  };
  links?: {
    self?: string;
    alternate?: string;
  }[];
  copyright?: string;
  country?: string;
  icon?: string;
  updated?: string;
  results?: ITunesRssFeedResultFeedResults[];
  [key: string]: any;
}

export interface ITunesRssFeedResultFeedResults {
  artistName?: string;
  id?: string;
  releaseDate?: string;
  name?: string;
  kind?: string;
  copyright?: string;
  artistId?: string;
  contentAdvisoryRating?: string;
  artistUrl?: string;
  artworkUrl100?: string;
  genres?: ITunesRssFeedResultFeedResultsGenre[];
  url?: string;
  [key: string]: any;
}

export interface ITunesRssFeedResultFeedResultsGenre {
  genreId?: string;
  name?: string;
  url?: string;
}
