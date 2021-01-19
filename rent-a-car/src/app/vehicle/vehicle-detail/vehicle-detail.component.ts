import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Image } from 'src/app/shared/image.model';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {

  subscription: Subscription;
  spinnerIsClosed: boolean;

  vehicle: Vehicle;
  vehicleImages: Image[];

  currentImage = 1;
  imageWidth: number;
  imagesCount: number;
  borders: number[] = [];

  routeParams: Params;

  filterForm: FormGroup;
  formIsValid: boolean = false;
  minDate: Date = new Date();
  minDate2: Date;
  options: string[] = ['Zagreb', 'Split', 'Osijek', 'Rijeka'];
  filteredOptions: Observable<string[]>;

  warningWindowIsOpened: boolean = false;

  constructor(
    private vehicleService: VehicleService,
    private element: ElementRef,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.spinnerIsClosed = false;
    this.fetchVehicle();
  }
  fetchVehicle(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    let tempVehicles = this.vehicleService.getVehicles();
    if (tempVehicles.length === 0) {
      this.subscription = this.vehicleService.vehiclesChanged.subscribe((vehicles) => {
        this.vehicle = vehicles.find(vehicle => { return vehicle.id === id });
        this.showVehicle();
      })
    }
    else {
      this.vehicleService.fetchVehicleByID(id);
      this.subscription = this.vehicleService.vehicleIsPicked.subscribe(vehicle => {
        this.vehicle = vehicle;
        this.showVehicle();
      })
    }
  }
  showVehicle(): void{
    this.spinnerIsClosed = true;
    this.initImagesData();
    this.initBorders();
  }
  initImagesData(): void {
    const image = this.element.nativeElement.querySelector('.slide-container');
    this.imageWidth = image.offsetWidth;
    this.imagesCount = this.vehicleImages.length;
    this.initBorders();
  }
  initBorders(): void {
    for (let i = 0; i < this.vehicleImages.length; i++) {
      this.borders.push(i * this.imageWidth);
    }
  }
  handleScroll(data): void {
    const currentOffset = data.target.scrollLeft;
    if (currentOffset < this.imageWidth) {
      this.currentImage = 1;
    }
    else if (currentOffset > this.borders[this.currentImage] && currentOffset < this.borders[this.currentImage + 1]) {
      this.currentImage++;
    }
    else if (currentOffset < this.borders[this.currentImage - 1]) {
      this.currentImage--;
    }
    else if (currentOffset >= ((this.imagesCount - 1) * this.imageWidth)) {
      this.currentImage = this.imagesCount;
    }
  }
  fetchParams(): void {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.routeParams = params;
    });
  }
  handleReservation(): void {
    this.fetchParams();
    if (this.routeParams.location === undefined) {
      this.initForm();
      this.validateForm();
      this.warningWindowIsOpened = true;
    }
    else {
      this.navigateTonConfirmScreen();
    }
  }
  initForm(): void {
    this.filterForm = new FormGroup({
      location: new FormControl(null, [Validators.required]),
      start_time: new FormControl(null, [Validators.required]),
      end_time: new FormControl(null, [Validators.required])
    });
    this.filterPlaceOptions();
  }
  filterPlaceOptions(): void {
    this.filteredOptions = this.filterForm.controls.location.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  validateForm(): void {
    this.filterForm.valueChanges.subscribe(val => {
      if (this.filterForm.status === 'VALID') {
        this.formIsValid = true;
      }
      if (this.filterForm.status === 'INVALID') {
        this.formIsValid = false;
      }
    });
  }
  closeWarning(): void {
    this.warningWindowIsOpened = false;
  }

  fetchStartDate(date): void {
    this.minDate2 = date;
  }

  navigateToEditScreen(): void {
    this.router.navigate(['/vehicle/' + this.vehicle.id + '/edit']);
  }
  removeCurrentVehicle(): void {
    //todo
  }
  navigateTonConfirmScreen(): void {
    if (!this.routeParams.location) {
      this.routeParams = this.filterForm.value;
      console.log(this.routeParams);
    }
    this.router.navigate(['reserve'], { relativeTo: this.activeRoute, queryParams: this.routeParams });
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
