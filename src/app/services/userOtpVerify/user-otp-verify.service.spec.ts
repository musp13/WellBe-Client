import { TestBed } from '@angular/core/testing';

import { UserOtpVerifyService } from './user-otp-verify.service';

describe('UserOtpVerifyService', () => {
  let service: UserOtpVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOtpVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
