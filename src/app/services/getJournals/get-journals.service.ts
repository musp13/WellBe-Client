import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../api.urls';

@Injectable({
  providedIn: 'root'
})
export class GetJournalsService {
  http = inject(HttpClient);

  constructor() { }

  getJournals()
  {
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}get_journals`);
  }

  deleteJournal(journalId:string){
    return this.http.delete<ApiResponse>(`${apiUrls.usersApi}delete_journal/${journalId}`);
  }
}
