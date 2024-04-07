import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CheckUserService } from '../../../services/checkUser/check-user.service';
import { Subscription } from 'rxjs';
import { userLogout } from '../../../states/userAuth/userAuth.actions';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent implements OnInit, OnDestroy {
  //isLoggedIn = true;
  router = inject(Router);
  store = inject(Store);

  checkUserService = inject(CheckUserService);

  isLoggedIn:boolean = false; //this.checkUserService.isLoggedIn();
  isLocalStorageLoaded = false; // Initially set to false

  loginCheckSubscription!: Subscription;

  ngOnInit(): void {
    // Check if user is logged in when the component initializes
    this.isLoggedIn = this.checkUserService.isLoggedIn();

    // Additional check for localStorage data
    if (typeof localStorage!=='undefined') {
      this.isLocalStorageLoaded = true;
    }

    this.loginCheckSubscription = this.checkUserService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.checkUserService.isLoggedIn();
    });
    
  }

  onUserLogout(){
    this.store.dispatch(userLogout());
  }

  ngOnDestroy(): void {
    if(this.loginCheckSubscription){
      this.loginCheckSubscription.unsubscribe();
    }
  }
}
