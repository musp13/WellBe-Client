import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class AdminChatService {
  http = inject(HttpClient);

  getChatUserList(){
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}get_chat_user_list`);
  }

  getOldChats(){
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}get_old_chats`);
  }
  constructor() { }
}
