import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { VehicleService } from "../shared/vehicle.service";
import { Vehicle } from "./vehicle.model";
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({ providedIn: 'root' })
export class VehicleResolverService implements Resolve<Vehicle[]>{

  constructor(
    private vehicleService: VehicleService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Vehicle[] | Observable<Vehicle[]> | Promise<Vehicle[]>{
    if (Object.keys(route.queryParams).length === 0) {
      const vehicles = this.vehicleService.getVehicles();
      if(vehicles.length === 0){
        this.dataStorageService.setVehicleRefreshInterval();
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
    else{
      return this.dataStorageService.fetchVehiclesByParameters(
        route.queryParams.location,
        route.queryParams.start_date,
        route.queryParams.end_date).pipe(
          catchError((error) => {
            return EMPTY;
          })
      );
    }
  }
}
