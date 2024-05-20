import { Injectable, inject } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, map } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = inject(Socket);

  sendMessage(msg: string){
    this.socket.emit('message', msg);
  }

  getMessages() {
    console.log('inside chatservice getMesages');
    
    return this.socket.fromEvent<{data: string, message: string}>('received').pipe(map(data=> data));
  }

  constructor() { }
}
