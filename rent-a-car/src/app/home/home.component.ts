import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todayDate = new Date();
  location = new FormControl('', [
    Validators.required
  ]);
  options: string[] = ['Zagreb', 'Split', 'Osijek', 'Rijeka'];
  filteredOptions: Observable<string[]>;

  start = new FormControl('');
  end = new FormControl('');
  constructor(private router: Router,
              private route: ActivatedRoute) {
      this.start = new FormControl('', [
        Validators.required
      ]);
      this.end = new FormControl('', [
        Validators.required,
        Validators.min(this.start.value)
      ]);
    }
  ngOnInit(): void {
    this.filteredOptions = this.location.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  getErrorMessage(): string {
    if (this.end.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.end.hasError('matDatepickerMin')) {
      return 'Not a valid date';
    }
    return this.end.hasError('email') ? 'Not a valid enter' : '';
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  openVehicleList(): void{
    if (this.location.valid && this.start.valid && this.end.valid){
      this.router.navigate(['../vehicle'], {
        relativeTo: this.route,
        queryParams:
          {
            location: this.location.value,
            start_date: this.start.value,
            end_date: this.end.value,
          }
        }
      );
    }
  }
}
