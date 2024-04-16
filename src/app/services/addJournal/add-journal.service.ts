import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';
import { Journal } from '../../interfaces/journal';

@Injectable({
  providedIn: 'root'
})
export class AddJournalService {
  http = inject(HttpClient);

  constructor() { }

  addJournal(addJournalObj: Journal){
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}add_journal`, addJournalObj);
  }
}
