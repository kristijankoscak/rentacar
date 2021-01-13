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
  vehicle: Vehicle;

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
    this.vehicle = {
      id: 1,
      mark:'Hyundai',
      model: 'i30',
      model_year:'2017',
      manufacture_year: '2017',
      gears: 6,
      color: 'Black',
      gearbox: 'Manual',
      status: 'Dostupan',
      power: 85,
      price: 55,
      type: 'Limusine',
      coverImage: 'https://www.autoto.hr/EasyEdit/UserFiles/CatalogGallery/hyundai-i30-14i-benzin-rabljeno-vozilo-at145019/hyundai-i30-14i-benzin-rabljeno-vozilo-at145019-637402731521255325_370_209@2x.jpeg',
      otherImages: [
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg'
      ]
    };
  }

}
