import { ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Image } from 'src/app/shared/image.model';
import { VehicleService } from 'src/app/shared/vehicle.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private dataStorageService: DataStorageService,
    private userService: UserService
  ) { }

  imagesAreUploaded: boolean = false;
  coverIsPicked: boolean = false;
  screenType: string;
  vehicleID: number;
  vehicle: any;
  formIsValid: boolean = false;
  vehicleForm: FormGroup;
  uploadedImages: Image[] = [];
  vehicleIsAdded: boolean = true;
  @ViewChild('imagesUploader') imagesUploader;

  formatedVehicle: any;

  marks = [
    { value: 'BMW' },
    { value: 'Mercedes' },
    { value: 'Audi' },
    { value: 'Opel' },
    { value: 'Dacia' },
    { value: 'Volvo' },
    { value: 'Volkswagen' },
    { value: 'Fiat' },
    { value: 'Renault' },
    { value: 'Ford' },
    { value: 'Toyota' }
  ];
  colors = [
    { value: 'Red' },
    { value: 'Green' },
    { value: 'Blue' },
    { value: 'Yellow' },
    { value: 'Orange' },
    { value: 'Purple' },
    { value: 'Gray' },
    { value: 'Black' }
  ];
  gearboxs = [
    { value: 'Automatic' },
    { value: 'Semi-Automatic' },
    { value: 'Manual' }
  ];
  status = [
    { value: 'Available' },
    { value: 'Unavailable' }
  ];
  types = [
    { value: 'Sedan' },
    { value: 'Coupe' },
    { value: 'Cabriolet' },
    { value: 'Truck' },
    { value: 'Micro' },
    { value: 'Suv' },
    { value: 'Hatchback' },
    { value: 'Pickup' },
    { value: 'Van' }
  ];
  fuelTypes = [
    { value: 'Diesel' },
    { value: 'Petrol' },
    { value: 'Hybrid' },
    { value: 'Electric' }
  ];

  ngOnInit(): void {
    this.initForm();
    this.checkScreenType();
  }
  initForm(): void {
    this.vehicleForm = new FormGroup({
      mark: new FormControl(null, [Validators.required]),
      model: new FormControl('', [Validators.required,this.whiteSpaceValidator]),
      modelYear: new FormControl('', [Validators.required,this.whiteSpaceValidator]),
      manufactureYear: new FormControl('', [Validators.required,this.whiteSpaceValidator]),
      gears: new FormControl('', [Validators.required,this.whiteSpaceValidator]),
      color: new FormControl(null, [Validators.required]),
      gearbox: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      power: new FormControl('', [Validators.required,this.whiteSpaceValidator]),
      type: new FormControl(null, [Validators.required]),
      price: new FormControl('', [Validators.required,this.whiteSpaceValidator]),
      fuelType: new FormControl(null, [Validators.required]),
      discount: new FormControl('', [Validators.required,this.whiteSpaceValidator]),
      gateNumber: new FormControl('', [Validators.required,this.whiteSpaceValidator])
    });
    this.validateForm();
  }
  public whiteSpaceValidator(control: FormControl): any {
    if(control.value){
      const isWhitespace = (control.value.toString() || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { whitespace: true };
    }
  }
  validateForm(): void {
    this.vehicleForm.valueChanges.subscribe(() => {
      if (this.vehicleForm.status === 'VALID') {
        this.formIsValid = true;
      }
      else {
        this.formIsValid = false;
      }
    });
  }
  checkScreenType(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vehicleID = id;
      this.screenType = 'edit';
      this.vehicle = this.vehicleService.getVehicle(this.vehicleID)
      this.fillInputs();
    }
    else {
      this.screenType = 'add'
    }
  }
  fillInputs(): void {
    this.vehicleForm.controls.mark.setValue(this.vehicle.mark);
    this.vehicleForm.controls.model.setValue(this.vehicle.model);
    this.vehicleForm.controls.modelYear.setValue(this.getYear(this.vehicle.modelYear));
    this.vehicleForm.controls.manufactureYear.setValue(this.getYear(this.vehicle.manufactureYear));
    this.vehicleForm.controls.gears.setValue(this.vehicle.gears);
    this.vehicleForm.controls.color.setValue(this.vehicle.color);
    this.vehicleForm.controls.gearbox.setValue(this.vehicle.gearbox);
    this.vehicleForm.controls.status.setValue(this.vehicle.status);
    this.vehicleForm.controls.power.setValue(this.vehicle.power);
    this.vehicleForm.controls.type.setValue(this.vehicle.type);
    this.vehicleForm.controls.price.setValue(this.vehicle.price);
    this.vehicleForm.controls.fuelType.setValue(this.vehicle.fuelType);
    this.vehicleForm.controls.gateNumber.setValue(this.vehicle.gateNumber);
    this.vehicleForm.controls.discount.setValue(this.vehicle.discount);
    this.setImages();
  }
  getYear(date:any): number{
    let tempDate;
    if(date.date){
      tempDate = new Date(date.date);
    }
    else{
      tempDate = new Date(date);
    }
   let year = +tempDate.getFullYear();
    return year;
  }
  setImages(): void {
    this.filterImages(this.vehicle.images);
  }
  filterImages(images: Image[]): void {
    let coverIndex = 0;
    images.forEach((image,index) =>{
      if(image.isCover){
        coverIndex = index;
      }
      this.uploadedImages.push(image);
    })
    this.imagesAreUploaded = true;
    this.coverIsPicked = true;
    setTimeout(()=>{
      this.pickCoverImage(coverIndex);
    },500);
  }
  handleColorsSelect(value: string): string{
    let tempColor:string = '';
    this.colors.forEach((color) => {
      if(color.value.toUpperCase() === value.toUpperCase()){
        tempColor = color.value;
      }
    })
    return tempColor;
  }
  handleTypeSelect(value: string): string{
    let tempType:string = '';
    this.types.forEach((type) => {
      if(type.value.toUpperCase() === value.toUpperCase()){
        tempType = type.value;
      }
    })
    return tempType;
  }

  handleImageSelect(event): void {
    this.fetchBase64ImagePaths(event);
  }
  fetchBase64ImagePaths(event) {
    Array.from(event.target.files).forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.uploadedImages.push({isCover: false, base64: reader.result as string});
      }
    })
  }
  pickCoverImage(index): void {
    this.removeBackgroundFromImages();
    this.coverIsPicked = true;
    this.uploadedImages.forEach(image => image.isCover = false);
    this.uploadedImages[index].isCover = true;
    this.addBackgroundToCoverImage(index);
  }
  removeBackgroundFromImages(): void {
    let elements = this.element.nativeElement.querySelectorAll('.uploaded-image');
    elements.forEach(element => {
      this.renderer.removeClass(element, 'cover-image');
    });
  }
  addBackgroundToCoverImage(index): void {
    let element = this.element.nativeElement.querySelectorAll('.uploaded-image')[index];
    this.renderer.addClass(element, 'cover-image');
  }
  removeImages(): void {
    this.imagesUploader.nativeElement.value = '';
    this.uploadedImages = [];
    this.coverIsPicked = false;
  }
  compareImages(images: Image[],images2: Image[]): boolean{
    let same = true;
    images.forEach((image,index)=>{
      if(image !== images2[index]){
        same = false;
        return;
      }
    });
    return same;
  }
  addVehicle(): void {
    this.formatVehicleData();
    if (this.screenType === 'add') {
      this.handleAddingVehicle();
    }
    else {
      this.handleUpdatingVehicle();
    }

  }
  handleAddingVehicle(): void{
    this.addImagesToFormatedVehicle();
    this.dataStorageService.addVehicle(this.formatedVehicle).subscribe(
      response=>{
        this.vehicleIsAdded = false;
        this.dataStorageService.fetchVehicles().subscribe(
          response=>{
            this.vehicleIsAdded = true;
            this.router.navigate(['/vehicle']);
          },
          errorResponse => {}
        );
      },
      errorResponse => {}
    );
  }
  handleUpdatingVehicle(): void{
    this.formatedVehicle = {
      ...this.formatedVehicle,
      carRental: this.vehicle.carRental,
      id: this.vehicle.id
    }
    let same = this.compareImages(this.vehicle.images,this.uploadedImages);
    if(!same){
      this.formatedVehicle = {
        ...this.formatedVehicle,
        images: this.uploadedImages
      }
    }
    this.vehicleService.handleUpdating(this.formatedVehicle);
    this.dataStorageService.updateVehicle(this.formatedVehicle).subscribe();
  }
  formatVehicleData(): void{
    this.formatedVehicle = {
      ...this.vehicleForm.value,
      manufactureYear: new Date(this.vehicleForm.controls.manufactureYear.value,1,1),
      modelYear: new Date(this.vehicleForm.controls.modelYear.value,1,1),
      user_id: this.userService.getUser().id
    };
  }
  addImagesToFormatedVehicle(): void{
    this.formatedVehicle = {
      ...this.formatedVehicle,
      images: this.uploadedImages
    }
  }
}
