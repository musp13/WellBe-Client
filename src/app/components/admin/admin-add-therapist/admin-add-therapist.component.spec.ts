import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTherapistComponent } from './admin-add-therapist.component';

describe('AdminAddTherapistComponent', () => {
  let component: AdminAddTherapistComponent;
  let fixture: ComponentFixture<AdminAddTherapistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddTherapistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddTherapistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
