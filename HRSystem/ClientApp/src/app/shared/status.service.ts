import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AvatarService } from './avatar.service';
import { statusResponse } from './response';
import { VisaService } from './visa.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusSubject = new BehaviorSubject<string>('');
  private nameSubject = new BehaviorSubject<string>('');
  constructor() { }

  setStatus(status: string) {
    this.statusSubject.next(status);
  }

  getStatus(): Observable<string> {
    return this.statusSubject.asObservable();
  }

  setName(name: string) {
    this.nameSubject.next(name);
  }

  getName(): Observable<string> {
    return this.nameSubject.asObservable();
  }
}
