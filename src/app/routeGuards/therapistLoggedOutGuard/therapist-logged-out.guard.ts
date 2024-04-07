import { CanActivateFn, Router } from '@angular/router';
import { CheckTherapistService } from '../../services/checkTherapist/check-therapist.service';
import { inject } from '@angular/core';

export const therapistLoggedOutGuard: CanActivateFn = (route, state) => {
  const checkTherapistService = inject(CheckTherapistService);
  const router = inject(Router);

  if(checkTherapistService.isLoggedIn()==false)
  {
    return true;
  }
  else
  {
    if(typeof localStorage !== 'undefined')
      router.navigate(['therapist/home']);//,{relativeTo: activatedRoute}
    return false;
  }
  return true;
};
