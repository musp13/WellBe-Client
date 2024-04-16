import { TestBed } from '@angular/core/testing';

import { GetJournalsService } from './get-journals.service';

describe('GetJournalsService', () => {
  let service: GetJournalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetJournalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
