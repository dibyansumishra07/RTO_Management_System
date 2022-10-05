import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu-page',
  templateUrl: './admin-menu-page.component.html',
  styleUrls: ['./admin-menu-page.component.css'],
})
export class AdminMenuPageComponent implements OnInit {
  admin_menu_img: any = '../../assets/img/menupage.svg';
  constructor(private _router: Router) {}

  ngOnInit(): void {
    if (document.cookie == '' || document.cookie.split('=')[1].match('false')) {
      this._router.navigateByUrl('/adminlogin');
    }
  }
}
