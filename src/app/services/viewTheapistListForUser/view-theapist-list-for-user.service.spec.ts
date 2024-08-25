import { TestBed } from '@angular/core/testing';

import { ViewTheapistListForUserService } from './view-theapist-list-for-user.service';

describe('ViewTheapistListForUserService', () => {
  let service: ViewTheapistListForUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTheapistListForUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
