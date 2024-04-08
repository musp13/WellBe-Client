import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { LoginObject } from '../../interfaces/loginObject';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class GetTherapistIdService {
  http = inject(HttpClient);
  constructor() { }
  getId(loginObj: LoginObject){
    return this.http.post<ApiResponse>(`${apiUrls.therapistsApi}get_therapist_id`, loginObj);
  }
}
