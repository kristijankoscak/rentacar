import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  saveToken(token: string): void{
    localStorage.setItem('userToken', token);
  }
  fetchToken(): string{
    const token = localStorage.getItem('userToken');
    if(token.length>0){
      return token;
    }
    else{
      return 'There is no token!';
    }
  }

  fetchUser(): void {
    this.http
      .post<any>(
        'https://sbdrustvo.com/auth',
        {
          name: 'pekijevaautokuca',
          city: 'Osijek',
          address: 'Retfala',
          contactNumber: '54454455',
          email: 'peky@autokuca.com',
          image: 'afafafas'
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}





/*
  Rukovanje podacima o korisniku i poduzimanje
  odgovarajuće akcije (prijava korisnika, prebacivanje
  na naslovnu stranicu...).
*/
