import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[]
  subscription: Subscription;

  constructor(private vehicleService: VehicleService,
              private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.getParametersFromURL();
  }
  getParametersFromURL(): void{
    this.route.queryParams.subscribe((params: Params) => {
      if(/* params.location.length > 0 && params.start_date.length > 0 && params.end_date.length > 0 */
        params.location !== undefined && params.start_date !== undefined && params.end_date !== undefined){
        this.http
            .post<Vehicle[]>(
            'https://sbdrustvo.com/vehicles/filter',
            {
              location: params.location,
              startTime: params.start_date,
              endTime: params.end_date
            })
            .subscribe(responseData => {
              this.vehicles = responseData;
              console.log(this.vehicles)
            });
      }
      else{
        console.log("asd")
        this.fetchVehicle();
      }
    });
  }
  fetchVehicle(): void {
    this.subscription = this.vehicleService.vehiclesChanged.subscribe(
      ((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      })
    );
    this.vehicles = this.vehicleService.getVehicles();
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}
