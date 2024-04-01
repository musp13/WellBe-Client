import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminLoggedInGuard } from './admin-logged-in.guard';

describe('adminLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
