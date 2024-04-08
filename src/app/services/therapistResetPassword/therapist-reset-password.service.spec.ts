import { TestBed } from '@angular/core/testing';

import { TherapistResetPasswordService } from './therapist-reset-password.service';

describe('TherapistResetPasswordService', () => {
  let service: TherapistResetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistResetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
