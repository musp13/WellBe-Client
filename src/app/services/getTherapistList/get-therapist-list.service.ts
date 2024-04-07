import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class GetTherapistListService {
  http = inject(HttpClient);

  constructor() { }

  getTherapistList()
  {
    return this.http.get<any>(`${apiUrls.adminApi}get_therapist_list`);
  }
}
