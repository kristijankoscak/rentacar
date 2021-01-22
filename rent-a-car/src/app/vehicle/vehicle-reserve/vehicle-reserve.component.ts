import { HttpClient, HttpDownloadProgressEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { User } from 'src/app/auth/user.model';
import { UserService } from 'src/app/auth/user.service';
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
  vehicle: Vehicle = {
    id: 0,
    mark: 'string',
    model: 'string',
    modelYear: new Date(),
    manufactureYear: new Date(),
    gears: 0,
    color: 'string',
    gearbox: 'string',
    status: 'string',
    power: 0,
    type: 'string',
    price: 0,
    fuelType: 'string',
    gateNumber: 0,
    discount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: null,
    carRental: null,
  };
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
  modelYear = '';
  manufactureYear = '';
  startDate: Date=new Date();
  endDate: Date=new Date();
  numberOfDays=0;
  loggedUser: User;
  userBirthday:Date=new Date()
  constructor(private route: ActivatedRoute,
              private router: Router,
              private vehicleService: VehicleService,
              private http: HttpClient,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getParametersFromURL();
    this.getUserInfo()
  }
  getParametersFromURL(): void{
    this.route.params.subscribe(
      (params: Params) => {
        this.vehicle = this.vehicleService.getVehicle(+params.id);
        this.setUpCarYears();
      }
    );
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.setUpReservationDates(params);
      }
    );
  }
  setUpCarYears(): void{
      this.manufactureYear = this.vehicle.manufactureYear.date.split('-')[0];
      this.modelYear = this.vehicle.modelYear.date.split('-')[0];
  }
  setUpReservationDates(params: any): void{
    this.startDate = new Date(params.start_time);
    this.endDate = new Date(params.end_time);
    this.getNumberOfDays();
  }
  getNumberOfDays(){
    var diff = Math.abs(this.endDate.getTime() - this.startDate.getTime());
    this.numberOfDays = Math.ceil(diff / (1000 * 3600 * 24)); 
  }
  getUserInfo(){
    this.loggedUser = this.userService.getUser()
    console.log(this.loggedUser)
    if(this.userService.getUser()===undefined){
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
}
