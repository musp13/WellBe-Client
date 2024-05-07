import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDetailsService {
  http = inject(HttpClient);
  constructor() { }

  getUserAppointmentDetails(appointmentId: string){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}get_appointment_details/${appointmentId}`);
  }

  getTherapistAppointmentDetails(appointmentId: string){
    return this.http.get<ApiResponse>(`${apiUrls.therapistsApi}get_appointment_details/${appointmentId}`);
  }
}
