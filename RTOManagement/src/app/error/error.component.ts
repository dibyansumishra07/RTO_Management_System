import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  err_img: any = '../../assets/img/404page_not_found.svg';
  err_msg: string;
  constructor(private _userService: UserServiceService) {}

  ngOnInit(): void {
    if (this._userService.errorMessage != null)
      this.err_msg = this._userService.errorMessage;
    else this.err_msg = 'Page Not Found!';
  }
}
