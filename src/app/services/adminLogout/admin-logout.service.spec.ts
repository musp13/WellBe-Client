import { TestBed } from '@angular/core/testing';

import { AdminLogoutService } from './admin-logout.service';

describe('AdminLogoutService', () => {
  let service: AdminLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
