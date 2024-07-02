import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { WebRtcCallService } from '../../../services/webRtcCall/web-rtc-call.service';
import { VideoSignalingService } from '../../../services/videoSignaling/video-signaling.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { error } from 'node:console';

@Component({
  selector: 'app-video-room',
  templateUrl: './video-room.component.html',
  styleUrl: './video-room.component.css'
})
export class VideoRoomComponent implements OnInit, OnDestroy{
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  callService = inject(WebRtcCallService);
  signalingService = inject(VideoSignalingService);
  activatedRoute = inject(ActivatedRoute);

  signalingServiceSubscription!: Subscription;
  activatedRouteSubscription! : Subscription;

  roomId = '';
  userId = '';
  userType ='';

  ngOnInit(): void {
    this.getRoomIduserIduserType();
    this.signalingService.joinVideoRoom(this.roomId, this.userId, this.userType);

    this.getMessages();
  }

  ngOnDestroy(): void {
    if (this.signalingServiceSubscription) {
      this.signalingServiceSubscription.unsubscribe();
    }
  }

  getRoomIduserIduserType(){
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe( value =>{
      this.roomId = value['roomId'];
      this.userId = value['userId'];
      this.userType = value['userType'];
      console.log(`check roomId from params = ${this.roomId}`);
    });
  }

  async makeCall(): Promise<void> {
    if(this.roomId){
      await this.callService.makeCall(this.remoteVideo, this.roomId);
    }
    this.getMessages();    
  }

  getMessages(){
   
    this.signalingServiceSubscription = this.signalingService.getVideoMessages().subscribe(
      (payload)=> {
        console.log('lets check payload', payload);
        
        return this._handleMessage(payload);
      },
      (error)=>{
        console.error('Error receiving video message:', error);
      }
    );
  }

  async _handleMessage(data: any): Promise<void>{
    console.log('hello');
    
    console.log('lets check data value', data);
    
    switch(data.type){
      case 'offer': 
        await this.callService.handleOffer(data.offer, this.remoteVideo, this.roomId);
        break;
      case 'answer':
        await this.callService.handleAnswer(data.answer);
        break;
      case 'candidate': 
        await this.callService.handleCandidate(data.candidate);
        break;
      default: 
        break;
    }
  }


}
