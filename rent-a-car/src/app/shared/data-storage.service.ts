import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    private http: HttpClient) { }

  private dataRefreshInterval = 5; // in minutes

  fetchVehicles(): Observable<Vehicle[]>{
    return this.http
    .get<any>(
      environment.apiUrl + '/vehicles'
    )
    .pipe(
      tap((vehicles: Vehicle[]) => {
        console.log(vehicles);
        this.vehicleService.setVehicles(vehicles);
        this.setRefreshInterval();
      })
    );
  }

  private setRefreshInterval(): void {
    setTimeout(() => {
      this.fetchVehicles().subscribe();
    }, this.dataRefreshInterval * 60 * 1000);
  }
}
