import { Injectable, inject } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, map } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { ChatMessage } from '../../interfaces/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = inject(Socket);

  constructor() { }

  joinChat(userId: string, userType: string){
    if(userId){
      console.log(`i'm joining user chat, inisde chat service`);
    }
    this.socket.emit('joinChat', {userId, userType });
  }

  sendMessage(userId: string, senderType: string, message: string){
    this.socket.emit('sendMessage', {userId, senderType,message});
  }

  getMessages() : Observable<ChatMessage> {
    console.log('inside chatservice getMesages'); 
    /* return this.socket.fromEvent<{data: string, message: string}>('received').pipe(map(data=> data)); */
    return new Observable<ChatMessage>(observer=>{
      this.socket.on('messageReceived', (data: ChatMessage)=>{
        console.log('user received message: ', data);
        
        observer.next(data);
      });

      return()=> this.socket.off('messageReceived');
    }).pipe(map(data=> data))
  }

  getOnlineUsers(): Observable<string[]> {
    //console.log(`inside getONline users service method`);
    return new Observable<string[]>(observer =>{
      const handler = (data: string[])=>{
        //console.log(`list of online users: ${data}`);
        observer.next(data);
      };

      this.socket.on('onlineUsers', handler);

      return ()=>{
        this.socket.off('onlineUsers');
      }
        
    })
  }

  disconnect() {
    this.socket.disconnect();
  }

  connect(){
    this.socket.connect();
  }
}
