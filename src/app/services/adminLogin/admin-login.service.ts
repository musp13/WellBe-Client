import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { BehaviorSubject } from 'rxjs';
import { LoginObject } from '../../interfaces/loginObject';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  http = inject(HttpClient);
  
  //constructor() { }

  adminLogin(loginObj: LoginObject)
  {
    //console.log('lets check login form object', loginObj);
    return this.http.post<ApiResponse>(`${apiUrls.adminApi}admin_login`, loginObj, {withCredentials: true});
  }
}
