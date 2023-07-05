import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-name-sec',
  templateUrl: './name-sec.component.html',
  styleUrls: ['./name-sec.component.css']
})
export class NameSecComponent implements OnInit {
  public nameSec!: NameSec;
  ssn_last4!:string;
  public editMode = false;
  public editForm!: FormGroup;
  @Input() isHR!: boolean;
  @Input() pid!: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      middlename: [''],
      preferredName: [''],
      dob: [''],
      gender: [''],
      ssn: ['']
    });
    // this.editForm = this.formBuilder.group({
    //   firstname: [null, Validators.required],
    //   lastname: [null, Validators.required],
    //   middlename: [null],
    //   preferredName: [null],
    //   dob: [null],
    //   gender: [null, Validators.required],
    //   ssn: [null, [Validators.required, Validators.minLength(9)]]
    // });
  }

  populateForm() {
    this.editForm.patchValue({
      firstname: this.nameSec.person.firstname,
      lastname: this.nameSec.person.lastname,
      middlename: this.nameSec.person.middlename,
      preferredName: this.nameSec.person.preferredName,
      dob: this.nameSec.person.dob,
      gender: this.nameSec.person.gender,
      ssn: this.nameSec.person.ssn
    });
  }
  
  ngOnInit(): void {
    this.getNameSec();
    
  }

  getNameSec(){
    this.http.get<NameSec>('https://localhost:5401/api/PersonalInformation/name/?pid='+this.pid.toString()).subscribe(data => {
      this.nameSec = data;
      this.ssn_last4 = this.nameSec?.person.ssn.substring(this.nameSec?.person.ssn.length-4);
      
      this.editForm.setValue({
        firstname: this.nameSec.person.firstname,
        lastname: this.nameSec.person.lastname,
        middlename: this.nameSec.person.middlename,
        preferredName: this.nameSec.person.preferredName,
        dob: this.nameSec.person.dob,
        gender: this.nameSec.person.gender,
        ssn: this.nameSec.person.ssn
      });
    },
    error => console.error(error));
  }

  onSubmit(){
    this.nameSec.person.firstname = this.editForm.value.firstname;
    this.nameSec.person.lastname = this.editForm.value.lastname;
    this.nameSec.person.middlename = this.editForm.value.middlename;
    this.nameSec.person.preferredName = this.editForm.value.preferredName;
    this.nameSec.person.dob = this.editForm.value.dob;
    this.nameSec.person.gender = this.editForm.value.gender;
    this.nameSec.person.ssn = this.editForm.value.ssn;
    this.ssn_last4 = this.nameSec.person.ssn.substring(this.nameSec?.person.ssn.length-4);

    this.http.post<NameSec>('https://localhost:5401/api/PersonalInformation/name', this.nameSec)
    .subscribe(data => {
      // this.nameSec = data;
      // this.toggleEdit();
      console.log(this.nameSec);
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

  


interface Person {
    id: number
    firstname: string;
    lastname: string;
    middlename: string;
    preferredName: string;
    dob: string; // 
    gender: string;
    ssn: string;
}

interface Person {
    firstname: string;
    lastname: string;
    middlename: string;
    preferredName: string;
    dob: string; // 
    gender: string;
    ssn: string;
}

interface NameSec {
  person: Person;
}


