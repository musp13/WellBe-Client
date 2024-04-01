import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAdmin, selectAdminLoginError } from '../../../states/adminAuth/adminAuth.selectors';
import { Admin } from '../../../interfaces/admin';
import { adminLogin } from '../../../states/adminAuth/adminAuth.actions';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  fb = inject(FormBuilder);
  router = inject(Router);
  store = inject(Store);

  error: string|null = '';
  admin!: Admin|null;
  adminLoginForm!: FormGroup;

  adminSubscription!: Subscription;
  adminErrorSubscription!: Subscription;
  adminFormSubscription!: Subscription;

  ngOnInit(): void {
    this.validateForm();
    this.selectStoreValues();

  }

  validateForm()
  {
    this.adminLoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    this.adminFormSubscription = this.adminLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });
  
  }

  selectStoreValues()
  {
    this.adminSubscription = this.store.select(selectAdmin).subscribe( admin=>{
      console.log("See if admin exists in login Component: ",admin); 
      this.admin=admin;
    })
    this.adminErrorSubscription = this.store.select(selectAdminLoginError).subscribe( error=>{
      console.log("See for error in login Component: ",error); 
      this.error=error;
    });
    /* this.store.select(selectAdminLoginError)
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe(error=>{
                this.error = error; 
                console.log(error);
              });

    this.store.select(selectAdmin)
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe( admin=>{
                this.admin = admin;
                if(admin){
                  this.adminLoginForm.reset();
                }
              }); */
  }

  onLogin()
  {
    console.log('login bttn clicked');
    this.store.dispatch(adminLogin(this.adminLoginForm.value));
  }

  ngOnDestroy(): void {
    /* this.unsubscribe$.next();
    this.unsubscribe$.complete(); */
    if(this.adminSubscription){
      this.adminSubscription.unsubscribe();
    }
    if(this.adminErrorSubscription){
      this.adminErrorSubscription.unsubscribe();
    }
    if(this.adminFormSubscription){
      this.adminFormSubscription.unsubscribe();
    }
  }

}


