import { TestBed } from '@angular/core/testing';

import { VideoSignalingService } from './video-signaling.service';

describe('VideoSignalingService', () => {
  let service: VideoSignalingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoSignalingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
