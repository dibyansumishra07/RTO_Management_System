import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { GetUserService } from '../services/get-user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  user_img = '../../assets/img/userlogin.svg';
  newUser: any;
  licKey: any;
  dob: any;
  userService: any;
  navigateTo: any;
  credentialUser: UserModel;
  //Variable declaring of UserService and a Router class.
  constructor(
    private _userService: UserServiceService,
    private _getUserService: GetUserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.navigateTo = this._userService.navigatedFrom;
    if (this.navigateTo == null) {
      this._router.navigate(['/menu']);
    }
    this.licKey = document.querySelector('#key');
    this.dob = document.querySelector('#dob');
    this.credentialUser = new UserModel();
    this.onChange();
  }

  setUser() {
    this.newUser = new UserModel();
    this.credentialUser.llNo = this.licKey.value;
    this.credentialUser.dob = this.dob.value;
    this._getUserService.getUser(this.credentialUser).subscribe(
      (data) => {
        this.newUser = data;
        if (data == null) {
          this._userService.errorMessage =
            'No User Found, Please Try again later!';
          this._router.navigate(['/error']);
        }
        this._userService.setUserData(this.newUser);
        if (this._userService.User != null) {
          this._router.navigateByUrl(this.navigateTo);
        } else {
          this._userService.errorMessage = 'Sorry No user Found';
          this._router.navigateByUrl('/error');
        }
      },
      (error) => {
        this._userService.errorMessage =
          'No User Found, Please Try again later!';
        this._router.navigate(['/error']);
      }
    );
  }

  onChange() {
    this.licKey.addEventListener('input', () => {
      this.licKey.style.borderBottom = '2px solid white';
      this.licKey.previousSibling.style.color = '#fff';
    });

    this.dob.addEventListener('input', () => {
      this.dob.style.borderBottom = '2px solid white';
      this.dob.previousSibling.style.color = '#fff';
    });
  }

  onSubmit() {
    if (this.licKey.value == '') {
      this.licKey.style.borderBottom = '2px solid #cc0000';
      this.licKey.previousSibling.style.color = '#cc0000';
    }
    if (this.dob.value == '') {
      this.dob.style.borderBottom = '2px solid #cc0000';
      this.dob.previousSibling.style.color = '#cc0000';
    } else {
      this.setUser();
    }
  }
  onReset() {
    this.licKey.style.borderBottom = '2px solid white';
    this.dob.style.borderBottom = '2px solid white';
    this.licKey.previousSibling.style.color = '#fff';
    this.dob.previousSibling.style.color = '#fff';
  }
}
