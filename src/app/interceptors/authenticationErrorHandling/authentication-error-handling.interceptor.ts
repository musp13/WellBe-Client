import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

export const authenticationErrorHandlingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next): Observable<HttpEvent<unknown>> => {
  let userType = '';

  const router= inject(Router);

  if (req.url.includes('/admin/')){
    userType='admin';
  }else if (req.url.includes('/user/')){
    userType='user';
  }else if (req.url.includes('/therapist/')){
    userType='therapist';
  }
  
  
  
  return next(req).pipe(
    catchError( (err: HttpErrorResponse)=> {
      //console.log('inside catcError:', err.status);
      //console.log('check error: ', err);
      
      if (err.status===401) {
        switch (userType) {
          case 'user':
            //if(localStorage && localStorage.getItem('userId')){
              localStorage.removeItem('userId');
              localStorage.removeItem('user_access_token');
              router.navigate(['/user/login']);
            //}
            break;
          case 'admin':
            //if(localStorage && localStorage.getItem('adminId')){
              localStorage.removeItem('adminId');
              localStorage.removeItem('admin_access_token');
              router.navigate(['/admin/login']);
            //}
            break;
          case 'therapist':
            //if(localStorage && localStorage.getItem('therapistId')){
              localStorage.removeItem('therapistId');
              localStorage.removeItem('therapist_access_token');
              router.navigate(['/therapist/login']);
            //}
            break;
          /* default:
            ... 
            break; */
        }
        throw new Error('Unauthorized')
      }
      throw err;
    })
  );
};
