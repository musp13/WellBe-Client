import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddTherapistService } from '../../../services/addTherapist/add-therapist.service';
import { Subscription } from 'rxjs';
import { noWhitespaceValidator } from '../../../Validators/noWhitespace.validator';
import { confirmPasswordValidator } from '../../../Validators/confirmPassword.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-add-therapist',
  templateUrl: './admin-add-therapist.component.html',
  styleUrl: './admin-add-therapist.component.css'
})
export class AdminAddTherapistComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  addTherapistService = inject(AddTherapistService);
  toastr = inject(ToastrService);

  addTherapistForm!: FormGroup;
  message: String = '';
  error: String = '';

  addTherapistSubscription!: Subscription;
  therapistFormSubscription!: Subscription;

  ngOnInit(): void {
    this.validateForm();
  }

  validateForm(){
    this.addTherapistForm = this.fb.group({
      fullName: ['', [Validators.required, noWhitespaceValidator(),  Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required,Validators.email, noWhitespaceValidator()])],
      userName: ['', [Validators.required, noWhitespaceValidator()]]/* ,
      password: ['', [Validators.required, noWhitespaceValidator(), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, noWhitespaceValidator()]] */
    }/* ,
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    } */)

    this.therapistFormSubscription = this.addTherapistForm.valueChanges.subscribe(() => {
      this.error = '';
      this.message = '';
    });
  }

  addTherapist()
  {
    this.therapistFormSubscription = this.addTherapistService.addTherapist(this.addTherapistForm.value)
                                          .subscribe({
                                            next: (res)=>{
                                              this.message = res.message;
                                              this.error = '';
                                              //alert(res.message);
                                              this.toastr.success(res.message);
                                              this.addTherapistForm.reset();
                                            },
                                            error: (err)=>{
                                              this.error = err.error.message;
                                              this.message = '';
                                            }
                                          });
  }

  ngOnDestroy(): void {
    if(this.addTherapistSubscription){
      this.addTherapistSubscription.unsubscribe();
    }
    if(this.therapistFormSubscription){
      this.therapistFormSubscription.unsubscribe();
    }
  }
}
