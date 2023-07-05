import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comment!: string;
  private documentComment!: Array<{title:string, comment:string}>;

  constructor() { }

  setComment(comment: string) {
    this.comment = comment;
  }

  setDocumentComment(documentComment: Array<{title:string, comment:string}>) {
    this.documentComment = documentComment;
  }

  getComment(): Observable<string> {
    return of(this.comment);
  }

  getDocumentComment(): Observable<Array<{title:string, comment:string}>> {
    return of(this.documentComment);
  }
}
