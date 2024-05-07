import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserViewAppointmentsService } from '../../../services/userViewAppointments/user-view-appointments.service';
import { Subscription } from 'rxjs';
import { UserAppointmentDetails } from '../../../interfaces/userAppointmentDetails';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.css'
})
export class AppointmentsListComponent implements OnInit, OnDestroy {
  userViewAppointmentsService = inject(UserViewAppointmentsService);

  getAppointmentListSubscription!: Subscription;
  cancelAppointmentSubscription!: Subscription;
  getCancelledAppointmentsSubscription!: Subscription;
  
  appointmentList!: UserAppointmentDetails[];
  displayList!:UserAppointmentDetails[];
  cancelledAppointmentList!:UserAppointmentDetails[];
  itemsPerPage=3;
  currentPage=1;
  totalPages=0;

  ngOnInit(): void {
    this.getAppointmentList();
    this.getTotalPages();
    this.getCancelledAppointments();
  }

  ngOnDestroy(): void {
    if (this.getAppointmentListSubscription) {
      this.getAppointmentListSubscription.unsubscribe();
    }
    if (this.cancelAppointmentSubscription) {
      this.cancelAppointmentSubscription.unsubscribe();
    }
    if (this.getCancelledAppointmentsSubscription) {
      this.getCancelledAppointmentsSubscription.unsubscribe();
    }
  }

  getAppointmentList(){
    this.getAppointmentListSubscription = this.userViewAppointmentsService.getAppointmentList().subscribe({
      next: (res)=>{
        console.log(res.data);
        this.appointmentList = res.data;
        this.getTotalPages();
        this.displayList=this.getCurrentPageAppointments();
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
  }
  
  getTotalPages(){
    if(this.appointmentList){
      this.totalPages = Math.ceil(this.appointmentList.length/this.itemsPerPage); 
    }
  }

  getCurrentPageAppointments(){
    const startIndex = (this.currentPage-1)*this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.appointmentList.slice(startIndex, endIndex);
  }
  
  prevPage(){
    if(this.currentPage>1){
      this.currentPage--;
      this.displayList=this.getCurrentPageAppointments();
    }
  }

  nextPage(){
    if(this.currentPage<this.totalPages){
      this.currentPage++;
      this.displayList=this.getCurrentPageAppointments();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({length: this.totalPages}, (_,i)=> i+1);
  }

  getCurrentPageAppointents(page:number){
    this.currentPage=page;
    this.displayList=this.getCurrentPageAppointments();
  }

  getFormattedTime(slot:number) {
    switch(slot) {
      case 1 : return '09:00 AM - 10:00 AM';
      case 2 : return '10:00 AM - 11:00 AM';
      case 3 : return '11:00 AM - 12:00 PM';
      case 4 : return '12:00 PM - 01:00 PM';
      case 5 : return '02:00 PM - 03:00 PM';
      case 6 : return '03:00 PM - 04:00 PM';
      case 7 : return '04:00 PM - 05:00 PM';
      case 8 : return '05:00 PM - 06:00 PM';
      default: return 'No slot selected';
    }
  }

  cancelAppointment(appointmentId: string){
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to cancel the appointment?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F7AB1E",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Cancel!`,
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmCancelAppointment(appointmentId);
      }
    });  
  }

  confirmCancelAppointment(appointmentId: string){
    this.cancelAppointmentSubscription = this.userViewAppointmentsService.cancelAppointment(appointmentId).subscribe({
      next: (res)=>{
        console.log(res.message);
        this.getAppointmentList();
        this.getCancelledAppointments();
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
  }

  getCancelledAppointments(){
    this.getCancelledAppointmentsSubscription = this.userViewAppointmentsService.getCancelledAppointments().subscribe({
      next: (res)=>{
        console.log(res.data);
        //this.appointmentList = res.data;
        //this.getTotalPages();
        this.cancelledAppointmentList=res.data;
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
  }
}
