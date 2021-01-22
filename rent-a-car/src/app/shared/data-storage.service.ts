import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

  // fetchAllReservations(): Observable<Reservation []>{
  //   console.log('dohvaćam sve rezervacije api...')
  //   return this.http
  //   .get<any>(
  //     environment.apiUrl + '/reservations'
  //   )
  //   .pipe(
  //     map(reservations => {
  //       return reservations.map(reservation => {
  //         return {
  //           id: reservation.id,
  //           user: {
  //             id: reservation.user.id,
  //             email: reservation.user.email,
  //             roles: reservation.user.roles,
  //             birthday: reservation.user.birthday,
  //             firstName: reservation.user.firstName,
  //             lastName: reservation.user.lastName
  //           },
  //           vehicle: reservation.vehicle,
  //           start_time: reservation.startTime,
  //           end_time: reservation.endTime,
  //           status: reservation.status,
  //           paymentMethod: reservation.paymentMethod,
  //           paymentAmount: reservation.paymentAmount,
  //           info: reservation.info
  //         }
  //       })
  //     }),

  //     tap((reservations: Reservation[]) => {
  //       this.reservationService.saveAllReservations(reservations);
  //       // this.setRefreshInterval();
  //     })
  //   );
  // }

  // fetchUserReservations(): Observable<Reservation []>{
  //   console.log('dohvaćam korisnicke rezervacije api...')
  //   console.log(this.userService.getUser().id)
  //   return this.http
  //   .patch<any>(
  //     environment.apiUrl + '/reservations/me',
  //     {
  //       user_id: this.userService.getUser().id
  //     }
  //   )
  //   .pipe(
  //     tap((reservations: Reservation[]) => {
  //       this.reservationService.saveUserReservations(reservations);
  //       // this.setRefreshInterval();
  //     })
  //   );
  // }




  private setRefreshInterval(): void {
    setTimeout(() => {
      this.fetchVehicles().subscribe();
    }, this.dataRefreshInterval * 60 * 1000);
  }
}
