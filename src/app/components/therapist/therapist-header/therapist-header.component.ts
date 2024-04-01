import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CheckTherapistService } from '../../../services/checkTherapist/check-therapist.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { therapistLogout } from '../../../states/therapistAuth/therapistAuth.actions';

@Component({
  selector: 'app-therapist-header',
  templateUrl: './therapist-header.component.html',
  styleUrl: './therapist-header.component.css'
})
export class TherapistHeaderComponent implements OnInit, OnDestroy {
  //isLoggedIn = false;
  router = inject(Router);
  store = inject(Store);

  checkTherapistService = inject(CheckTherapistService);

  isLoggedIn:boolean = this.checkTherapistService.isLoggedIn();

  loginCheckSubscription!: Subscription;

  ngOnInit(): void {

    this.loginCheckSubscription = this.checkTherapistService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.checkTherapistService.isLoggedIn();
    });
    
  }

  onTherapistLogout(){
    this.store.dispatch(therapistLogout());
  }

  ngOnDestroy(): void {
    if(this.loginCheckSubscription){
      this.loginCheckSubscription.unsubscribe();
    }
  }
}
