import { Component, Inject, Input, OnInit  } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  HouseID!: number;
  public facilities: Facility[] = [];
  public employees: EmployeeHouseHR[] = [];
  public reports: FacilityReport[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {

  }
  ngOnInit(): void {
    this.HouseID = this.route.snapshot.params['id'];
    console.log(this.HouseID); // to test if reportId is correctly retrieved

    //Show Facilities
    this.http.get<Facility[]>('https://localhost:5401/facilityDetailHR/' + this.HouseID).subscribe
      (data => { this.facilities = data; });

    //Show Employees
    this.http.get<EmployeeHouseHR[]>('https://localhost:5401/viewEmployeeHR/' + this.HouseID).subscribe
      (data => { this.employees = data; });

    //Show Reports
    this.http.get<FacilityReport[]>('https://localhost:5401/viewHistoryReportByIdHR/' + this.HouseID).subscribe
      (data => { this.reports = data; }, error => console.error(error));

  }

  openDetails(reportId: number) {
    this.router.navigate(['/comment-hr', reportId]);
  }

  openProfile() {
    this.router.navigate(['/HR/EmployeeProfile']);
  }
}

interface Facility {
  id: number,
  type: string,
  description: string,
  quantity: number,
  houseID: number
}
interface EmployeeHouseHR {
  id: number,
  employeeID: number,
  personID: number,
  name: string,
  phone: string,
  email: string,
  car: string
}
//Show Report
interface FacilityReport {
  id: number;
  title: string;
  description: string;
  employeeID: number;
  reportDate: string;
  status: string;
}


       