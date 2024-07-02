import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChatMessage } from '../../../interfaces/chatMessage';
import { ChatService } from '../../../services/chat/chat.service';
import { EncryptionService } from '../../../services/encryption/encryption.service';
import { Subscription } from 'rxjs';
import { UserChatService } from '../../../services/user-chat/user-chat.service';
import { error } from 'console';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent implements OnInit, OnDestroy {
  isChatboxOpen = false;
  userInput = '';
  messages: ChatMessage[] = [];
  userType = 'User';
  userId = '';

  chatService = inject(ChatService);
  userChatService = inject(UserChatService)
  encryptionService = inject(EncryptionService);

  getMessagesSubscription!: Subscription;
  getOldMessageSubscription!: Subscription;

  ngOnInit(): void {
    this.getOldMessageSubscription = this.userChatService.getOldChats().subscribe((response)=>{
      console.log('fetched older messages: ', response.data);
      this.messages.push(...response.data);
    });

    this.chatService.connect();
    const encryptedId = localStorage.getItem('userId');
    if(encryptedId){
      this.userId = this.encryptionService.decrypt(encryptedId);
    }
    if(this.userId){
      this.chatService.joinChat(this.userId,this.userType);
    }
    
    this.getMessages()
  }

  ngOnDestroy(): void {
    if (this.getMessagesSubscription) {
      this.getMessagesSubscription.unsubscribe();
    }
    if(this.getOldMessageSubscription) {
      this.getOldMessageSubscription.unsubscribe();
    } 
    this.chatService.disconnect();
  }

  toggleChatbox(){
    this.isChatboxOpen = !this.isChatboxOpen;
  }

  getOldMessages(){
    
  }

  getMessages(){
    this.getMessagesSubscription = this.chatService.getMessages().subscribe((message: ChatMessage)=>{
      console.log('hey, received message in the component:', message);
      
      this.messages.push(message);
      console.log(this.messages);
    })
  }

  sendMessage(){
    if(this.userInput.trim() && this.userId){
      //alert(this.userInput);
      this.chatService.sendMessage(this.userId, this.userType, this.userInput);
      this.messages.push({userId:this.userId, senderType:this.userType, message:this.userInput});
      this.userInput = '';
    }   
  }
}
