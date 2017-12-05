import { TestBed, inject } from '@angular/core/testing';

import { StrHelperService } from './str-helper.service';

describe('StrHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrHelperService]
    });
  });

  it('should be created', inject([StrHelperService], (service: StrHelperService) => {
    expect(service).toBeTruthy();
  }));
});
