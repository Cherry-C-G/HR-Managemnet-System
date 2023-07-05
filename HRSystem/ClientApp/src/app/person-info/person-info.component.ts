import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/auth.service';
import { AvatarService } from '../shared/avatar.service';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {
  role!:string;
  isHR = false;
  @Input() pid!:string;
  applicationStatus!:ApplicationStatus;

  fileUrl:string = environment.FileURL
  avatar!: string;

  constructor(private avatarService:AvatarService, private authService:AuthService,private http: HttpClient, private router: Router) {
    this.avatarService.getAvatar().subscribe(avatar => {
      this.avatar = avatar;
    });
    console.log(this.avatar);
  }

  ngOnInit(): void {
    this.authService.getRole().subscribe(role => {
      // console.log('nav role update');
      this.role = role;
      if (this.role == 'HR') this.isHR = true;
    });

    this.pid = this.pid !== undefined ? this.pid : '0';
    console.log(this.pid);

    this.getApplicationStatus();
  }

  getApplicationStatus(){
    this.http.get<any>('https://localhost:5401/api/PersonalInformation/OnboardingApplication').subscribe(data => {
      this.applicationStatus = data;
      console.log(data)
    });
  }

  onSubmit_ChangeToPending(){
    this.http.post<null>('https://localhost:5401/api/PersonalInformation/ChangeApplicationToPending',null)
    .subscribe(data => {},
    error => console.error(error));
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}

interface ApplicationStatus {
  status: string
}
