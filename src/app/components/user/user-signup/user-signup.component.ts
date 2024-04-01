import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../Validators/confirmPassword.validator';
import { noWhitespaceValidator } from '../../../Validators/noWhitespace.validator';
import { UserSignupService } from '../../../services/userSignup/user-signup.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  userSignupService = inject(UserSignupService);
  router = inject(Router);

  signupForm!: FormGroup;
  message: String = '';
  error: String = '';

  userSignupSubscription!: Subscription;
  userFormSubscription!: Subscription;

  ngOnInit(): void {
    this.validateForm();
  }

  validateForm(){
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, noWhitespaceValidator(),  Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required,Validators.email, noWhitespaceValidator()])],
      userName: ['', [Validators.required, noWhitespaceValidator()]],
      password: ['', [Validators.required, noWhitespaceValidator(), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, noWhitespaceValidator()]]
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    })

    this.userFormSubscription = this.signupForm.valueChanges.subscribe(() => {
      this.error = '';
    });
  }

  signup(){
    console.log('signup button clicked');
    this.userSignupSubscription = this.userSignupService.userSignup(this.signupForm.value)
                                      .subscribe({
                                        next: (res)=>{
                                          console.log('User Created');
                                          this.message = "User created Successfully.Please verify your Email";
                                          const userId= res.data.id;
                                          const userType = res.data.userType;
                                          console.log(`User Created. userId = ${userId} & userType = ${userType}`);
                                          //alert(`User Created. userId = ${userId} & userType = ${userType}`);
                                          this.router.navigate(['user/otp_verification'],{ queryParams: { userId: `${userId}`, userType: `${userType}` } });
                                          this.signupForm.reset();
                                        },
                                        error: (err)=>{
                                          console.log(err);
                                          this.error = err.error.message;
                                        }
                                      })
  }

  ngOnDestroy(): void {
    if(this.userSignupSubscription){
      this.userSignupSubscription.unsubscribe();
    }
    if(this.userFormSubscription){
      this.userFormSubscription.unsubscribe();
    }
  }

}
