import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '../../../interfaces/user';
import { Therapist } from '../../../interfaces/therapist';
import { GetUserListService } from '../../../services/getUserList/get-user-list.service';
import { GetTherapistListService } from '../../../services/getTherapistList/get-therapist-list.service';
import { Subscription } from 'rxjs';
import { TherapistManageService } from '../../../services/therapistManage/therapist-manage.service';
import { EncryptionService } from '../../../services/encryption/encryption.service';
import { Store } from '@ngrx/store';
import { therapistReset } from '../../../states/therapistAuth/therapistAuth.actions';
import { UserManageService } from '../../../services/userManage/user-manage.service';
import { userReset } from '../../../states/userAuth/userAuth.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit, OnDestroy {
  @Input() userType: string = '';

  userList: Array<User|Therapist> = [];
  displayUsers: Array<User|Therapist> = [];
  searchUser:string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  
  getUserListService = inject(GetUserListService);
  getTherapistListService = inject(GetTherapistListService);
  therapistManageService = inject(TherapistManageService);
  userManageService = inject(UserManageService);
  encryptionService = inject(EncryptionService);
  store = inject(Store);
  
  getUserListSubscription!: Subscription;
  therapistApproveSubscription!: Subscription;
  userBlockSubscription!: Subscription;
  deleteUserSubscription!: Subscription;
  //getTherapistListSubscription!: Subscription;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    if(this.userType === 'therapist')
    {
      this.getUserListSubscription = this.getTherapistListService.getTherapistList().subscribe({
        next: (res)=>{
          this.userList = res.data.therapistList as Therapist[];
          console.log('check userlist', this.userList);
          
          this.loadView();
        },
        error: (err)=>{
          console.log(err.error.message);    
        }
      })
    }
    else if(this.userType === 'user')
    {
      this.getUserListSubscription = this.getUserListService.getUserList().subscribe({
        next: (res)=>{
          this.userList = res.data.userList as User[];
          this.loadView();
        },
        error: (err)=>{
          console.log(err.error.message);
        }
      })
    }
  }

  loadView()
  {
    const startIndex = (this.currentPage-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayUsers = this.userList.filter( user => 
        user.userName.toLowerCase().includes(this.searchUser.toLowerCase())
    ).slice(startIndex, endIndex);

    /* if(this.searchUser.trim()==='')
    {
      this.searchUser = '';
      this.displayUsers= this.userList;
      
    }
    else
    {
      this.displayUsers = this.userList.filter( user=> 
          user.userName.toLowerCase().includes(this.searchUser.toLowerCase())
        ) as User[]|Therapist[];
    } */
    /* -----------old------ */
    /* this.displayUsers = this.searchUser.trim() === '' ?
      this.userList :
      this.userList.filter(user => user.userName.toLowerCase().includes(this.searchUser.toLowerCase()));
 */

  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.loadView();
  }

  getTotalItems(): number {
    return this.userList.filter(user =>
        user.userName.toLowerCase().includes(this.searchUser.toLowerCase())
    ).length;
  }

  getTotalPages() : number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  isTherapist(user: User | Therapist): user is Therapist {
    return (user as Therapist).isApproved !== undefined;
  }

  therapistApproveToggle(therapistId: string, isApproved: boolean|undefined){
    const action = isApproved? "Undo Approve" : "Approve";
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${action}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action}!`
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmTherapistApproveToggle(therapistId);
      }
    });  
  }
  confirmTherapistApproveToggle(therapistId: string){
    console.log('Approve button cliccked');
    
    this.therapistApproveSubscription = this.therapistManageService.approveToggle(therapistId).subscribe({
      next: (res)=>{
        this.loadUsers();
        //this.loadView();
      },
      error: (err)=>{
        console.log(err.error.message);
        
      }
    })
  }

  userBlockToggle(userId: string, isBlocked:boolean|undefined){
    const action = isBlocked? "Unblock" : "Block";
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${action} user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action}!`
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmUserBlockToggle(userId);
      }
    });  
        
  }
  confirmUserBlockToggle(userId: string){
    if (this.userType==='therapist') {
      this.userBlockSubscription = this.therapistManageService.blockToggle(userId).subscribe({
        next: (res)=>{
          if(typeof localStorage!='undefined'){
            const encryptedId = localStorage.getItem("therapistId");
            if(encryptedId){
              const decryptedId = this.encryptionService.decrypt(encryptedId);
              if(decryptedId === userId)
                {
                  localStorage.removeItem("therapistId");
                  localStorage.removeItem("therapist_access_token");
                  this.store.dispatch(therapistReset());
                }
            }
          }
          this.loadUsers();
        },
        error: (err)=>{
          console.log(err.error.message);
        }
      })
    }
    else if (this.userType==='user') {
      this.userBlockSubscription = this.userManageService.blockToggle(userId).subscribe({
        next: (res)=>{
          if(typeof localStorage!='undefined'){
            const encryptedId = localStorage.getItem("userId");
            if(encryptedId){
              const decryptedId = this.encryptionService.decrypt(encryptedId);
              if(decryptedId === userId)
                {
                  localStorage.removeItem("userId");
                  localStorage.removeItem("user_access_token");
                  this.store.dispatch(userReset());
                }
            }
          }
          this.loadUsers();
        },
        error: (err)=>{
          console.log(err.error.message);
        }
      })
    }
  }

  deleteUser(userId: string){
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete!`
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeleteUser(userId);
      }
    });
  }
  confirmDeleteUser(userId: string){
    if (this.userType==='therapist') {
      this.deleteUserSubscription = this.therapistManageService.deleteUser(userId).subscribe({
        next: (res)=>{
          if(typeof localStorage!='undefined'){
            const encryptedId = localStorage.getItem("therapistId");
            if(encryptedId){
              const decryptedId = this.encryptionService.decrypt(encryptedId);
              if(decryptedId === userId)
                {
                  localStorage.removeItem("therapistId");
                  localStorage.removeItem("therapist_access_token");
                  this.store.dispatch(therapistReset());
                }
            }
          }
          this.loadUsers();
        },
        error: (err)=>{
          console.log(err.error.message);
        }
      })
    }
    else if (this.userType==='user') {
      this.deleteUserSubscription = this.userManageService.deleteUser(userId).subscribe({
        next: (res)=>{
          if(typeof localStorage!='undefined'){
            const encryptedId = localStorage.getItem("userId");
            if(encryptedId){
              const decryptedId = this.encryptionService.decrypt(encryptedId);
              if(decryptedId === userId)
                {
                  localStorage.removeItem("userId");
                  localStorage.removeItem("user_access_token");
                  this.store.dispatch(userReset());
                }
            }
          }
          this.loadUsers();
        },
        error: (err)=>{
          console.log(err.error.message);
        }
      })
    }
  }
  
  ngOnDestroy(): void {
    if(this.getUserListSubscription)
    {
      this.getUserListSubscription.unsubscribe();
    }
    if(this.therapistApproveSubscription)
      {
        this.therapistApproveSubscription.unsubscribe();
      }
    if(this.userBlockSubscription)
      {
        this.userBlockSubscription.unsubscribe();
      }
    if(this.deleteUserSubscription){
      this.deleteUserSubscription.unsubscribe();
    }
  }
}
