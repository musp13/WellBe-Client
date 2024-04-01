import { TestBed } from '@angular/core/testing';

import { TherapistLogoutService } from './therapist-logout.service';

describe('TherapistLogoutService', () => {
  let service: TherapistLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
