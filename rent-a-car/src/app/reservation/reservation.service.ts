import { Injectable } from '@angular/core';
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
  allReservations: Reservation[] = [
    { id: 57, user_id: 12, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 0 },
    { id: 5, user_id: 25, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 0 },
    { id: 9, user_id: 17, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 0 },
    { id: 21, user_id: 1, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 1 },
    { id: 13, user_id: 27, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 1 },
    { id: 15, user_id: 25, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 2 },
    { id: 19, user_id: 54, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 2 },
    { id: 28, user_id: 34, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 2 }
  ];

  userReservations: Reservation[] = [
    { id: 57, user_id: 12, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 0 }
  ];

  waitingReservations: Reservation[] = [
    { id: 57, user_id: 12, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 0 },
    { id: 5, user_id: 25, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 0 },
    { id: 9, user_id: 17, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 0 }
  ];
  acceptedReservations: Reservation[] = [
    { id: 21, user_id: 1, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 1 },
    { id: 13, user_id: 27, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 1 }
  ];
  rejectedReservations: Reservation[] = [
    { id: 15, user_id: 25, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 2 },
    { id: 19, user_id: 54, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 2 },
    { id: 28, user_id: 34, vehicle_id: 225, start_time: new Date(2021, 3, 15), end_time: new Date(2021, 3, 18), is_approved: 2 }
  ];

  constructor() { }


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
