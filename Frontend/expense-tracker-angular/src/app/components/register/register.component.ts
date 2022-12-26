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
  age: number;

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

  register(registerform: any) {
    const userModel = new User();
    userModel.name = this.name;
    userModel.email = this.email;
    userModel.password = this.password;
    userModel.age = this.age;
    if (registerform.valid) {
      this.userService.registerUser(userModel).subscribe({
        next: (res) => {
          this.notificationService.warn('Registration Successfull');
        },
        error: (err) => {
          this.notificationService.warn('Registration Failed');
        },
        complete: () => {
          this.route.navigate(['login']);
        },
      });
    }
  }
}
