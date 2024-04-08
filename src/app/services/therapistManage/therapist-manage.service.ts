import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class TherapistManageService {
  http = inject(HttpClient);

  constructor() { }

  approveToggle(therapistId: string){
    console.log('inside therapist managemt service');
    
    return this.http.patch<ApiResponse>(`${apiUrls.adminApi}therapist_approve_toggle/${therapistId}`,{}, {withCredentials: true})
    //return this.http.post<any>(`${apiUrls.adminApi}add_therapist`, addTherapistObj);
  }

  blockToggle(therapistId: string){

    return this.http.patch<ApiResponse>(`${apiUrls.adminApi}therapist_block_toggle/${therapistId}`,{});
    
  }

  deleteUser(therapistId: string){

    return this.http.patch<ApiResponse>(`${apiUrls.adminApi}delete_therapist/${therapistId}`,{});
    
  }
}
