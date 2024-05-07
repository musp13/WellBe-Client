import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistAppointmentListComponent } from './therapist-appointment-list.component';

describe('TherapistAppointmentListComponent', () => {
  let component: TherapistAppointmentListComponent;
  let fixture: ComponentFixture<TherapistAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TherapistAppointmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TherapistAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
