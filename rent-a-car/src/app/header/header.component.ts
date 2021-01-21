import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 loggedUser: User = null;
 userType: string = 'none';

  constructor(
    private router:Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.loggedUser)
    this.authService.loggedUser.subscribe(user => {
      this.loggedUser = user;
    })
    this.loggedUser = this.userService.getUser();
  }

  logout(): void{
    localStorage.removeItem('userToken');
    this.authService.loggedUser.next(null);
    this.userService.saveUser(null);
  }

}
