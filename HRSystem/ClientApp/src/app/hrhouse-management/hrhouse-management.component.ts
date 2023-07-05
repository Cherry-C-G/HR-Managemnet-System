import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-hrhouse-management',
  templateUrl: './hrhouse-management.component.html',
  styleUrls: ['./hrhouse-management.component.css']
})
export class HRHouseManagementComponent {
  public hrhouses: House[] = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
    http.get<House[]>('https://localhost:5401/houseDetailHR').subscribe(data => {
      this.hrhouses = data;
    }, error => console.error(error));
  }

  //Add House
  reportForm!: FormGroup<any>;

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      contactId: [''],
      address: [''],
      numberOfPerson: ['']
    })
  }

  onSubmit() {
    const contactId = this.reportForm.value.contactId;
    const address = this.reportForm.value.address;
    const numberOfPerson = this.reportForm.value.numberOfPerson;

    const endpoint = 'https://localhost:5401/addHouse';
    console.log(endpoint);

    this.http.post(endpoint, { contactId, address, numberOfPerson})
      .subscribe(
        (response) => {
          this.reportForm.controls.contactId.setValue('');
          this.reportForm.controls.address.setValue('');
          this.reportForm.controls.numberOfPerson.setValue('');
          alert("succeeded");
        },
        (error) => {
          alert(error.error.message)
        }
      )
  }

  deleteItem(HouseID: number) {

    const endpoint = 'https://localhost:5401/deleteHouse/' + HouseID;
    console.log(endpoint);

    this.http.delete(endpoint, {})
      .subscribe(
        (response) => {
          alert("succeeded");
        }
        //,
        //(error) => {
        //  alert(error.error.message)
        //}
      )

  }

  openDetails(HouseID: number) {
    this.router.navigate(['/detail', HouseID]);
  }

}



interface House{
  id: number;//not show on page
  houseID: number;
  houseAddress: string;
  landlord: string;
  phone: string;
  email: string;
  numberOfEmployee: number;
}





