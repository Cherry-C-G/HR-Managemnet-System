import { Component, OnInit } from '@angular/core';
import { VisaStatus } from '../enum/visa-status';
import { VisaService } from '../shared/visa.service';

@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.css']
})
export class VisaStatusManagementComponent implements OnInit {
  visaStatusEnum = VisaStatus;
  visaStatus!: VisaStatus;
  visaType!: string;
  visaEndDate!: Date;
  expireAfter100: Date = new Date();
  expire!: boolean;
  

  constructor(private visaService:VisaService) { }

  ngOnInit(): void {
    this.expireAfter100.setDate(this.expireAfter100.getDate() + 100);
    this.visaService.getVisaStatus().subscribe(visaStatus => {
      this.visaStatus = visaStatus;
    });
    // console.log(this.visaStatus);
    this.visaService.getVisaType().subscribe(visaType => {
      this.visaType = visaType;
    });

    this.visaService.getVisaEndDate().subscribe(visaEndDate => {
      this.visaEndDate = visaEndDate;
    });
    this.expire = this.expireAfter100.getTime()<new Date(this.visaEndDate).getTime();
  }
}
