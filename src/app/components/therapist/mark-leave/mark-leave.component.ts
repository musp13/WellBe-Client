import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { leaveFormValidator } from '../../../Validators/leaveForm.validator';
import { TherapistAddLeaveService } from '../../../services/therapistAddLeave/therapist-add-leave.service';
import { Subscription } from 'rxjs';
import { LeaveData } from '../../../interfaces/leaveData';

@Component({
  selector: 'app-mark-leave',
  templateUrl: './mark-leave.component.html',
  styleUrl: './mark-leave.component.css'
})
export class MarkLeaveComponent  implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  leaveForm!: FormGroup;

  successMessage = '';
  errorMessage = '';
  tomorrowDate!: string;
  leaveDates!: LeaveData[];

  addLeaveService = inject(TherapistAddLeaveService);
  addLeaveSubscription!: Subscription;
  getLeaveSubscription!: Subscription;
  removeLeaveSubscription!: Subscription;
  leaveFormSubscription!: Subscription;

  ngOnInit(): void {
    this.getLeave();
    this.setTomorrowDate();
    this.leaveForm = this.fb.group({
      leaveDate: ['', Validators.required], 
      morningShift: [false],
      afternoonShift: [false]
    },
    { validator: leaveFormValidator});

    this.leaveFormSubscription = this.leaveForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
    });
  }

  setTomorrowDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrowDate = tomorrow.toISOString().split('T')[0];
  }


  submitLeave() { 
    const formData = this.leaveForm.value;
    console.log(formData);
    let startTime = '';
    let endTime = '';
    let shift = '';

    if(formData.morningShift && formData.afternoonShift) {
      startTime = '9:00 AM';
      endTime = '6:00 PM';
      shift = 'fullDay';
    }
    else {
      startTime = formData.morningShift? '9:00 AM' : '2:00 PM';
      endTime = formData.morningShift? '1:00 PM' : '6:00 PM';
      shift = formData.morningShift? 'morning' : 'afternoon';
    }

    const leaveData: LeaveData = {
      leaveDate: formData.leaveDate,
      startTime: startTime,
      endTime: endTime,
      shift: shift
    }

    this.addLeaveSubscription = this.addLeaveService.addLeave(leaveData).subscribe({
      next: (res)=>{
        console.log(res.message);
        this.successMessage=res.message;
        this.errorMessage = '';
        this.getLeave();
        //this.leaveForm.reset();
        /* this.leaveForm.get('leaveDate')?.patchValue('');
        this.leaveForm.get('morningShift')?.patchValue('');
        this.leaveForm.get('afternoonShift')?.patchValue(''); */
        
      },
      error: (err)=>{
        console.log(err.error.message);
        this.errorMessage = err.error.message;
        this.successMessage = '';
      }
    })
    
  }

  getLeave(){
    this.getLeaveSubscription = this.addLeaveService.getLeave().subscribe({
      next: (res)=>{
        this.leaveDates = res.data;
        console.log('leaveDates: ', this.leaveDates);
        
      },
      error: (err)=>{
        console.log(err.error.message);
        
      }
    })
  }

  removeLeave(leave : LeaveData){
    const date = new Date(leave.leaveDate);
    this.removeLeaveSubscription = this.addLeaveService.removeLeaveDate(date).subscribe({
      next: (res)=>{
        this.getLeave();        
      },
      error: (err)=>{
        console.log(err.error.message);
        
      }
    })
  }

  ngOnDestroy(): void {
    if (this.addLeaveSubscription) {
      this.addLeaveSubscription.unsubscribe();
    }
    if(this.leaveFormSubscription) {
      this.leaveFormSubscription.unsubscribe();
    }
    if(this.getLeaveSubscription){
      this.getLeaveSubscription.unsubscribe();
    }
    if (this.removeLeaveSubscription) {
      this.removeLeaveSubscription.unsubscribe();
    }
  }
}
