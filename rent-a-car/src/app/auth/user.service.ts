import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: User;
  constructor() { }


  saveUser(user: User): void{
    this.loggedUser = user;
  }
  getUser(): User{
    return this.loggedUser;
  }

}
