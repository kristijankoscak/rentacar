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
  ])
  constructor() { }

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
      ]),
      email : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });
  }
  allowCity(control: FormControl): {[s: string]: boolean} {
    if (!this.options.includes(control.value)) {
      return {'allowCity': true};
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
}
