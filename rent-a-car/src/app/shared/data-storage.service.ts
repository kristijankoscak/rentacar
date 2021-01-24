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

  allVehicles: Vehicle[];
  allReservations: Reservation[];
  userReservations: Reservation[];

  // dohvacanje i filtriranje vozila
  // logirani korisnik?

  constructor(
    private reservationService: ReservationService,
    private vehicleService: VehicleService,
    private http: HttpClient,
    private userService: UserService
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

  private setRefreshInterval(): void {
    setTimeout(() => {
      this.fetchVehicles().subscribe();
    }, this.dataRefreshInterval * 60 * 1000);
  }

  fetchAllReservationsFromApi(): Observable<Reservation []>{
    console.log('dohvaćam sve rezervacije api...')
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
          }
        })
      }),
      tap((reservations: Reservation[]) => {
        this.reservationService.saveAllReservations(reservations);
      })
    );
  }
  fetchUserReservationsFromApi(): Observable<Reservation []>{
    console.log('dohvaćam korisnicke rezervacije api...')
    return this.http
    .get<any>(
      environment.apiUrl + '/reservations/'+ this.userService.getUser().id
    )
    .pipe(
      tap((reservations: Reservation[]) => {
        console.log(reservations);
        this.reservationService.saveUserReservations(reservations);
      })
    );
  }
  updateReservationInDataBase(id:number,status:string,message:string): Observable<string>{
    return this.http
    .put<string>(
      environment.apiUrl + '/reservations/update/'+id,
      {
        status: status,
        info: message
      }
    )
    .pipe(
      tap(
        (response: string) => { },
        (errorResponse: string)=> {
          console.log(errorResponse)
        }
      )
    );
  }
  removeReservationInDataBase(reservationID: number): Observable<string>{
    console.log('uso ,id: '+reservationID)
    return this.http
    .delete<string>(
      environment.apiUrl + '/reservations/'+reservationID
    )
    .pipe(
      tap(
        (response: string) => { },
        (errorResponse: string)=> { }
      )
    );
  }
}
