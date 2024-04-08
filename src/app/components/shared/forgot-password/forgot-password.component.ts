import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TherapistResetPasswordService } from '../../../services/therapistResetPassword/therapist-reset-password.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotForm!: FormGroup;
  fb = inject(FormBuilder);
  toastr = inject(ToastrService);
  error ='';

  therapistResetPasswordService = inject(TherapistResetPasswordService);

  sendEmailSubscription!: Subscription;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.forgotForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  submit(){
    console.log('send email button clicked', this.forgotForm.value.email);
    
    this.sendEmailSubscription = this.therapistResetPasswordService.sendEmail(this.forgotForm.value.email)
                                      .subscribe({
                                        next:(res)=>{
                                          this.toastr.success("Email has been sent");
                                          console.log("Email has been sent");
                                          
                                        },
                                        error: (err)=>{
                                          console.log(err.error.message);
                                          this.error = err.error.message;
                                        }
                                      })
  }

  ngOnDestroy(): void {
    if(this.sendEmailSubscription)
      this.sendEmailSubscription.unsubscribe();
  }
}
