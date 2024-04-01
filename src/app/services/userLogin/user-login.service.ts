import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  http = inject(HttpClient);
  
  constructor() { }

  usertLogin(loginObj: any)
  {
    //console.log('lets check login form object', loginObj);
    return this.http.post<any>(`${apiUrls.usersApi}user_login`, loginObj, {withCredentials: true});
  }
  
}
