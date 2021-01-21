import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Vehicle } from '../vehicle/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {


  vehicles : Vehicle[] = [];
  specificVehicle: Vehicle;
  vehiclesChanged = new Subject<Vehicle[]>();
  vehicleIsPicked = new Subject<Vehicle>();


  constructor() { }
  setVehicles(vehicles: Vehicle[]): void {
    this.vehicles = vehicles;
    this.vehiclesChanged.next(this.vehicles.slice());
    console.log(this.vehicles);
  }
  getVehicles(): Vehicle[]{
    return this.vehicles;
  }
  getVehiclesByCarRental(carRentalName: string): Vehicle[]{
    return this.vehicles.filter(vehicle => vehicle.carRental.name === carRentalName);
  }

  async fetchVehicleByID(id:number): Promise<void>{
    await this.setVehicleByID(id);
    console.log(this.specificVehicle)
    this.vehicleIsPicked.next(this.specificVehicle);
  }
  setVehicleByID(id:number): void{
    this.specificVehicle = this.vehicles.find((vehicle)=>{return vehicle.id === id});
  }
}
