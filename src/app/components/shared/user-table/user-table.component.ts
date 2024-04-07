import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '../../../interfaces/user';
import { Therapist } from '../../../interfaces/therapist';
import { GetUserListService } from '../../../services/getUserList/get-user-list.service';
import { GetTherapistListService } from '../../../services/getTherapistList/get-therapist-list.service';
import { Subscription } from 'rxjs';

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
  
  getUserListSubscription!: Subscription;
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

  approve(therapistId: string){
    
  }

  disapprove(therapistId: string){

  }

  
  ngOnDestroy(): void {
    if(this.getUserListSubscription)
    {
      this.getUserListSubscription.unsubscribe();
    }
  }
}
