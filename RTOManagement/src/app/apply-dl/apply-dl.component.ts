import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { UtilserviceService } from '../services/utilservice.service';
import { GetUserService } from '../services/get-user.service';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-apply-dl',
  templateUrl: './apply-dl.component.html',
  styleUrls: ['./apply-dl.component.css'],
})
export class ApplyDlComponent implements OnInit {
  User: any;
  genders: any;
  crossMsg: any;
  overlay: any;
  closeBtn: any;
  titleMsg: any;
  errorMsg: any;
  messageMethod: any;
  submitBtn: any;
  updatedUser: UserModel;
  constructor(
    private _userService: UserServiceService,
    private _utilService: UtilserviceService,
    private _getUserService: GetUserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.genders = document.getElementsByName('gender');
    this.crossMsg = document.querySelector('.closeOverlay');
    this.overlay = document.querySelector('.overlay');
    this.closeBtn = document.querySelector('.closeBtn');
    this.submitBtn = document.querySelector('.btn-submit');
    const close = () => {
      this.overlay.style.display = 'none';
      this._router.navigate(['/menu']);
      this._userService.User = null;
    };
    this.crossMsg.addEventListener('click', close);
    this.closeBtn.addEventListener('click', close);

    this.messageMethod = (title, msg) => {
      this.overlay.style.display = 'flex';
      this.overlay.firstChild.display = 'flex';
      if (!title.includes('Success')) {
        this.overlay.firstChild.style.background =
          'linear-gradient(134deg, #ff3a3aed, #141414)';
      } else {
        this.overlay.firstChild.style.background =
          'linear-gradient(134deg, blueviolet, #141414)';
      }
      this.titleMsg = title;
      this.errorMsg = msg;
    };
    //Setting the user by redirecting the user from applyDl to userLogin

    if (this._userService.User == null) {
      this._userService.navigatedFrom = '/applyDL';
      this._router.navigate(['/userLogin']);
    }
    this.User = this._userService.User;

    //If Status is pending or rejected it will redirect to main page
    if (
      this.User.licStatus.match('pending') ||
      this.User.licStatus.match('rejected')
    ) {
      this.messageMethod(
        'Oopps',
        `Sorry! your application status is ${this.User.licStatus} mode, Please wait for admin approval!`
      );
    }
    //If DL is already exists then just popup a message
    if (this.User.dlNo != null) {
      this.messageMethod(
        'Successfully!!',
        `Your Driving licence already applied, your DL no is ${this.User.dlNo}`
      );
    }
    //set Gnder comes from Database;
    this.genders.forEach((gender) => {
      if (gender.value == this.User.gender) {
        gender.checked = true;
      }
      gender.style.pointerEvents = 'none';
    });
  }
  onSubmit() {
    this.submitBtn.style.opacity = '0.5';
    this.submitBtn.style.pointerEvents = 'none';

    this._getUserService.applyDl(this.User).subscribe((data) => {
      this.updatedUser = data;
      if (data != null) {
        this.messageMethod(
          'Successfully!!',
          `Successfylly applied for your Driving licence, your DL no is ${data.dlNo}!`
        );
      } else {
        this.messageMethod(
          'Ooops!!',
          `Sorry! Error generate while applying your Driving Licence`
        );
      }
    });
  }
}
