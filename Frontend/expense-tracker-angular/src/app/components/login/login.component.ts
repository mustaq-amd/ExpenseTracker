import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  responseData: any;
  email: any;
  password: any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    private route: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  proceedLogin(logindata: any) {
    sessionStorage.removeItem('token');
    const loginModel = new Login();
    loginModel.email = this.email;
    loginModel.password = this.password;
    if (logindata.valid) {
      this.userService.proceedLogin(loginModel).subscribe({
        next: (res) => {
          this.responseData = res;
          sessionStorage.setItem('token', this.responseData.jwtToken);
          this.authService.setLogin(true);
        },
        error: (err) => {
          alert('Login Failed');
        },
        complete: () => {
          this.route.navigate(['home'])
        }
      });
    }
  }
}
