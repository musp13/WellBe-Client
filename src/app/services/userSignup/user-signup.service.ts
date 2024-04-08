import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { User } from '../../interfaces/user';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {
  http = inject(HttpClient);

  constructor() { }

  userSignup(signupObj: User)
  {
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}register_user`, signupObj, {withCredentials:true})
  }
}
