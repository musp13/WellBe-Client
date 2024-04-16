import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectTherapistLoginError } from '../../../states/therapistAuth/therapistAuth.selectors';
import { therapistLogin } from '../../../states/therapistAuth/therapistAuth.actions';
import { GetTherapistIdService } from '../../../services/getTherapistId/get-therapist-id.service';
/* import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation
} from '@costlydeveloper/ngx-awesome-popup'; */

@Component({
  selector: 'app-therapist-login',
  templateUrl: './therapist-login.component.html',
  styleUrl: './therapist-login.component.css'
})
export class TherapistLoginComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  router = inject(Router);
  store = inject(Store);
  getTherapistIdService = inject(GetTherapistIdService);

  error: string|null ='';
  therapistLoginForm!: FormGroup;
  verificationAlert = '';

  therapistErrorSubscription!: Subscription;
  therapistFormSubscription!: Subscription;
  getTherapistIdSubscription!: Subscription;

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
      if(error === 'User is not verified!')
      {
        this.getTherapistIdSubscription = this.getTherapistIdService.getId(this.therapistLoginForm.value).subscribe({
          next: (res)=>{
            const therapistId = res.data.therapistId;
            //this.openConfirmBox();
            this.router.navigate(['therapist/otp_verification'],{ queryParams: { userId: `${therapistId}`, userType: `therapist` } });
          },
          error: (err)=>{
            console.log(err.message);
            //this.error = err.error.message;
          }
        })
      }
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
    if(this.getTherapistIdSubscription){
      this.getTherapistIdSubscription.unsubscribe();
    }

  }

  /* openConfirmBox() {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('OTP Verification');
    newConfirmBox.setMessage('Click OK to verify your Email.');

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
    animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    buttonPosition: 'center', // optional 
    });

    newConfirmBox.setButtonLabels('OK', 'Cancel');

    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe(resp => {
      if(resp.clickedButtonID){
        console.log('Button clicked: ', resp.clickedButtonID);
      }
    });
  } */
}
