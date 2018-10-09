import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
messages: Message[] = [
  new Message(1, "Homework", "Can you help me with all my assignments?", "Nathan Thorne"),
  new Message(2, "Homework", "Well sure, but why don't we just start with lesson 3.", "Bro. Thane"),
  new Message(3, "Extra Credit", "Sweet Beans! Can I have an A+ just for fun as well?", "Nathan Thorne")

]
  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
