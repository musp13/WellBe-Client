import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LoadUserProfileDetailsService } from '../../../services/loadUserProfileDetails/load-user-profile-details.service';
import { Subscription } from 'rxjs';
import { UserProfile } from '../../../interfaces/userProfileDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../Validators/noWhitespace.validator';
import { indianPhoneNumberValidator } from '../../../Validators/indianPhoneNumber.validator';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ApiResponse } from '../../../interfaces/apiResponse';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  loadUserprofileDetailsService = inject(LoadUserProfileDetailsService);
  fireStorage = inject(AngularFireStorage);

  loadUserProfileDetailsSubscription!: Subscription;
  editProfileSubscription!: Subscription;

  userProfile!: UserProfile;

  editMode = false;

  fb = inject(FormBuilder);
  editProfileForm!: FormGroup;

  defaultProfileImageSrc = '../../../../assets/images/avatar.png';
  profileImageSrc = '';

  ngOnInit(): void {
    this.loadUserProfileDetails();
    this.initEditForm();
  }

  initEditForm(){
    this.editProfileForm = this.fb.group({
      profileImage: [''],
      fullName: ['', [Validators.required, noWhitespaceValidator()]],
      location: [''],
      phoneNo: ['', [ indianPhoneNumberValidator()]],
      workStatus: [''],
      education: [''],
      bio: ['']
    })
  }

  patchFormValues() {
    this.editProfileForm.get('fullName')?.patchValue(this.userProfile.fullName);
    this.editProfileForm.get('fullName')?.patchValue(this.userProfile.fullName);
    this.editProfileForm.get('location')?.patchValue(this.userProfile.location);
    this.editProfileForm.get('phoneNo')?.patchValue(this.userProfile.phoneNo);
    this.editProfileForm.get('workStatus')?.patchValue(this.userProfile.workStatus);
    this.editProfileForm.get('education')?.patchValue(this.userProfile.education);
    this.editProfileForm.get('bio')?.patchValue(this.userProfile.bio);
  }

  loadUserProfileDetails(){
    this.loadUserProfileDetailsSubscription = this.loadUserprofileDetailsService.loadUserProfileDetails().subscribe({
      next: (res)=>{
        console.log(`let's check user profile details`, res.data); 
        this.userProfile = res.data;

        if (this.userProfile.profileImage=='avatar.png') {
          this.profileImageSrc = this.defaultProfileImageSrc;
        }else {
          this.profileImageSrc = this.userProfile.profileImage;
        }

        this.patchFormValues();
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
  }

  toggleEditMode(){
    this.editMode = true;
  }

  saveChanges(){
    console.log('lets check editProfileform values: ', this.editProfileForm.value);
    //console.log(this.editProfileForm.value);
    this.editProfileSubscription = this.loadUserprofileDetailsService.editUserProfile(this.editProfileForm.value).subscribe({
      next: (res)=>{
        this.userProfile = res.data;
        this.editMode = false;
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
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

  ngOnDestroy(): void {
    if (this.loadUserProfileDetailsSubscription) {
      this.loadUserProfileDetailsSubscription.unsubscribe();
    }
    if (this.editProfileSubscription) {
      this.editProfileSubscription.unsubscribe();
    }
  }
}
