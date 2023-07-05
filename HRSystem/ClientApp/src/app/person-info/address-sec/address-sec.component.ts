import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonInfoComponent } from '../person-info.component'; 
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-sec',
  templateUrl: './address-sec.component.html',
  styleUrls: ['./address-sec.component.css']
})
export class AddressSecComponent implements OnInit {
  addressSec!: AddressSec;
  public editMode = false;
  public editForm!: FormGroup;
  public addressForm!: FormGroup;
  @Input() isHR!: boolean;
  @Input() pid!: string;
  
  constructor(private http: HttpClient,private formBuilder: FormBuilder) { 
    // this.addressForm = this.formBuilder.group({
    //   addressLine1: [''],
    //   addressLine2:[''],
    //   city: [''],
    //   zipcode: [''],
    //   stateName: [''],
    //   stateAbbr: [''],
    //   // isSecondary: [''] //click 
    // });

    this.editForm = this.formBuilder.group({
      addressArray: this.formBuilder.array([])
    });

  }

  get addressFormGetter():FormArray {
    return <FormArray> this.editForm.get('addressArray');
  }

  populateForm(){
    while (this.addressFormGetter.length) {
      this.addressFormGetter.removeAt(0);
    }

    for (let address of this.addressSec.addresses){
      this.addressFormGetter.push(this.formBuilder.group({
        id: [address.id],
        addressLine1: [address.addressLine1, Validators.required],
        addressLine2:[address.addressLine2],
        city: [address.city, Validators.required],
        zipcode: [address.zipcode, Validators.required],
        stateName: [address.stateName, Validators.required],
        stateAbbr: [address.stateAbbr, Validators.required],
        personId: [address.personId],
        isSecondary: [address.isSecondary]
        }));
    }
  }

  ngOnInit(): void {
    this.getAddressSec();
  }

  getAddressSec() {
    this.http.get<AddressSec>('https://localhost:5401/api/PersonalInformation/address/?pid='+this.pid.toString()).subscribe(data => {
      this.addressSec = data;
      // this.populateForm();

    });
  }


  toggleEdit(){
    this.editMode = !this.editMode;
  }

  cancelEdit() {
    if (window.confirm('Are you sure you want to discard all your changes?')) {
      this.toggleEdit();
    }
  }

  onSubmit(){
    // while (this.addressSec.addresses.length!=0){
    //   this.addressSec.addresses.pop();
    // }
    let i = 0; 
    for (let item of this.addressFormGetter.controls){
      this.addressSec.addresses[i].addressLine1 = item.value.addressLine1;
      this.addressSec.addresses[i].addressLine2 = item.value.addressLine2;
      this.addressSec.addresses[i].city = item.value.city;
      this.addressSec.addresses[i].stateName = item.value.stateName;
      this.addressSec.addresses[i].zipcode = item.value.zipcode;
      this.addressSec.addresses[i].stateAbbr = item.value.stateAbbr;
      i += 1;
    }
    
    console.log(this.addressSec);
    this.http.post<AddressSec>('https://localhost:5401/api/PersonalInformation/address', this.addressSec)
    .subscribe(data => {
      // this.nameSec = data;
      // this.toggleEdit();
      console.log(this.addressSec);
      this.editMode = false;
    },
    error => console.error(error));
  }

}

interface Address {
  id: number,
  addressLine1: string,
  addressLine2:string,
  city: string,
  zipcode: string,
  stateName: string,
  stateAbbr: string,
  personId: number
  isSecondary: boolean
}

interface AddressSec {
  addresses: Address[]
}

