import { HttpClient } from '@angular/common/http';
import { Component, Output,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.css']
})
export class AvatarUploadComponent {
  constructor(private http: HttpClient) { }
  selectedFile!: File;
  fileUrl:string = environment.FileURL
  uploaded:boolean = false;
  @Output() avatarPathEmitter = new EventEmitter<string>();
  
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
      this.http.post(environment.API_URL + "api/avatar/upload", formData)
        .subscribe(
          response => {
            // console.log(response);
            this.uploaded = true;
            (document.querySelector("input[type='file']") as HTMLInputElement).value = "";
            // console.log(this.selectedFile.name);
            this.avatarPathEmitter.emit(this.selectedFile.name);
          },
          (err)=>{
            alert(err.error.message)
          }
        );
    }
  }
}
