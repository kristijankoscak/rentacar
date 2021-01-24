import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent implements OnInit {
  error: boolean;
  constructor(private vehicleService: VehicleService,
              private router: Router) { }

  ngOnInit(): void {
    this.vehicleService.errorHappened.subscribe((value) => {
      this.error = value;
    });
  }
  closeErrorBox(): void{
    this.error = null;
    this.router.navigate(['/home'])
  }
}
