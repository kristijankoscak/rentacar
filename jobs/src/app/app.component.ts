import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loader = true
  error:boolean;
  
  constructor( private jobService : JobService,
    private cdr: ChangeDetectorRef){
      this.loader=true
    }
  ngOnInit(): void {
    this.jobService.setloader.subscribe((value) => {
      this.loader = value
      this.cdr.detectChanges();
    })

    this.jobService.errorHappened.subscribe((value) => {
      this.error = value;
    })
  }

  closeErrorBox(){
    this.error = null
  }
}
