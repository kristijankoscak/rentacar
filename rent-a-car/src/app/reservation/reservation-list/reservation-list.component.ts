import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
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

  userSubscription: Subscription;
  userType: string[] = undefined;
  loggedUserID: number = undefined;
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
      this.userSubscription = this.userService.userChanged.subscribe(user=>{
        if(user){
          this.userType = user.roles;
          this.fetchReservationsByUserType();
          this.loggedUserID = user.id;
          console.log('after ' + this.userType)
        }
      })
      this.userType = this.userService.getUserType();
      this.loggedUserID = this.userService.getUser().id;
      this.fetchReservationsByUserType();
      console.log('before ' + this.userType)
  }

  fetchReservationsByUserType(): void{
    if(this.userType && this.userType.includes('ROLE_USER')){
      console.log('user...');
      this.reservationService.fetchUserReservationsFromApi().subscribe(
        response => {
          this.userReservations = this.reservationService.fetchUserReservations();
          this.reservationsLoading = false;
        },
        errorResponse => {}
      );
    }
    if(this.userType && this.userType.includes('ROLE_ADMIN')){
      console.log('vlasnik...');
      if(this.reservationService.fetchAllReservationsFromService().length > 0){
        this.reservationService.fetchAllReservationsFromApi().subscribe(
          response => { this.reservationsLoading = false },
          errorResponse => {}
        );
      }
      this.reservationService.filterReservations(this.loggedUserID)
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubscription.unsubscribe();
  }
}
