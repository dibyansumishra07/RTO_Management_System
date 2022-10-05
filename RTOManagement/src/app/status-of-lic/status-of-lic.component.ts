import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-of-lic',
  templateUrl: './status-of-lic.component.html',
  styleUrls: ['./status-of-lic.component.css'],
})
export class StatusOfLicComponent implements OnInit {
  User: any;
  //status_of_lic: '../../assets/img/statusOfLIc.svg';
  constructor(
    private _userService: UserServiceService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (this._userService.User == null) {
      this._userService.navigatedFrom = '/statusLic';
      this._router.navigate(['/userLogin']);
    } else {
      this.User = this._userService.User;
    }
  }
}
