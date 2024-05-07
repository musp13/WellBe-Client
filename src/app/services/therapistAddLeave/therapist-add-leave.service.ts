import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LeaveData } from '../../interfaces/leaveData';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class TherapistAddLeaveService {
  http = inject(HttpClient);

  constructor() { }

  addLeave(leaveData : LeaveData){
    return this.http.patch<ApiResponse>(`${apiUrls.therapistsApi}add_leave`, leaveData);
  }

  getLeave() {
    return this.http.get<ApiResponse>(`${apiUrls.therapistsApi}get_my_leave`);
  }

  removeLeaveDate(date: Date) {
    return this.http.patch<ApiResponse>(`${apiUrls.therapistsApi}remove_leave_date`, {date});
  }
}
