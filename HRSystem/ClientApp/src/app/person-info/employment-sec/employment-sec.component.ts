import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employment-sec',
  templateUrl: './employment-sec.component.html',
  styleUrls: ['./employment-sec.component.css']
})
export class EmploymentSecComponent implements OnInit {
  employmentSec!:EmploymentSec
  public editMode = false;
  public editForm!: FormGroup; 
  @Input() isHR!: boolean;
  @Input() pid!: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.editForm = this.formBuilder.group({
      startDate: ['',Validators.required],
      endDate: ['',Validators.required],
      visaStartDate: ['',Validators.required],
      visaEndDate: ['',Validators.required],
      title: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.getEmploymentSec();
  }

  getEmploymentSec(){
    this.http.get<EmploymentSec>('https://localhost:5401/api/PersonalInformation/employment/?pid='+this.pid.toString()).subscribe(data => {
      this.employmentSec = data;
      console.log(data);
    });
  }

  populateForm() {
    this.editForm.patchValue({
      startDate: this.employmentSec.employee.startDate,
      endDate: this.employmentSec.employee.endDate,
      visaStartDate: this.employmentSec.employee.visaStartDate,
      visaEndDate: this.employmentSec.employee.visaEndDate,
      title: this.employmentSec.employee.title
    });
  }

  onSubmit(){
    this.employmentSec.employee.startDate = this.editForm.value.startDate;
    this.employmentSec.employee.endDate = this.editForm.value.endDate;
    this.employmentSec.employee.visaStartDate = this.editForm.value.visaStartDate;
    this.employmentSec.employee.visaEndDate = this.editForm.value.visaEndDate;
    this.employmentSec.employee.title = this.editForm.value.title;

    this.http.post<EmploymentSec>('https://localhost:5401/api/PersonalInformation/employment', this.employmentSec)
    .subscribe(data => {
      // this.nameSec = data;
      // this.toggleEdit();
      console.log(this.employmentSec);
      this.editMode = false;
    },
    error => console.error(error));
  }

  cancelEdit() {
    if (window.confirm('Are you sure you want to discard all your changes?')) {
      this.toggleEdit();
    }
  }

  toggleEdit(){
    this.editMode = !this.editMode;
  }
}

interface Employee {
  startDate: string,
  endDate: string,
  visaStartDate: string,
  visaEndDate: string,
  title: string
}

interface EmploymentSec {
  employee: Employee,
  visaType: string
}