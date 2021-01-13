import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  userReservations: Reservation[];
  waitingReservations: Reservation[];
  acceptedReservations: Reservation[];
  rejectedReservations: Reservation[];


  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }
  fetchReservations(): void{
    this.userReservations = this.reservationService.fetchUserReservations();
    this.waitingReservations = this.reservationService.fetchWaitingReservations();
    this.acceptedReservations = this.reservationService.fetchAcceptedReservations();
    this.rejectedReservations = this.reservationService.fetchRejectedReservations();
  }
}
