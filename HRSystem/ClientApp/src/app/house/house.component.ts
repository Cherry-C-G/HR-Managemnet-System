import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})

export class HouseComponent
{
  public houses: HouseDetail[] = [];
  public reports: FacilityReport[] = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router)
  {
    //House Details
    http.get<HouseDetail[]>('https://localhost:5401/houseDetail').subscribe
      (data => { this.houses = data; }, error => console.error(error));

    //Show Reports History
    http.get<FacilityReport[]>('https://localhost:5401/viewHistoryReportById').subscribe
      (data => { this.reports = data; }, error => console.error(error));
  }

  //Create Facility Report
  reportForm!: FormGroup<any>;

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      title: [''],
      description: ['']
    })
  }

  onSubmit() {
    const title = this.reportForm.value.title;
    const description = this.reportForm.value.description;
    
    const endpoint = 'https://localhost:5401/addReport';
    console.log(endpoint);

    this.http.post(endpoint, { title, description})
      .subscribe(
        (response) => {
          this.reportForm.controls.title.setValue('');
          this.reportForm.controls.description.setValue('');
          alert("succeeded");
        },
        (error) => {
          alert(error.error.message)
        }
      )
  }

  openDetails(reportId: number) {
    this.router.navigate(['/comment', reportId]);
  }

}




//House Details
interface HouseDetail {
  id: number;//not show on page
  houseAddress: string;
  preferredName: string;
  phone: string;
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


