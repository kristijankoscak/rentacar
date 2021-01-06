import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { HomeComponent } from "./home/home.component";
import { VehicleReserveComponent } from "./vehicle/vehicle-reserve/vehicle-reserve.component";
import { VehicleDetailComponent } from "./vehicle/vehicle-detail/vehicle-detail.component";
import { VehicleEditComponent } from "./vehicle/vehicle-edit/vehicle-edit.component";
import { VehicleComponent } from "./vehicle/vehicle.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { ReservationListComponent } from "./reservation/reservation-list/reservation-list.component";
import { ReservationDetailComponent } from "./reservation/reservation-detail/reservation-detail.component";
import { ReservationStatusComponent } from "./reservation/reservation-status/reservation-status.component";
import { VehicleListComponent } from "./vehicle/vehicle-list/vehicle-list.component";


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
      { path: '', component: VehicleListComponent },
      { path: 'new', component: VehicleEditComponent },
      { path: ':id', component: VehicleDetailComponent },
      { path: ':id/edit', component: VehicleEditComponent },
      { path: ':id/reserve', component: VehicleReserveComponent }
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
