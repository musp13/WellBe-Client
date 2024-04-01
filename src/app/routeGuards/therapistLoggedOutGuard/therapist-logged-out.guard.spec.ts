import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { therapistLoggedOutGuard } from './therapist-logged-out.guard';

describe('therapistLoggedOutGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => therapistLoggedOutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
