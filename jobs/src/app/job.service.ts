import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  headerTitle = new Subject<string>()
  setloader = new Subject<boolean>()
  errorHappened = new Subject<boolean>()

  private loadedJobs : Job[] 
  
  constructor() { }

  getJob(idd : string) : Job {
    return this.loadedJobs.find(job => job.id === idd);
  }
  setJobs( jobs : Job[]){
    this.loadedJobs = jobs
  }
  getJobs(){
    return this.loadedJobs
  }
}
