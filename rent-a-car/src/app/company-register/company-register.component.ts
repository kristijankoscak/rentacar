import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {
  companyForm: FormGroup;
  options: string[] = ['Zagreb', 'Split', 'Osijek', 'Rijeka'];
  filteredOptions: Observable<string[]>;
  city = new FormControl('', [
    Validators.required,
    this.allowCity.bind(this)
  ]);
  constructor(
    private http: HttpClient) { }

  ngOnInit(): void {
    this.filteredOptions = this.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.initForm();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  initForm(): void{
    this.companyForm = new FormGroup({
      companyName : new FormControl('', [
        Validators.required
      ]),
      address : new FormControl('', [
        Validators.required
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
  allowCity(control: FormControl): {[s: string]: boolean} {
    if (!this.options.includes(control.value)) {
      return {allowCity: true};
    }
    return null;
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
    console.log(typeof form);
    if (!form.valid) {
      return;
    }
    this.http
        .post<any>(
          'https://sbdrustvo.com/carrental/',
          {
            name: 'pekijevaautokuca',
            city: 'Osijek',
            address: 'Retfala',
            contactNumber: '54454455',
            email: 'peky@autokuca.com',
            image: 'afafafas'
          }
        )
        .subscribe(responseData => {
            console.log(responseData);
        });
  }
}
