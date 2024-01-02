import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(userName: string, password: string) {
    return this.http.post("login", {
      username: userName,
      password: password
    });
  }

  public addUser(userName: string, password: string, firstName: string, lastName: string) {
    return this.http.post("addUser", {
      username: userName,
      password: password
    });


  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
