import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  reportId!: number;
  detailId!: number;
  //public editForm!: FormGroup;
  //public editMode = false;
  public comments: FacilityReportDetail[] = [];
  public currentComment!: CreateFacilityDetail;
  reportForm!: FormGroup<any>;
  editForm!: FormGroup<any>;

  constructor(private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.reportId = this.route.snapshot.params['id'];
    console.log(this.reportId); // to test if reportId is correctly retrieved

    //Show Comments
    this.http.get<FacilityReportDetail[]>('https://localhost:5401/viewComment/' + this.reportId).subscribe
      (data => { this.comments = data; });

    // Add Comment
    this.reportForm = this.formBuilder.group({
      comment: ['']
    });

    //Edit Comment
    this.editForm = this.formBuilder.group({
      comment: ['']
    });

  }
  // Add comment
  onSubmit() {
    this.reportId = this.route.snapshot.params['id'];
    const comment = this.reportForm.value.comment;

    const endpoint = ('https://localhost:5401/addComment/'+this.reportId);
    console.log(endpoint);

    this.http.post(endpoint, {comment})
      .subscribe(
        (response) => {
          this.reportForm.controls.comment.setValue('');
          alert("succeeded");
        },
        (error) => {
          alert(error.error.message)
        }
      )
  }
   // Edit comment
  onUpdate(detailId: number) {
    const comment = this.editForm.value.comment;
    const endpoint = ('https://localhost:5401/editComment/' + detailId);
    console.log(endpoint);

    this.http.post(endpoint, {comment})
      .subscribe(
        (response) => {
          this.editForm.controls.comment.setValue('');
          alert("succeeded");
        },
        (error) => {
          alert(error.error.message)
        }
      )
  }

  // Edit comment
  //populateForm() {
  //  this.editForm.patchValue({
  //    comment: this.currentComment.comment
  //  });
  //}

  //cancelEdit() {
  //  if (window.confirm('Are you sure you want to discard all your changes?')) {
  //    this.toggleEdit();
  //  }
  //}

  //toggleEdit() {
  //  this.editMode = !this.editMode;
  //}

  //onUpdate(detailId :number) {
  //  const comment = this.editForm.value.comment;
  //  const endpoint = ('https://localhost:5401/editComment/' + detailId);
  //  console.log(endpoint);

  //  this.http.post(endpoint, { comment })
  //    .subscribe(
  //    //  data => {
  //    //  console.log(this.comment);
  //    //  this.editMode = false;
  //    //},
  //    //  error => console.error(error)
  //      (response) => {
  //        this.editForm.controls.comment.setValue('');
  //        alert("succeeded");
  //      },
  //      (error) => {
  //        alert(error.error.message)
  //      }

  //    );

  //}
}

  


//Comments
interface FacilityReportDetail {
  id: number,
  reportID: number,
  employeeID: number,
  comments: string,
  createdDate: string,
  lastModificationDate: string
}

interface CreateFacilityDetail {
  id: number,
  comment: string

}
