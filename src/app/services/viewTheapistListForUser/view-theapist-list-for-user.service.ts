import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class ViewTheapistListForUserService {
  http = inject(HttpClient);

  constructor() { }

  getTherapistList(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}view_therapists_list`);
  }
}
