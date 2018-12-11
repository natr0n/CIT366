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
    this.http.get<{message: String, messages: Message[]}>('http://localhost:3000/messages')
      .subscribe(
        //success function
        (messagesData) => {
          this.messages = messagesData.messages;
          //this.maxMessageId = this.getMaxId();
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

  addMessage(newMessage: Message){
    if (!newMessage) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   

    this.http.post<{message: String, messages: Message}>('http://localhost:3000/messages', newMessage, { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.messages);
          this.messageListChangedEvent.next(this.messages.slice());
        });
    
    // this.messages.push(message);
    // this.storeMessages();
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
    this.http.put('http://localhost:3000/messages', this.messages, { headers: header})
    .subscribe(
      (messages: Message[]) => {
        this.messageListChangedEvent.next(this.messages.slice());
      }
    );
  }




}


