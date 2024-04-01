import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserOtpVerifyService } from '../../../services/userOtpVerify/user-otp-verify.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent implements OnInit, OnDestroy{
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';
  otp6: string = '';
  otp: string = '';
  otpData!: null| object;
  verificationResult = '';
  successMessage = '';
  errorMessage = '';
  userType = '';
  userId = '';

  otpFormObj = new FormData();
  
  userOtpVerifyService = inject(UserOtpVerifyService);
  activatedRoute = inject(ActivatedRoute);

  otpVerificationSubscription! : Subscription;
  activatedRouteSubscription! : Subscription;
  resendOtpSubscription!: Subscription;

  constructor(){
  }

  ngOnInit(): void {
    //this.otpData = { otp: this.otp };
    
    this.activatedRouteSubscription = this.activatedRoute.queryParams.subscribe(params=>{
      this.userId = params['userId'];
      this.userType = params['userType'];
      console.log(`check userId from params = ${this.userId}`);
      
    })
    //throw new Error('Method not implemented.');
  }

  verifyOTP(){
    this.otp = this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
    this.otpFormObj.append('otp',this.otp);
    if(this.userType=='user')
    {
      console.log(`check otpdata=${this.otpFormObj} and userId = ${this.userId}  and otp = ${this.otp}`);
      
      this.otpVerificationSubscription = this.userOtpVerifyService.verifyOTP(this.otpFormObj, this.userId , this.otp).subscribe({
        next: (res)=>{
          this.successMessage = res.message;
          this.errorMessage = '';
        },
        error: (err)=>{
          this.errorMessage = err.error.message;
          this.successMessage='';
        }
      })
    }
  }

  resendOTP()
  {
    if(this.userId)
    {
      this.resendOtpSubscription = this.userOtpVerifyService.resendOTP(this.userId).subscribe({
        next: (res)=>{
          this.successMessage = res.message;
          this.errorMessage = '';
        },
        error: (err)=>{
          this.errorMessage = err.error.message;
          this.successMessage='';
        }
      });
    }
  }

  ngOnDestroy(): void {
    if(this.otpVerificationSubscription){
      this.otpVerificationSubscription.unsubscribe();
    }
    if(this.activatedRouteSubscription){
      this.activatedRouteSubscription.unsubscribe();
    }
    if(this.resendOtpSubscription){
      this.resendOtpSubscription.unsubscribe();
    }
  } 
}
