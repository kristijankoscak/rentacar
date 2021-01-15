import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {

  vehicle: Vehicle;
  vehicleImages: string[] = [];

  currentImage = 1;
  imageWidth: number;
  imagesCount: number;
  borders: number[] = [];

  routeParams: Params;

  filterForm: FormGroup;
  formIsValid: boolean = false;
  minDate: Date = new Date();
  options: string[] = ['Zagreb', 'Split', 'Osijek','Rijeka'];
  filteredOptions: Observable<string[]>;

  warningWindowIsOpened: boolean = false;

  constructor(private element: ElementRef,private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchVehicle();
    this.initImagesData();
    this.initBorders();
  }
  fetchVehicle(): void{
    this.vehicle = {
      id: 1,
      mark:'Hyundai',
      model: 'i30',
      model_year:'2017',
      manufacture_year: '2017',
      gears: 6,
      color: 'White',
      gearbox: 'Manual',
      status: 'Dostupan',
      power: 85,
      price: 55,
      type: 'Limusine',
      coverImage: 'https://www.autoto.hr/EasyEdit/UserFiles/CatalogGallery/hyundai-i30-14i-benzin-rabljeno-vozilo-at145019/hyundai-i30-14i-benzin-rabljeno-vozilo-at145019-637402731521255325_370_209@2x.jpeg',
      otherImages: [
        'https://static.jutarnji.hr//images/live-multimedia/binary/2020/2/26/16/2021-Hyundai-i30-Family-2.jpg',
        'https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/story/hero_image/Hyundai%20i30%202019%20Europe%20front%203-4.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREk2A4-03Bsej0wrqvXaYdf0GK8ohxz1jPcA&usqp=CAU'
      ]
    };
    this.vehicleImages.push(this.vehicle.coverImage);
    this.vehicleImages = this.vehicleImages.concat(this.vehicle.otherImages);
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
  handleReservation(): void{
    this.fetchParams();
    if(this.routeParams.startDate === undefined){
      this.initForm();
      this.validateForm();
      this.warningWindowIsOpened = true;
    }
    else{
      this.navigateTonConfirmScreen();
    }
  }
  initForm(): void{
    this.filterForm = new FormGroup({
      location: new FormControl(null, [Validators.required]),
      start_time: new FormControl(null, [Validators.required]),
      end_time: new FormControl(null, [Validators.required])
    });
    this.filterPlaceOptions();
  }
  filterPlaceOptions(): void{
    this.filteredOptions = this.filterForm.controls.location.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  validateForm(): void{
    this.filterForm.valueChanges.subscribe(val => {
      if (this.filterForm.status === 'VALID'){
        this.formIsValid = true;
      }
      if (this.filterForm.status === 'INVALID'){
        this.formIsValid = false;
      }
    });
  }
  closeWarning(): void{
    this.warningWindowIsOpened = false;
  }

  navigateTonConfirmScreen(): void{

  }
}
