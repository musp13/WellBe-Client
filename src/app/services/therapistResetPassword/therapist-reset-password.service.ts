import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { ApiResponse } from '../../interfaces/apiResponse';
import { PasswordResetObject } from '../../interfaces/passwordResetObject';

@Injectable({
  providedIn: 'root'
})
export class TherapistResetPasswordService {
  http = inject(HttpClient);

  constructor() { }

  sendEmail(email: string){
    return this.http.post<ApiResponse>(`${apiUrls.therapistsApi}send_reset_email`,{email:email});
  }

  resetPassword(resetObj: PasswordResetObject){
    
    return this.http.patch<ApiResponse>(`${apiUrls.therapistsApi}reset_password`,{resetObj});
  }
}
