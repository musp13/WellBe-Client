import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {
  http = inject(HttpClient);

  constructor() { }

  blockToggle(userId: string){

    return this.http.patch<ApiResponse>(`${apiUrls.adminApi}user_block_toggle/${userId}`,{});
    
  }

  deleteUser(userId: string){

    return this.http.patch<ApiResponse>(`${apiUrls.adminApi}delete_user/${userId}`,{});
    
  }
}
