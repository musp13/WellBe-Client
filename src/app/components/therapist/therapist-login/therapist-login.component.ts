import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectTherapistLoginError } from '../../../states/therapistAuth/therapistAuth.selectors';
import { therapistLogin } from '../../../states/therapistAuth/therapistAuth.actions';

@Component({
  selector: 'app-therapist-login',
  templateUrl: './therapist-login.component.html',
  styleUrl: './therapist-login.component.css'
})
export class TherapistLoginComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  router = inject(Router);
  store = inject(Store);

  error: string|null ='';
  therapistLoginForm!: FormGroup;

  therapistErrorSubscription!: Subscription;
  therapistFormSubscription!: Subscription;

  ngOnInit(): void {
    this.validateForm();
    this.selectStoreValues();
  }

  validateForm(){
    this.therapistLoginForm = this.fb.group({
      email:  ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    this.therapistFormSubscription = this.therapistLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });
  }

  selectStoreValues(){
    this.therapistErrorSubscription = this.store.select(selectTherapistLoginError).subscribe( error=>{
      console.log("See for error in login Component: ",error); 
      this.error=error;
    });
  }

  onLogin(){
    console.log('login bttn clicked');
    this.store.dispatch(therapistLogin(this.therapistLoginForm.value));
  }

  ngOnDestroy(): void {
    if(this.therapistErrorSubscription){
      this.therapistErrorSubscription.unsubscribe();
    }
    if(this.therapistFormSubscription){
      this.therapistFormSubscription.unsubscribe();
    }
  }
}
