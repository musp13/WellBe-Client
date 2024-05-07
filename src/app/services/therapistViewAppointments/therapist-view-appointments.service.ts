import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class TherapistViewAppointmentsService {
  http = inject(HttpClient);

  constructor() { }

  getAppointmentList(){
    return this.http.get<ApiResponse>(`${apiUrls.therapistsApi}get_appointment_list`);
  }

  cancelAppointment(appointmentId: string) {
    return this.http.patch<ApiResponse>(`${apiUrls.therapistsApi}cancel_appointment/${appointmentId}`,{});
  }

  getCancelledAppointments(){
    return this.http.get<ApiResponse>(`${apiUrls.therapistsApi}get_cancelled_appointments`);
  }
}
