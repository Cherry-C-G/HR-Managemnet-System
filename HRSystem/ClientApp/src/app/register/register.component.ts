import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emptyValidator } from '../empty.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, private fbuild: FormBuilder, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }


  registerForm !: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fbuild.group({
      email: ['', emptyValidator()],
      token: ['', emptyValidator()],
      firstName: ['', emptyValidator()],
      lastName: ['', emptyValidator()],
      username: ['', emptyValidator()],
      password: ['', emptyValidator()],
      confirmPassword: ['', emptyValidator()]
    });
  }

  onSubmit() {
    if (this.registerForm.value.email == '') {
      alert('email must be inputed')
      return;
    }
    if (this.registerForm.value.token == '') {
      alert('token must be inputed')
      return;
    }
    if (this.registerForm.value.firstName == '') {
      alert('firstName must be inputed')
      return;
    }
    if (this.registerForm.value.lastName == '') {
      alert('lastName must be inputed')
      return;
    }
    if (this.registerForm.value.password == '') {
      alert('password must be inputed')
      return;
    }
    if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
      alert('password not match!');
      return;
    }

    const registerData = {
      email: this.registerForm.value.email,
      token: this.registerForm.value.token,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
    }
    this.http.post('http://localhost:5000/api/Register', registerData)
      .subscribe(
        (res) => {
          alert("Register success, please log in")
          this.router.navigate(['/login']);
        },
        (error) => {
          alert(error.error.message);
        }
      )
  }

}
