import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loading = this.loader.loading;

  title = 'expense-tracker-angular';
  
  constructor(private loader:LoadingService) {
    
  }
}
