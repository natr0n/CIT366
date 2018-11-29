import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import {HttpClient, HttpHeaders, HttpResponse, HttpRequest} from "@angular/common/http";
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
 // messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: Number;
 messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient,) {
   // this.messages = MOCKMESSAGES;
  //  this.maxMessageId = this.getMaxId();  
  //  this.getMessages();
  }


  



  // getMessages(): Message[] {
  //   return this.messages.slice();
  // }

  getMessages() {
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
    if (!message) {
      return;
    }
    this.messages.push(message);
    //this.messageListChangedEvent.next(this.messages.slice());
    this.storeMessages();
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


  storeMessages() {
    this.messages = JSON.parse(JSON.stringify(this.messages));
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://natethornecms.firebaseio.com/messages.json', this.messages, { headers: header})
    .subscribe(
      (messages: Message[]) => {
        this.messageListChangedEvent.next(this.messages.slice());
      }
    );
  }




}


