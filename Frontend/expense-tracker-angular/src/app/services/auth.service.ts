import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private login = new Subject();

  constructor() {}

  setLogin(login) {
    this.login.next(login);
  }

  getLogin(): Observable<any>{
    return this.login.asObservable();
  }

  isLoggedIn() {
    if (sessionStorage.getItem('token') == null) {
      return false;
    }
    return true;
  }

  logout() {
    sessionStorage.removeItem('token');
    window.location.reload();
  }

  getToken():any {
    return sessionStorage.getItem('token');
  }

  setToken(token:any) {
    sessionStorage.setItem('token', token);
  }
}
