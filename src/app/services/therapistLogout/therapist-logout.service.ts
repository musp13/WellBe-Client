import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class TherapistLogoutService {
  http = inject(HttpClient);

  constructor() { }

  therapistLogout()
  {
    return this.http.post<ApiResponse>(`${apiUrls.therapistsApi}therapist_logout`, {}, {withCredentials: true});
  }
  
}
