import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { UserOtpVerifyService } from '../../../services/userOtpVerify/user-otp-verify.service';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TherapistOtpVerifyService } from '../../../services/therapistOtpVerify/therapist-otp-verify.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent implements OnInit, AfterViewInit, OnDestroy{
    
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
  router = inject(Router);
  remainingTime:number = 60;
  timeInterval!: ReturnType<typeof setInterval>;

  otpFormObj = new FormData();
  
  userOtpVerifyService = inject(UserOtpVerifyService);
  therapistOtpVerifyService = inject(TherapistOtpVerifyService);
  activatedRoute = inject(ActivatedRoute);
  toastr = inject(ToastrService);

  otpVerificationSubscription! : Subscription;
  activatedRouteSubscription! : Subscription;
  resendOtpSubscription!: Subscription;
  setOtpSubscription!: Subscription;
  timerSubscription!: Subscription;

  constructor(){
    //this.startTimer();
  }

  ngOnInit(): void {
    //this.otpData = { otp: this.otp };
      
    this.activatedRouteSubscription = this.activatedRoute.queryParams.subscribe(params=>{
      this.userId = params['userId'];
      this.userType = params['userType'];
      console.log(`check userId from params = ${this.userId}`);
    });

    this.setOTP();
    //this.remainingTime = 0;
    //this.startTimer();
  }

  ngAfterViewInit(): void {
    //this.startTimer();
  }

  setOTP(){
    //console.log('hello, ngoninit', this.userType, this.userId);

    if(this.userType==='therapist'){
      this.setOtpSubscription = this.therapistOtpVerifyService.setOTP(this.userId).subscribe({
        next: (res)=>{
          this.successMessage = 'Your OTP has been sent to your email';
          this.errorMessage = '';
          console.log('hello, ', this.successMessage);
          if(this.remainingTime==60){
            this.startTimer();
          }
          
          
        },
        error: (err)=>{
          this.errorMessage = err.error.message;
          this.successMessage='';
        }
      })
    }
    else if(this.userType==='user'){
      this.setOtpSubscription = this.userOtpVerifyService.setOTP(this.userId).subscribe({
        next: (res)=>{
          this.successMessage = 'Your OTP has been sent to your email';
          this.errorMessage = '';
          this.startTimer();
          
        },
        error: (err)=>{
          this.errorMessage = err.error.message;
          this.successMessage='';
        }
      })
    }
  }

  startTimer(){
    console.log('hello');
    
    this.remainingTime = 60;  
    // Unsubscribe from the previous timerSubscription if it exists
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    
    this.timerSubscription = interval(1000).subscribe(()=>{
    if(this.remainingTime > 0)
      {
        this.remainingTime--;
        console.log('check interval: ',this.remainingTime);
      } else {
        // Reset the timer or handle timeout
        this.timerSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
      }
    })
}

  /* clearInterval(this.timeInterval);
    this.timeInterval = setInterval(()=>{
      if(this.remainingTime>0)
        this.remainingTime--; */
      /* else
      {
        clearInterval(this.timeInterval);
        return;
      }  */
      /* if(this.remainingTime == 0)
        {
          //alert('Your time is out. Otp has been resent')
          this.resendOTP();
          return;
        } */
     /* },1000);
     */

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
          this.toastr.success(res.message);
          this.router.navigate(['/user/login']);
        },
        error: (err)=>{
          this.errorMessage = err.error.message;
          this.successMessage='';
        }
      })
    }
    else if(this.userType=='therapist')
    {
      console.log(`check otpdata=${this.otpFormObj} and userId = ${this.userId}  and otp = ${this.otp}`);
      
      this.otpVerificationSubscription = this.therapistOtpVerifyService.verifyOTP(this.userId , this.otp).subscribe({
        next: (res)=>{
          this.successMessage = res.message;
          this.errorMessage = '';
          this.toastr.success(res.message);
          this.router.navigate(['/therapist/login']);
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
    if(this.userType === 'user')
    {
      this.resendOtpSubscription = this.userOtpVerifyService.resendOTP(this.userId).subscribe({
        next: (res)=>{
          this.successMessage = res.message;
          this.errorMessage = '';
          this.remainingTime = 60;
          this.startTimer();
        },
        error: (err)=>{
          this.errorMessage = err.error.message;
          this.successMessage='';
        }
      });
    }
    else if(this.userType === 'therapist')
    {
      this.resendOtpSubscription = this.therapistOtpVerifyService.resendOTP(this.userId).subscribe({
        next: (res)=>{
          this.successMessage = res.message;
          this.errorMessage = '';
          this.remainingTime = 60;
          this.startTimer();
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
    /* if(this.timeInterval){
      clearInterval(this.timeInterval);
    } */
    if(this.timerSubscription){
      this.timerSubscription.unsubscribe();
    }
    if(this.setOtpSubscription){
      this.setOtpSubscription.unsubscribe();
    }
  } 
}
