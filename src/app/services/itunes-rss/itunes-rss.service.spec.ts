import { TestBed } from '@angular/core/testing';

import { ItunesRssService } from './itunes-rss.service';

describe('ItunesRssService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItunesRssService = TestBed.get(ItunesRssService);
    expect(service).toBeTruthy();
  });
});
