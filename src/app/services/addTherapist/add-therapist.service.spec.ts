import { TestBed } from '@angular/core/testing';

import { AddTherapistService } from './add-therapist.service';

describe('AddTherapistService', () => {
  let service: AddTherapistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTherapistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
