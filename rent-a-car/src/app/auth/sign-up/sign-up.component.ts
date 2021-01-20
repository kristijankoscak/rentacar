import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void{
    this.signUpForm = new FormGroup({
      firstName : new FormControl('', [
        Validators.required
      ]),
      lastName : new FormControl('', [
        Validators.required
      ]),
      dateOfBirth : new FormControl('', [
        Validators.required
      ]),
      email : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password : new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confPassword : new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }
  getEmailErrorMessage(): string {
    if (this.signUpForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.signUpForm.controls.email.hasError('email')) {
      return 'Not a valid email';
    }
    return this.signUpForm.controls.email.hasError('email') ? 'Not a valid enter' : '';
  }
  getPasswordErrorMessage(): string {
    if (this.signUpForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.signUpForm.controls.password.hasError('minlength')) {
      return 'Password must be longer';
    }
    return this.signUpForm.controls.password.hasError('password') ? 'Not a valid enter' : '';
  }
  getConfPasswordErrorMessage(): string {
    if (this.signUpForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.signUpForm.controls.password.hasError('minlength')) {
      return 'Password must be longer';
    }
    return this.signUpForm.controls.password.hasError('password') ? 'Not a valid enter' : '';
  }
  onSubmit(form): void {
    console.log(typeof form);
    if (!form.valid) {
      return;
    }
    this.http
        .post<any>(
          'https://sbdrustvo.com/register',
          {
            firstName: 'Branimir',
            lastName: 'Butković',
            birthday: '2020-12-12',
            email: 'branimir222@gmail.com',
            password: '123456'
          }
        )
        .subscribe(responseData => {
            console.log(responseData);
        });
    // form.reset();
  }
}
