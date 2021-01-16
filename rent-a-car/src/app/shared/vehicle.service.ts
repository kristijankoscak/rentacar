import { Injectable } from '@angular/core';
import { Vehicle } from '../vehicle/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private loadedVehicles: Vehicle[];
  constructor() { }
  setVehicles(vehicles: Vehicle[]): void {
    this.loadedVehicles = vehicles;
  }
  getVehicles(){
    return this.loadedVehicles;
  }
}
