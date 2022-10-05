import { Component, OnInit } from '@angular/core';
import { UtilserviceService } from '../services/utilservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  copy = 'All copyright Reserved by Mr. Dibyansu Mishra';
  // Storing image file as string
  about_img = '../../assets/img/aboutcar.svg';
  contact_img = '../../assets/img/contactpic.svg';
  bars: any;
  navbar: any;
  // checkBox: any;
  // sections: any;
  constructor(private _utilService: UtilserviceService) {}

  ngOnInit(): void {
    this.bars = document.querySelector('.head');
    this.navbar = document.querySelector('.navbar');
    // this.checkBox = document.querySelector('.check');
    // TODO:
    this.bars.addEventListener('click', () => {
      this.bars.classList.toggle('active');
    });

    //Setting the cookie to default false;
    if (document.cookie == '') document.cookie = 'AdminLogin=false';

    // this.sections = document.querySelectorAll('section');
    // this.checkBox = document.querySelector('.check');
    // this.checkBox.addEventListener('change', () => {
    //   this.sections.forEach((section) => {
    //     if (this.checkBox.checked) {
    //       //Normalmode part
    //       this._utilService.mode = 'white';

    //       section.style.background = 'white';
    //       section.style.color = 'black';
    //     } else {
    //       //DarkMode Part
    //       this._utilService.mode = 'dark';
    //       section.style.background = '#141414';
    //       section.style.color = 'white';
    //     }
    //   });
    // });
  }
}
