import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  url: any;
  userLink: any;
  adminLink: any;
  navBar: any;
  logout: any;
  constructor(
    private _router: Router,
    private _userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.url = window.location.href;
    this.userLink = document.querySelector('.user');
    this.adminLink = document.querySelector('.admin');
    this.logout = document.querySelector('.logout');

    if (this.url.includes('admin')) {
      this.adminLink.classList.add('active');
      this.userLink.classList.remove('active');
      this.logout.style.display = 'initial';
      if (this.url.includes('adminlogin')) {
        this.logout.style.display = 'none';
      }
    }
    if (this.url.includes('menu')) {
      this.userLink.classList.add('active');
      this.adminLink.classList.remove('active');
      this.logout.style.display = 'none';
    }
    if (
      this.url.includes('userLogin') ||
      this.url.includes('apply') ||
      this.url.includes('upload') ||
      this.url.includes('statusLic') ||
      this.url.includes('uploadFiles') ||
      this.url.includes('getTestDrive') ||
      this.url.includes('renewLic')
    ) {
      this.logout.style.display = 'none';
    }
  }
  onLogOut() {
    document.cookie = 'AdminLogin=false';
    this._router.navigateByUrl('/adminlogin');
  }
  userClick() {
    this._userService.User = null;
    this._router.navigateByUrl('/menu');
  }
}
