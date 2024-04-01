import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistHeaderComponent } from './therapist-header.component';

describe('TherapistHeaderComponent', () => {
  let component: TherapistHeaderComponent;
  let fixture: ComponentFixture<TherapistHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TherapistHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TherapistHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
