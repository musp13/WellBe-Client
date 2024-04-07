import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { EncryptionService } from '../../services/encryption/encryption.service';

export const paramsInterceptor: HttpInterceptorFn = (req, next) => {
  //const document = inject(Document);
  const platformId=inject(PLATFORM_ID);
  const encryptionService = inject(EncryptionService);
  let encryptedId;
  let modifiedReq = req;
  let id ='';
  console.log('Inside prams interceptor');
  
  //if( typeof localStorage != 'undefined'){
  //if(document.defaultView){
  if (isPlatformBrowser(platformId)) {
    console.log('local storage is found');
      
    if (req.url.includes('/admin/') && !req.url.includes('/admin/login')) { 
     console.log('admin route', localStorage.getItem("adminId"));
      if(localStorage.getItem("adminId")!==null && (typeof localStorage.getItem("adminId")) !== 'undefined'){
        encryptedId = (localStorage.getItem("adminId")) ?? '';
        id= encryptionService.decrypt(encryptedId);
      }
      
    }
    else if (req.url.includes('/user/') && !req.url.includes('/user/login') && !req.url.includes('/user/register') && !req.url.includes('/user/signup') && !req.url.includes('/user/otp_verification')) {
      // Add userId as a query parameter for user routes
      //id = localStorage.getItem("userId") || '';
      if(localStorage.getItem("userId")!==null && (typeof localStorage.getItem("userId")) !== 'undefined'){
        encryptedId = (localStorage.getItem("userId")) ?? '';
        id= encryptionService.decrypt(encryptedId);
      }
      //modifiedReq = req.clone({ setParams: { id: 'id' } });
    } else if (req.url.includes('/therapist/') && !req.url.includes('/therapist/login') && !req.url.includes('/therapist/register')) {
      // Add therapistId as a query parameter for therapist routes
      //id = localStorage.getItem("therapistId") || '';
      if(localStorage.getItem("therapistId")!==null && (typeof localStorage.getItem("therapistId")) !== 'undefined'){
        encryptedId = (localStorage.getItem("therapistId")) ?? '';
        id= encryptionService.decrypt(encryptedId);
      }
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
