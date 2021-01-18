import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Vehicle } from '../vehicle/vehicle.model';
import { VehicleService } from './vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  allVehicles: Vehicle[];

  // dohvacanje i filtriranje vozila
  // logirani korisnik?

  constructor(private vehicleService: VehicleService,
              private http: HttpClient){}

  fetchVehicles(): Observable<Vehicle[]>{
    return this.http
    .get<any[]>('https://sbdrustvo.com/vehicles')
    .pipe(
        tap( vehicles => {
          console.log(vehicles)
            // this.allVehicles = vehicles
        })
    );
  }
}
