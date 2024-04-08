import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminLogoutService {
  http = inject(HttpClient);

  constructor() { }

  adminLogout()
  {
    return this.http.post<ApiResponse>(`${apiUrls.adminApi}admin_logout`, {}, {withCredentials: true});
  }
}
