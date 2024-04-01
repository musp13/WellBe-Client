import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddTherapistService } from '../../../services/addTherapist/add-therapist.service';

@Component({
  selector: 'app-admin-add-therapist',
  templateUrl: './admin-add-therapist.component.html',
  styleUrl: './admin-add-therapist.component.css'
})
export class AdminAddTherapistComponent {
  fb = inject(FormBuilder);
  addTherapistService = inject(AddTherapistService);

  addTherapistForm!: FormGroup;
  message: String = '';
  addTherapist()
  {

  }
}
