import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallTravComponent } from './video-call-trav.component';

describe('VideoCallTravComponent', () => {
  let component: VideoCallTravComponent;
  let fixture: ComponentFixture<VideoCallTravComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoCallTravComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoCallTravComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
