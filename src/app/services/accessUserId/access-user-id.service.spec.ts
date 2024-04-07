import { TestBed } from '@angular/core/testing';

import { AccessUserIdService } from './access-user-id.service';

describe('AccessUserIdService', () => {
  let service: AccessUserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessUserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
