import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EncryptionService } from '../../../services/encryption/encryption.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css'
})
export class VideoCallComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('root')
  root!: ElementRef;

  activatedRoute = inject(ActivatedRoute);
  encryptionService = inject(EncryptionService);

  roomId = '';
  therapistId = '';

  activatedRouteSubscription! : Subscription;

  platformId = inject(PLATFORM_ID)

  ngOnInit(): void {
    this.getRoomId();
    this.getTherapistId();
  }

  ngOnDestroy(): void {
    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
    }
  }

  getRoomId(){
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe( value=>{
      this.roomId = value['roomId'];
    })
  }

  getTherapistId(){
    const encryptedId = localStorage.getItem('therapistId');
    if(encryptedId){
      this.therapistId = this.encryptionService.decrypt(encryptedId);
    }

  }

  ngAfterViewInit(): void {
     // generate Kit Token
     const appID = 1066311447;
     const serverSecret = "debb309bf9c579bf56bd335038632c7e";
     if(isPlatformBrowser(this.platformId)) {
      /* if (typeof document !== 'undefined') {
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomId,  this.therapistId,  Date.now().toString());

      } */
    }
     

  }
  
  endCall(){

  }
}
