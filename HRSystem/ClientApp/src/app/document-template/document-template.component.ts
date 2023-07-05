import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VisaStatus } from '../enum/visa-status';

@Component({
  selector: 'app-document-template',
  templateUrl: './document-template.component.html',
  styleUrls: ['./document-template.component.css']
})
export class DocumentTemplateComponent {
  @Input() template!:string;
  @Input() fileExtension!:string;
  @Input() isVisaDocument: boolean = false;
  @Input() nextVisaStatus:string= VisaStatus.Unknown
  fileUrl:string= environment.FileURL;
}
