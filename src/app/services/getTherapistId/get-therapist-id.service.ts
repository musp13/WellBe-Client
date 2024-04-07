import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class GetTherapistIdService {
  http = inject(HttpClient);
  constructor() { }
  getId(loginObj: any){
    return this.http.post<any>(`${apiUrls.therapistsApi}get_therapist_id`, loginObj);
  }
}
