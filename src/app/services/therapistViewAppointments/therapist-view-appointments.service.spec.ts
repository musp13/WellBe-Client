import { TestBed } from '@angular/core/testing';

import { TherapistViewAppointmentsService } from './therapist-view-appointments.service';

describe('TherapistViewAppointmentsService', () => {
  let service: TherapistViewAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistViewAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
