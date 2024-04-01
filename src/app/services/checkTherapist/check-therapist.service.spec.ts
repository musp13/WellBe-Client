import { TestBed } from '@angular/core/testing';

import { CheckTherapistService } from './check-therapist.service';

describe('CheckTherapistService', () => {
  let service: CheckTherapistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckTherapistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
