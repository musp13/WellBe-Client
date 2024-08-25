import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTherapistsComponent } from './view-therapists.component';

describe('ViewTherapistsComponent', () => {
  let component: ViewTherapistsComponent;
  let fixture: ComponentFixture<ViewTherapistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTherapistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTherapistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
