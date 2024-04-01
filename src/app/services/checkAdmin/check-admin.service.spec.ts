import { TestBed } from '@angular/core/testing';

import { CheckAdminService } from './check-admin.service';

describe('CheckAdminService', () => {
  let service: CheckAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
