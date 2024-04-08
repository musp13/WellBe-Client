import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { LoginObject } from '../../interfaces/loginObject';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class TherapistLoginService {
  http = inject(HttpClient);
  
  constructor() { }

  therapistLogin(loginObj: LoginObject)
  {
    //console.log('lets check login form object', loginObj);
    return this.http.post<ApiResponse>(`${apiUrls.therapistsApi}therapist_login`, loginObj, {withCredentials: true});
  }
  
}
