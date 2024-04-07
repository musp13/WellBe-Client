import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class AddTherapistService {
  http = inject(HttpClient);

  constructor() { }

  addTherapist(addTherapistObj: any)
  {
    //return this.http.post<any>(`${apiUrls.therapistsApi}register_therapist`, addTherapistObj, {withCredentials:true});
    return this.http.post<any>(`${apiUrls.adminApi}add_therapist`, addTherapistObj);
  }
}
