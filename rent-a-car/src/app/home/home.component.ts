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
  location = new FormControl('',[
    Validators.required
  ]);
  options: string[] = ['Zagreb', 'Split', 'Osijek','Rijeka'];
  filteredOptions: Observable<string[]>;
  start = new FormControl(new Date,[
    Validators.required
  ])
  end = new FormControl('')
  constructor(private router: Router, 
    private route: ActivatedRoute) { 
      const today = new Date();

      let tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      this.end = new FormControl(tomorrow,[
        Validators.required
      ])
    }

  ngOnInit(): void {
    this.filteredOptions = this.location.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  openVehicleList(){
    if(this.location.valid && this.start.valid && this.end.valid){
      this.router.navigate(['../vehicle'], {
        relativeTo: this.route,
        queryParams:
          {
            location: this.location.value,
            room: this.start.value,
            adults: this.end.value,
          }
        }
      );
    }
  }
}
