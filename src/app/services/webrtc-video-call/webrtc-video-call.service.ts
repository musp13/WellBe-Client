import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import Peer, { PeerJSOption, MediaConnection } from 'peerjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class WebrtcVideoCallService {
  snackBar = inject( MatSnackBar);

  peer!: Peer;
  private mediaCall!: MediaConnection;

  private localStreamBs: BehaviorSubject<MediaStream | null> = new BehaviorSubject<MediaStream | null>(null);
  public localStream$ = this.localStreamBs.asObservable();

  private remoteStreamBs: BehaviorSubject<MediaStream | null> = new BehaviorSubject<MediaStream | null>(null);
  public remoteStream$ = this.remoteStreamBs.asObservable();



  private isCallStartedBs = new Subject<boolean>();
  isCallStarted$ = this.isCallStartedBs.asObservable();

  constructor() { }

  initPeer(): string {
    if(!this.peer || this.peer.disconnected) {
      const peerJsOptions: PeerJSOption = {
        debug: 3,
        config: {
          iceServers: [
            {
              urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
              ]
            }
          ]
        }
      };
      try {
        let id = uuidv4();
        this.peer = new Peer(id, peerJsOptions);
        return id;
      } catch(error) {
        console.error(error);
        return 'unknown error';
      }
    }
    return 'error: peer exists.';
  }

  /* async establishMediaCall(remotePeerId: string){
    try {
      console.log('hello, inisde establishMediaCall');
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});

      const connection = this.peer.connect(remotePeerId);
      connection.on('error', err=>{
        console.error(err);
        //const errorMessage = err as string; 
        this.snackBar.open(typeof err, 'Close');

        this.mediaCall = this.peer.call(remotePeerId, stream);
        if(!this.mediaCall){
          const errorMessage = 'Unable to connect to remote peer';
          this.snackBar.open(errorMessage, 'Close');
          throw new Error(errorMessage);
        }
        this.localStreamBs.next(stream);
        this.isCallStartedBs.next(true);

        this.mediaCall.on('stream', 
          (remoteStream)=>{
            this.remoteStreamBs.next(remoteStream);
          }
        );

        this.mediaCall.on('error', err=>{
          this.snackBar.open(typeof err, 'Close');
          console.error(err);
          this.isCallStartedBs.next(false);
        });

        this.mediaCall.on('close', ()=> this.onCallClose());
        
      })
      
    } catch (ex) {
      console.error(ex);
      const errorMessage = ex as string; 
      this.snackBar.open(errorMessage, 'Close');
      this.isCallStartedBs.next(false);
    }
  } */
  async establishMediaCall(remotePeerId: string) {
    try {
      console.log('Inside establishMediaCall');
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      // Set local stream
      this.localStreamBs.next(stream);
      
      const connection = this.peer.connect(remotePeerId);
  
      connection.on('open', () => {
        console.log('Connection established with remote peer');
        
        this.mediaCall = this.peer.call(remotePeerId, stream);
  
        if (!this.mediaCall) {
          const errorMessage = 'Unable to connect to remote peer';
          this.snackBar.open(errorMessage, 'Close');
          throw new Error(errorMessage);
        }
  
        this.isCallStartedBs.next(true);
  
        this.mediaCall.on('stream', (remoteStream) => {
          console.log('Received remote stream');
          this.remoteStreamBs.next(remoteStream);
        });
  
        this.mediaCall.on('error', err => {
          console.error('Media call error:', err);
          this.snackBar.open(typeof err, 'Close');
          this.isCallStartedBs.next(false);
        });
  
        this.mediaCall.on('close', () => this.onCallClose());
      });
  
      connection.on('error', err => {
        console.error('Connection error:', err);
        this.snackBar.open(typeof err, 'Close');
      });
  
    } catch (ex) {
      console.error('Error in establishMediaCall:', ex);
      const errorMessage = ex as string;
      this.snackBar.open(errorMessage, 'Close');
      this.isCallStartedBs.next(false);
    }
  }  

  async enableCallAnswer(){
    try {
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
      this.localStreamBs.next(stream);
      
      this.peer.on('call', async(call)=>{
        
        this.mediaCall = call;
        this.isCallStartedBs.next(true);

        this.mediaCall.answer(stream);
        this.mediaCall.on('stream', (remoteStream)=>{
          this.remoteStreamBs.next(remoteStream);
        });

        this.mediaCall.on('error', err=>{
          this.snackBar.open(typeof err, 'Close');
          this.isCallStartedBs.next(false);
          console.error(err);
        });

        this.mediaCall.on('close', ()=> this.onCallClose());
      })
        
    } catch (ex) {
      console.error(ex);
      const errorMessage = ex as string;
      this.snackBar.open(errorMessage, 'Close');
      this.isCallStartedBs.next(false);
    }
  }

  private onCallClose(){
    this.remoteStreamBs?.value?.getTracks().forEach(track => {
      track.stop();
    });
    this.localStreamBs?.value?.getTracks().forEach(track=>{
      track.stop();
    });
    this.snackBar.open('Call Ended', 'Close');
  }

  closeMediaCall(){
    this.mediaCall?.close();
    if(!this.mediaCall) {
      this.onCallClose();
    }
    this.isCallStartedBs.next(false);
  }

  destroyPeer(){
    this.mediaCall?.close();
    this.peer?.disconnect();
    this.peer?.destroy();
  }
}
