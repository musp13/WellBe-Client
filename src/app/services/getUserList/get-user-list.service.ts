import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class GetUserListService {
  http = inject(HttpClient);

  constructor() { }

  getUserList()
  {
    return this.http.get<any>(`${apiUrls.adminApi}get_user_list`);
  }
}
