import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../auth/user.model';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {
  companyForm: FormGroup;
  options: string[] = ['Zagreb', 'Split', 'Osijek', 'Rijeka'];
  filteredOptions: Observable<string[]>;
  city: FormControl = new FormControl();
  uploadedImage = '';
  imgTitle = 'Choose image';
  loggedUser: User;
  constructor(private userService: UserService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.filteredOptions = this.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.initForm();
    this.getUserInfo();
  }
  getUserInfo(){
      this.loggedUser = this.userService.getUser();
      if (this.loggedUser === undefined){
        this.http
      .post<any>(
        environment.apiUrl + '/auth',
        {
          token: localStorage.getItem('userToken')
        }
      )
      .pipe(
        tap(
          (responseData: any) => {
            this.loggedUser = responseData;
            this.userService.saveUser(this.loggedUser);
          },
          errorResponse => {
            localStorage.removeItem('userToken');
          }
        )
      );
      }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  initForm(): void{
    this.companyForm = new FormGroup({
      companyName : new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator
      ]),
      city : new FormControl('', [
        Validators.required,
        this.allowCity.bind(this)
      ]),
      address : new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator
      ]),
      phoneNumber : new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      email : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });
  }
  public noWhitespaceValidator(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    console.log(isWhitespace)
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  allowCity(control: FormControl): {[s: string]: boolean} {
    const isInputIncluded = this.options.includes(control.value)
    return isInputIncluded ? null : {allowCity: true}
  }
  getCompanyNameError(): string {
    if (this.companyForm.controls.companyName.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.companyForm.controls.companyName.hasError('whitespace')) {
      return 'Not a valid enter';
    }
    return this.companyForm.controls.companyName.hasError('companyName') ? 'Not a valid enter' : '';
  }
  getCityError(): string {
    if (this.city.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.city.hasError('allowCity')) {
      return 'Not valid city. Please choose one from list!';
    }
    return this.city.hasError('city') ? 'Not a valid enter' : '';
  }

  getAddressError(): string {
    if (this.companyForm.controls.address.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.companyForm.controls.address.hasError('whitespace')) {
      return 'Not a valid enter';
    }
    return this.companyForm.controls.address.hasError('address') ? 'Not a valid enter' : '';
  }
  getEmailErrorMessage(): string {
    if (this.companyForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.companyForm.controls.email.hasError('email')) {
      return 'Not a valid email';
    }
    return this.companyForm.controls.email.hasError('email') ? 'Not a valid enter' : '';
  }
  getPhoneNumberErrorMessage(): string {
    if (this.companyForm.controls.phoneNumber.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.companyForm.controls.phoneNumber.hasError('pattern')) {
      return 'Not a valid phone number';
    }
    return this.companyForm.controls.email.hasError('phoneNumber') ? 'Not a valid enter' : '';
  }
  onSubmit(form){
    console.log(form);
    if (!form.valid) {
      return;
    }
    this.http
        .post<any>(
          'https://sbdrustvo.com/carrental/',
          {
            user: this.loggedUser.id,
            name: form.value.companyName,
            city: form.value.city,
            address: form.value.address,
            contactNumber: form.value.phoneNumber,
            email: form.value.email,
            image: this.uploadedImage
          }
        )
        .subscribe(responseData => {
            if (responseData === 'success'){
              this.router.navigate(['/home']);
            }
        });
  }
  handleImageSelect(event): void {
    this.fetchBase64ImagePaths(event);
  }
  fetchBase64ImagePaths(event) {
    this.imgTitle = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.uploadedImage = reader.result as string;
    };
  }
}
