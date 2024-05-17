import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookAppointmentService } from '../../../services/bookAppointment/book-appointment.service';
import { Subscription, max } from 'rxjs';
import { AppointmentFormDetails } from '../../../interfaces/appointmentFormDetails';
import { indianPhoneNumberValidator } from '../../../Validators/indianPhoneNumber.validator';
import { AvailabilityDetails } from '../../../interfaces/availabilityDetails';
import { therapistSelectedValidator } from '../../../Validators/appointmentTherapistSelected.validator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EncryptionService } from '../../../services/encryption/encryption.service';
import { ToastrService } from 'ngx-toastr';
import { BookedSlots } from '../../../interfaces/bookedSlots';
import { TimeSlotOption } from '../../../interfaces/timeSlotOption';
import { environment } from '../../../../environments/environment';
import { RazorpayOrder } from '../../../interfaces/razorpayOrder';
import { WindowRefService } from '../../../services/windowRef/window-ref.service';
import { RazorpayOptions } from '../../../interfaces/razorpayOptions';
import Swal from 'sweetalert2';

//declare var Razorpay: any;

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  bookAppointmentService = inject(BookAppointmentService);
  encryptionService = inject(EncryptionService);
  toastr = inject(ToastrService);
  winRef = inject(WindowRefService);

  getFormDetailsSubscription !: Subscription;
  getAvailabilitySubscription !: Subscription;
  therapistValueChangeSubscription !: Subscription;
  bookAppointmentSubscription !: Subscription;
  getBookedSlotSubscription !: Subscription;
  razorpayResponseSubscription !: Subscription;

  appointmentForm!: FormGroup;
  message: String = '';
  error: String = '';
  appointmentFormDetails !: AppointmentFormDetails;
  therapistId = '';
  availabilityDetails !: AvailabilityDetails;
  todayDate!: string;
  tomorrowDate!: string;
  maxDate! : Date;
  timeSlotOptions: TimeSlotOption[] = []; ;
  bookedSlots!: BookedSlots;
  razorpayOrder!: RazorpayOrder;
  

  disabledDates: Date[] = [new Date('2024-04-30'), new Date('2024-05-05')]; // Example disabled dates

  ngOnInit(): void {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.setTomorrowDate();
    this.setMaxDate();


    this.initAppointmentForm();
    this.getAppointmentFormDetails();
    this.getTherapistValue();
    //this.getTherapistAvailability();
  }

  setTomorrowDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrowDate = tomorrow.toISOString().split('T')[0];
  }

  setMaxDate() {
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    //this.maxDate = oneMonthLater.toISOString().split('T')[0];
    this.maxDate = oneMonthLater;
  }


  initAppointmentForm() {
    
    this.appointmentForm = this.fb.group({
      fullName: [{ value: '', disabled: true }, [Validators.required]],
      email: [{value:'', disabled: true}, [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, indianPhoneNumberValidator()]],
      date: [{value: '', disabled: true}, [Validators.required]],//therapistSelectedValidator()
      time: [{value: '', disabled: true}, [Validators.required]],
      therapist: ['', [Validators.required]],
      participants: [{value:'1', disabled: true}, [Validators.required, Validators.min(1), Validators.max(5)]],
      message: ['']
    })
  }

  incrementParticipants() {
    const currentValue = parseInt(this.appointmentForm.get('participants')?.value);
    if(currentValue<5) {
      this.appointmentForm.get('participants')?.setValue(currentValue+1);
    }
  }

  decrementParticipants() {
    const currentValue = parseInt(this.appointmentForm.get('participants')?.value);
    if(currentValue>1) {
      this.appointmentForm.get('participants')?.setValue(currentValue-1);
    }
  }

  getAppointmentFormDetails() {
    this.getFormDetailsSubscription = this.bookAppointmentService.getAppointmentFormDetails().subscribe({
      next: (res)=>{
        console.log(res.data);
        this.appointmentFormDetails = res.data;
        this.patchFormValues();
      },
      error: (err)=>{
        console.log(err.error.message);       
      }
    })
  }

  patchFormValues() {
    
      this.appointmentForm.get('fullName')?.patchValue(this.appointmentFormDetails.fullName);
      this.appointmentForm.get('email')?.patchValue(this.appointmentFormDetails.email);
      this.appointmentForm.get('phoneNo')?.patchValue(this.appointmentFormDetails.phoneNo ? this.appointmentFormDetails.phoneNo : '' );
    
  }

  resetDateTime() {
    this.appointmentForm.get('date')?.patchValue('');
    this.appointmentForm.get('time')?.patchValue('');
  }

  getTherapistValue() {
    const therapistControl = this.appointmentForm.get('therapist');
    if(therapistControl) {
      this.therapistValueChangeSubscription = <Subscription>this.appointmentForm.get('therapist')?.valueChanges.subscribe( therapistId => {
        this.therapistId = therapistId;
        this.getTherapistAvailability();
        this.enableDateField();
      })
    }
    else {
      // Optionally handle the case where the control doesn't exist (e.g., log an error)
      console.error('Therapist control is not available in the form');
  }
    
  }
  getTherapistAvailability() {
    //this.therapistId = this.appointmentForm.value('therapist');
    console.log('therapistId is : ', this.therapistId);
    
    if (this.therapistId) {
      this.getAvailabilitySubscription = this.bookAppointmentService.getTherapistAvailability(this.therapistId).subscribe({
        next: (res)=>{
          this.availabilityDetails = res.data;
          console.log(res.data);
        },
        error: (err)=>{
          console.log(err.error.message);
          
        }
      })
    }
    
  }
  enableDateField() {
    if (this.therapistId) {
      this.appointmentForm.get('date')?.enable();
    }
  }

  enableTimeField() {
    if (this.therapistId) {
      this.appointmentForm.get('time')?.enable();


    }
  }

  filterUnavailableOptions() {
    const availableDays = this.availabilityDetails.availability.map(slot => slot.day);
  }

  filterDates = (date: Date | null) : boolean =>{
    // Check if availabilityDetails is loaded
    if (!this.availabilityDetails || !this.availabilityDetails.availability) {
      return false; // could also return true depending on desired behavior when data isn't yet available
    }

    const availableDays = this.availabilityDetails.availability.map(days => days.day);
    const selectedDay = date?.toLocaleString('en-us', { weekday: 'long'}) || '';
    if(!availableDays.includes(selectedDay)) {
      return false;
    }

    const leaveDays = this.availabilityDetails.leave.filter(leave=> leave.shift==='fullDay');
    const leaveDates = leaveDays.map(leave=>new Date(leave.leaveDate).toDateString());
    //  console.log("leavedays: ",leaveDates);
    if(date && leaveDates.includes(date.toDateString())) {
      return false;
    }

    const leaveDaysMorning = this.availabilityDetails.leave.filter(leave=> leave.shift==='morning');
    const leaveDatesMorning = leaveDaysMorning.map(leave=>new Date(leave.leaveDate).toDateString());
    const isOnlyMorningAvailable = this.availabilityDetails.availability.some(a => a.day === selectedDay && a.shift==='morning');
    if(date && isOnlyMorningAvailable && leaveDatesMorning.includes(date?.toDateString())) {
      return false;
    }

    const leaveDaysAfternoon = this.availabilityDetails.leave.filter(leave=> leave.shift==='afternoon');
    const leaveDatesAfternoon = leaveDaysAfternoon.map(leave=>new Date(leave.leaveDate).toDateString());
    const isOnlyAfternoonAvailable = this.availabilityDetails.availability.some(a => a.day === selectedDay && a.shift==='afternoon');
    if(date && isOnlyAfternoonAvailable && leaveDatesAfternoon.includes(date?.toDateString())) {
      return false;
    }
    
    const today = new Date();
    if(date == null) return false;
    if(date <= today) return false;
    if(date >= this.maxDate) return false;
    return true; 
  }

  onDatePicked(event: MatDatepickerInputEvent<Date>) {
    const pickedDate: Date| null = event.value;
    if(pickedDate) {
      this.enableTimeField();
      this.updateTimeSlotOptions();
    }

    if(pickedDate) {
      //
      this.getBookedSlots(pickedDate);
    }
    
  }

  getBookedSlots(date: Date) {
    const therapistId = this.appointmentForm.get('therapist')?.value;
    this.getBookedSlotSubscription = this.bookAppointmentService.getBookedSlots(therapistId,date).subscribe({
      next: (res)=>{
        console.log(res.message);
        this.bookedSlots = res.data;
        this.updateTimeSlotOptions();
        console.log('bookedSlots:' ,this.bookedSlots);
        
      },
      error: (err)=>{
        console.log(err.error.message);
        
      }
    })
  }

  updateTimeSlotOptions() {
    const selectedDate = this.appointmentForm.get('date')?.value;
    if(selectedDate && this.availabilityDetails) {
      // Filter available time slots based on selected date
      const selectedDay = selectedDate.toLocaleString('en-us', { weekday: 'long'});
      const availabilityForSelectedDay = this.availabilityDetails.availability.find(day=> day.day === selectedDay);
      if(availabilityForSelectedDay) {
        const slotNumbers = availabilityForSelectedDay.slotNumbers;
        console.log(slotNumbers);

        // Generate options for the select element based on available slot numbers
        const options = slotNumbers?.map((slot: number)=> {
          if(this.bookedSlots){
            const isBookedByUser = this.bookedSlots.userBooked.includes(slot);
            const isBookedForTherapist = this.bookedSlots.therapistBooked.includes(slot);
            return {
              value: slot,
              label : this.getFormattedTime(slot),
              disabled: isBookedByUser || isBookedForTherapist,
              bookingStatus: isBookedByUser? "You have booked this slot already" : isBookedForTherapist? "Therapist is booked" : '' 
            };
          }

          return {
            value: slot,
            label: this.getFormattedTime(slot),
            disabled: false,
            bookingStatus: ''
          }
        }
        );
        /* const options = slotNumbers?.map((slot: number)=>{
          const isBookedByUser = this.bookedSlots.userBooked.includes(slot);
          const isBookedForTherapist = this.bookedSlots.therapistBooked.includes(slot);
          return {
            value: slot,
            label : this.getFormattedTime(slot),
            disabled: isBookedByUser || isBookedForTherapist,
            bookingStatus: isBookedByUser? "You have booked this slot already" : isBookedForTherapist? "Therapist is booked" : '' 
          };
        }); */
        

        this.timeSlotOptions = options ? options : [];
        
      }
      else {
        this.appointmentForm.get('time')?.disable();
        this.timeSlotOptions = [];
      }
    }
  }

  getFormattedTime(slot:number) {
    switch(slot) {
      case 1 : return '09:00 AM';
      case 2 : return '10:00 AM';
      case 3 : return '11:00 AM';
      case 4 : return '12:00 PM';
      case 5 : return '02:00 PM';
      case 6 : return '03:00 PM';
      case 7 : return '04:00 PM';
      case 8 : return '05:00 PM';
      default: return 'No slots availabale';
    }
  }

  checkSlotAvailable(){
    const date = this.appointmentForm.get('date')?.value;
    this.getBookedSlots(date);
    const slot = parseInt(this.appointmentForm.get('time')?.value);
    if (this.bookedSlots.userBooked.includes(slot) || this.bookedSlots.therapistBooked.includes(slot)) {
      return false;
    }
    return true;
  }

  checkTherapistValid(){
    this.getAppointmentFormDetails();
    const availableTherapists = this.appointmentFormDetails.therapistList.map(therapist=> therapist._id);
    if(availableTherapists.includes(this.therapistId)){
      return true;
    }else{
      return false;
    }

  }

  /* payNow(){
    if(!this.checkSlotAvailable()){
      this.toastr.error('Your choosen slot is unavailable. Please choose a different slot');
      this.updateTimeSlotOptions();
      return;
    }

    if(!this.checkTherapistValid()){
      this.toastr.error('Therapist is currently unavailable. Please choose a different therapist');
      return;
    }
    
    const razorPayOptions = {
      description: 'WellBe payment fr appointment booking.',
      currency: 'INR',
      amount: this.availabilityDetails.consultationFee? this.availabilityDetails.consultationFee*100 : 1000*100 ,
      name: 'WellBe',
      image: 'https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-2-1/32/green-leaf-512.png',
      order_id: this.razorpayOrder.orderId,
      key: environment.RAZORPAY_KEY_ID,
      prefill: {
        name: this.appointmentFormDetails.fullName ,
        email: this.appointmentFormDetails.email,
        phone: this.appointmentFormDetails.phoneNo ? this.appointmentFormDetails.phoneNo : '' 
      },
      theme: {
        color: '#26ABA3'
      },
      modal: {
        
        onDismiss: ()=>{
          console.log('dismissed');
          
        }
      }
    }

    const successCallBack = (razorpay_response:any)=>{
      //console.log(paymentId);   
      console.log('check razorpay response', razorpay_response);
      
    }

    const failureCallBack = (err: any)=>{
      console.log('check razorpay payment error:',err);
    }

    Razorpay.open(razorPayOptions, successCallBack, failureCallBack);
  } */


  payWithRazor(){
    const options: RazorpayOptions = {
      key: environment.RAZORPAY_KEY_ID,
      amount: this.availabilityDetails.consultationFee? this.availabilityDetails.consultationFee*100 : 1000*100 ,
      currency: 'INR',
      name: 'WellBe',
      description: 'WellBe payment for appointment booking.',
      image: 'https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-2-1/32/green-leaf-512.png',
      order_id: this.razorpayOrder.orderId,
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#26ABA3'
      },
    };

    options.handler = ((response, error)=>{
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
      if(response){
        this.razorpayResponseSubscription = this.bookAppointmentService.processPayment(response, this.razorpayOrder).subscribe({
          next: (res)=>{
            console.log(res.message);
            
            this.appointmentForm.reset();
            this.getAppointmentFormDetails();
            this.getTherapistValue();

            Swal.fire({
              title: "Success!",
              text: "Your Appointment has been Booked!!",
              icon: "success"
            });
              //this.toastr.success('Your Appointment has been Booked!');
            
          },
          error: (err)=>{
            console.log(err.error.message);
            Swal.fire({
              title: "Error!",
              text: "Failed to process payment.",
              icon: "error"
            });
              //this.toastr.error('Failed to process payment.');
            
          }
        })
      } 
      if (error) {
        console.log(error);
        this.toastr.error('Failed to process payment.');
      }
      
    });

    if (options.modal) {
      options.modal.ondismiss = (()=>{
        // handle the case when user closes the form while transaction is in progress
        Swal.fire({
          title: "Error!",
          text: "Your Appointment booking has been cancelled.",
          icon: "error"
        });
        console.log('Transaction cancelled.');
      })
    };

    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();

    
  }

  bookAppointment() {
    console.log(this.appointmentForm.value);
    
    const appointmentObj = {
      //...........aapointment details to submit
      therapistId: this.appointmentForm.value.therapist, // Reference to a Therapist document
      clientId: ((typeof localStorage!=='undefined') && localStorage.getItem('userId')) ? this.encryptionService.decrypt(<string>localStorage.getItem('userId')) : '',
      clientContactNumber: this.appointmentForm.value.phoneNo,
      date: this.appointmentForm.value.date,
      slotNumber: this.appointmentForm.value.time,
      message: this.appointmentForm.value.message,
      //participants: this.appointmentForm.value.participants, // Default is 1
      participants : this.appointmentForm.get('participants')?.value
    }

    this.bookAppointmentSubscription = this.bookAppointmentService.bookAppointment(appointmentObj).subscribe({
      next: (res)=>{
        console.log(res.message);
        this.razorpayOrder = res.data;
        console.log('razorpayOrder:', this.razorpayOrder);
        this.payWithRazor()
        //this.payNow();
        //this.toastr.success('Your Appointment has been Booked!');
      },
      error: (err)=>{
        console.log(err.error.message);
        this.toastr.error(err.error.message);
      }
    })

  }

  ngOnDestroy(): void {
    if (this.getFormDetailsSubscription) {
      this.getFormDetailsSubscription.unsubscribe();
    }
    if (this.getAvailabilitySubscription) {
      this.getAvailabilitySubscription.unsubscribe();
    } 
    if(this.bookAppointmentSubscription) {
      this.bookAppointmentSubscription.unsubscribe();
    }
    if (this.getBookedSlotSubscription) {
      this.getBookedSlotSubscription.unsubscribe();
    }
    if (this.razorpayResponseSubscription) {
      this.razorpayResponseSubscription.unsubscribe();
    }
  
  }
}
