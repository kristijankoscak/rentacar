import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = undefined;
  userChanged = new Subject<User>();
  constructor() { }


  saveUser(user: User): void{
    this.user = user;
    console.log(this.user)
    this.userChanged.next(user);
  }
  removeUser(): void{
    this.user = undefined;
  }
  getUser(): User{
    return this.user;
  }
  getUserType(): string[]{
    if(this.user === undefined){
      return null;
    }
    else{
      return this.user.roles;
    }
  }

}
