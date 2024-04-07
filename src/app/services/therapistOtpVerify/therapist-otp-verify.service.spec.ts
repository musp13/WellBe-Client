import { TestBed } from '@angular/core/testing';

import { TherapistOtpVerifyService } from './therapist-otp-verify.service';

describe('TherapistOtpVerifyService', () => {
  let service: TherapistOtpVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistOtpVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
