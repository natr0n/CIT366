import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
document: Document; 
nativeWindow: any;
id: string;

  constructor(private documentService: DocumentsService,
    private route: ActivatedRoute,
    private router: Router,
    private windowRefService: WindRefService) {
      this.nativeWindow = windowRefService.getNativeWindow();
     }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    );
  }

  onView() {
    if (this.document.url){
      this.nativeWindow.open(this.document.url)
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document)
    this.router.navigate(['/documents'], {relativeTo: this.route});
  
  }

}
