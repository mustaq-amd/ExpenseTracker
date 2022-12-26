import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _httpClient: HttpClient) {}

  loginUrl: string = 'http://localhost:5000/api/v1/loginn';
  registerUrl: string = 'http://localhost:5000/api/v1/register';

  proceedLogin(loginModel: any): Observable<any> {
    return this._httpClient.post(this.loginUrl, loginModel);
  }

  registerUser(userModel: any): Observable<any> {
    return this._httpClient.post(this.registerUrl, userModel);
  }
}
