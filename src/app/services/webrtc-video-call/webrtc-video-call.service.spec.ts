import { TestBed } from '@angular/core/testing';

import { WebrtcVideoCallService } from './webrtc-video-call.service';

describe('WebrtcVideoCallService', () => {
  let service: WebrtcVideoCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebrtcVideoCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
