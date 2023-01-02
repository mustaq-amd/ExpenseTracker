import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import * as SampleJson from '../../../assets/caraousal.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images: any = [];
  constructor(
    private authService: AuthService,
    private route: Router,
    config: NgbCarouselConfig
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.images = [...SampleJson.default['carousalArray']];
    console.log(this.images)
  }

  navigateToExpensePage() {
    this.route.navigate(['list-expenses']);
  }
}
