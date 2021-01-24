import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { UserService } from 'src/app/auth/user.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { VehicleService } from 'src/app/shared/vehicle.service';
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
  reservation: Reservation;
  loggedUser: User;
  reservationSubscription: Subscription;
  vehicle: Vehicle;
  shortMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private dataStorageService: DataStorageService,
    private userService: UserService,
    private vehicleService: VehicleService
    ) { }

  ngOnInit(): void {
    this.fetchReservationID();
    this.fetchReservation();
    this.fetchVehicle();
  }

  fetchReservationID(): void{
    this.reservationID = +this.route.snapshot.paramMap.get('id');
  }
  fetchReservation(): void{
    this.reservationSubscription = this.reservationService.allReservationsChanged.subscribe((reservations) => {
      this.reservation = this.reservationService.fetchReservationByID(this.reservationID);
      this.loggedUser = this.userService.getUser();
    })
    this.reservation = this.reservationService.fetchReservationByID(this.reservationID);
    this.loggedUser = this.userService.getUser();
    this.shortMessage = this.reservation.info;
  }
  fetchVehicle(): void{
    this.vehicle = this.vehicleService.getVehicle(this.reservation.vehicle.id);
  }
  getDate(date:any): string{
    let formatedDate = '';
    let tempDate = new Date(date.date);
    formatedDate += tempDate.getDate() + "."
    formatedDate += (tempDate.getMonth()+1) + "."
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
    this.dataStorageService.removeReservationInDataBase(this.reservationID).subscribe(
      response => {this.router.navigate(['/reservation']);},
      error => {}
    );
  }
  updateReservation(status: string): void{
    this.reservationService.updateReservation(this.loggedUser.id,this.reservationID,status,this.shortMessage);
    this.dataStorageService.updateReservationInDataBase(this.reservationID,status,this.shortMessage).subscribe(
      response => { this.router.navigate(['/reservation']); },
      error => {}
    );
  }

  ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe();
  }
}
