import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { CheckAdminService } from '../../services/checkAdmin/check-admin.service';
import { map } from 'rxjs';

export const adminLoggedInGuard: CanActivateFn = (route, state) => {
  const checkAdminService = inject(CheckAdminService);
  const router = inject(Router);
  const activatedRoute = inject(ActivatedRoute);

  if(checkAdminService.isAdminLoggedIn())
  {
    return true;
  }
  else
  {
    router.navigate(['admin/login'],);
    return false;
  }
  //return true;
  /* console.log('inside isloggedin routeguard');
  
  return checkAdminService.isAdminLoggedIn().pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['admin/login'],{relativeTo: activatedRoute});
        return false;
      }
    })
  ); */
};
