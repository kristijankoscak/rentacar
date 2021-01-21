import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehicleService } from '../shared/vehicle.service';
import { Vehicle } from '../vehicle/vehicle.model';
import { CarRental } from './car-rental.model';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {
  vehicles: Vehicle[];
  carRental: CarRental = {
    id: 0,
    name: '',
    city: '',
    address: '',
    contactNumber: '',
    email: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    image: ''
  };
  subscription: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    this.getParametersFromRoute();
    this.fetchVehicleByCarRental()
  }
  getParametersFromRoute(): void{
    this.route.params.subscribe((params: Params) => {
      this.http
        .get<any>(
          'https://sbdrustvo.com/carrental/' + params.id,
        )
        .subscribe(responseData => {
          this.carRental = responseData[0];
          console.log(this.carRental)
        });
      });
  }
  fetchVehicleByCarRental(): void {
    this.subscription = this.vehicleService.vehiclesChanged.subscribe(
      ((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      })
    );
    this.vehicles = this.vehicleService.getVehicles();
    console.log(this.vehicles)
  }
}
