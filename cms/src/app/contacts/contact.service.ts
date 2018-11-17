import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse, HttpRequest} from "@angular/common/http";


@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  contacts: Contact[] = [];

  
  constructor(private http: HttpClient,) { 
   // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();  }



    storeContacts(contacts: Contact[]) {
      let stringToServer = JSON.stringify(this.contacts);
      let header = new HttpHeaders({
        "Content-Type":"application/json"
      });
      this.http.put('https://natethornecms.firebaseio.com/contacts.json', stringToServer,{headers:header})
        .subscribe(result => {
          this.contactListChangedEvent.next(Object.assign(this.contacts));
        });
    }




    getContacts(): Contact[] {
      this.http.get('https://natethornecms.firebaseio.com/contacts.json')
        .subscribe(
          //success function
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.maxContactId = this.getMaxId();
            this.contactListChangedEvent.next(this.contacts.slice())
          });
      //error function
      (error: any) => {
        console.log(error);
      }
      return this.contacts.slice();
    }

  getContact(id: string): Contact {
    for(let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (contact === null ) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    //this.contactChangedEvent.emit(this.contacts.slice());
    this.storeContacts(this.contacts);
  }

  addContact(newContact: Contact) {
    if(!newContact){
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    //this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts(this.contacts);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact ){
      return;
    }

     const pos = this.contacts.indexOf(originalContact);

    if(pos < 0) {
      return;
    }
   
    newContact.id = originalContact.id;
    this.contacts[pos]= newContact;
    const contactListClone = this.contacts.slice();
    //this.contactListChangedEvent.next(contactListClone);
    this.storeContacts(this.contacts);

    // console.log(this.contacts.indexOf(originalContact));
    // console.log(originalContact);
    // console.log(newContact);
    
    
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts){
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


}
