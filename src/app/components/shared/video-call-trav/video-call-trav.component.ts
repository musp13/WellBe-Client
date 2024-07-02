import { Component } from '@angular/core';

@Component({
  selector: 'app-video-call-trav',
  templateUrl: './video-call-trav.component.html',
  styleUrl: './video-call-trav.component.css'
})
export class VideoCallTravComponent {
  localStream !: MediaStream;
  remoteStream !: MediaStream;
}
