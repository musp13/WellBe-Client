import { TestBed } from '@angular/core/testing';

import { WebRtcCallService } from './web-rtc-call.service';

describe('WebRtcCallService', () => {
  let service: WebRtcCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebRtcCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
