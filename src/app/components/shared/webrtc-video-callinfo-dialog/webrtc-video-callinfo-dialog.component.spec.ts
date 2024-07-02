import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebrtcVideoCallinfoDialogComponent } from './webrtc-video-callinfo-dialog.component';

describe('WebrtcVideoCallinfoDialogComponent', () => {
  let component: WebrtcVideoCallinfoDialogComponent;
  let fixture: ComponentFixture<WebrtcVideoCallinfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebrtcVideoCallinfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebrtcVideoCallinfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
