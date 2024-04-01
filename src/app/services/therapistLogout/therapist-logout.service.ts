import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class TherapistLogoutService {
  http = inject(HttpClient);

  constructor() { }

  therapistLogout()
  {
    return this.http.post<any>(`${apiUrls.therapistsApi}therapist_logout`, {}, {withCredentials: true});
  }
  
}
