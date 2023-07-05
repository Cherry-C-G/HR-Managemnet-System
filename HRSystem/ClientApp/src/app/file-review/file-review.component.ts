import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faImage, faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-review',
  templateUrl: './file-review.component.html',
  styleUrls: ['./file-review.component.css']
})
export class FileReviewComponent {
  constructor(private http: HttpClient, library: FaIconLibrary) {
    library.addIcons(faImage, faFile, faFilePdf);
  }
  files!: Observable<filesResponse[]>;
  fileUrl: string = environment.FileURL;
  comment: string = '';
  
  @Input() pid!:string;
  personId:number = 0;
  

  ngOnInit() {
    if (this.pid && !isNaN(Number(this.pid))) {
      this.personId = Number(this.pid);
    } else {
      console.log("personId is NaN");
    }

    this.files = this.http.get<filesResponse[]>(environment.API_URL + "api/file/"+this.personId);
    this.files.subscribe(
      (res) => {
        // console.log("Response from API", res);
        res.forEach(res => {
          res.fileExtension = this.getFileExtension(res.path);
          // console.log("File extension", res.fileExtension);
        }
        )
      },
      error => {
        console.error("Error while fetching files", error);
      }
    );
    
  }

  getFileExtension(filename: string) {
    return filename.substr(filename.lastIndexOf('.') + 1);
  }

  onAddComment(fileTitle: string, fileComment: string, personId:number) {
    const commentData = {
      personId : personId,
      title: fileTitle,
      comment: fileComment
    };
    
    this.http.post<filesResponse[]>(environment.API_URL + "api/file/AddComment", commentData)
      .subscribe(
        (res) => {
          alert('Comment added');
        },
        (err) => {
          console.error(err.error.message);
        }
      );
  }
}

interface filesResponse {
  path: string;
  title: string;
  fileExtension: string;
  comment:string;
}