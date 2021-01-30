import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent implements OnInit,OnDestroy {

  errorSubscription: Subscription;
  error: boolean=false;
  errorMessage: string;
  constructor(private vehicleService: VehicleService,
              private router: Router) { }

  ngOnInit(): void {
    this.errorSubscription = this.vehicleService.errorHappened.subscribe((value) => {
      if(value === 'no vehicles'){
        this.error = true;
        this.errorMessage = "We don't have available cars for you. Try change location or term";
      }
      else {
        this.error = true;
        this.errorMessage = "Ups, error occured. Check your internet connection";
      }
    });
  }

  closeErrorBox(): void{
    this.error = false;
    this.router.navigate(['/home'])
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe()

  }
}
