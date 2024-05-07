import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Availability } from '../../interfaces/availability';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class TherapistAvailabilityService {
  http = inject(HttpClient);

  constructor() { }

  setAvailability(availability : Availability[]) {
    return this.http.patch<ApiResponse>(`${apiUrls.therapistsApi}set_availability`, availability);
  }

  getAvailability() {
    return this.http.get<ApiResponse>(`${apiUrls.therapistsApi}get_my_availability`);
  }

}
