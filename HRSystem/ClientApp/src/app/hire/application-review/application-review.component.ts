import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-review',
  templateUrl: './application-review.component.html',
  styleUrls: ['./application-review.component.css']
})
export class ApplicationReviewComponent implements OnInit {
  pid!: string;
  applicationid!: string;
  application!: ApplicationWorkFlow;
  public editForm!: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder){
    this.editForm = this.formBuilder.group({
      comments: [''],
      status: ['',Validators.required],
    }, {validator: this.validateForm.bind(this)});
  }
  
  validateForm(formGroup: FormGroup) {
    const statusControl = formGroup.get('status');
    if (!statusControl) {
      return null;
    }
    const status = statusControl.value;
    const comments = formGroup.get('comments')?.value;
    if (status === 'Completed' && !comments) {
      return null;
    }
    if (status !== 'Completed' && !comments) {
      return { required: true };
    }
    return null;
  }
  
  
  

  ngOnInit() {
    const pid = this.route.snapshot.paramMap.get('pid');
    if (pid != null) this.pid = pid;
    console.log('personId',this.pid);

    const applicationid = this.route.snapshot.paramMap.get('applicationid');
    if (applicationid != null) this.applicationid = applicationid;
    console.log('applicationId',this.applicationid);

    this.getApplication();
  }


  getApplication() {
    this.http.get<any>('https://localhost:5401/api/HireReview/GetApplication/'+ this.applicationid).subscribe(data => {
      this.application = data;
      console.log(this.application);
    });
  }

  onSubmit(){
    this.application.comments = this.editForm.value.comments;
    this.application.status = this.editForm.value.status;
    console.log(this.application);

    this.http.post<ApplicationReviewComponent>('https://localhost:5401/api/HireReview/ChangeOnboardingStatus', this.application)
    .subscribe(data => {
      // this.nameSec = data;
      // this.toggleEdit();
      console.log(this.application);
    },
    error => console.error(error));
  }


}

interface ApplicationWorkFlow {
  id:number,
  employeeId: number,
  createdDate: string,
  modificationDate: string,
  status: string,
  comments: string,
  type: string
}