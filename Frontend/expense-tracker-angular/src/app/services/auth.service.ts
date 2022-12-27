import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // component communication using subject
  private subject = new Subject<any>();

  setSubject() {
    this.subject.next(this.subject);
  }

  getSubject(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor(private route: Router) {}

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

  getToken(): any {
    return sessionStorage.getItem('token');
  }

  setToken(token: any) {
    sessionStorage.setItem('token', token);
  }
}
