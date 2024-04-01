import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class TherapistLoginService {
  http = inject(HttpClient);
  
  constructor() { }

  therapistLogin(loginObj: any)
  {
    //console.log('lets check login form object', loginObj);
    return this.http.post<any>(`${apiUrls.therapistsApi}therapist_login`, loginObj, {withCredentials: true});
  }
  
}
