import { TestBed } from '@angular/core/testing';

import { GetTherapistDetailsService } from './get-therapist-details.service';

describe('GetTherapistDetailsService', () => {
  let service: GetTherapistDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTherapistDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
