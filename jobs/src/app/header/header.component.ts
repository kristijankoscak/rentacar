import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title : string =""
  showBack = false
  constructor(private jobService : JobService) { }

  ngOnInit(): void {
    this.jobService.headerTitle.subscribe(
      (data) => {
        this.title = data
        if(this.title=="Jobs reader"){
          this.showBack=false
        }
        else{
          this.showBack = true
        }
      }
    )
  }
  onBack(){
    this.showBack = !this.showBack
    this.jobService.headerTitle.next("Jobs reader")
  }

}
