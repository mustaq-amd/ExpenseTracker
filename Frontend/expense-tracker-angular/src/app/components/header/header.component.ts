import { Component, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  // to load header from login component using Subject
  subjectSubscription: Subscription;

  isLoggedIn: any;

  constructor(private authService: AuthService) {
    this.subjectSubscription = this.authService.getSubject().subscribe(() => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
