import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class UserOtpVerifyService {
  http = inject(HttpClient);

  verifyOTP(otpFormData: FormData, userId:string, otp: string){
    console.log(`insidde verify otp service , check userId = ${ userId} `);
    
    return this.http.post<any>(`${apiUrls.usersApi}verify_user?userId=${userId}`, {otp: otp} , {withCredentials: true});
    //
  }

  resendOTP(userId: string)
  {
    return this.http.post<any>(`${apiUrls.usersApi}resend_otp`, {userId: userId}, {withCredentials: true});
  }

  constructor() { }
}
