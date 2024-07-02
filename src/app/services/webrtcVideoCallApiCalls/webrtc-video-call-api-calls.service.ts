import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';
import { ApiResponse } from '../../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class WebrtcVideoCallApiCallsService {
  http = inject(HttpClient);

  constructor() { }

  saveTherapistPeerId(appointmentId: string, peerId: string){
    console.log(`inside api call method in service`);
    return this.http.patch<ApiResponse>(`${apiUrls.therapistsApi}save_therapist_peer_id`, {appointmentId, peerId});
  }

  removeTherapistPeerId(appointmentId: string){
    console.log(`inside api call method -removeTherapistPeerId- in service`);
    return this.http.patch<ApiResponse>(`${apiUrls.therapistsApi}remove_therapist_peer_id`, {appointmentId});
  }
}
