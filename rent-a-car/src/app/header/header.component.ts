import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 loggedUser: User;
 userType: string = 'none';
 subscription: Subscription;

  constructor(
    private router:Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscription = this.userService.userChanged.subscribe(user => {
      this.loggedUser = user;
    })
    this.loggedUser = this.userService.getUser();
  }

  logout(): void{
    this.router.navigate(['/home']);
    localStorage.removeItem('userToken');
    this.userService.saveUser(undefined);
    this.userService.showNotAllowedError.next(false);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
