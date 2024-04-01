import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckTherapistService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  
  constructor() { };

  isLoggedIn()
  {
    return typeof localStorage!=='undefined' && !!localStorage.getItem("therapistId");
  }
  
}
