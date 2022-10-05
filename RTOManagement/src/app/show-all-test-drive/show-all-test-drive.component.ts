import { Component, OnInit } from '@angular/core';
import { GetAdminService } from '../services/get-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-all-test-drive',
  templateUrl: './show-all-test-drive.component.html',
  styleUrls: ['./show-all-test-drive.component.css'],
})
export class ShowAllTestDriveComponent implements OnInit {
  users = [];

  msg: any;
  databtn: any;
  tableWrap: any;
  serach: any;
  noUserFound: any;
  copyUsers: any[];
  constructor(private _getAdmin: GetAdminService, private _router: Router) {}

  ngOnInit(): void {
    if (document.cookie == '' || document.cookie.split('=')[1].match('false')) {
      this._router.navigateByUrl('/adminlogin');
    }
    this.serach = document.querySelector('.search');
    this.noUserFound = document.querySelector('.not-found');
    this.tableWrap = document.querySelector('.tableWrap');
    this.databtn = document.querySelector('.dataBtn');
    this.databtn.addEventListener('click', () => {
      if (this.databtn.className.includes('more')) {
        this.databtn.innerHTML = 'Less';
        this.databtn.classList.remove('more');
        this.databtn.classList.add('less');
        this.tableWrap.style.overflow = 'auto';
      } else {
        this.databtn.innerHTML = 'More';
        this.databtn.classList.add('more');
        this.databtn.classList.remove('less');
        this.tableWrap.style.overflow = 'hidden';
      }
    });
    this._getAdmin.getAllUsers().subscribe((data) => {
      this.users = data.filter((item) => {
        if (item.licStatus.match('pending') && item.testDriveDate != null) {
          return item;
        }
      });
      if (this.users.length != 0) {
        this.copyUsers = this.users;
      } else {
        this.noUserFound.style.display = 'inline';
      }
    });
  }
  searchBy() {
    let value = this.serach.value.toLowerCase().trim();

    if (value != '') {
      this.users = this.users.filter((item) => {
        return item.userName.toLowerCase().trim().includes(value);
      });

      if (this.users.length == 0) {
        this.noUserFound.style.display = 'inline';
      }
    } else {
      if (this.noUserFound.style.display == 'inline') {
        this.noUserFound.style.display = 'none';
        this.users = this.copyUsers;
      } else {
        this.noUserFound.style.display = 'inline';
      }
    }
  }
}
