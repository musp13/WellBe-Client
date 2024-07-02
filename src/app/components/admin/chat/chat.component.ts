import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChatService } from '../../../services/chat/chat.service';
import { Subscription } from 'rxjs';
import { AdminChatService } from '../../../services/adminChat/admin-chat.service';
import { ChatMessage } from '../../../interfaces/chatMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit,OnDestroy{
  message!: string;
  //messages: { user: String, message: String }[] = [];
  messages: ChatMessage[] =[];
  currentUserMessages: ChatMessage[] = [];
  newMessage: string = '';
  users: {_id: string, fullName: string}[] = [];
  userSelected = false;
  userId: string ='';
  userType: string = 'Admin';
  onlineUsers: string[] = [];

  chatService = inject(ChatService);
  adminChatService = inject(AdminChatService);

  getMessagesSubscription!: Subscription;
  getUserListSubscription!: Subscription;
  getOnlineUsersSubscription!: Subscription;
  getOldChatsSubscription!: Subscription;
  

  ngOnInit(): void {
    /* this.getMessagesSubscription = this.chatService.getMessages().subscribe((message: { user: String, message: String })=>{
      this.messages.push(message);
    }) */
    this.chatService.joinChat('', this.userType);
    this.getUserList();
    this.getOldChats();
    this.getMessages();
    this.getOnlineUsers();
    
  }

  sendMessage(){
    /* this.chatService.sendMessage(this.message);
    this.messages.push(this.message);
    this.message=''; */
    
    if(this.newMessage.trim()){
      this.chatService.sendMessage(this.userId, this.userType, this.newMessage);
      this.messages.push({userId: this.userId, senderType: this.userType, message: this.newMessage});
      this.currentUserMessages.push({userId: this.userId, senderType: this.userType, message: this.newMessage});
      this.newMessage='';
    }
    
  }

  getOldChats(){
    this.getOldChatsSubscription = this.adminChatService.getOldChats().subscribe({
      next: (res)=>{
        console.log('retrieved old chats: ', res);
        this.messages.push(...res.data);
      },
      error: (err)=>{
        console.log(err.error.message);
        
      }
    })
  }

  getMessages(){
    console.log('inside getMessages');
    this.getMessagesSubscription = this.chatService.getMessages().subscribe((message: ChatMessage)=>{
      console.log(message);
      console.log('from getmessage subscription');
      this.messages.push(message);
      if(message.userId===this.userId) {
        this.currentUserMessages.push(message);
      }
      
      
    })
  }

  getUserList(){
    this.getUserListSubscription = this.adminChatService.getChatUserList().subscribe({
      next: (res)=>{
        this.users = res.data;
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
  }

  getOnlineUsers(){
    this.getOnlineUsersSubscription = this.chatService.getOnlineUsers().subscribe((users: string[])=>{
      this.onlineUsers = users;
      console.log('trying to fetch online users:', this.onlineUsers);
    })
  }

  chooseUser(userId: string){
    this.userId = userId; 
    this.userSelected = true;
    this.currentUserMessages = this.messages.filter(message=> message.userId === userId);
  }

  ngOnDestroy(): void {
    if (this.getMessagesSubscription) {
      this.getMessagesSubscription.unsubscribe();
    }
    if (this.getUserListSubscription) {
      this.getUserListSubscription.unsubscribe();
    }
    if (this.getOnlineUsersSubscription) {
      this.getOnlineUsersSubscription.unsubscribe();
    }
    if (this.getOldChatsSubscription) {
      this.getOldChatsSubscription.unsubscribe();
    }

    
    /* if (this.sendMessageSubscription) {
      this.sendMessageSubscription.unsubscribe();
    } */
  }
}
