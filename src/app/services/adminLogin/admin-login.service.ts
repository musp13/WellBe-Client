import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  http = inject(HttpClient);
  
  //constructor() { }

  adminLogin(loginObj: any)
  {
    //console.log('lets check login form object', loginObj);
    return this.http.post<any>(`${apiUrls.adminApi}admin_login`, loginObj, {withCredentials: true});
  }
}
