import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscribableOrPromise, Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { UserService } from 'src/app/auth/user.service';
import { Vehicle } from 'src/app/vehicle/vehicle.model';
import { Reservation } from '../reservation.model';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {

  reservationID:number;
  reservation: any;
  loggedUser: User;
  reservationSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.fetchReservationID();
    this.fetchReservation();
    // this.fetchReservation();
    // this.fetchVehicle();
  }

  fetchReservationID(): void{
    this.reservationID = +this.route.snapshot.paramMap.get('id');
  }
  fetchReservation(): void{
    this.reservationSubscription = this.reservationService.allReservationsChanged.subscribe((reservations) => {
      this.reservation = this.reservationService.fetchReservationByID(this.reservationID);
      this.loggedUser = this.userService.getUser();
      console.log(this.reservation)
    })
    this.reservation = this.reservationService.fetchReservationByID(this.reservationID);
    this.loggedUser = this.userService.getUser();
  }
  fetchVehicle(): void{

    // this.vehicle = tempVehicle;
  }
  getDate(date:any): string{
    let formatedDate = '';
    let tempDate = new Date(date.date);
    formatedDate += tempDate.getDate() + "."
    formatedDate += tempDate.getMonth() + "."
    formatedDate += tempDate.getFullYear() + "."
    return formatedDate;
  }
  getYear(date:any){
    let formatedDate = '';
    let tempDate = new Date(date.date);
    formatedDate += tempDate.getFullYear() + "."
    return formatedDate;
  }
  getNewPrice(): number{
    return this.reservation.vehicle.price - this.reservation.vehicle.price*(this.reservation.vehicle.discount/100)
  }

  cancelMyReservation(): void{
    this.reservationService.cancelUserReservation(this.reservation);
  }

  ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe();
  }
}
