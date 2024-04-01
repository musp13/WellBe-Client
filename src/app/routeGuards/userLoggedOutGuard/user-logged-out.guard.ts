import { CanActivateFn, Router } from '@angular/router';
import { CheckUserService } from '../../services/checkUser/check-user.service';
import { inject } from '@angular/core';

export const userLoggedOutGuard: CanActivateFn = (route, state) => {
  const checkUserService = inject(CheckUserService);
  const router = inject(Router);

  if(checkUserService.isLoggedIn()==false)
  {
    return true;
  }
  else
  {
    router.navigate(['user/home']);//,{relativeTo: activatedRoute}
    return false;
  }
  return true;
};
