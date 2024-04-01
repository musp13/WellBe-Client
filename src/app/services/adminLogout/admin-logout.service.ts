import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class AdminLogoutService {
  http = inject(HttpClient);

  constructor() { }

  adminLogout()
  {
    return this.http.post<any>(`${apiUrls.adminApi}admin_logout`, {}, {withCredentials: true});
  }
}
