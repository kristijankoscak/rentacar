import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  name: string;
  surname: string;
  vehicle;

  constructor(private route: ActivatedRoute,private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.fetchReservationID();
    this.fetchReservation();
    this.fetchVehicle();
  }

  fetchReservationID(): void{
    this.reservationID = +this.route.snapshot.paramMap.get('id');
  }
  fetchReservation(): void{
    this.reservation = this.reservationService.fetchReservationByID(this.reservationID);
  }
  fetchVehicle(): void{
    const tempVehicle = {
      id: 1,
      color: "Red",
      coverImage: "https://www.autoto.hr/EasyEdit/UserFiles/CatalogGallery/fiat-punto-12-benzin-rabljeno-vozilo-at073219/fiat-punto-12-benzin-rabljeno-vozilo-at073219-637070059849833280_1600_900.jpeg",
      fuel_type: "Diesel",
      gearbox: "Automatic",
      gears: 5,
      manufacture_year: '2015',
      mark: "BMW",
      model: "X5",
      model_year: '2015',
      otherImages: [
        "https://www.autoto.hr/EasyEdit/UserFiles/CatalogGallery/fiat-punto-12-benzin-rabljeno-vozilo-at073219/fiat-punto-12-benzin-rabljeno-vozilo-at073219-637070060125927055_1600_900.jpeg",
        "https://rabljena.autohrvatska.hr/EasyEdit/UserFiles/CatalogGallery/fiat-punto-evo-13-mjt/fiat-punto-evo-13-mjt-637430205650403697_1600_900.jpeg",
        "https://i.ytimg.com/vi/fivkMD7_4Vg/maxresdefault.jpg"
      ],
      power: 125,
      price: 86,
      status: "Available",
      type: "Suv",
      gate_number: 5,
      discount: 10
    }
    this.vehicle = tempVehicle;
  }

}
