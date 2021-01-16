import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/vehicle/vehicle.model';

@Component({
  selector: 'app-vehicle-item',
  templateUrl: './vehicle-item.component.html',
  styleUrls: ['./vehicle-item.component.css']
})
export class VehicleItemComponent implements OnInit {

  @Input() vehicle: Vehicle;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  seeCarDetail(): void{
    this.router.navigate(['./{{vehicle.id}}'], {
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
