import { TestBed } from '@angular/core/testing';

import { TherapistLoginService } from './therapist-login.service';

describe('TherapistLoginService', () => {
  let service: TherapistLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
