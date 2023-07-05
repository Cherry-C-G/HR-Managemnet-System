import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { StatusService } from '../shared/status.service';
import { VisaService } from '../shared/visa.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(private visaService:VisaService,private authService:AuthService, private statusService:StatusService,private router:Router){}
  isExpanded = false;
  isLoggedIn: boolean = false;
  role!:string;
  status!:string;
  visaType!:string;
  ngOnInit() {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
    this.authService.getRole().subscribe(role => {
      // console.log('nav role update');
      this.role = role;
    });
    this.statusService.getStatus().subscribe(status => {
      // console.log('nav role update');
      this.status = status;
      // console.log('nav'+status);
    });

    this.visaService.getVisaType().subscribe(visaType => {
      this.visaType = visaType;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout(){
    this.authService.logout();
  }
}
