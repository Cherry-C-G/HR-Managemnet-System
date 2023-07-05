import { Component, OnInit, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-on-boarding-insert-form',
  templateUrl: './on-boarding-insert-form.component.html',
  styleUrls: ['./on-boarding-insert-form.component.css']
})
export class OnBoardingInsertFormComponent implements OnInit {

  constructor(private router:Router,private fbuild:FormBuilder,private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  applicationForm!: FormGroup;

  employee!: FormGroup;

  address!:FormGroup;

  visaStatus!:FormGroup;

  //remember to check status
  ngOnInit(): void {
    
    this.applicationForm = this.fbuild.group({
      firstName:['', Validators.required],
      middleName:[''],
      lastName:['', Validators.required],
      preferredName:[''],
      email:[''],
      avatar:[''],
      cellPhone:['', Validators.required],
      alternatePhone:[''],
      gender:[''],
      ssn: [''],
      dob:[''],
      //address formGroup
      address: this.address = this.fbuild.group({
        addressLine1:['', Validators.required],
        addressLine2:[''],
        city:['', Validators.required],
        zipCode:['', Validators.required],
        stateName:['', Validators.required],
        stateAbbr:['', Validators.required]
      }),
      //employee formGroup
      employee: this.employee = this.fbuild.group({
        houseId:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        car: [''],
        title:[''],
        startDate:[''],
        endDate:[''],
        visaStartDate:['', Validators.required] || new Date(),
        visaEndDate:['', Validators.required] || new Date(),
        hasDriverLicense: [false],
        driverLisence:[''],
        driverLisence_ExpirationDate:[''] || null,
        //Embedded visaStatus formGroup
        visaStatus: this.visaStatus = this.fbuild.group({
          isUSResident:[''] || false,
          usResidenceType:[''] ||null,
          visaType:['', Validators.required],
          otherVisaType:[''] || null,
          active:[null, Validators.required],
          modificationDate:['', Validators.required] || new Date(),
          createUser:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        }),
      }),

      //contacts formArray
      contacts: this.fbuild.array([]),
    })
    //alert("All dates are required to insert");
    this.getPersonInfo();
  }

  get contacts(){
    return this.applicationForm.controls['contacts'] as FormArray;
  }

  onSubmit() {
    const PersonInfo = {
      firstName: this.applicationForm.value.firstName,
      middleName: this.applicationForm.value.middleName,
      lastName: this.applicationForm.value.lastName,
      preferredName: this.applicationForm.value.preferredName || null,
      email: this.applicationForm.value.email,
      avatar: this.applicationForm.value.avatar,
      cellPhone: this.applicationForm.value.cellPhone,
      alternatePhone: this.applicationForm.value.alternatePhone,
      gender: this.applicationForm.value.gender,
      ssn: this.applicationForm.value.ssn,
      dob: this.applicationForm.value.dob || null,
      Address: this.applicationForm.value.address,
      Employee:{HouseId: this.applicationForm.value.employee.houseId, 
                car: this.applicationForm.value.employee.car,
                title: this.applicationForm.value.employee.title,
                avatar: this.applicationForm.value.employee.avatar || 'default.png',
                startDate: this.applicationForm.value.employee.startDate || null,
                endDate: this.applicationForm.value.employee.endDate || null,   
                visaStartDate: this.applicationForm.value.employee.visaStartDate || null,
                visaEndDate: this.applicationForm.value.employee.visaEndDate || null,
                driverLisence: this.applicationForm.value.employee.driverLisence,
                driverLisence_ExpirationDate: this.applicationForm.value.employee.driverLisence_ExpirationDate || null,
                visaStatus:{ visaType: this.applicationForm.value.employee.visaStatus.isUSResident?this.applicationForm.value.employee.visaStatus.usResidenceType:( this.applicationForm.value.employee.visaStatus.visaType === "Other" ? this.applicationForm.value.employee.visaStatus.otherVisaType : this.applicationForm.value.employee.visaStatus.visaType),
                             active: this.applicationForm.value.employee.visaStatus.active || true,
                             modificationDate: this.applicationForm.value.employee.visaStatus.modificationDate,
                             createUser: this.applicationForm.value.employee.visaStatus.createUser}
              },
       ContactList: this.applicationForm.value.contacts,
    };
    console.log(PersonInfo);

    if(!this.ValidateInputs(PersonInfo)){ return; }
    
    this.http.post('https://localhost:5401/api/OnBoarding/Form', PersonInfo)
      .subscribe(
        (res)=>{
          console.log(res);
          //router to file page
          this.router.navigate(['/Documentation']);
        },
        (err)=>{
          alert(err.error.message);
        }
      )
  }
  ValidateInputs(PersonInfo:any) : boolean {
    //alerts
    if(PersonInfo.firstName == null || PersonInfo.firstName == ""){
      alert("Please insert your first name");
      return false;
    }
    if(PersonInfo.lastName == null || PersonInfo.lastName == ""){
      alert("Please insert your last name");
      return false;
    }
    if(PersonInfo.email == null || PersonInfo.email == ""){
      alert("Please insert your email");
      return false;
    }
    if(PersonInfo.cellPhone == null || PersonInfo.cellPhone == ""){
      alert("Please insert your cellphone");
      return false;
    }
    if(PersonInfo.Address.addressLine1 == null || PersonInfo.Address.addressLine1== ""){
      alert("Please insert your address line 1");
      return false;
    }
    if(PersonInfo.Address.zipCode == null || PersonInfo.Address.zipcode == ""){
      alert("Please insert your address zipcode");
      return false;
    }
    if(PersonInfo.Address.stateName == null || PersonInfo.Address.stateName == ""){
      alert("Please insert your address state name");
      return false;
    }
    if(PersonInfo.Address.stateAbbr == null || PersonInfo.Address.stateAbbr == ""){
      alert("Please insert your address state name abbreviation");
      return false;
    }
    if(PersonInfo.Address.stateAbbr.length >5){
      alert("State Abbreviation length must not exceed 5.")
    }
    // if(PersonInfo.Employee.HouseId <= 0 || PersonInfo.Employee.HouseId == ""){
    //   alert("Please insert your employee house ID");
    //   return false;
    // }
    if(PersonInfo.Employee.visaStartDate== null || PersonInfo.Employee.visaStartDate == ""){
      alert("Please insert your visa start date");
      return false;
    }
    if(PersonInfo.Employee.visaEndDate == null || PersonInfo.Employee.visaEndDate == ""){
      alert("Please insert your visa end date");
      return false;
    }
    // if(PersonInfo.Employee.driverLisence == null || PersonInfo.Employee.driverLisence == ""){
    //   alert("Please insert your driver's lisence");
    //   return false;
    // }
    // if(PersonInfo.Employee.driverLisence_ExpirationDate == null || PersonInfo.Employee.driverLisence_ExpirationDate == ""){
    //   alert("Please insert your driver's lisence expiration date");
    //   return false;
    // }
    if(PersonInfo.Employee.visaStatus.visaType == null || PersonInfo.Employee.visaStatus.visaType == ""){
      alert("Please insert your visa type");
      return false;
    }
    // if(PersonInfo.Employee.visaStatus.active == null || PersonInfo.Employee.visaStatus.visaType == ""){
    //   alert("Please check if your visa status is active");
    //   return false;
    // }
    if(PersonInfo.Employee.visaStatus.modificationDate == null || PersonInfo.Employee.visaStatus.modificationDate == ""){
      alert("Please insert your modification date");
      return false;
    }
    if(PersonInfo.Employee.visaStatus.createUser == null || PersonInfo.Employee.visaStatus.createUser == ""){
      alert("Please insert the created user ID");
      return false;
    }
    for(let i = 0; i < PersonInfo.ContactList.length; i++){
      if(PersonInfo.ContactList[i].relationship == null || PersonInfo.ContactList[i].relationship == ""){
        alert("Please insert the contact relationship");
        return false;
      }
      if(PersonInfo.ContactList[i].isReferrence == false && PersonInfo.ContactList[i].isEmergencey == false){
        alert("Please choose if it is a referrence or mergencey as contact");
        return false;
      }
      //console.log(PersonInfo.ContactList[i].contactor);
      if(PersonInfo.ContactList[i].contactor.contactorFirstName == null || PersonInfo.ContactList[i].contactor.contactorFirstName == ""){
        alert("Please insert the contactor first name");
        return false;
      }
      if(PersonInfo.ContactList[i].contactor.contactorLastName == null || PersonInfo.ContactList[i].contactor.contactorLastName == ""){
        alert("Please insert the contactor last name");
        return false;
      }
      if(PersonInfo.ContactList[i].contactor.contactorEmail == null || PersonInfo.ContactList[i].contactor.contactorEmail == ""){
        alert("Please insert the contactor email");
        return false;
      }
      if(PersonInfo.ContactList[i].contactor.contactorCellPhone == null || PersonInfo.ContactList[i].contactor.contactorCellPhone == ""){
        alert("Please insert the contactor cell phone");
        return false;
      } 
    }
    return true;
  }

  addContact(){
    const contactPerson = this.fbuild.group({
      contactorFirstName: ['', Validators.required],
      contactorLastName: ['', Validators.required],
      contactorEmail: ['', Validators.required],
      contactorCellPhone: ['', Validators.required],
    });

    const oneContact = this.fbuild.group({
      relationship: ['', Validators.required],
      isReferrence: [null, Validators.required],
      isEmergencey: [null, Validators.required],
      isLandLord: [null, Validators.required],
      contactor: contactPerson,
  });
    this.contacts.push(oneContact);
  }

  deleteContact(lessonIndex: number) {
    this.contacts.removeAt(lessonIndex);
  }

  getPersonInfo(){
    let minDate = new Date(-8640000000000000);

    this.http.get<Person>('https://localhost:5401/api/OnBoarding/GetInfo').subscribe(data => {
      this.applicationForm.patchValue({firstName: data.firstname});
      this.applicationForm.patchValue({lastName: data.lastname});
      this.applicationForm.patchValue({email: data.email});
      this.applicationForm.patchValue({employee:{houseId: 0}});
      this.applicationForm.patchValue({employee:{startDate: new Date(1990,1,1)}});
      this.applicationForm.patchValue({employee:{endDate: new Date()}});
      this.applicationForm.patchValue({employee:{visaStatus:{createUser: 999}}});
      this.applicationForm.patchValue({employee:{visaStatus:{modificationDate: new Date()}}});
      this.applicationForm.patchValue({employee:{avatar: "default.png"}});
    },
    error => console.error(error));
  }

  onAvatarPathEmitted(value:string){
    // console.log(value);
    this.applicationForm.patchValue({avatar: value});
  }
}

interface Person{
  firstname: string;
  lastname: string;
  email: string;
}
