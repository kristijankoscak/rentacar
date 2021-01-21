import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/vehicle/vehicle.model';
import { Image } from '../image.model';
@Component({
  selector: 'app-vehicle-item',
  templateUrl: './vehicle-item.component.html',
  styleUrls: ['./vehicle-item.component.css']
})
export class VehicleItemComponent implements OnInit {

  @Input() vehicle: Vehicle;
  coverImage: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setCoverImage();
  }

  setCoverImage(): void {
    const tempImage = this.vehicle.images.find((image:Image) => {
      return image.isCover === true
    })
    this.coverImage = tempImage.base64;

  }

  seeCarDetail(): void {
    this.router.navigate(['/vehicle/'+this.vehicle.id]
    );
  }
  seeRentalCar(): void {
    this.router.navigate(['../car-rental/'+this.vehicle.carRental.id], {
      relativeTo: this.route,
      }
    );
  }
}


/*

Forma s podacima o:
Marki vozila,
modelu,
godini modela,
godini proizvodnje,
broju brzina,
boji,
vrsti mjenjaca,
snagi u kW,
cijeni,
tipu,
naslovna slika,     [jpeg,jpg,png]
ostale slike...     [jpeg,jpg,png]

*/
