import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { Therapist } from '../../interfaces/therapist';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class AddTherapistService {
  http = inject(HttpClient);

  constructor() { }

  addTherapist(addTherapistObj: Therapist)
  {
    //return this.http.post<any>(`${apiUrls.therapistsApi}register_therapist`, addTherapistObj, {withCredentials:true});
    return this.http.post<ApiResponse>(`${apiUrls.adminApi}add_therapist`, addTherapistObj);
  }
}
