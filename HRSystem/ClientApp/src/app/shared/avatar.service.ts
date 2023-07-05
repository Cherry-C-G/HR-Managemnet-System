import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private avatarSubject = new BehaviorSubject<string>('');

  constructor() { }

  setAvatar(avatar: string) {
    // console.log(avatar);
    this.avatarSubject.next(avatar);
  }

  getAvatar(): Observable<string> {
    return this.avatarSubject.asObservable();
  }
}
