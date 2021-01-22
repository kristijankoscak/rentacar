import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { VehicleService } from "../shared/vehicle.service";
import { Vehicle } from "./vehicle.model";
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({ providedIn: 'root' })
export class VehicleResolverService implements Resolve<Vehicle[]>{

  constructor(
    private vehicleService: VehicleService,
    private dataStorageService: DataStorageService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Vehicle[] | Observable<Vehicle[]> | Promise<Vehicle[]>{
    const vehicles = this.vehicleService.getVehicles();
    if (vehicles.length === 0) {
      return this.dataStorageService.fetchVehicles().pipe(
        catchError((error) => {
          return EMPTY;
        })
      );
    }
    else {
      return vehicles;
    }
  }
}
