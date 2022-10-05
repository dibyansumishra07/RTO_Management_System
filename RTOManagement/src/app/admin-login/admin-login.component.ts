import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AdminModel } from '../models/AdminModel';
import { GetAdminService } from '../services/get-admin.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  admin_img: any = '../../assets/img/adminLogin.svg';
  adminEmail: any;
  adminPass: any;
  passwordTypeChanger: any;
  eye: any;
  buttonArrow: any;
  loginForm: any;
  registerForm: any;
  Admin: any;
  NewAdmin: any;
  msg: string;
  msgTitle: string;
  crossMsg: any;
  overlay: any;
  renewedDate: any;
  closeBtn: any;
  submitBtn: any;
  constructor(
    private _router: Router,
    private _getAdmin: GetAdminService,
    private _userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.Admin = new AdminModel();
    this.NewAdmin = new AdminModel();
    this.adminEmail = document.querySelector('.adminemail');
    this.adminPass = document.querySelector('.adminpass');
    this.eye = document.querySelector('#eye');
    this.buttonArrow = document.querySelector('.buttonArrow');
    this.loginForm = document.querySelector('.loginform');
    this.registerForm = document.querySelector('.registerform');
    this.crossMsg = document.querySelector('.closeOverlay');
    this.overlay = document.querySelector('.overlay');
    this.closeBtn = document.querySelector('.closeBtn');
    this.submitBtn = document.querySelector('.submitBtn');
    if (document.cookie.includes('true')) {
      this._router.navigateByUrl('/adminMenu');
    }
    //Password eye close and open
    this.passwordTypeChanger = () => {
      if (this.adminPass.type == 'password') {
        this.adminPass.type = 'text';
        this.eye.classList.remove('fa-eye');
        this.eye.classList.add('fa-eye-slash');
      } else {
        this.adminPass.type = 'password';
        this.eye.classList.add('fa-eye');
        this.eye.classList.remove('fa-eye-slash');
      }
    };

    this.eye.addEventListener('click', this.passwordTypeChanger);
    this.adminEmail.addEventListener('input', () => {
      if (!this.adminEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
        this.adminEmail.style.borderBottom = '2px solid white';
        this.adminEmail.previousSibling.style.color = '#fff';
      }
    });
    this.adminPass.addEventListener('input', () => {
      this.adminPass.value != ''
        ? (this.eye.style.opacity = '1')
        : ((this.eye.style.opacity = '0'), this.passwordTypeChanger());

      this.adminPass.style.borderBottom = '2px solid white';
      this.adminPass.previousSibling.style.color = '#fff';
    });
    const close = () => {
      this.overlay.style.display = 'none';
      this._router.navigate(['/menu']);
    };
    this.crossMsg.addEventListener('click', close);
    this.closeBtn.addEventListener('click', close);
  }
  onSubmit() {
    const onChangeFun = (item) => {
      item.style.borderBottom = '2px solid #cc0000';
      item.previousSibling.style.color = '#cc0000';
    };
    if (
      this.adminEmail.value == '' ||
      !this.adminEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)
    ) {
      onChangeFun(this.adminEmail);
    }
    if (this.adminPass.value == '') {
      onChangeFun(this.adminPass);
    } else {
      this.submitBtn.style.opacity = '0.5';
      this.submitBtn.style.cursor = 'wait';
      this.submitBtn.style.pointerEvents = 'none';
      this._getAdmin.adminLogin(this.Admin).subscribe(
        (data) => {
          if (data != null) {
            document.cookie = 'AdminLogin=true';
            this._router.navigate(['/adminMenu']);
          } else {
            document.cookie = 'AdminLogin=false';
            this.overlay.style.display = 'flex';
            this.overlay.firstChild.display = 'flex';
            this.overlay.firstChild.style.background =
              'linear-gradient(134deg, #ff3a3aed, #141414)';
            this.msgTitle = 'Ooops!!';
            this.msg = `Sorry! No User Found Please Try Again Later!`;
          }
        },
        (error) => {
          document.cookie = 'AdminLogin=false';
          this._userService.errorMessage =
            'Error Found, while getting your data! Please try again later.';
          this._router.navigateByUrl('/error');
        }
      );
    }
  }
  onReset() {
    this.adminEmail.style.borderBottom = '2px solid white';
    this.adminPass.style.borderBottom = '2px solid white';
    this.adminEmail.previousSibling.style.color = '#fff';
    this.adminPass.previousSibling.style.color = '#fff';
  }

  onForgot() {
    if (this.buttonArrow.firstChild.className.includes('fa-lock-open')) {
      this.loginForm.style.display = 'flex';
      this.registerForm.style.display = 'none';
      this.buttonArrow.firstChild.classList.add('fa-lock');
      this.buttonArrow.firstChild.classList.remove('fa-lock-open');
    } else {
      this.loginForm.style.display = 'none';
      this.registerForm.style.display = 'flex';
      this.buttonArrow.firstChild.classList.remove('fa-lock');
      this.buttonArrow.firstChild.classList.add('fa-lock-open');
    }
  }

  sendPassword() {
    this._getAdmin.forgotPassword(this.NewAdmin).subscribe(
      (data) => {
        if (data != null) {
          this.overlay.style.display = 'flex';
          this.overlay.firstChild.style.background =
            'linear-gradient(134deg, blueviolet, #141414)';
          this.overlay.style.display = 'flex';
          this.msgTitle = 'Success!!';

          this.msg = `Your Password is successfully send to your email-id!`;
        } else {
          document.cookie = 'AdminLogin=false';
          this.overlay.style.display = 'flex';
          this.overlay.firstChild.display = 'flex';
          this.overlay.firstChild.style.background =
            'linear-gradient(134deg, #ff3a3aed, #141414)';
          this.msgTitle = 'Ooops!!';
          this.msg = `Sorry! No User Found Please Try Again Later!`;
        }
      },
      (err) => {
        this._userService.errorMessage =
          'Sorry can not able to send the data now!';
        this._router.navigateByUrl('/error');
      }
    );
  }
}
