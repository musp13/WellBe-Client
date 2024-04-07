import { TestBed } from '@angular/core/testing';

import { GetTherapistListService } from './get-therapist-list.service';

describe('GetTherapistListService', () => {
  let service: GetTherapistListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTherapistListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
