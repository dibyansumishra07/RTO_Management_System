import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { GetAdminService } from '../services/get-admin.service';

@Component({
  selector: 'app-set-user-status',
  templateUrl: './set-user-status.component.html',
  styleUrls: ['./set-user-status.component.css'],
})
export class SetUserStatusComponent implements OnInit {
  id: any;
  User: UserModel;
  selectStatus: any;
  buttons: any;
  overlay: any;
  closeBtn: any;
  msgTitle: string;
  msg: string;
  crossMsg: any;
  btnSubmit: any;
  messageMethod: any;
  constructor(
    private _getAdmin: GetAdminService,
    private _userService: UserServiceService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (document.cookie == '' || document.cookie.split('=')[1].match('false')) {
      this._router.navigateByUrl('/adminlogin');
    }
    this.id = document.querySelector('#appId');
    this.selectStatus = document.querySelector('#selectStatus');
    this.buttons = document.querySelector('.buttons');
    this.crossMsg = document.querySelector('.closeOverlay');
    this.overlay = document.querySelector('.overlay');
    this.closeBtn = document.querySelector('.closeBtn');
    this.btnSubmit = document.querySelector('.btn-submit');
    this.selectStatus.addEventListener('change', () => {
      this.buttons.style.opacity = '1';
    });

    const close = () => {
      this.overlay.style.display = 'none';
      this._router.navigateByUrl('/adminMenu');
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
      this.msgTitle = title;
      this.msg = msg;
    };
  }

  onSubmit() {
    const messageMethod = (title, msg) => {
      this.overlay.style.display = 'flex';
      this.overlay.firstChild.display = 'flex';
      if (!title.includes('Success')) {
        this.overlay.firstChild.style.background =
          'linear-gradient(134deg, #ff3a3aed, #141414)';
      } else {
        this.overlay.firstChild.style.background =
          'linear-gradient(134deg, blueviolet, #141414)';
      }
      this.msgTitle = title;
      this.msg = msg;
    };
    window.scrollTo(0, 600);
    let id = parseInt(this.id.value);
    if (id != null) {
      this._getAdmin.getUserById(id).subscribe(
        (data) => {
          this.User = data;
          this.selectStatus.style.display = 'initial';
          if (data.licStatus == 'approve') {
            this.messageMethod('Success!', `This User is already approved!`);
            this.selectStatus.style.pointerEvents = 'none';
          }
          if (data.testDriveDate == null) {
            this.messageMethod(
              'Ooops!',
              `This User did not appreared his/her Drive test!`
            );
            this.selectStatus.style.pointerEvents = 'none';
          }
        },
        (error) => {
          this._userService.errorMessage = 'Sorry No User Found!';
          this._router.navigate(['/error']);
        }
      );
    }
  }

  onFormSubmit() {
    this.btnSubmit.style.pointerEvents = 'none';
    this.btnSubmit.style.opacity = '0.5';
    this._getAdmin.setUserStatus(this.User).subscribe(
      (data) => {
        if (data != null) {
          this.messageMethod(
            'Success!',
            `Successfully updated user Status of id: ${data.appId} with status of ${data.licStatus}`
          );
        } else {
          this.messageMethod(
            'Oopps!',
            `Sorry! Can not Approve this User, By Default allocated to Pending Mode!`
          );
        }
      },
      (error) => {
        this.messageMethod(
          'Oopps!',
          `Sorry! Can not Update User status, Please try again later!`
        );
      }
    );
  }
}
