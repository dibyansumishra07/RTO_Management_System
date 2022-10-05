import { Component } from '@angular/core';
import { UtilserviceService } from './services/utilservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  section: any;
  title = 'RTOManagement';
  checkBox: any;
  constructor() {}
}
