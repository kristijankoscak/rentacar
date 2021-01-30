import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SnackBarSuccSignUpComponent } from '../auth/snack-bar-succ-sign-up/snack-bar-succ-sign-up.component';
import { UserService } from '../auth/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todayDate = new Date();
  filterForm: FormGroup;
  options: string[] = ['Zagreb', 'Split', 'Osijek', 'Rijeka'];
  filteredOptions: Observable<string[]>;
  location = new FormControl('');
  startTime: string;
  endTime: string;
  durationInSeconds:number = 3;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private userService: UserService,
              private snackBar: MatSnackBar) {
    }
  ngOnInit(): void {
    this.subscribeToNavigationErrors();
    this.filteredOptions = this.location.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.initForm()
  }
  subscribeToNavigationErrors(): void{
    this.userService.showNotAllowedError.subscribe(
      value => {
        if (value === true){
          this.snackBar.openFromComponent(SnackBarSuccSignUpComponent, {
            data: 'You are not allowed to visit this page. You are redirectered to home page.',
            duration: this.durationInSeconds * 1000

          });
          this.userService.showNotAllowedError.next(false);
        }
      }
    );
  }

  initForm(){
    this.filterForm = new FormGroup({
      location : new FormControl('', [
        Validators.required,
        this.allowCity.bind(this)
      ]),
      start : new FormControl('', [
        Validators.required
      ]),
      end : new FormControl('', [
        Validators.required,
      ]),
    });
  }
  allowCity(control: FormControl): {[s: string]: boolean} {
    if (!this.options.includes(control.value)) {
      return {allowCity: true};
    }
    return null;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  /* getLocationError(): string {
    if (this.location.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.location.hasError('allowCity')) {
      return 'Not valid city. Please choose one from list!';
    }
    return this.location.hasError('city') ? 'Not a valid enter' : '';
  } */
  getStartDateErrorMessage(): string{
    if (this.filterForm.controls.start.hasError('required')) {
      return 'You must enter a value';
    }
    return this.filterForm.controls.start.hasError('start') ? 'Not a valid enter' : '';
  }
  getEndDateErrorMessage(): string{
    if (this.filterForm.controls.end.hasError('required')) {
      return 'You must enter a value';
    }
    return this.filterForm.controls.end.hasError('end') ? 'Not a valid enter' : '';
  }
  onSubmit(form): void{
    if (!form.valid) {
      return;
    }
    if(this.formatDates(form.value.start, form.value.end)){
      this.router.navigate(['../vehicle'], {
        relativeTo: this.route,
        queryParams:
          {
            location: form.value.location,
            start_date: this.startTime,
            end_date: this.endTime,
          }
        }
      );
    }
  }
  formatDates(startDate, endDate): boolean{
    let start_date = new Date(startDate)
    let end_date = new Date(endDate)
    this.startTime = start_date.getFullYear() + '-' + (start_date.getMonth() + 1) + '-' + start_date.getDate();
    this.endTime = end_date.getFullYear() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate();
    return true;
  }
}
