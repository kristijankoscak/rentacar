import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../vehicle/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[]=[];
  specificVehicle: Vehicle;
  vehiclesChanged = new Subject<Vehicle[]>();

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
    this.vehiclesChanged.next(this.filteredVehicles.slice());
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
    return this.vehicles.find(vehicle => vehicle.id === id);
  }
  getVehiclesByRentalId(id: number): Vehicle[]{
    const rentalVehicles = this.vehicles.filter(vehicle => vehicle.carRental.id === id);
    return rentalVehicles;
  }
  updateVehicle(vehicle:any): void{
    this.updateVehicleLocal(vehicle);
    this.vehiclesChanged.next(this.vehicles);
    this.updateVehicleInBase(vehicle).subscribe();
    this.router.navigate(['/vehicle']);
  }
  updateVehicleLocal(vehicle:any): void{
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
  updateVehicleInBase(vehicle:any): Observable<any>{
    return this.http
    .put<string>(
      environment.apiUrl + '/vehicles/'+vehicle.id,
      vehicle
    )
    .pipe(
      tap(
        (response: string) => {
          console.log(response);
        },
        (errorResponse: string)=> {
          console.log(errorResponse)
        }
      )
    );
  }
  addNewVehicle(vehicle:any): Observable<any>{
    return this.http
    .post<any>(
      environment.apiUrl + '/vehicles/',
      vehicle
    )
    .pipe(
      tap(
        (response: string) => {
          console.log(response);
        },
        (errorResponse: string)=> {
          console.log(errorResponse)
        }
      )
    );
  }

  deleteVehicle(id:number) {
    this.deleteVehicleLocal(id);
    this.deleteVehicleFromBase(id).subscribe();
  }
  deleteVehicleLocal(id:number): void{
    this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
    this.vehiclesChanged.next(this.vehicles);
  }
  deleteVehicleFromBase(id:number): Observable<any>{
    return this.http
    .delete<any>(
      environment.apiUrl + '/vehicles/'+id
    )
    .pipe(
      tap(
        (response: string) => {
          console.log(response);
        },
        (errorResponse: string)=> {
          console.log(errorResponse)
        }
      )
    );
  }

  fetchVehicles(): Observable<Vehicle[]>{
    return this.http
    .get<any>(
      environment.apiUrl + '/vehicles'
    )
    .pipe(
      tap((vehicles: Vehicle[]) => {
        this.setVehicles(vehicles);
      })
    );
  }
}
