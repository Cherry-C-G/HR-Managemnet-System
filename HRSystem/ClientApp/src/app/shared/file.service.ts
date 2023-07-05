import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filesResponse } from '../file-download/file-download.component';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {}

  getFiles(): Observable<filesResponse[]> {
    return this.http.get<filesResponse[]>(environment.API_URL + "api/file/GetAll");
  }
}
