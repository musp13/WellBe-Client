import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistLayoutComponent } from './therapist-layout.component';

describe('TherapistLayoutComponent', () => {
  let component: TherapistLayoutComponent;
  let fixture: ComponentFixture<TherapistLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TherapistLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TherapistLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
