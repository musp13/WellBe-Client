  import { Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener, inject } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { Observable, Subscription, of } from 'rxjs';
  import { filter, switchMap } from 'rxjs/operators';
  import { WebrtcVideoCallService } from '../../../services/webrtc-video-call/webrtc-video-call.service';
  import { DialogData } from '../../../interfaces/dialogData';
  import { WebrtcVideoCallinfoDialogComponent } from '../webrtc-video-callinfo-dialog/webrtc-video-callinfo-dialog.component';
  import { ActivatedRoute, UrlSegment } from '@angular/router';
  import { WebrtcVideoCallApiCallsService } from '../../../services/webrtcVideoCallApiCalls/webrtc-video-call-api-calls.service';
  import { error } from 'console';
import { apiUrls } from '../../../api.urls';


  @Component({
    selector: 'app-webrtc-video-call',
    templateUrl: './webrtc-video-call.component.html',
    styleUrl: './webrtc-video-call.component.css'
  })
  export class WebrtcVideoCallComponent implements OnInit, OnDestroy {
    localStream!: MediaStream | null;
    remoteStream!: MediaStream | null;

    localStreamSubscription!: Subscription;
    remoteStreamSubscription!: Subscription;

    dialogRefAftreClosedSubscription!: Subscription;

    public isCallStarted$!: Observable<boolean>;
    peerId!: string;

    appointmentId='';

    userType = '';
    activatedRoute = inject(ActivatedRoute);
    activatedRouteSubscription! : Subscription;
    activatedRouteParamsSubscription!: Subscription;

    saveTherapistPeerIdSubscription!: Subscription;
    removeTherapistPeerIdSubscription!: Subscription;

    @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>
    @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>

    dialog = inject(MatDialog);
    callService = inject(WebrtcVideoCallService);
    webrtcVideoCallApiCallsService = inject(WebrtcVideoCallApiCallsService);
    
    constructor(){
      this.isCallStarted$ = this.callService.isCallStarted$;
      this.peerId = this.callService.initPeer();
    }

    ngOnInit(): void {
      this.setUserType();
      this.getAppointmentId();
      /* this.callService.localStream$
        .pipe(filter((value: MediaStream | null): value is MediaStream => value !== null))
        .subscribe(stream => this.localVideo.nativeElement.srcObject = stream);   */
        this.localStreamSubscription = this.callService.localStream$
          .pipe(filter(res => !!res))
          .subscribe(stream => this.localVideo.nativeElement.srcObject = stream)
        this.remoteStreamSubscription = this.callService.remoteStream$
          .pipe(filter(res => !!res))
          .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream)
      }

    ngOnDestroy(): void {
      this.callService.destroyPeer();
      if(this.userType === 'therapist'){
        this.removePeerId();
      }
      
      if(this.localStreamSubscription){
        this.localStreamSubscription.unsubscribe();
      }
      if(this.remoteStreamSubscription){
        this.remoteStreamSubscription.unsubscribe();
      }
      if(this.dialogRefAftreClosedSubscription){
        this.dialogRefAftreClosedSubscription.unsubscribe();
      }
      if(this.activatedRouteSubscription){
        this.activatedRouteSubscription.unsubscribe();
      }
      if (this.activatedRouteParamsSubscription) {
        this.activatedRouteParamsSubscription.unsubscribe();
      }
      if (this.saveTherapistPeerIdSubscription) {
        this.saveTherapistPeerIdSubscription.unsubscribe();
      }
      
      if (this.removeTherapistPeerIdSubscription) {
        this.removeTherapistPeerIdSubscription.unsubscribe();
      }
    }

    @HostListener('window:beforeunload', ['$event'])
      handleBeforeUnload(event: Event){
        if(this.userType==='therapist'){
          this.removePeerId();
        }
    }

    setUserType(){
      this.activatedRouteSubscription = this.activatedRoute.url.subscribe(urlSegments=>{
        const urlPath = urlSegments.map(segment=> segment.path).join('/');
        if(urlPath.includes('join_video_call')){
          this.userType = 'user';
        }else if (urlPath.includes('webrtc_video_call')) {
          this.userType= 'therapist';
        }
        console.log('urlPath is: ',urlPath);
        
      })
    }

    getAppointmentId(){
      this.activatedRouteParamsSubscription = this.activatedRoute.params.subscribe( value=>{
        this.appointmentId = value['appointmentId'];
      })
    }

    savePeerId(){
      
      if(this.peerId && this.userType=='therapist' && this.appointmentId){
        this.saveTherapistPeerIdSubscription = this.webrtcVideoCallApiCallsService.saveTherapistPeerId(this.appointmentId, this.peerId).subscribe({
          next: (res)=>{
            console.log('inside save peer id success response',res);
          },
          error: (err)=>{
            console.log('inside save peer id error response',err.error.message);
            
          }
        });
      }
    }

    removePeerId(){ 
      //alert(`inside remove peer id method`)
      if(this.appointmentId){
        this.removeTherapistPeerIdSubscription = this.webrtcVideoCallApiCallsService.removeTherapistPeerId(this.appointmentId).subscribe({
          next: (res)=>{
            console.log('inside remove peer id success response',res);
          },
          error: (err)=>{
            console.log('inside remove peer id error response',err.error.message);          
          }
        });
      }
    }

    removePeerIdSynchronously() {
      if (this.userType == 'therapist' && this.appointmentId) {
        const url = `${apiUrls.therapistsApi}remove_therapist_peer_id`; // Replace with your actual API endpoint
        const data = { appointmentId: this.appointmentId };
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
      }
    }

    showModal(joinCall: boolean){
      //this.savePeerId();

      let dialogData : DialogData = joinCall ? ({ peerId: null, joinCall: true}): ({ peerId: this.peerId, joinCall: false});
      const dialogRef = this.dialog.open(WebrtcVideoCallinfoDialogComponent, {
        width: '250px',
        data: dialogData
      });

      this.dialogRefAftreClosedSubscription = dialogRef.afterClosed()
        .pipe(
          switchMap(peerId=> 
            joinCall ? of(this.callService.establishMediaCall(peerId)) : of(this.callService.enableCallAnswer())
          ),
        )
        .subscribe(_ => {
          this.savePeerId();
        });

        /* if(this.peerId && this.userType=='therapist' && this.appointmentId){
          this.webrtcVideoCallApiCallsService.saveTherapistPeerId(this.appointmentId, this.peerId);
        } */
    }

    endCall(){
      this.callService.closeMediaCall();
      this.removePeerId();
    }
  }
