import { TestBed } from '@angular/core/testing';

import { AddrequirementService } from './addrequirement.service';

describe('AddrequirementService', () => {
  let service: AddrequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddrequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
