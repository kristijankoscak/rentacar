import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Job } from '../job.model';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  id : string
  job : Job
  constructor(private jobService : JobService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params : Params)=> {
          this.id=params['id']
          this.job = this.jobService.getJob(this.id)
          this.jobService.headerTitle.next(this.job.title)
          this.jobService.setloader.next(false)
        }
      )
  }
}
