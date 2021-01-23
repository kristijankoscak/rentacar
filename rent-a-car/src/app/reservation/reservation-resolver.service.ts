import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { UserService } from "../auth/user.service";
import { Reservation } from "./reservation.model";
import { ReservationService } from "./reservation.service";

@Injectable({ providedIn: 'root' })
export class ReservationResolverService implements Resolve<Reservation[]>{

  constructor(
    private reservationService: ReservationService
  ) { }

  resolve(): Reservation[]{
    const reservations = this.reservationService.fetchAllReservations();
    if (reservations.length === 0) {
      this.reservationService.fetchAllReservationsFromApi().subscribe(
        userData => { },
        errorMessage => { }
      );
    }
    else {
      return reservations;
    }
  }
}
