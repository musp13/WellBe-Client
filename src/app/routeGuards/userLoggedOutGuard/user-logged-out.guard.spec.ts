import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userLoggedOutGuard } from './user-logged-out.guard';

describe('userLoggedOutGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userLoggedOutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
