import { TestBed } from '@angular/core/testing';

import { TherapistAddLeaveService } from './therapist-add-leave.service';

describe('TherapistAddLeaveService', () => {
  let service: TherapistAddLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistAddLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
