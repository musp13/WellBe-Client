import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAdmin } from '../../../states/adminAuth/adminAuth.selectors';
import { Admin } from '../../../interfaces/admin';
import { adminLogout } from '../../../states/adminAuth/adminAuth.actions';
import { CheckAdminService } from '../../../services/checkAdmin/check-admin.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  router = inject(Router);
  store = inject(Store);
  checkAdminService = inject(CheckAdminService);
  isDropdownOpen = false;
  currentPage='';
  admin!:Admin|null;
  isMobileMenuOpen: boolean = false;
  adminId:String|null = null;
  isLoggedIn:boolean = this.checkAdminService.isLoggedInLocalStorage();
  
  adminSubscription!: Subscription;
  loginCheckSubscription!: Subscription;

  ngOnInit(): void {
    //this.checkCurrentPage();
    if(typeof localStorage !='undefined')
    this.adminId = localStorage.getItem('adminId');

    this.adminSubscription = this.store.select(selectAdmin).subscribe( admin=>{
      console.log("See if admin exists: ",admin); 
      this.admin=admin;
    });
    
    this.loginCheckSubscription = this.checkAdminService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.checkAdminService.isLoggedInLocalStorage();
    });
    
  }

  checkCurrentPage()
  {
    
  }

  onAdminLogout()
  {
    this.store.dispatch(adminLogout());
    
  }
  /* toggleDropdown()
  {
    console.log('toggle butn clicked');
    
    this.isDropdownOpen = !this.isDropdownOpen;
  } */
  toggleMobileMenu()
  {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  ngOnDestroy(): void {
    if(this.adminSubscription){
      this.adminSubscription.unsubscribe();
    }
    if(this.loginCheckSubscription){
      this.loginCheckSubscription.unsubscribe();
    }
  }
}
