import { Component, OnInit, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Injectable({

  providedIn: 'root'

})
@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  // providers: [ContactService]
})


export class ContactsComponent implements OnInit {
// selectedContact: Contact;


  constructor(private contactService: ContactService) { }

  ngOnInit() {
  //   this.contactService.contactSelectedEvent
  //     .subscribe(
  //       (contact: Contact) => {
  //         this.selectedContact = contact;
  //       }
  //     );
  // }
  }
}
