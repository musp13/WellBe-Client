import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { EncryptionService } from '../../../services/encryption/encryption.service';
import { GetTherapistDetailsService } from '../../../services/getTherapistDetails/get-therapist-details.service';
import { Subscription } from 'rxjs';
import { TherapistDetails } from '../../../interfaces/therapistDetails';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../Validators/noWhitespace.validator';
import { dateRangeValidator } from '../../../Validators/dateRange.validator';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  fireStorage = inject(AngularFireStorage);
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
  yesterday!: string ;

  defaultProfileImageSrc = '../../../../assets/images/avatar.png';
  profileImageSrc='';

  ngOnInit(): void {
    this.profileImageSrc = this.defaultProfileImageSrc;
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    this.yesterday = yesterday.toISOString().split('T')[0];
    console.log('Yesterday:', this.yesterday); 
    this.initEditForm();
    this.loadTherapistDetails();    
  }

  loadTherapistDetails(){
    if(typeof localStorage!='undefined' && localStorage.getItem('therapistId')) {
      const encrypterId = <string>localStorage.getItem('therapistId');
      this.therapistId = this.encryptionService.decrypt(encrypterId);

      this.getDetailsSubscription = this.getTherapistDetails.getDetails(this.therapistId).subscribe({
        next: (res)=>{
          this.therapistDetails = res.data.therapistDetails;
          if (this.therapistDetails.profileImage!=='avatar.png') {
            this.profileImageSrc = this.therapistDetails.profileImage;
          }
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
      fullName: ['', [Validators.required, noWhitespaceValidator()]],
      userName: ['', [Validators.required, noWhitespaceValidator()]],
      profileImage: [''],
      qualification1: [''],
      qualification2: [''],
      qualification3: [''],
      specialization1: [''],
      specialization2: [''],
      specialization3: [''],
      bio: [''],
      experienceCompany1: [''],
      experienceStartDate1: [''],
      experienceEndDate1:[''],
      experienceCompany2: [''],
      experienceStartDate2: [''],
      experienceEndDate2:[''],
      experienceCompany3: [''],
      experienceStartDate3: [''],
      experienceEndDate3:[''],
      yearsOfExperince: ['', [Validators.pattern('^[0-9]*$')]],
      consultationFee: ['', [Validators.pattern('^[0-9]*$')]]
    },
    {
      validator: [dateRangeValidator('experienceStartDate1','experienceEndDate1'), dateRangeValidator('experienceStartDate2','experienceEndDate2'), dateRangeValidator('experienceStartDate3','experienceEndDate3')]
    });
  }

  
  patchFormValues() {
    
    this.editProfileForm.get('fullName')?.patchValue(this.therapistDetails.fullName);
    this.editProfileForm.get('userName')?.patchValue(this.therapistDetails.userName);
    
    // Check if therapistDetails.qualifications exists and has elements before accessing its properties
    if (this.therapistDetails.qualifications && this.therapistDetails.qualifications.length > 0) {
        this.editProfileForm.get('qualification1')?.patchValue(this.therapistDetails.qualifications[0]?.degree || '');
        if(this.therapistDetails.qualifications.length > 1)
          this.editProfileForm.get('qualification2')?.patchValue(this.therapistDetails.qualifications[1]?.degree || '');
        if(this.therapistDetails.qualifications.length > 2)
        this.editProfileForm.get('qualification3')?.patchValue(this.therapistDetails.qualifications[2]?.degree || '');
    } 

    // Check if therapistDetails.specializations exists and has elements before accessing its properties
    if (this.therapistDetails.specializations && this.therapistDetails.specializations.length > 0) {
        this.editProfileForm.get('specialization1')?.patchValue(this.therapistDetails.specializations[0] || '');
        if(this.therapistDetails.specializations.length > 1)
          this.editProfileForm.get('specialization2')?.patchValue(this.therapistDetails.specializations[1] || '');
        if(this.therapistDetails.specializations.length > 2)
          this.editProfileForm.get('specialization3')?.patchValue(this.therapistDetails.specializations[2] || '');
    }
    /* this.editProfileForm.get('phoneNo')?.patchValue(this.editProfileForm.phoneNo ? this.editProfileForm.phoneNo : '' ); */
    if(this.therapistDetails){
      this.editProfileForm.get('bio')?.patchValue(this.therapistDetails.bio ? this.therapistDetails.bio : '' );
      let length= 0;
      if(this.therapistDetails.experiences){
        length = this.therapistDetails.experiences.length;
        for(let i=0;i<length;i++){
          this.editProfileForm.get(`experienceCompany${i+1}`)?.patchValue( 
            this.therapistDetails.experiences[i].company ? this.therapistDetails.experiences[i].company : '' );
            this.editProfileForm.get(`experienceStartDate${i+1}`)?.patchValue( 
              this.therapistDetails.experiences[i].startDate ? this.formatDate(this.therapistDetails.experiences[i].startDate) : '' );
            this.editProfileForm.get(`experienceEndDate${i+1}`)?.patchValue( 
              this.therapistDetails.experiences[i].endDate ? this.formatDate(this.therapistDetails.experiences[i].endDate) : '' );
        }
        this.editProfileForm.get('consultationFee')?.patchValue(
          this.therapistDetails.consultationFee ? this.therapistDetails.consultationFee : '' );
        this.editProfileForm.get('profileImage')?.patchValue(
          this.therapistDetails.profileImage ? this.therapistDetails.profileImage : '' );
      }
    }

  
}

  private formatDate(date: Date|undefined): string {
    if(date)
      return new Date(date).toISOString().split('T')[0];
    return ''
  }

  async onImageChange(event: Event ){
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if(file){
      //console.log(file);
      const path = `yt/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log('lets check the uploaded image url: ',url);
      this.profileImageSrc = url;
      this.editProfileForm.get('profileImage')?.patchValue(url);
    }
  }

  editProfile(){
    console.log('edit button clicked');
    
    console.log('check editprofileform value: ', this.editProfileForm.value);
    
    this.editProfileSubscription = this.getTherapistDetails.editProfile(this.editProfileForm.value).subscribe({
      next: (res)=>{
        res.message;
        this.editMode= false;
        this.loadTherapistDetails();
        this.editProfileForm.reset();
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
