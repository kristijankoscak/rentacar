import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/job.model';
import { JobService } from 'src/app/job.service';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {

  @Input() job : Job
  @Input() id : string


  constructor(private jobService : JobService) {}

  ngOnInit(): void {
  }
  onSelected(title : string){
    this.jobService.headerTitle.next(title)
  }
  
}
