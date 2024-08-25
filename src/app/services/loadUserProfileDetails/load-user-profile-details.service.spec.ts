import { TestBed } from '@angular/core/testing';

import { LoadUserProfileDetailsService } from './load-user-profile-details.service';

describe('LoadUserProfileDetailsService', () => {
  let service: LoadUserProfileDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadUserProfileDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
