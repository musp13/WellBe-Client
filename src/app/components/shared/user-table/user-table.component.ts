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
    if(this.searchUser.trim()==='')
    {
      this.searchUser = '';
      this.displayUsers= this.userList;
      
    }
    else
    {
      this.displayUsers = this.userList.filter( user=> 
          user.userName.toLowerCase().includes(this.searchUser.toLowerCase())
        ) as User[]|Therapist[];
    }
    /* this.displayUsers = this.searchUser.trim() === '' ?
      this.userList :
      this.userList.filter(user => user.userName.toLowerCase().includes(this.searchUser.toLowerCase()));
 */

  }

  isTherapist(user: User | Therapist): user is Therapist {
    return (user as Therapist).isApproved !== undefined;
  }

  therapistApproveToggle(therapistId: string, isApproved: boolean|undefined){
    const action = isApproved? "Undo Approve" : "Approve";
    if(confirm(`Are you sure you want to ${action}`)) {
      this.confirmTherapistApproveToggle(therapistId);
    }   
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
    if(confirm(`Are you sure you want to ${action} user`)) {
      this.confirmUserBlockToggle(userId);
    }     
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
    if(confirm(`Are you sure you want to delete user`)) {
      this.confirmDeleteUser(userId);
    }  
    else return;
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
