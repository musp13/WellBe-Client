import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class UserChatService {
  http = inject(HttpClient);
  
  constructor() { }

  getOldChats(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}get_old_chats`);
  }
}
