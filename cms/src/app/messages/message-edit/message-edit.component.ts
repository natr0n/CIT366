import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  public currentSender: string = '1' ;
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  //@Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessagesService) {

  }

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const newMessage = new Message('6', subject, msgText, this.currentSender);
    this.messageService.addMessage(newMessage);
    //this.addMessageEvent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = ' ';
    this.msgText.nativeElement.value = ' ';
  }

  

  ngOnInit() {
  }

 

}
