import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';
import { UserProfileForm } from '../../interfaces/userProfileForm';

@Injectable({
  providedIn: 'root'
})
export class LoadUserProfileDetailsService {
  http = inject(HttpClient);
  constructor() { }

  loadUserProfileDetails(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}load_user_profile`);
  }

  editUserProfile(editProfileObj: UserProfileForm){
    return this.http.patch<ApiResponse>(`${apiUrls.usersApi}edit_user_profile`, {editProfileObj})
  }
}
