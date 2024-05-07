import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { noWhitespaceValidator } from '../../../Validators/noWhitespace.validator';
import { confirmPasswordValidator } from '../../../Validators/confirmPassword.validator';
import { TherapistResetPasswordService } from '../../../services/therapistResetPassword/therapist-reset-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit, OnDestroy{
  resetForm!: FormGroup;
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  toastr = inject(ToastrService);
  error ='';


  therapistResetPasswordService = inject(TherapistResetPasswordService);

  resetPasswordSubscription!: Subscription;

  activatedRouteSubscription!: Subscription;

  token!: string;

  ngOnInit(): void {
    this.initializeForm();
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(value=>{
      this.token = value['token'];
      console.log(this.token);
    })
    
  }

  initializeForm(){
    this.resetForm = this.fb.group({
      password : ['', Validators.compose([Validators.required, Validators.minLength(8), noWhitespaceValidator()])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    });
  }

  reset(){
    let resetObj = {
      token : this.token,
      password: this.resetForm.value.password
    }
    this.resetPasswordSubscription = this.therapistResetPasswordService.resetPassword(resetObj)
                                      .subscribe({
                                        next:(res)=>{
                                          this.toastr.success("Password has been reset");
                                          this.router.navigate(['/therapist/login']);
                                          console.log("Password has been reset", res);
                                          
                                        },
                                        error: (err)=>{
                                          this.error = err.error.message;
                                          console.log(err.error.message);
                                          
                                        }
                                      })
  }

  ngOnDestroy(): void {
    if(this.activatedRouteSubscription){
      this.activatedRouteSubscription.unsubscribe();
    }
    if(this.resetPasswordSubscription){
      this.resetPasswordSubscription.unsubscribe();
    }
  }
}
