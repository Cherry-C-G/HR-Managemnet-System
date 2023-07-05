import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-sec',
  templateUrl: './contact-sec.component.html',
  styleUrls: ['./contact-sec.component.css']
})
export class ContactSecComponent implements OnInit {
  public contactSec!: ContactSec;
  public editForm!: FormGroup;
  public editMode = false;
  @Input() isHR!: boolean;
  @Input() pid!: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.editForm = this.formBuilder.group({
      email: ['',Validators.required],
      workEmail: [''],
      cellPhone: ['', Validators.required],
      alternatePhone: [''],
    });
  }

  ngOnInit(): void {
    this.getContactSec();
  }

  getContactSec() {
    this.http.get<ContactSec>('https://localhost:5401/api/PersonalInformation/contact/?pid='+this.pid.toString()).subscribe(data => {
      this.contactSec = data;
    });
  }

  populateForm() {
    this.editForm.patchValue({
      email: this.contactSec.email,
      workEmail: this.contactSec.workEmail,
      cellPhone: this.contactSec.cellPhone,
      alternatePhone: this.contactSec.alternatePhone,
    });
  }

  cancelEdit() {
    if (window.confirm('Are you sure you want to discard all your changes?')) {
      this.toggleEdit();
    }
  }

  toggleEdit(){
  this.editMode = !this.editMode;
  }

  onSubmit(){
    this.contactSec.email = this.editForm.value.email;
    this.contactSec.workEmail = this.editForm.value.workEmail;
    this.contactSec.cellPhone = this.editForm.value.cellPhone;
    this.contactSec.alternatePhone = this.editForm.value.alternatePhone;

    this.http.post<ContactSec>('https://localhost:5401/api/PersonalInformation/contact', this.contactSec)
    .subscribe(data => {
      // this.nameSec = data;
      // this.toggleEdit();
      console.log(this.contactSec);
      this.editMode = false;
    },
    error => console.error(error));

  }
  
}

interface ContactSec {
  email: string;
  workEmail: string;
  cellPhone: string;
  alternatePhone: string;
}
