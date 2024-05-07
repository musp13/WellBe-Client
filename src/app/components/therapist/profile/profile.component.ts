import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { EncryptionService } from '../../../services/encryption/encryption.service';
import { GetTherapistDetailsService } from '../../../services/getTherapistDetails/get-therapist-details.service';
import { Subscription } from 'rxjs';
import { TherapistDetails } from '../../../interfaces/therapistDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../Validators/noWhitespace.validator';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  editProfileForm!: FormGroup;

  editMode = false;
  therapistId: string|null = null;
  therapistDetails! : TherapistDetails;
  encryptionService = inject(EncryptionService);
  getTherapistDetails = inject(GetTherapistDetailsService);
  getDetailsSubscription !: Subscription;
  editProfileSubscription !: Subscription;
  day = '';
  startTime = '';
  endTime = '';

  ngOnInit(): void {
    this.initEditForm();
    if(typeof localStorage!='undefined' && localStorage.getItem('therapistId')) {
      const encrypterId = <string>localStorage.getItem('therapistId');
      this.therapistId = this.encryptionService.decrypt(encrypterId);

      this.getDetailsSubscription = this.getTherapistDetails.getDetails(this.therapistId).subscribe({
        next: (res)=>{
          this.therapistDetails = res.data.therapistDetails
          this.patchFormValues();
          //alert(res.message);
          console.log(this.therapistDetails);
          
        },
        error: (err)=>{
          console.log(err.error.message);
          
        }
      })


    }


  }

  initEditForm(){
    this.editProfileForm = this.fb.group({
      fullName: ['', Validators.required, noWhitespaceValidator()],
      userName: ['', Validators.required, noWhitespaceValidator()]
    })
  }

  patchFormValues() {
    
    this.editProfileForm.get('fullName')?.patchValue(this.therapistDetails.fullName);
    this.editProfileForm.get('userName')?.patchValue(this.therapistDetails.userName);
    /* this.editProfileForm.get('phoneNo')?.patchValue(this.editProfileForm.phoneNo ? this.editProfileForm.phoneNo : '' ); */
  
}

  editProfile(){
    this.editProfileSubscription = this.getTherapistDetails.editProfile(this.editProfileForm.value).subscribe({
      next: (res)=>{
        res.message;
        this.editMode= false;
      },
      error: (err)=>{
        console.log(err.error.message);
        
      }
    })
  }

  toggleEdit(){
    //alert('button clicked');
    this.editMode = !this.editMode;
  }

  ngOnDestroy(): void {
    if(this.getDetailsSubscription)
      this.getDetailsSubscription.unsubscribe();
    if (this.editProfileSubscription) {
      this.editProfileSubscription.unsubscribe();
    }
  }
  
}
