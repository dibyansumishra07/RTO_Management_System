import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { Subscription } from 'rxjs';

import { GetAdminService } from '../services/get-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-all-user',
  templateUrl: './show-all-user.component.html',
  styleUrls: ['./show-all-user.component.css'],
})
export class ShowAllUserComponent implements OnInit {
  users = [];
  msg: any;
  databtn: any;
  tableWrap: any;
  serach: any;
  copyUsers = [];
  noUserFound: any;
  constructor(private _getAdmin: GetAdminService, private _router: Router) {}

  ngOnInit(): void {
    this.serach = document.querySelector('.search');
    this.noUserFound = document.querySelector('.not-found');
    if (document.cookie == '' || document.cookie.split('=')[1].match('false')) {
      this._router.navigateByUrl('/adminlogin');
    }

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
    this._getAdmin.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.printByID();
        if (this.users.length != 0) {
          this.copyUsers = this.users;
        } else {
          this.noUserFound.style.display = 'inline';
        }
      },
      (error) => {
        this._router.navigateByUrl('/error');
      }
    );
  }

  printByID() {
    this.users.sort(function (a: any, b: any) {
      return b.appId - a.appId;
    });
  }
  printByLic() {
    this.users.sort(function name(a: any, b: any) {
      var nameA = a.licStatus.toUpperCase();
      var nameB = b.licStatus.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
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
