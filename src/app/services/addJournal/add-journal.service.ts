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

  getMyJournal(journalId: string) {
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}get_my_journal/${journalId}`);
  }

  editJournal(journalId: string, journalData: Journal) {
    return this.http.patch<ApiResponse>(`${apiUrls.usersApi}edit_journal/${journalId}`, journalData);
  }
}
