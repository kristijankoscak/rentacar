import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-reserve',
  templateUrl: './vehicle-reserve.component.html',
  styleUrls: ['./vehicle-reserve.component.css']
})
export class VehicleReserveComponent implements OnInit {
  backgroundColor='rgb(255, 211, 130)'
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
  constructor() { }

  ngOnInit(): void {
  }

}
