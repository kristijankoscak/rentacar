import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMonitor } from 'events';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  inputsAreInvalid: boolean = false;
  signInForm: FormGroup;
  constructor(
    private http: HttpClient,
    private authService:AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void{
    this.signInForm = new FormGroup({
      email : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password : new FormControl('', [
        Validators.required,
        Validators.minLength(6)
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
  onSubmit(form): void {
    console.log(typeof form)
    if (!form.valid) {
      return;
    }
    this.http
        .post<any>(
          environment.apiUrl +'/login',
          {
            email: this.signInForm.controls.email.value,
            password: this.signInForm.controls.password.value
          }
        )
        .subscribe(
          responseData => {
            this.authService.saveToken(responseData.token);
          },
          errorResponse => {
            if(errorResponse.error){
              this.inputsAreInvalid = true;
            }
          }
        );
  }
}
