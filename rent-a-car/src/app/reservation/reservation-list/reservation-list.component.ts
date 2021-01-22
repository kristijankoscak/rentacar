import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Reservation } from '../reservation.model';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  subscription: Subscription;
  userType: string = '';
  reservationsLoading: boolean = true;
  userReservations: Reservation[];
  waitingReservations: Reservation[];
  acceptedReservations: Reservation[];
  rejectedReservations: Reservation[];


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dataStorageService: DataStorageService,
    private reservationService: ReservationService
    ) {}

  ngOnInit(): void {
    this.fetchUserType();
  }
  fetchUserType(): void{
      this.subscription = this.userService.userChanged.subscribe(user=>{
        if(user){
          this.userType = user.roles[0];
          this.fetchReservations();
        }
      })
      this.userType = this.userService.getUserType();
      this.fetchReservations();

  }

  fetchReservations(): void{
    this.dataStorageService.fetchAllReservations().subscribe();
    // if(this.userType === 'ROLE_USER'){
    //   this.dataStorageService.fetchUserReservations().subscribe();
    // }
    // else if(this.userType === 'ROLE_ADMIN'){
    //   this.dataStorageService.fetchAllReservations().subscribe();
    // }
  }

  // fetchReservations(): void{
  //   this.userReservations = this.reservationService.fetchUserReservations();
  //   this.waitingReservations = this.reservationService.fetchWaitingReservations();
  //   this.acceptedReservations = this.reservationService.fetchAcceptedReservations();
  //   this.rejectedReservations = this.reservationService.fetchRejectedReservations();
  // }


  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   this.subscription.unsubscribe();
  // }
}
