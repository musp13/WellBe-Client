import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { therapistLoggedInGuard } from './therapist-logged-in.guard';

describe('therapistLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => therapistLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
