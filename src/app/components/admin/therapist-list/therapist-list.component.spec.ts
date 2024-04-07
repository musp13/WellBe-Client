import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistListComponent } from './therapist-list.component';

describe('TherapistListComponent', () => {
  let component: TherapistListComponent;
  let fixture: ComponentFixture<TherapistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TherapistListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TherapistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
