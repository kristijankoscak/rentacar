import { Injectable } from '@angular/core';
import { User } from '../auth/user.model';
import { Vehicle } from '../vehicle/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  allVehicles: Vehicle[];
  filteredVehicles : Vehicle[];

  // dohvacanje i filtriranje vozila
  // logirani korisnik?

  constructor() { }
}
