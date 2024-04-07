import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckTherapistService } from '../../services/checkTherapist/check-therapist.service';

export const therapistLoggedInGuard: CanActivateFn = (route, state) => {
  const checkTherapistService = inject(CheckTherapistService);
  const router = inject(Router);
  //const activatedRoute = inject(ActivatedRoute);

  if(checkTherapistService.isLoggedIn())
  {
    return true;
  }
  else
  {
    if(typeof localStorage !== 'undefined')
      router.navigate(['therapist/login'],);
    return false;
  }
  //return true;
};
