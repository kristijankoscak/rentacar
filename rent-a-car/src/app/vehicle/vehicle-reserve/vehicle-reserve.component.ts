import { HttpClient, HttpDownloadProgressEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from 'src/app/auth/user.model';
import { UserService } from 'src/app/auth/user.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-reserve',
  templateUrl: './vehicle-reserve.component.html',
  styleUrls: ['./vehicle-reserve.component.css']
})
export class VehicleReserveComponent implements OnInit {
  backgroundColor = 'rgb(255, 211, 130)';
  vehicle: Vehicle = undefined;
  /* times: string[] = [
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
  ]; */
  selected = 'Cash';
  modelYear = '';
  manufactureYear = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  numberOfDays = 0;
  loggedUser: User;
  userBirthday: Date = new Date();
  coverImage: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private http: HttpClient,
    private userService: UserService,
    private dataStorageService: DataStorageService
    ) { }

  ngOnInit(): void {
    this.getParametersFromURL();
    this.getUserInfo();
  }
  getParametersFromURL(): void{
    this.route.params.subscribe(
      (params: Params) => {
        this.vehicle = this.vehicleService.getVehicle(+params.id);
        this.setUpCarYears();
        this.setCarImage();
      }
    );
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.setUpReservationDates(params);
      }
    );
  }
  setCarImage(): void{
    const imageObject = this.vehicle.images.find( imageObject => imageObject.isCover === true);
    this.coverImage = imageObject.base64;
  }
  setUpCarYears(): void{
      this.manufactureYear = this.vehicle.manufactureYear.date.split('-')[0];
      this.modelYear = this.vehicle.modelYear.date.split('-')[0];
  }
  setUpReservationDates(params: any): void{
    console.log(params);
    this.startDate = new Date(params.start_date);
    this.endDate = new Date(params.end_date);
    this.getNumberOfDays();
  }
  getNumberOfDays(): void{
    const diff = Math.abs(this.endDate.getTime() - this.startDate.getTime());
    this.numberOfDays = Math.ceil(diff / (1000 * 3600 * 24));
  }
  getUserInfo(): void{
    this.loggedUser = this.userService.getUser();
    console.log(this.loggedUser);
    if (this.userService.getUser() === undefined){
      this.http
      .post<any>(
        environment.apiUrl + '/auth',
        {
          token: localStorage.getItem('userToken')
        }
      )
      .pipe(
        tap(
          (responseData: any) => {
            this.loggedUser = responseData;
            this.userBirthday = responseData.birthday;
            this.userService.saveUser(this.loggedUser);
          },
          errorResponse => {
            localStorage.removeItem('userToken');
          }
        )
      );
    }
  }

  sendReservation(): void{
    const reservation = this.fetchReservationData();
    this.dataStorageService.addReservation(this.vehicle.id, reservation).subscribe(
      response => {this.router.navigate(['/home']); },
      errorResponse => {}
    );
  }

  fetchReservationData(): any{
    const reservation = {
      user_id: this.loggedUser.id,
      startTime: this.startDate,
      endTime: this.endDate,
      paymentMethod: this.selected,   // ovo dvoje promjenit..
      paymentAmount: this.vehicle.price * this.numberOfDays + 5,      //
      carRental: this.vehicle.carRental.id,
      info: ''

    };
    return reservation;
  }
  getSelected(event: MatSelectChange){
    console.log(event);
  }
}
