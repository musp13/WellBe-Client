import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class GetUserListService {
  http = inject(HttpClient);

  constructor() { }

  getUserList()
  {
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}get_user_list`);
  }
}
