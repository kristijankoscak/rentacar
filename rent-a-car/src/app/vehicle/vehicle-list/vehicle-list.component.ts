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
              private http: HttpClient,
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.getParametersFromURL();
  }
  getParametersFromURL(): void{
    this.route.queryParams.subscribe((params: Params) => {
      if(params.location !== undefined && params.start_date !== undefined && params.end_date !== undefined){
        this.fetchVehicleByParameters();
      }
      else{
        this.fetchAllVehicles();
      }
    });
  }

  fetchVehicleByParameters(): void{
    this.subscription = this.vehicleService.filteredVehiclesChanged.subscribe(
      ((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      })
    );
    this.vehicles = this.vehicleService.getFilteredVehicles();
  }
  fetchAllVehicles(): void {
    this.dataStorageService.fetchVehicles().subscribe(
      resVehicles => {
        this.vehicles = resVehicles;
      }
    );
    this.vehicles = this.vehicleService.getVehicles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
