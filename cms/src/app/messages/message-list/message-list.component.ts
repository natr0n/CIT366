import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
messages: Message[] = [];
subscription: Subscription;

  constructor(private messageService: MessagesService) {
    //this.messages = this.messageService.getMessages();
   }

  ngOnInit() {
    this.messageService.getMessages();
    //this.messageService.messageChangeEvent
    this.subscription = this.messageService.messageListChangedEvent
      .subscribe(
        (message: Message[]) => {
          this.messages = message;
        }
      );
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }


ngOnDestroy() {
this.subscription.unsubscribe();
}

}
