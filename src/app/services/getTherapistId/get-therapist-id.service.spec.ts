import { TestBed } from '@angular/core/testing';

import { GetTherapistIdService } from './get-therapist-id.service';

describe('GetTherapistIdService', () => {
  let service: GetTherapistIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTherapistIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
