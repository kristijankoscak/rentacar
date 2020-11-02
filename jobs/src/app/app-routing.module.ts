import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobsResolverService } from './job-resolver.service';

const appRouter : Routes = [
    {path:'', redirectTo: '/job-list',pathMatch:'full'},
    {path : 'job-list', component : JobListComponent},
    {path : 'job-detail/:id', component : JobDetailComponent,resolve : [JobsResolverService]}
]
@NgModule({
    imports: [RouterModule.forRoot(appRouter)],
    exports : [RouterModule]
})
export class AppRoutingModule {

}