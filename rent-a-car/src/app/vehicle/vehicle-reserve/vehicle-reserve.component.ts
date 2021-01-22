import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-reserve',
  templateUrl: './vehicle-reserve.component.html',
  styleUrls: ['./vehicle-reserve.component.css']
})
export class VehicleReserveComponent implements OnInit {
  backgroundColor = 'rgb(255, 211, 130)';
  vehicle: Vehicle;
  times: string[] = [
    'I dont know',
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
    '18:00-19:00',
    '19:00-20:00',
  ];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getParametersFromURL()
  }
  getParametersFromURL(): void{
    this.route.params.subscribe(
      (params: Params) => {
        this.vehicle = this.vehicleService.getVehicle(+params.id);
        console.log(this.vehicle)
      }
    )
  }
}
