import { TestBed } from '@angular/core/testing';

import { TherapistAvailabilityService } from './therapist-availability.service';

describe('TherapistAvailabilityService', () => {
  let service: TherapistAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
