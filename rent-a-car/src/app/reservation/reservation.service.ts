import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Reservation } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  /*
    reservations :
    0 - waiting
    1 - accepted
    2 - rejected
  */

  // for example only, there will be route for fetching reservation by ID !!!
  // { id: 57, user_id: 12, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 0 },

  allReservations: Reservation[] = [];
  allReservationsChanged = new Subject<Reservation[]>();
  userReservations: Reservation[] = [];
  userReservationsChanged = new Subject<Reservation[]>();
  waitingReservations: Reservation[] = [];
  acceptedReservations: Reservation[] = [];
  rejectedReservations: Reservation[] = [];

  constructor() { }

  saveAllReservations(reservations: Reservation[]): void{
    this.allReservations = reservations;
    this.allReservationsChanged.next(reservations);
    // this.allReservations = reservations;
  }
  saveUserReservations(reservations: Reservation[]): void {
    this.userReservations = reservations;
    this.userReservationsChanged.next(reservations);
    console.log(reservations);
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
    return this.allReservations.find( reservation => reservation.id === id);
  }
}
