import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class TherapistOtpVerifyService {
  http = inject(HttpClient);

  constructor() { }

  verifyOTP(therapistId: string, otp: string)
  {
    return this.http.post<any>(`${apiUrls.therapistsApi}verify_therapist?therapistId=${therapistId}`, {otp: otp});
  }

  resendOTP(therapistId: string)
  {
    return this.http.post<any>(`${apiUrls.therapistsApi}resend_otp`, {therapistId: therapistId}, {withCredentials: true});
  }
}
