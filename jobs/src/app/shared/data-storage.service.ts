import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../job.model';
import { JobService } from '../job.service';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService{

    constructor(private jobService : JobService,
                private http : HttpClient){}

    fetchJobs(){
        return this.http
        /*https://jobs.github.com/positions.json?lat=37.3229978&long=-122.0321823 
        https://jobs.github.com/positionss.json?description=ruby&page=1
        https://jobs.github.com/positions.json?description=angular */ 
            .get<Job[]>('https://jobs.github.com/positions.json?description=angular')
            .pipe(
                tap( jobs => {
                    this.jobService.setJobs(jobs)
                })
            )
    }

   
}