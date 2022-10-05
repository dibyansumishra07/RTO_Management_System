import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css'],
})
export class MenupageComponent implements OnInit {
  menu_img: any = '../../assets/img/menupage.svg';
  constructor(private _userService: UserServiceService) {}

  ngOnInit(): void {}
}
