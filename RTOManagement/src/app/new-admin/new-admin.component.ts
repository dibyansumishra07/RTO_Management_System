import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AdminModel } from '../models/AdminModel';
import { Router } from '@angular/router';
import { GetAdminService } from '../services/get-admin.service';
import { UserServiceService } from '../services/user-service.service';
@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css'],
})
export class NewAdminComponent implements OnInit {
  newadmin_img = '../../asset/img/adminLogin.svg';
  overlay: any;
  closeBtn: any;
  msgTitle: string;
  msg: string;
  crossMsg: any;
  AdminName: any;
  AdminEmail: any;
  AdminPass: any;
  submit: any;
  Admin: any;
  NewAdmin: AdminModel;
  constructor(
    private _router: Router,
    private _getAdmin: GetAdminService,
    private _userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.Admin = new AdminModel();
    this.AdminName = document.querySelector('.regAdminName');
    this.AdminEmail = document.querySelector('.regAdminEmail');
    this.AdminPass = document.querySelector('.regAdminPass');
    this.submit = document.querySelector('.btn-submit');
    this.crossMsg = document.querySelector('.closeOverlay');
    this.overlay = document.querySelector('.overlay');
    this.closeBtn = document.querySelector('.closeBtn');
  }
  onInput() {
    if (this.AdminName.value.trim() == '') {
      this.AdminName.style.borderBottom = '2px solid red';
    } else {
      this.AdminName.style.borderBottom = '2px solid white';
    }
    if (
      this.AdminEmail.value.trim() == '' ||
      !this.AdminEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)
    ) {
      this.AdminEmail.style.borderBottom = '2px solid red';
    } else {
      this.AdminEmail.style.borderBottom = '2px solid white';
    }
    if (this.AdminPass.value.trim() == '') {
      this.AdminPass.style.borderBottom = '2px solid red';
    } else {
      this.AdminPass.style.borderBottom = '2px solid white';
    }

    if (
      this.AdminName.value.trim() != '' &&
      this.AdminEmail.value.trim() != '' &&
      this.AdminPass.value.trim() != ''
    ) {
      this.submit.style.opacity = '1';
      this.submit.style.pointerEvents = 'all';
    } else {
      this.submit.style.opacity = '0.4';
      this.submit.style.pointerEvents = 'none';
    }
  }
  onSubmit() {
    this.submit.style.opacity = '0.4';
    this.submit.style.pointerEvents = 'none';
    this._getAdmin.addAdmin(this.Admin).subscribe(
      (data) => {
        this.NewAdmin = data;
        if (data != null) {
          this.overlay.style.display = 'flex';
          this.overlay.firstChild.display = 'flex';
          this.overlay.firstChild.style.background =
            'linear-gradient(134deg, blueviolet, #141414)';
          this.msgTitle = 'Success!';
          this.msg = `Successfully! Added the New Admin with, Admin ID:${data.adminName}, The user will recieved an email about this.`;
        }
      },
      (error) => {
        this._userService.errorMessage = 'Sorry! No User Found!';
        this._router.navigateByUrl('/error');
      }
    );
  }
}
