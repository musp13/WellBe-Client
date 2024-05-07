import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class TherapistOtpVerifyService {
  http = inject(HttpClient);

  constructor() { }

  setOTP(therapistId:string){
    return this.http.post<ApiResponse>(`${apiUrls.therapistsApi}set_otp/${therapistId}`, {therapistId: therapistId});
  }

  verifyOTP(therapistId: string, otp: string)
  {
    return this.http.patch<ApiResponse>(`${apiUrls.therapistsApi}verify_therapist?therapistId=${therapistId}`, {otp: otp});
  }

  resendOTP(therapistId: string)
  {
    return this.http.post<ApiResponse>(`${apiUrls.therapistsApi}resend_otp`, {therapistId: therapistId}, {withCredentials: true});
  }
}
