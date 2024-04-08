import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { LoginObject } from '../../interfaces/loginObject';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  http = inject(HttpClient);
  
  constructor() { }

  usertLogin(loginObj: LoginObject)
  {
    //console.log('lets check login form object', loginObj);
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}user_login`, loginObj, {withCredentials: true});
  }
  
}
