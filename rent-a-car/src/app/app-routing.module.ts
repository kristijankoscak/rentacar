import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { VehicleReserveComponent } from './vehicle/vehicle-reserve/vehicle-reserve.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { ReservationStatusComponent } from './reservation/reservation-status/reservation-status.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { VehicleResolverService } from './vehicle/vehicle-resolver.service';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'vehicle',
    component: VehicleComponent,
    children: [
      { path: '', component: VehicleListComponent ,resolve:[VehicleResolverService]},
      { path: 'new', component: VehicleEditComponent },
      { path: ':id', component: VehicleDetailComponent, resolve:[VehicleResolverService]},
      { path: ':id/edit', component: VehicleEditComponent ,resolve:[VehicleResolverService]},
      { path: ':id/reserve', component: VehicleReserveComponent ,resolve:[VehicleResolverService]}
    ]
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    children: [
      { path: '', component: ReservationListComponent },
      { path: ':id', component: ReservationDetailComponent },
      { path: ':id/status', component: ReservationStatusComponent }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent }
    ]
  },
  {
    path: 'car-rental/:id',
    component: CarRentalComponent,
  },
  {
    path: 'company-register',
    component: CompanyRegisterComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
