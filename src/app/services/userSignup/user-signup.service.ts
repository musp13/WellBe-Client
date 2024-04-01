import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {
  http = inject(HttpClient);

  constructor() { }

  userSignup(signupObj: any)
  {
    return this.http.post<any>(`${apiUrls.usersApi}register_user`, signupObj, {withCredentials:true})
  }
}
