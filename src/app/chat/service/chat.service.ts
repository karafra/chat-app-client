import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as Stomp from "stompjs";
import { AuthService } from '../../auth/auth.service';
import { IMember } from '../models/member';
import { IMessage, Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private webSocket: any;
  private socket: WebSocket;
  private username: string = "";
  public members: IMember[] = [];
  public randomId: string = "";
  public loading: boolean = true;
  public couldNotConnect: boolean = false;
  public message: IMessage = new Message();
  public messages: Message[] = [];


  constructor(private authService: AuthService) {
    this.socket = new WebSocket(environment.wsUrl);
    this.webSocket = Stomp.over(this.socket);
    if (this.authService.loggedIn) {
      this.authService.userProfile$.subscribe(
        res => this.username = res.nickname
      );
    } else {
      alert('You have to sign in first');
    }
  }

  private connectToSocket(that: ChatService): void {
    this.webSocket.connect({}, (_: Stomp.Frame) => {
      that.webSocket.subscribe("/errors", (response: Stomp.Message) => {
        alert("Error " + response.body);
      });
      this.subscribeToChat(that);
      this.subscribeToTopic(that);
      this.subscribeToQueue(that);
      this.sendJoinedChatMessage(that);
    }, (_: Stomp.Message) => {
      that.socket.close();
    });
  }

  private subscribeToChat(that: ChatService): void {
      that.webSocket.subscribe("/user/queue/public/chat/id", (message: Stomp.Message) => {
        that.randomId = JSON.parse(message.body);
        that.loading = false;
      });
  }

  private subscribeToTopic(that: ChatService): void {
      that.webSocket.subscribe("/topic/public/chat", (message: Stomp.Message) => {
        that.processMessage(JSON.parse(message.body));
      });
  }

  private subscribeToQueue(that: ChatService) {
    that.webSocket.subscribe("/queue/public/chat/users", (message: Stomp.Message) => {
        that.members = JSON.parse(message.body);
    });
  }

  private sendJoinedChatMessage(that: ChatService) {
    that.webSocket.send("/app/public/chat/" + that.username + "/join", {}, {});
  }

  public connect() {
    let that = this;
    this.connectToSocket(that);
  }
  
  public sendMessage() {
    if (!this.message.message?.length)
      return;

    this.webSocket.send("/app/public/chat/send", {}, JSON.stringify(this.message));
    this.message?.clearMessage();
  }

  public processMessage(message: Message) {
    if (message.type === 'MESSAGE') {
      message.message = (message.authorRandomId === this.randomId
        ? 'You: '
        : message.authorUsername + ': ') + message.message;
    }
    this.messages.push(message);
  }
}
