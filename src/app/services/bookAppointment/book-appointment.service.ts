import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';
import { Appointment } from '../../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class BookAppointmentService {
  http = inject(HttpClient);

  constructor() { }

  getAppointmentFormDetails() {
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}get_appointmentform_details`);
  }

  getTherapistAvailability(therapistId: string) {
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}get_therapist_availability/${therapistId}`)
  }

  bookAppointment(appointmentObj: Appointment) {
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}book_appointment`, appointmentObj)
  }

  getBookedSlots(therapistId: string, date: Date) {
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}get_booked_slots/${therapistId}/${date}`);
  }
}
