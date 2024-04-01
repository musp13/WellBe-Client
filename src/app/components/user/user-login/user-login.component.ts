import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUserLoginError } from '../../../states/userAuth/userAuth.selectors';
import { userLogin } from '../../../states/userAuth/userAuth.actions';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  router = inject(Router);
  store = inject(Store);

  error: string|null ='';
  userLoginForm!: FormGroup;

  userErrorSubscription!: Subscription;
  userFormSubscription!: Subscription;

  ngOnInit(): void {
    this.validateForm();
    this.selectStoreValues();
  }

  validateForm(){
    this.userLoginForm = this.fb.group({
      email:  ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    this.userFormSubscription = this.userLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });
  }

  selectStoreValues(){
    this.userErrorSubscription = this.store.select(selectUserLoginError).subscribe( error=>{
      console.log("See for error in login Component: ",error); 
      this.error=error;
    });
  }

  onLogin(){
    console.log('login bttn clicked');
    this.store.dispatch(userLogin(this.userLoginForm.value));
  }

  ngOnDestroy(): void {
    if(this.userErrorSubscription){
      this.userErrorSubscription.unsubscribe();
    }
    if(this.userFormSubscription){
      this.userFormSubscription.unsubscribe();
    }
  }

}
