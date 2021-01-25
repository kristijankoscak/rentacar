import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../auth/user.service';
import { Reservation } from '../reservation/reservation.model';
import { ReservationService } from '../reservation/reservation.service';
import { Vehicle } from '../vehicle/vehicle.model';
import { VehicleService } from './vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  // dohvacanje i filtriranje vozila
  // logirani korisnik?

  constructor(
    private reservationService: ReservationService,
    private vehicleService: VehicleService,
    private http: HttpClient,
    private userService: UserService
    ) { }

  allVehicles: Vehicle[];
  allReservations: Reservation[];
  userReservations: Reservation[];

  private dataRefreshInterval = 5; // in minutes
z;

  fetchVehicles(): Observable<Vehicle[]>{
    return this.http
    .get<any>(
      environment.apiUrl + '/vehicles'
    )
    .pipe(
      tap((vehicles: Vehicle[]) => {
        this.vehicleService.setVehicles(vehicles);
      })
    );
  }
  fetchVehiclesByParameters(p_location, p_startTime, p_endTime): Observable<Vehicle[]>{
    return this.http
            .post<Vehicle[]>(
              'https://sbdrustvo.com/vehicles/filter',
            {
              location: p_location,
              startTime: p_startTime,
              endTime: p_endTime
            })
            .pipe(
              tap((vehicles: Vehicle[]) => {
                this.vehicleService.setFilteredVehicles(vehicles);
              },
              (errorResponse: any) => {
                console.log(errorResponse.error);
                this.vehicleService.errorHappened.next(errorResponse.error);
              })
            );
  }
  fetchVehiclesByCarRentalId(id: string): Observable<Vehicle[]>{
    return this.http
            .get<Vehicle[]>(
              'https://sbdrustvo.com/vehicles/filter/' + id)
            .pipe(
              tap((vehicles: Vehicle[]) => {
                this.vehicleService.setFilteredVehicles(vehicles);
              })
            );
  }

  fetchAllReservations(): Observable<Reservation []>{
    console.log('dohvaćam sve rezervacije api...');
    return this.http
    .get<any>(
      environment.apiUrl + '/reservations'
    )
    .pipe(
      map(reservations => {
        return reservations.map(reservation => {
          return {
            ...reservation,
            user: {
              id: reservation.user.id,
              email: reservation.user.email,
              roles: reservation.user.roles,
              birthday: reservation.user.birthday,
              firstName: reservation.user.firstName,
              lastName: reservation.user.lastName
            }
          };
        });
      }),
      tap((reservations: Reservation[]) => {
        this.reservationService.saveAllReservations(reservations);
      })
    );
  }
  fetchUserReservations(): Observable<Reservation []>{
    console.log('dohvaćam korisnicke rezervacije api...');
    return this.http
    .get<any>(
      environment.apiUrl + '/reservations/' + this.userService.getUser().id
    )
    .pipe(
      tap((reservations: Reservation[]) => {
        console.log(reservations);
        this.reservationService.saveUserReservations(reservations);
      })
    );
  }
  addReservation(vehicleID: number, reservation: any): Observable<any>{
    return this.http
    .post<any>(
      environment.apiUrl + '/reservations/' + vehicleID,
      reservation
    )
    .pipe(
      tap(response => {
        console.log('sending reservation... ' + response);
      })
    );
  }
  updateReservation(id: number, status: string, message: string): Observable<string>{
    return this.http
    .put<string>(
      environment.apiUrl + '/reservations/update/' + id,
      {
        status,
        info: message
      }
    )
    .pipe(
      tap(
        (response: string) => { },
        (errorResponse: string) => {
          console.log(errorResponse);
        }
      )
    );
  }
  removeReservation(reservationID: number): Observable<string>{
    console.log('uso ,id: ' + reservationID);
    return this.http
    .delete<string>(
      environment.apiUrl + '/reservations/' + reservationID
    )
    .pipe(
      tap(
        (response: string) => { },
        (errorResponse: string) => { }
      )
    );
  }
  addVehicle(vehicle: any): Observable<any>{
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
        (errorResponse: string) => {
          console.log(errorResponse);
        }
      )
    );
  }
  updateVehicle(vehicle: any): Observable<any>{
    return this.http
    .put<string>(
      environment.apiUrl + '/vehicles/' + vehicle.id,
      vehicle
    )
    .pipe(
      tap(
        (response: string) => {
          console.log(response);
        },
        (errorResponse: string) => {
          console.log(errorResponse);
        }
      )
    );
  }
  deleteVehicle(id: number): Observable<any>{
    return this.http
    .delete<any>(
      environment.apiUrl + '/vehicles/' + id
    )
    .pipe(
      tap(
        (response: string) => {
          console.log(response);
        },
        (errorResponse: string) => {
          console.log(errorResponse);
        }
      )
    );
  }

  setVehicleRefreshInterval(): void {
    setTimeout(() => {
      this.fetchVehicles().subscribe();
    }, this.dataRefreshInterval * 60 * 1000);
  }
}
