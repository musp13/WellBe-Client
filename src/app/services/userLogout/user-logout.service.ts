import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserLogoutService {
  http = inject(HttpClient);

  constructor() { }

  userLogout()
  {
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}user_logout`, {}, {withCredentials: true});
  }
  
}
