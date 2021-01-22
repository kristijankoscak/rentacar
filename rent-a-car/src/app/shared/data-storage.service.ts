import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Reservation } from '../reservation/reservation.model';
import { ReservationService } from '../reservation/reservation.service';
import { Vehicle } from '../vehicle/vehicle.model';
import { VehicleService } from './vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  allVehicles: Vehicle[];
  allReservations: Reservation[];
  userReservations: Reservation[];

  // dohvacanje i filtriranje vozila
  // logirani korisnik?

  constructor(
    private reservationService: ReservationService,
    private vehicleService: VehicleService,
    private http: HttpClient
    ) { }

  private dataRefreshInterval = 5; // in minutes

  fetchVehicles(): Observable<Vehicle[]>{
    return this.http
    .get<any>(
      environment.apiUrl + '/vehicles'
    )
    .pipe(
      tap((vehicles: Vehicle[]) => {
        this.vehicleService.setVehicles(vehicles);
        this.setRefreshInterval();
      })
    );
  }

  fetchAllReservations(): Observable<Reservation []>{
    console.log('dohvaćam sve rezervacije api...')
    return this.http
    .get<any>(
      environment.apiUrl + '/reservations'
    )
    .pipe(
      tap((reservations: Reservation[]) => {
        this.reservationService.saveAllReservations(reservations);
        // this.setRefreshInterval();
      })
    );
  }

  fetchUserReservations(): Observable<Reservation []>{
    console.log('dohvaćam korisnicke rezervacije api...')
    return this.http
    .get<any>(
      environment.apiUrl + '/reservations/me'
    )
    .pipe(
      tap((reservations: Reservation[]) => {
        this.reservationService.saveUserReservations(reservations);
        // this.setRefreshInterval();
      })
    );
  }




  private setRefreshInterval(): void {
    setTimeout(() => {
      this.fetchVehicles().subscribe();
    }, this.dataRefreshInterval * 60 * 1000);
  }
}
