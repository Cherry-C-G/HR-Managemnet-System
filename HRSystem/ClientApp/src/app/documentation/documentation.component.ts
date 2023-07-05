import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AvatarService } from '../shared/avatar.service';
import { statusResponse } from '../shared/response';
import { StatusService } from '../shared/status.service';
import { VisaService } from '../shared/visa.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  fileUrl: string = environment.FileURL;
  requiredfiles!: Observable<filesResponse[]>;
  reviewFile: boolean = false;
  constructor(private avatarService:AvatarService,private visaService:VisaService,private statusService:StatusService,private router:Router,private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get<filesResponse[]>(environment.API_URL + "api/requiredfile").subscribe(
      (res) => {
        this.requiredfiles = of(res);
      },
      error => {
        console.error("Error while fetching required files", error);
      }
    );
  }

  onSubmit() {
    this.reviewFile = true;
  }

  onApplicationSubmit() {
    this.http.patch(environment.API_URL + "api/ApplicationStatus?status=Pending", {}).subscribe(
      (res) => {
        this.statusService.setStatus("Pending");
        this.updateStatus();
        this.router.navigate(['home']);
      },
      error => {
        alert('fail to submit');
      }
    );

  }

  updateStatus(){
    this.http.get<statusResponse>(environment.API_URL + 'api/GetStatus')
    .subscribe(
      (res) => {
        console.log(res);
        this.statusService.setStatus(res.status);
        this.visaService.setVisaStatus(res.visaStatus);
        this.visaService.setVisaType(res.visaType);
        this.statusService.setName(res.name);
        this.visaService.setVisaEndDate(res.visaEndDate);
        this.visaService.setVisaEndDate(res.visaEndDate);
        this.avatarService.setAvatar(res.avatar);
        if (res.status == 'Open') {
          this.router.navigate(['/OnBoarding'])
        } else {
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        console.error(err.error.message);
      }
    );
  }
}

interface filesResponse {
  title: string;
  path: string;
}
