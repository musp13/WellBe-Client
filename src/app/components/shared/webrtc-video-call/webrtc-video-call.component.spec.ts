import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebrtcVideoCallComponent } from './webrtc-video-call.component';

describe('WebrtcVideoCallComponent', () => {
  let component: WebrtcVideoCallComponent;
  let fixture: ComponentFixture<WebrtcVideoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebrtcVideoCallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebrtcVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
