import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
//import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse, HttpRequest} from "@angular/common/http";
import 'rxjs';

@Injectable()
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document[]>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  documents: Document[] = [];
 


  constructor(private http: HttpClient,
  ) { 

    //this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
    
  }

  storeDocuments(documents: Document[]) {
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    
    this.http.put('https://natethornecms.firebaseio.com/documents.json', documents, {headers: headers})
    .subscribe(
      (response: Response) => {
        this.documentListChangedEvent.next(documents.slice())
      }
    )
  }


  getDocuments(): Document[] {
    this.http.get<Document[]>('https://natethornecms.firebaseio.com/documents.json')
      .subscribe(
        //success function
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a,b) => (a.name > b.name ) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.documentListChangedEvent.next(this.documents.slice())
        });
    //error function
    (error: any) => {
      console.log(error);
    }
    return this.documents.slice();
  }






  getDocument(id: string): Document {
    for(let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document){
    if (document === null || document === undefined) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
   // this.documentChangedEvent.emit(this.documents.slice());
   this.storeDocuments(this.documents);
  }

  
  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents){
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument == undefined) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    //this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments(this.documents);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || originalDocument === undefined || newDocument === null
      || newDocument === undefined) {
        return;
      }
      newDocument.id = originalDocument.id;
      const pos = this.documents.indexOf(originalDocument);
      if(pos < 0) {
        return;
      }
      this.documents[pos] = newDocument;
      const documentsListClone = this.documents.slice();
      //this.documentListChangedEvent.next(documentsListClone);
      this.storeDocuments(this.documents);
  
  }


}
