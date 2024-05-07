import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AppointmentDetailsService } from '../../../services/appointmentDetails/appointment-details.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppointmentDetails } from '../../../interfaces/appointmentDetails';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent implements OnInit, OnDestroy {
  appointmentDetailsService = inject(AppointmentDetailsService);
  activatedRoute = inject(ActivatedRoute);

  getAppointmentDetailsSubscription !: Subscription;
  activatedRouteSubscription! : Subscription;

  userType='';
  appointmentId='';
  appointmentDetails!: AppointmentDetails;

  ngOnInit(): void {
    this.getAppointmentIdAndUserType();
    this.getAppointmentDetails();
  }

  ngOnDestroy(): void {
    if (this.getAppointmentDetailsSubscription) {
      this.getAppointmentDetailsSubscription.unsubscribe();
    }
  }

  getAppointmentIdAndUserType(){
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe( value=> {
      this.appointmentId = value['appointmentId'];
      this.userType= value['userType'];
    })
  }
  
  getAppointmentDetails(){
    if (this.userType==='user') {
      this.getAppointmentDetailsSubscription = this.appointmentDetailsService.getUserAppointmentDetails(this.appointmentId)
                                      .subscribe({
                                        next: (res)=>{
                                          console.log(res.message); 
                                          this.appointmentDetails= res.data; 
                                        },
                                        error: (err)=>{
                                          console.log(err.error.message);                             
                                        }
                                      })
    }
    if (this.userType==='therapist') {
      this.getAppointmentDetailsSubscription = this.appointmentDetailsService.getTherapistAppointmentDetails(this.appointmentId)
                                      .subscribe({
                                        next: (res)=>{
                                          console.log(res.message); 
                                          this.appointmentDetails= res.data; 
                                        },
                                        error: (err)=>{
                                          console.log(err.error.message);                             
                                        }
                                      })
    }
    
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
}
