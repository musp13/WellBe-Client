import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminLoggedOutGuard } from './admin-logged-out.guard';

describe('adminLoggedOutGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminLoggedOutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
