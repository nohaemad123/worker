import { TestBed } from '@angular/core/testing';

import { NavigationPramesService } from './navigation-prames.service';

describe('NavigationPramesService', () => {
  let service: NavigationPramesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationPramesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
