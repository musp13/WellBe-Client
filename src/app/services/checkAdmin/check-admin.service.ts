import { Injectable, OnDestroy, inject, PLATFORM_ID  } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAdmin } from '../../states/adminAuth/adminAuth.selectors';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminService {
  //private adminSubscription!: Subscription;
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  store = inject(Store);
  platformId=inject(PLATFORM_ID);
  //isLoggedIn = false;

  constructor() { };

  isLoggedInLocalStorage()
  {
    return typeof localStorage!=='undefined' && !!localStorage.getItem("admin_access_token");
  }

  isAdminLoggedIn()
  {
    console.log('hello, inside check logged in function');
    /* return this.store.select(selectAdmin).pipe(
      take(1),
      map(admin=> !!admin)
    ); */
    if (isPlatformBrowser(this.platformId)) {
      const adminId = localStorage.getItem('admin_access_token');
      return !!adminId;
    }
    return false;
  }

  
}


/* this.adminSubscription = this.store.select(selectAdmin).subscribe(admin=>{
      if(admin)
      {
        console.log(admin);
        
        console.log('admin is logged in');
        this.isLoggedIn = true;
        //return true;
      }
      else
      {
        console.log(admin);
        console.log('admin is logged out');
          this.isLoggedIn=false;
          //return false;
      }
    })
    return this.isLoggedIn; */

    /* ngOnDestroy(): void {
    if(this.adminSubscription) {
      this.adminSubscription.unsubscribe();
    }
  } */