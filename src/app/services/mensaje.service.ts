import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  public stompClient;
  public msg = [];
  public nuevoMensaje = new BehaviorSubject<string>("");

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://chanin-food-api.us-east-2.elasticbeanstalk.com/socketpedidos';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/message', (message) => {
        if (message.body) {
          that.msg.push(message.body);
          that.nuevoMensaje.next(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/send/message', {}, message);
  }
}
