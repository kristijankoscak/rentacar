import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Vehicle } from '../vehicle/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[]=[];
  specificVehicle: Vehicle;
  vehiclesChanged = new Subject<Vehicle[]>();
  filteredVehiclesChanged = new Subject<Vehicle[]>();
  errorHappened = new Subject<string>();
  constructor(
    private http: HttpClient,
    private router:Router
  ) { }
  setVehicles(vehicles: Vehicle[]): void {
    this.vehicles = vehicles;
    this.vehiclesChanged.next(this.vehicles.slice());
    console.log(this.vehicles);
  }
  setFilteredVehicles(vehicles: Vehicle[]): void {
    this.filteredVehicles = vehicles;
    this.filteredVehiclesChanged.next(this.filteredVehicles.slice());
    console.log(this.filteredVehicles);
  }
  getVehicles(): Vehicle[]{
    return this.vehicles;
  }
  getFilteredVehicles(): Vehicle[]{
    return this.filteredVehicles;
  }
  getVehiclesByCarRental(carRentalName: string): Vehicle[]{
    return this.vehicles.filter(vehicle => vehicle.carRental.name === carRentalName);
  }
  getVehicle(id: number): Vehicle{
    console.log(this.vehicles)
    console.log(this.vehicles.find(vehicle => vehicle.id === id))
    return this.vehicles.find(vehicle => vehicle.id === id);
  }
  getVehiclesByRentalId(id: number): Vehicle[]{
    const rentalVehicles = this.vehicles.filter(vehicle => vehicle.carRental.id === id);
    return rentalVehicles;
  }
  handleUpdating(vehicle:any): void{
    this.updateVehicle(vehicle);
    this.vehiclesChanged.next(this.vehicles);
    this.router.navigate(['/vehicle']);
  }
  updateVehicle(vehicle:any): void{
    this.vehicles.find((veh,index) => {
      if(veh.id === vehicle.id){
        if(!vehicle.images){
           this.vehicles[index] = {
             ...vehicle,
             images: this.vehicles[index].images
           }
        }
        else{
          this.vehicles[index] = {
            ...vehicle,
          };
        }
      }
    })
  }
  deleteVehicle(id:number) {
    this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
    this.vehiclesChanged.next(this.vehicles);
  }

}
