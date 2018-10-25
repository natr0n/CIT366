import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contacts: Contact; 
  id: string;
  
  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contacts = this.contactService.getContact(this.id);
      }
    );
  }

  onDelete() {
    this.contactService.deleteContact(this.contacts)
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

}
