import { TestBed } from '@angular/core/testing';

import { NavigationUrlService } from './navigation-url.service';

describe('NavigationUrlService', () => {
  let service: NavigationUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
