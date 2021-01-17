import { ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) { }

  imagesAreUploaded: boolean = false;
  screenType: string;
  vehicleID: number;
  vehicle: any;
  formIsValid: boolean = false;
  vehicleForm: FormGroup;
  uploadedImages: string[] = [];
  coverImage: string = '';
  otherImages: string[] = [];
  @ViewChild('imagesUploader') imagesUploader;

  marks = [
    { value: 'BMW' },
    { value: 'Mercedes' },
    { value: 'Audi' },
    { value: 'Opel' },
    { value: 'Dacia' },
    { value: 'Volvo' },
    { value: 'Volkswagen' },
    { value: 'Fiat' },
    { value: 'Renault' }
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
      model: new FormControl(null, [Validators.required]),
      model_year: new FormControl(null, [Validators.required]),
      manufacture_year: new FormControl(null, [Validators.required]),
      gears: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      gearbox: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      power: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      fuel_type: new FormControl(null, [Validators.required])
    });
    this.validateForm();
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
      this.vehicle = this.fetchVehicleByID();
      this.fillInputs();
    }
    else {
      this.screenType = 'add'
    }
  }
  fetchVehicleByID(): Vehicle {
    const tempVehicle = {
      id: this.vehicleID,
      color: "Red",
      coverImage: "https://www.autoto.hr/EasyEdit/UserFiles/CatalogGallery/fiat-punto-12-benzin-rabljeno-vozilo-at073219/fiat-punto-12-benzin-rabljeno-vozilo-at073219-637070059849833280_1600_900.jpeg",
      fuel_type: "Diesel",
      gearbox: "Automatic",
      gears: 5,
      manufacture_year: '2015',
      mark: "BMW",
      model: "X5",
      model_year: '2015',
      otherImages: [
        "https://www.autoto.hr/EasyEdit/UserFiles/CatalogGallery/fiat-punto-12-benzin-rabljeno-vozilo-at073219/fiat-punto-12-benzin-rabljeno-vozilo-at073219-637070060125927055_1600_900.jpeg",
        "https://rabljena.autohrvatska.hr/EasyEdit/UserFiles/CatalogGallery/fiat-punto-evo-13-mjt/fiat-punto-evo-13-mjt-637430205650403697_1600_900.jpeg",
        "https://i.ytimg.com/vi/fivkMD7_4Vg/maxresdefault.jpg"
      ],
      power: 125,
      price: 86,
      status: "Available",
      type: "Suv",
    }
    return tempVehicle;
  }
  fillInputs(): void {
    this.vehicleForm.controls.mark.setValue(this.vehicle.mark);
    this.vehicleForm.controls.model.setValue(this.vehicle.model);
    this.vehicleForm.controls.model_year.setValue(this.vehicle.model_year);
    this.vehicleForm.controls.manufacture_year.setValue(this.vehicle.manufacture_year);
    this.vehicleForm.controls.gears.setValue(this.vehicle.gears);
    this.vehicleForm.controls.color.setValue(this.vehicle.color);
    this.vehicleForm.controls.gearbox.setValue(this.vehicle.gearbox);
    this.vehicleForm.controls.status.setValue(this.vehicle.status);
    this.vehicleForm.controls.power.setValue(this.vehicle.power);
    this.vehicleForm.controls.type.setValue(this.vehicle.type);
    this.vehicleForm.controls.price.setValue(this.vehicle.price);
    this.vehicleForm.controls.fuel_type.setValue(this.vehicle.fuel_type);
    this.setImages();
  }
  setImages(): void {
    this.coverImage = this.vehicle.coverImage;
    this.otherImages = this.vehicle.otherImages;
    this.uploadedImages.push(this.coverImage);
    this.uploadedImages = this.uploadedImages.concat(this.otherImages);
    this.setCover();
  }
  setCover(): void {
    setTimeout(() => {
      this.uploadedImages.forEach((image, index) => {
        if (image === this.coverImage) {
          this.addBackgroundToCoverImage(index);
        }
      })
    }, 1000);
    setTimeout(()=>{
      this.imagesAreUploaded = true;
    },1000);
  }

  handleImageSelect(event): void {
    this.fetchBase64ImagePaths(event);
  }
  fetchBase64ImagePaths(event) {
    Array.from(event.target.files).forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.uploadedImages.push(reader.result as string);
      }
    })
  }
  pickCoverImage(index): void {
    this.removeBackgroundFromImages();
    this.coverImage = this.uploadedImages[index];
    this.otherImages = this.fetchOtherImages(index);
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
  fetchOtherImages(coverIndex): string[] {
    let tempImages: string[] = [];
    this.uploadedImages.forEach((imagePath, index) => {
      if (index != coverIndex) {
        tempImages.push(imagePath);
      }
    })
    return tempImages;
  }
  removeImages(): void {
    this.imagesUploader.nativeElement.value = '';
    this.uploadedImages = [];
    this.coverImage = '';
    this.otherImages = [];
  }
  addNewVehicle(): void {
    let vehicle = {
      ...this.vehicleForm.value,
      coverImage: this.coverImage,
      otherImages: this.otherImages
    };
    if (this.screenType === 'add') {
      console.log('add...');
      console.log(vehicle);
    }
    else {
      vehicle = {
        ...vehicle,
        id: this.vehicle.id
      }
      console.log('edit...');
      console.log(vehicle);
    }

  }
}
