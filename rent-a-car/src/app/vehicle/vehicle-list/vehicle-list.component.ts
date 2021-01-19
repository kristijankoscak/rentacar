import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[]
  subscription: Subscription;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.fetchVehicle();
  }

  fetchVehicle(): void {
    this.subscription = this.vehicleService.vehiclesChanged.subscribe(
      ((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
        console.log(this.vehicles);
      })
    );
    this.vehicles = this.vehicleService.getVehicles();
    console.log(this.vehicles);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
