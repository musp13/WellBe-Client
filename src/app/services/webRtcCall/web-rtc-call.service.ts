import { ElementRef, Injectable, inject } from '@angular/core';
import { VideoSignalingService } from '../videoSignaling/video-signaling.service';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class WebRtcCallService {
  private socket = inject(Socket);

  localStream!: MediaStream;
  peerConnection!: RTCPeerConnection;

  config: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  }

  connection!: RTCPeerConnection;

  signalingService = inject(VideoSignalingService);


  constructor() { }

  async _initConnection(remoteVideo: ElementRef, roomId: string): Promise<void> {
    
    this.connection = new RTCPeerConnection(this.config);

    await this._getStreams(remoteVideo);

    this._registerConnectionListeners(roomId);
  }

  async makeCall(remoteVideo: ElementRef, roomId: string): Promise<void>{
      
    await this._initConnection(remoteVideo, roomId);

    const offer = await this.connection.createOffer();
    
    await this.connection.setLocalDescription(offer);
    
    this.signalingService.sendVideoMessage(roomId, {type: 'offer', offer});
    
  }

  async handleOffer(offer: RTCSessionDescription, remoteVideo: ElementRef, roomId: string): Promise<void>{
    await this._initConnection(remoteVideo, roomId);

    await this.connection.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await this.connection.createAnswer();

    await this.connection.setLocalDescription(answer);

    this.signalingService.sendVideoMessage(roomId, {type: 'answer', answer});
  }

  async handleAnswer(answer: RTCSessionDescription): Promise<void>{
    await this.connection.setRemoteDescription(new RTCSessionDescription(answer));
  }

  async handleCandidate(candidate: RTCIceCandidate): Promise<void>{
    if(candidate){
      await this.connection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  async _getStreams(remoteVideo: ElementRef): Promise<void>{
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();

    remoteVideo.nativeElement.srcObject = remoteStream;

    this.connection.ontrack = (event)=>{
      event.streams[0].getTracks().forEach((track) =>{
        remoteStream.addTrack(track);
      });
    }

    stream.getTracks().forEach((track)=>{
      this.connection.addTrack(track, stream);
    })
  }

  _registerConnectionListeners(roomId: string){
    this.connection.onicecandidate = (event)=> {
      if( event.candidate) {
        console.log('ICE candidate gathered:', event.candidate);
        const payload = {
          type: 'candidate',
          candidate: event.candidate.toJSON(),
        };
        this.signalingService.sendVideoMessage(roomId, payload);
      } else {
        // All ICE candidates have been gathered
        console.log('ICE gathering state complete');
      }
    }
  }
}
