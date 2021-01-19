import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { VehicleService } from "../shared/vehicle.service";
import { Vehicle } from "./vehicle.model";

@Injectable({ providedIn: 'root' })
export class VehicleResolverService implements Resolve<Vehicle[]>{

  constructor(
    private vehicleService: VehicleService,
    private dataStorageService: DataStorageService
  ) { }

  resolve(): Vehicle[]{
    const vehicles = this.vehicleService.getVehicles();
    if (vehicles.length === 0) {
      console.log("vehicles.length === 0")
      this.dataStorageService.fetchVehicles().subscribe(
        vehiclesResponse => { },
        errorMessage => { }
      );
    }
    else {
      return vehicles;
    }
  }
}
