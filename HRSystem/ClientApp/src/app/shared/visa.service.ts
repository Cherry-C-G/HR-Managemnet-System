import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VisaStatus } from '../enum/visa-status';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root'
})
export class VisaService {
 

  constructor(private statusService:StatusService,private router:Router,private http: HttpClient) { }
  private visaStatusSubject = new BehaviorSubject<VisaStatus>(VisaStatus["Unknown"]);
  private visaTypeSubject = new BehaviorSubject<string>('');
  private visaEndDateSubject = new BehaviorSubject<Date>(new Date(0));


  setVisaStatus(visaStatus: string) {
    console.log(visaStatus);
    this.visaStatusSubject.next((<any>VisaStatus)[visaStatus]);
  }

  getVisaStatus(): Observable<VisaStatus> {
    return this.visaStatusSubject.asObservable();
  }

  setVisaType(visaType: string) {
    this.visaTypeSubject.next(visaType);
  }

  getVisaType(): Observable<string> {
    return this.visaTypeSubject.asObservable();
  }

  setVisaEndDate(visaEndDate: Date) {
    this.visaEndDateSubject.next(visaEndDate);
  }

  getVisaEndDate(): Observable<Date>{
    return this.visaEndDateSubject.asObservable();
  }

  updateVisa(){
    this.http.get<statusResponse>(environment.API_URL + 'api/GetStatus')
    .subscribe(
      (res) => {
        console.log(res);
        this.statusService.setStatus(res.status);
        this.setVisaStatus(res.visaStatus);
        this.setVisaType(res.visaType);
        this.statusService.setName(res.name);
        this.setVisaEndDate(res.visaEndDate);
        // if (res.status == 'Open') {
        //   this.router.navigate(['/OnBoarding'])
        // } else {
        //   this.router.navigate(['/home']);
        // }
      },
      (err) => {
        console.error(err.error.message);
      }
    );
  }
}

interface statusResponse {
  status: string;
  visaType:string;
  visaStatus:string;
  name:string;
  visaEndDate:Date;
}