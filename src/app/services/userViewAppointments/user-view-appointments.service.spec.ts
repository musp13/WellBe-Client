import { TestBed } from '@angular/core/testing';

import { UserViewAppointmentsService } from './user-view-appointments.service';

describe('UserViewAppointmentsService', () => {
  let service: UserViewAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserViewAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
