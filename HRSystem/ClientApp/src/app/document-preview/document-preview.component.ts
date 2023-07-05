import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent {
  @Input() documentUrl!: string;
  documentType!: string;

  constructor(private sanitizer: DomSanitizer){}


  get safeDocumentUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.documentUrl);
  }

  showPreview:boolean = false;
  onTogglePreview(){
    this.showPreview = !this.showPreview;
  }

  ngOnChanges() {
    if (this.documentUrl) {
      const fileExtension = this.documentUrl.substr(this.documentUrl.lastIndexOf('.') + 1);
      let type = '';
      switch (fileExtension) {
        case 'pdf':
          type = 'application/pdf';
          break;
        case 'jpeg':
        case 'jpg':
          type = 'image/jpeg';
          break;
        case 'png':
          type = 'image/png';
          break;
        case 'doc':
        case 'docx':
          type = 'application/msword';
          break;
        case 'xls':
        case 'xlsx':
          type = 'application/vnd.ms-excel';
          break;
        case 'ppt':
        case 'pptx':
          type = 'application/vnd.ms-powerpoint';
          break;
        default:
          type = 'application/octet-stream';
      }
      // console.log(type);
      this.documentType = type;
    }
  }
}
