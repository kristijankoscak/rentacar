import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Vehicle } from '../vehicle/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {


  vehicles : Vehicle[] = [];
  vehiclesChanged = new Subject<Vehicle[]>();
  vehiclePicked = new Subject<Vehicle>();
  vehiclesLoaded = new Subject<boolean>();


  constructor() { }
  setVehicles(vehicles: Vehicle[]): void {
    //this.vehiclesLoaded.next(true);
    console.log(this.vehicles);
    this.vehicles = vehicles;
    this.vehiclesChanged.next(this.vehicles.slice());

  }
  getVehicles(): Vehicle[]{
    return this.vehicles;
  }
  getVehicleByID(id:number): void{
    let vehicle:Vehicle;
    const subscription = this.vehiclesChanged.subscribe(vehicleArray => {
      this.vehicles = vehicleArray;
      vehicle = this.vehicles.find(vehicle => {return vehicle.id === id});
      this.vehiclePicked.next(vehicle);
    })
    // subscription.unsubscribe();
  }
}
