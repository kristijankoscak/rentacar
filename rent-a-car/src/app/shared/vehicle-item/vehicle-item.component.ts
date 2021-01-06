import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/vehicle/vehicle.model';

@Component({
  selector: 'app-vehicle-item',
  templateUrl: './vehicle-item.component.html',
  styleUrls: ['./vehicle-item.component.css']
})
export class VehicleItemComponent implements OnInit {

  @Input() vehicle: Vehicle;

  constructor() { }

  ngOnInit(): void {
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
