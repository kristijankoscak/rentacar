import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor() {
  }

  ngOnInit(): void {
    this.setValidators();
  }
  setValidators(): void{
    this.signInForm = new FormGroup({
      email : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password : new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }
  getEmailErrorMessage(): string {
    if (this.signInForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.signInForm.controls.email.hasError('email')) {
      return 'Not a valid email';
    }
    return this.signInForm.controls.email.hasError('email') ? 'Not a valid enter' : '';
  }
  getPasswordErrorMessage(): string {
    if (this.signInForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.signInForm.controls.password.hasError('minlength')) {
      return 'Password must be longer';
    }
    return this.signInForm.controls.password.hasError('password') ? 'Not a valid enter' : '';
  }
}
