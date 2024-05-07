import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class GetTherapistDetailsService {
  http = inject(HttpClient);

  constructor() { }
  getDetails(therapistId: string){
    return this.http.get<ApiResponse>(`${apiUrls.therapistsApi}get_therapist_details/${therapistId}`);
  }

  editProfile(editProfileObj: {fullName:string, userName: string}) {
    return this.http.patch<ApiResponse>(`${apiUrls.therapistsApi}edit_profile`,{editProfileObj});
  }
}
