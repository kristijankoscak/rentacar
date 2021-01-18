import { Component } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rent-a-car';

  constructor(private dataStorageService:DataStorageService) {}


  ngOnInit(): void {
    this.dataStorageService.fetchVehicles();
  }
}
