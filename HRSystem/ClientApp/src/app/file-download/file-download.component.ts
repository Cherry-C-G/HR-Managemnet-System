import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFile, faImage, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { FileService } from '../shared/file.service';


@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent {
  newfiletitle!: string;
  constructor(private http: HttpClient, library: FaIconLibrary,private fileService: FileService) {
    library.addIcons(faImage, faFile, faFilePdf);
  }
  files!: Observable<filesResponse[]>;
  fileUrl: string = environment.FileURL
  showFileUpload = false;

  generateFileUpload() {
    this.showFileUpload = true;
  }

  ngOnInit() {
    this.refreshFiles();
  }

  getFileExtension(filename: string) {
    return filename.substr(filename.lastIndexOf('.') + 1);
  }

  refreshFiles() {
    // console.log('referes');
    this.files = this.fileService.getFiles();
    this.files.subscribe(
      (res) => {
        res.forEach(res => {
          res.fileExtension = this.getFileExtension(res.path);
        });
      },
      error => {
        console.error("Error while fetching files", error);
      }
    );
  }

  deleteFile(title:string){
    this.http.delete(environment.API_URL + "api/file", { params: { title } })
        .subscribe(
          response => {
            alert('file deleted');
            this.refreshFiles();
          },
          (err) => {
            alert(err.error.message)
          }
        );
  }
}

export interface filesResponse {
  path: string;
  title: string;
  fileExtension: string;
}
