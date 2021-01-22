import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../auth/user.service';
import { Reservation } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // for example only, there will be route for fetching reservation by ID !!!
  // { id: 57, user_id: 12, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 0 },

  allReservations: Reservation[] = [];
  allReservationsChanged = new Subject<Reservation[]>();
  userReservations: Reservation[] = [];
  userReservationsChanged = new Subject<Reservation[]>();
  waitingReservations: Reservation[] = [];
  acceptedReservations: Reservation[] = [];
  rejectedReservations: Reservation[] = [];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  saveAllReservations(reservations: Reservation[]): void{
    this.allReservations = reservations;
    this.allReservationsChanged.next(reservations);
    this.filterReservations();
  }
  saveUserReservations(reservations: Reservation[]): void {
    this.userReservations = reservations;
    this.userReservationsChanged.next(reservations);
  }

  fetchAllReservationsFromService(): Reservation[] {
    return this.allReservations;
  }
  fetchUserReservations(): Reservation[] {
    return this.userReservations;
  }
  // fetchWaitingReservations(): Reservation[] {
  //   return this.waitingReservations;
  // }
  // fetchAcceptedReservations(): Reservation[] {
  //   return this.acceptedReservations;
  // }
  // fetchRejectedReservations(): Reservation[] {
  //   return this.rejectedReservations;
  // }
  fetchReservationByID(id:number): Reservation {
    return this.allReservations.find( reservation => {return reservation.id === id});
  }

  filterReservations(userID: number): void{
    this.allReservations.forEach(reservation => {
      if(reservation.status === 'waiting' && userID === reservation.vehicle.carRental.owner.id){
        this.waitingReservations.push(reservation);
      }
      else if(reservation.status === 'accepted'){
        this.acceptedReservations.push(reservation);
      }
      else if(reservation.status === 'rejected'){
        this.rejectedReservations.push(reservation);
      }
    })
  }
  fetchAllReservationsFromApi(): Observable<Reservation []>{
    console.log('dohvaćam sve rezervacije api...')
    return this.http
    .get<any>(
      environment.apiUrl + '/reservations'
    )
    .pipe(
      map(reservations => {
        console.log(reservations)
        return reservations.map(reservation => {
          return {
            id: reservation.id,
            user: {
              id: reservation.user.id,
              email: reservation.user.email,
              roles: reservation.user.roles,
              birthday: reservation.user.birthday,
              firstName: reservation.user.firstName,
              lastName: reservation.user.lastName
            },
            vehicle: reservation.vehicle,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            status: reservation.status,
            paymentMethod: reservation.paymentMethod,
            paymentAmount: reservation.paymentAmount,
            info: reservation.info
          }
        })
      }),
      tap((reservations: Reservation[]) => {
        this.saveAllReservations(reservations);
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
        this.saveUserReservations(reservations);
      })
    );
  }

  cancelUserReservation(reservation: Reservation): void{
    this.removeReservationInDataBase(reservation);
  }
  removeReservationInDataBase(reservation: Reservation): Observable<string>{
    console.log('uso ,id: '+reservation.id)
    return this.http
    .delete<string>(
      environment.apiUrl + '/reservations/5'
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
}
