import { TestBed } from '@angular/core/testing';

import { TherapistManageService } from './therapist-manage.service';

describe('TherapistManageService', () => {
  let service: TherapistManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
