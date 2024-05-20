import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChatService } from '../../../services/chat/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit,OnDestroy{
  message!: string;
  //messages: { user: String, message: String }[] = [];
  messages: string[] =[];

  chatService = inject(ChatService);

  getMessagesSubscription!: Subscription;
  /* sendMessageSubscription!: Subscription; */

  ngOnInit(): void {
    /* this.getMessagesSubscription = this.chatService.getMessages().subscribe((message: { user: String, message: String })=>{
      this.messages.push(message);
    }) */
    this.getMessages();
  }

  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.messages.push(this.message);
    this.message='';
    
  }

  getMessages(){
    console.log('inside getMessages');
    this.getMessagesSubscription = this.chatService.getMessages().subscribe((data: {data: string, message: string})=>{
      console.log(data);
      console.log('from getmessage subscription');
      this.messages.push(data.data)
      
      
    })
  }

  ngOnDestroy(): void {
    if (this.getMessagesSubscription) {
      this.getMessagesSubscription.unsubscribe();
    }
    /* if (this.sendMessageSubscription) {
      this.sendMessageSubscription.unsubscribe();
    } */
  }
}
