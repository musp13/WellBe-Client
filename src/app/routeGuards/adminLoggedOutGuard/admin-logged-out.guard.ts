import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckAdminService } from '../../services/checkAdmin/check-admin.service';
import { map } from 'rxjs';

export const adminLoggedOutGuard: CanActivateFn = (route, state) => {
  const checkAdminService = inject(CheckAdminService);
  const router = inject(Router);

  if(checkAdminService.isAdminLoggedIn()==false)
  {
    return true;
  }
  else
  {
    router.navigate(['admin/home']);//,{relativeTo: activatedRoute}
    return false;
  }
  //return true;
 /*  return checkAdminService.isAdminLoggedIn().pipe(
    map(isLoggedIn => {
      if (isLoggedIn==false) {
        return true;
      } else {                                                                                                        
        router.navigate(['admin/home']);
        return false;
      }
    })
  ); */
};
