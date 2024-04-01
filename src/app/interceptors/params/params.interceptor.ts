import { HttpInterceptorFn } from '@angular/common/http';

export const paramsInterceptor: HttpInterceptorFn = (req, next) => {
  let modifiedReq = req;
  let id='';
  console.log('Inside prams interceptor');
  if( typeof localStorage != 'undefined'){
    if (req.url.includes('/admin/') && !req.url.includes('/admin/login') && req.url.includes('/therapist/register_therapist')) { 
      id = localStorage.getItem("adminId") || '';
    }
    else if (req.url.includes('/user/') && !req.url.includes('/user/login') && !req.url.includes('/user/register') && !req.url.includes('/user/signup') && !req.url.includes('/user/otp_verification')) {
      // Add userId as a query parameter for user routes
      id = localStorage.getItem("userId") || '';
      //modifiedReq = req.clone({ setParams: { id: 'id' } });
    } else if (req.url.includes('/therapist/') && !req.url.includes('/therapist/login') && !req.url.includes('/therapist/register')) {
      // Add therapistId as a query parameter for therapist routes
      id = localStorage.getItem("therapistId") || '';
      //modifiedReq = req.clone({ setParams: { id: 'id' } });
    }
  }
  modifiedReq = req.clone({ 
    params: req.params
                .set('id', id)
  }); 
  console.log('check modifiedReq.url', modifiedReq.url);
  return next(modifiedReq);
};
