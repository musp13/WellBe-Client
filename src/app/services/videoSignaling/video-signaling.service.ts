import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoSignalingService {
  private socket = inject(Socket);

  constructor() { }

  joinVideoRoom(roomId: string, userId: string, userType: string){
    this.socket.emit('joinVideoCall', {userId, userType, roomId });
  }

  getVideoMessages(): Observable<any>{
    let output = this.socket.fromEvent('videoMessage');
    //console.log('lets check output frmo video message', output);  
    output.subscribe(data => console.log('Data received from videoMessage event:', data));

    return output;
  }

  sendVideoMessage(roomId: string, data: { type: string; candidate?: RTCIceCandidateInit; offer?: RTCSessionDescriptionInit, answer?: RTCSessionDescriptionInit }): void{
    
    this.socket.emit('sendVideoMessage', {roomId, ...data});
  }
}
