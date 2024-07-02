import { TestBed } from '@angular/core/testing';

import { WebrtcVideoCallApiCallsService } from './webrtc-video-call-api-calls.service';

describe('WebrtcVideoCallApiCallsService', () => {
  let service: WebrtcVideoCallApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebrtcVideoCallApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
