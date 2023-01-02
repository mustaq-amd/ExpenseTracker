import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import {MatSidenav} from '@angular/material/sidenav';

import {
  NgbDatepickerModule,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  // to load header from login component using Subject
  subjectSubscription: Subscription;

  isLoggedIn: any;

  showFiller = false;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private offcanvasService: NgbOffcanvas
  ) {
    this.subjectSubscription = this.authService.getSubject().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.dialogService
      .openConfirmDialog('Are you sure to logout ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.authService.logout();
        }
      });
  }

  close(reason: string) {
    this.sidenav.close();
  }
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
