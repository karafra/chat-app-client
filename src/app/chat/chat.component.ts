import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-public-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  
  public connectionSuccessful: boolean = false;

  constructor(
    public publicChatService: ChatService
  ) {}

  ngOnInit() {
    this.joinChat();
  }

  private joinChat() {
    this.publicChatService.connect();
  }

  sendMessage() {
    this.publicChatService.sendMessage();
  }
}
