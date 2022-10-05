import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { UtilserviceService } from '../services/utilservice.service';
import { GetUserService } from '../services/get-user.service';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-re-new-lic',
  templateUrl: './re-new-lic.component.html',
  styleUrls: ['./re-new-lic.component.css'],
})
export class ReNewLicComponent implements OnInit {
  User: any;
  msg: string;
  msgTitle: string;
  crossMsg: any;
  overlay: any;
  renewedDate: any;
  closeBtn: any;
  updatedUser: UserModel;
  constructor(
    private _userService: UserServiceService,
    private _router: Router,
    private _utilService: UtilserviceService,
    private _getUserService: GetUserService
  ) {}

  ngOnInit(): void {
    this.crossMsg = document.querySelector('.closeOverlay');
    this.overlay = document.querySelector('.overlay');
    this.closeBtn = document.querySelector('.closeBtn');
    //getting the data from the UserService
    if (this._userService.User == null) {
      this._userService.navigatedFrom = '/renewLic';
      this._router.navigate(['/userLogin']);
    }
    this.User = this._userService.User;

    /*close the overlay page - button*/
    const close = () => {
      this.overlay.style.display = 'none';
    };
    this.crossMsg.addEventListener('click', close);
    this.closeBtn.addEventListener('click', close);

    //If Dl is not applied then can not renew Lic

    //If Status is pending or rejected it will redirect to main page
    if (
      this.User.licStatus.match('pending') ||
      this.User.licStatus.match('rejected') ||
      this.User.dlNo == null
    ) {
      this.overlay.style.display = 'flex';
      this.overlay.firstChild.display = 'flex';
      this.overlay.firstChild.style.background =
        'linear-gradient(134deg, #ff3a3aed, #141414)';
      this.msgTitle = 'Ooops!!';
      this.msg = `Sorry! your application status is ${this.User.licStatus} mode so you can not renew Now! or Apply for DL first!`;
      setTimeout(() => {
        this._router.navigate(['/menu']);
      }, 5000);
    }
    //Error Box inside elements and setting the newDate if date is valid
    else {
      let yearDiff = this._utilService.getDateDiffFromToday(
        this.User.expiryDate
      );
      if (yearDiff < 0) {
        this.overlay.style.display = 'flex';
        this.overlay.firstChild.style.background =
          'linear-gradient(134deg, #ff3a3aed, #141414)';
        this.msgTitle = 'Ooops!!';
        this.msg = `Sorry! your application is valid till: ${this.User.expiryDate},can not renew it now.`;
      } else {
        this.overlay.style.display = 'flex';
        this.overlay.firstChild.style.background =
          'linear-gradient(134deg, blueviolet, #141414)';
        this.overlay.style.display = 'flex';
        this.msgTitle = 'Success!!';
        // let todayDate = new Date().toLocaleDateString();
        this.renewedDate = this._utilService.setNewDateFromToday(0, 6, 0);
        this.msg = `Your application is successfully updated and your validity increased from: ${this.User.expiryDate} to: ${this.renewedDate}`;
        this.User.expiryDate = this.renewedDate;
        this._getUserService.renewLic(this.User).subscribe(
          (data) => {
            this.updatedUser = data;
            console.log('data' + data.expiryDate);
          },
          (err) => {
            this._userService.errorMessage =
              'Sorry! Error Found when getting user!';
            this._router.navigateByUrl('/error');
          }
        );
      }
    }
  }
}
