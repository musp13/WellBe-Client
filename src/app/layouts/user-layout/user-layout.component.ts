import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CheckUserService } from '../../services/checkUser/check-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  isLoggedIn:boolean = false;
  checkUserService = inject(CheckUserService);

  loginCheckSubscription!: Subscription;

  ngOnInit(){
    this.isLoggedIn = this.checkUserService.isLoggedIn();
    this.loginCheckSubscription = this.checkUserService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.checkUserService.isLoggedIn();
    });
  }

  ngOnDestroy(): void {
    if(this.loginCheckSubscription){
      this.loginCheckSubscription.unsubscribe();
    }
  }

}
