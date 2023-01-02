import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  mobile: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    private route: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  closeRegister() {
    this.route.navigate(['home']);
  }

  register(registerform: any) {
    const userModel = new User();
    userModel.name = this.name;
    userModel.email = this.email;
    userModel.password = this.password;
    userModel.dateOfBirth = this.dateOfBirth;
    userModel.mobile = this.mobile;
    if (registerform.valid) {
      this.userService.registerUser(userModel).subscribe({
        next: (res) => {
          console.log('register,', res);
          this.notificationService.success(':: Registration Successfull');
        },
        error: (err) => {
          console.log('err', err);
          this.notificationService.warn(':: Registration Failed');
        },
        complete: () => {
          console.log('register complete');
          this.route.navigate(['login']);
        },
      });
    }
  }
}
