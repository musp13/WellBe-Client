import { CanActivateFn, Router } from '@angular/router';
import { CheckUserService } from '../../services/checkUser/check-user.service';
import { inject } from '@angular/core';


export const userLoggedInGuard: CanActivateFn = (route, state) => {
  const checkUserService = inject(CheckUserService);
  const router = inject(Router);
  //const activatedRoute = inject(ActivatedRoute);

  if(checkUserService.isLoggedIn())
  {
    return true;
  }
  else
  {
    router.navigate(['user/login'],);
    return false;
  }
  return true;
};
