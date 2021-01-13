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
  name: string = "Marko";
  surname: string = "Markovic";
  vehicle: Vehicle = {
    id:1,
    mark:'Hyundai',
    model: 'i30',
    model_year:'2017',
    manufacture_year: '2017',
    gears: 5,
    color: 'Black',
    gearbox: 'Manual',
    status: 'Dostupan',
    power: 85,
    price: 55,
    type: '',
    coverImage: '',
    otherImages: ['','']
  };

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }



  navigateToDetailedReservation(): void{
    this.router.navigate([this.reservation.id], {relativeTo:this.route})
  }
}
