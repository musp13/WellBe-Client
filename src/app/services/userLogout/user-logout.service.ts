import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class UserLogoutService {
  http = inject(HttpClient);

  constructor() { }

  userLogout()
  {
    return this.http.post<any>(`${apiUrls.usersApi}user_logout`, {}, {withCredentials: true});
  }
  
}
