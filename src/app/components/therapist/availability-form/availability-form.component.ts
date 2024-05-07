import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { atLeastOneShiftSelectedValidator } from '../../../Validators/atLeastOneShiftSelected.validator';
import { TherapistAvailabilityService } from '../../../services/therapistAvailability/therapist-availability.service';
import { Subscription } from 'rxjs';
import { Availability } from '../../../interfaces/availability';

@Component({
  selector: 'app-availability-form',
  templateUrl: './availability-form.component.html',
  styleUrl: './availability-form.component.css'
})
export class AvailabilityFormComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  availabilityForm!: FormGroup;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  successMessage = '';
  errorMessage = '';
  availableDays!: Availability[];
  
  availabilityService = inject(TherapistAvailabilityService);
  setAvailabilitySubscription !: Subscription;
  availabilityFormSubscription!: Subscription;
  getAvailabilitySubscription!: Subscription;
  
  ngOnInit() {
    this.getAvailability();
    this.initializeAvailabilityForm();
  }

  getAvailability() {    
    this.getAvailabilitySubscription = this.availabilityService.getAvailability().subscribe({
      next: (res)=>{
        this.availableDays = res.data;
        console.log(this.availableDays);
        this.patchFormWithAvailabilityData();
      },
      error: (err)=>{
        console.log(err.error.message);        
      }
    })
  }

  initializeAvailabilityForm() {
    const controls = this.days.reduce((acc, day) => ({
      ...acc,
      [`${day.toLowerCase()}Morning`]: [false],
      [`${day.toLowerCase()}Afternoon`]: [false]
    }), {});

    this.availabilityForm = this.fb.group(controls, {validator: atLeastOneShiftSelectedValidator()});

    this.availabilityFormSubscription = this.availabilityForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
    });
  }
 
  patchFormWithAvailabilityData() {
    /* this.availableDays.forEach(slot =>{
      const controlName = `${slot.day.toLocaleLowerCase()}${slot.startTime==='9:00 AM'? 'Morning' : 'Afternoon'}`;
      this.availabilityForm.get(controlName)?.patchValue(true);
    }) */
    this.availableDays.forEach(dayAvailability => {
      const shift = dayAvailability.shift;
      const dayLower = dayAvailability.day.toLowerCase();

      switch (shift) {
        case 'morning':
          this.toggleShift(dayLower, 'Morning', true);
          break;
        case 'afternoon':
          this.toggleShift(dayLower, 'Afternoon', true);
          break;
        case 'fullDay':
          this.toggleShift(dayLower, 'Morning', true);
          this.toggleShift(dayLower, 'Afternoon', true);
          break;
      }
    })
  }

  toggleShift(dayLower: string, shift: string, value: boolean)
  {
    const controlName = `${dayLower}${shift}`;
    this.availabilityForm.get(controlName)?.patchValue(value);
  }

  saveAvailability() {
    console.log(this.availabilityForm.value);

    const availability: Availability[] = [];
    this.days.forEach( day=> {
      const morningSelected = this.availabilityForm.get(`${day.toLowerCase()}Morning`)?.value;
      const afternoonSelected = this.availabilityForm.get(`${day.toLowerCase()}Afternoon`)?.value;

      if(morningSelected && afternoonSelected) {
        const fullDayAvailability = {
          day,
          slotNumbers : [1,2,3,4,5,6,7,8],
          shift : 'fullDay'
        };
        availability.push(fullDayAvailability);
      }
      else if(morningSelected) {
        const morningAvailabilityObj = {
          day,
          slotNumbers : [1,2,3,4],
          shift : 'morning'
        };
        availability.push(morningAvailabilityObj);
      }
      else if(afternoonSelected) {
        const afternoonAvailabilityObj = {
          day,
          slotNumbers : [5,6,7,8],
          shift : 'afternoon'
        };
        availability.push(afternoonAvailabilityObj);
      }
    });

    this.setAvailabilitySubscription = this.availabilityService.setAvailability(availability).subscribe({
                                          next: (res)=>{
                                              //alert('successfully added availability');
                                              this.successMessage=res.message;
                                              this.errorMessage = '';
                                          },
                                          error: (err) =>{
                                            this.errorMessage = err.error.message;
                                            this.successMessage = '';
                                            console.log(err.error.message);
                                            
                                          }
                                        })
  }

  ngOnDestroy(): void {
    if(this.setAvailabilitySubscription) {
      this.setAvailabilitySubscription.unsubscribe();
    }
    if (this.availabilityFormSubscription) {
      this.availabilityFormSubscription.unsubscribe();
    }
    if (this.getAvailabilitySubscription) {
      this.getAvailabilitySubscription.unsubscribe();
    }
  }

}
