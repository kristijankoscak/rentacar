import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/reservation/reservation.model';
import { Vehicle } from 'src/app/vehicle/vehicle.model';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent implements OnInit {

  @Input() reservation: Reservation;
  name = 'Marko';
  surname = 'Markovic';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }



  navigateToDetailedReservation(): void{
    this.router.navigate([this.reservation.id], {relativeTo: this.route});
  }
}
