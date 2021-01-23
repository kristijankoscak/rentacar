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

  allReservations: Reservation[] = [];
  allReservationsChanged = new Subject<Reservation[]>();
  userReservations: Reservation[] = [];
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
    console.log(this.allReservations);
  }
  saveUserReservations(reservations: Reservation[]): void {
    this.userReservations = reservations;
  }

  fetchAllReservations(): Reservation[] {
    return this.allReservations;
  }
  fetchUserReservations(): Reservation[] {
    return this.userReservations;
  }
  fetchWaitingReservations(): Reservation[] {
    return this.waitingReservations;
  }
  fetchAcceptedReservations(): Reservation[] {
    return this.acceptedReservations;
  }
  fetchRejectedReservations(): Reservation[] {
    return this.rejectedReservations;
  }
  fetchReservationByID(id:number): Reservation {
    return this.allReservations.find( reservation => {return reservation.id === id});
  }

  filterReservations(userID: number): void{
    this.resetReservations();
    this.allReservations.forEach(reservation => {
      if(reservation.status === 'Waiting' && userID === reservation.vehicle.carRental.owner.id){
        this.waitingReservations.push(reservation);
      }
      else if(reservation.status === 'Accepted'  && userID === reservation.vehicle.carRental.owner.id){
        this.acceptedReservations.push(reservation);
      }
      else if(reservation.status === 'Rejected'  && userID === reservation.vehicle.carRental.owner.id){
        this.rejectedReservations.push(reservation);
      }
    })
  }
  resetReservations(): void{
    this.acceptedReservations = [];
    this.waitingReservations = [];
    this.rejectedReservations = [];
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
  updateReservation(loggedUserID:number ,id:number,status:string,message:string): void{
    this.updateReservationLocal(loggedUserID,id,status,message);
    this.updateReservationInDataBase(id,status,message).subscribe();
  }

  updateReservationLocal(loggedUserID:number,id:number,status:string,message:string): void{
    this.allReservations.find(reservation => {
      if(reservation.id === id){
        reservation.info = message;
        reservation.status = status;
      }
    })
    this.filterReservations(loggedUserID);
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
        (response: string) => {
          this.router.navigate(['/reservation']);
        },
        (errorResponse: string)=> {
          console.log(errorResponse)
        }
      )
    );
  }
  cancelUserReservation(reservation: Reservation): void{
    this.removeReservationFromLocal(reservation);
    this.removeReservationInDataBase(reservation).subscribe();
  }
  removeReservationFromLocal(reservation: Reservation): void{
    this.allReservations = this.allReservations.filter(res => res !== reservation);
    this.allReservationsChanged.next(this.allReservations);
  }
  removeReservationInDataBase(reservation: Reservation): Observable<string>{
    console.log('uso ,id: '+reservation.id)
    return this.http
    .delete<string>(
      environment.apiUrl + '/reservations/'+reservation.id
    )
    .pipe(
      tap(
        (response: string) => { this.router.navigate(['/reservation']); },
        (errorResponse: string)=> { }
      )
    );
  }
}
