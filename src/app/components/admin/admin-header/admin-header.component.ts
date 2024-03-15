import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit {
  isDropdownOpen = false;
  currentPage='';
  router = inject(Router);
  admin=null;

  ngOnInit(): void {
    //this.checkCurrentPage();
  }

  checkCurrentPage()
  {
    
  }

  onAdminLogout()
  {
    
  }
  toggleDropdown()
  {
    console.log('toggle butn clicked');
    
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  mobileMenuClick(event: any)
  {
    
  }
  
}
