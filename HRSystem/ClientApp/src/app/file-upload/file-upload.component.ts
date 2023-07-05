import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { VisaStatus } from '../enum/visa-status';
import { FileService } from '../shared/file.service';
import { VisaService } from '../shared/visa.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() title: string = '';
  @Input() isVisaDocument: boolean = false;
  @Input() nextVisaStatus:string= VisaStatus.Unknown
  @Output() fileUploaded = new EventEmitter<any>();

  constructor(private http: HttpClient, private router:Router,private visaService:VisaService,private fileService: FileService) { }
  private selectedFile!: File;
  componentId!: string;

  ngOnInit() {
    this.componentId = uuidv4();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }

  onClick() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append("file", this.selectedFile, Date.now().toString() + this.selectedFile.name);
      formData.append("title", this.title);
      formData.append("isVisaDocument", this.isVisaDocument.toString());
      formData.append("nextVisaStatus", this.nextVisaStatus);
      console.log(formData);
      this.http.post(environment.API_URL + "api/file/upload", formData)
        .subscribe(
          response => {
            console.log(response);
            // (document.querySelector("input[type='file']") as HTMLInputElement).value = "";
            (document.querySelector("input[id='"+this.componentId+"']") as HTMLInputElement).value = "";
            alert('file uploaded');
            this.fileService.getFiles();
            this.onFileUpload();
          },
          (err) => {
            alert(err.error.message)
          }
        );

        if(this.isVisaDocument){
          this.visaService.updateVisa();
          this.router.navigate(['/home']);
        }
    }
  }
  onFileUpload() {
    // logic to upload file
    this.fileUploaded.emit();
  }
}

