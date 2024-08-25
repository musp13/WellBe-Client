import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TherapistDetailsForUser } from '../../../interfaces/therapistListForUser';
import { ViewTheapistListForUserService } from '../../../services/viewTheapistListForUser/view-theapist-list-for-user.service';
import { Subscription } from 'rxjs';
import { ApiResponse } from '../../../interfaces/apiResponse';

@Component({
  selector: 'app-view-therapists',
  templateUrl: './view-therapists.component.html',
  styleUrl: './view-therapists.component.css'
})
export class ViewTherapistsComponent implements OnInit, OnDestroy{
  therapistList : TherapistDetailsForUser[] = [];

  viewTheapistListForUserService = inject(ViewTheapistListForUserService);

  getTherapistListSubscription !: Subscription;

  ngOnInit(): void {
    console.log('hellloooooowwww');
    
    this.getTherapistList();
  }

  ngOnDestroy(): void {
    if (this.getTherapistListSubscription) {
      this.getTherapistListSubscription.unsubscribe();
    }
  }

  getTherapistList(){
    this.getTherapistListSubscription = this.viewTheapistListForUserService.getTherapistList().subscribe({
      next: (res)=>{
        console.log('check response', res);
        this.therapistList = res.data;
      },
      error: (err)=>{
        console.log(err.error.message);
        
      }
    })
  }
}
