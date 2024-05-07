import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TherapistViewAppointmentsService } from '../../../services/therapistViewAppointments/therapist-view-appointments.service';
import { Subscription } from 'rxjs';
import { TherapistAppointmentDetails } from '../../../interfaces/therapistAppointmentDetails';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-therapist-appointment-list',
  templateUrl: './therapist-appointment-list.component.html',
  styleUrl: './therapist-appointment-list.component.css'
})
export class TherapistAppointmentListComponent implements OnInit, OnDestroy {
  therapistViewAppointmentsService = inject(TherapistViewAppointmentsService);

  getAppointmentListSubscription !: Subscription;
  cancelAppointmentSubscription !: Subscription;
  getCancelledAppointmentsSubscription!: Subscription;

  appointmentList !: TherapistAppointmentDetails[];
  displayList!:TherapistAppointmentDetails[];
  cancelledAppointmentList!:TherapistAppointmentDetails[];
  itemsPerPage=3;
  currentPage=1;
  totalPages=0;

  ngOnInit(): void {
    this.getAppointmentList();
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
    this.getAppointmentListSubscription = this.therapistViewAppointmentsService.getAppointmentList().subscribe({
      next: (res)=>{
        console.log('appointmentList: ', res.data);
        this.appointmentList = res.data;
        this.getTotalPages();
        this.getCurrentPageAppointments();
      },
      error: (err)=>{
        console.log(err.error.message);   
      }
    })
  }

  getTotalPages(){
    this.totalPages = Math.ceil(this.appointmentList.length/this.itemsPerPage);
  }

  getCurrentPageAppointments(){
    const startIndex = (this.currentPage-1)*this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayList = this.appointmentList.slice(startIndex, endIndex);
  }

  prevPage(){
    if(this.currentPage>1){
      this.currentPage--;
      this.getCurrentPageAppointments();
    }
  }

  nextPage(){
    if(this.currentPage<this.totalPages){
      this.currentPage++;
      this.getCurrentPageAppointments();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({length: this.totalPages}, (_,i)=> i+1);
  }

  getCurrentPageAppointents(page:number){
    this.currentPage=page;
    this.getCurrentPageAppointments();
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
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F7AB1E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel!',
      cancelButtonText: 'No'
    }).then((result)=>{
      if(result.isConfirmed){
        this.confirmCancelAppointment(appointmentId);
      }
    })
    
  }

  confirmCancelAppointment(appointmentId: string){
    this.cancelAppointmentSubscription = this.therapistViewAppointmentsService.cancelAppointment(appointmentId).subscribe({
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
    this.getCancelledAppointmentsSubscription = this.therapistViewAppointmentsService.getCancelledAppointments().subscribe({
      next: (res)=>{
        console.log(res.data);
        this.cancelledAppointmentList=res.data;
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
  }
}
