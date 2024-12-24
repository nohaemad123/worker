import { TestBed } from '@angular/core/testing';

import { BasicServicesService } from './basic-services.service';

describe('BasicServicesService', () => {
  let service: BasicServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
