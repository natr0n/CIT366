import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import {HttpClient, HttpHeaders, HttpResponse, HttpRequest} from "@angular/common/http";
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: Number;
 messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient,) {
   // this.messages = MOCKMESSAGES;
   this.maxMessageId = this.getMaxId();  
   this.getMessages();
  }


  



  // getMessages(): Message[] {
  //   return this.messages.slice();
  // }

  getMessages(): Message[] {
    this.http.get('https://natethornecms.firebaseio.com/messages.json')
      .subscribe(
        //success function
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageListChangedEvent.next(this.messages.slice())
        });
    //error function
    (error: any) => {
      console.log(error);
    }
    return this.messages.slice();
  }

  getMessage(id: string): Message{
    for(let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages){
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

}
