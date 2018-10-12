import { Component, OnInit, Output } from '@angular/core';
import {Document} from '../document.model';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] =[
    new Document(1, 'Nate Thorne', 'CIT366', 'www.natethorne.com'),
    new Document(2, 'Kristina Darroch','CIT123','www.kdarroch.com'),
    new Document(3, 'Zac Bell', 'CIT 325', 'www.weather.com'),
    new Document(4, 'Alex Matthews','CIT490','www.byui.edu')
  ]
  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }


}
