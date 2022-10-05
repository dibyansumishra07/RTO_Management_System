import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { GetUserService } from '../services/get-user.service';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-verification-files',
  templateUrl: './update-verification-files.component.html',
  styleUrls: ['./update-verification-files.component.css'],
})
export class UpdateVerificationFilesComponent implements OnInit {
  User: UserModel;
  submit: any;
  updatedUser: UserModel;
  idProof: any;
  bloodGroupCert: any;
  certificate: any;
  msg: string;
  msgTitle: string;
  crossMsg: any;
  overlay: any;
  renewedDate: any;
  closeBtn: any;
  uploadFiles = '../../assets/img/uploadFiles.svg';
  constructor(
    private _getUserService: GetUserService,
    private _userService: UserServiceService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.crossMsg = document.querySelector('.closeOverlay');
    this.overlay = document.querySelector('.overlay');
    this.closeBtn = document.querySelector('.closeBtn');
    this.submit = document.querySelector('.btn-submit');
    this.idProof = document.querySelector('#idProof');
    this.bloodGroupCert = document.querySelector('#bloodGroupCert');
    this.certificate = document.querySelector('#certificate');
    //getting the data from the UserService
    if (this._userService.User == null) {
      this._userService.navigatedFrom = '/uploadFiles';
      this._router.navigate(['/userLogin']);
    }
    this.User = this._userService.User;
    if (
      this.User.licStatus.match('approve') ||
      this.User.testDriveDate != null
    ) {
      this.overlay.style.display = 'flex';
      this.overlay.firstChild.display = 'flex';
      this.overlay.firstChild.style.background =
        'linear-gradient(134deg, #ff3a3aed, #141414)';
      this.msgTitle = 'Ooops!!';
      this.msg = `Sorry! your application status is already approved or You already appeared Test Drive, You do not need to reupload files!`;
    }

    const close = () => {
      this.overlay.style.display = 'none';
      this._userService.User = null;
      this._router.navigateByUrl('/menu');
    };
    this.crossMsg.addEventListener('click', close);
    this.closeBtn.addEventListener('click', close);
  }

  onSubmit() {
    if (this.idProof.value == '') {
      alert('sorrry,id required');
    }
    if (this.bloodGroupCert.value == '') {
      alert('blood group required');
    }
    if (this.certificate.value == '') {
      alert('Certificate required');
    }
    if (
      this.idProof.value != '' &&
      this.bloodGroupCert.value != '' &&
      this.certificate.value != ''
    ) {
      this.submit.style.pointerEvents = 'none';
      this.submit.style.opacity = '0.5';
      this._getUserService.uploadFiles(this.User).subscribe(
        (data) => {
          this.updatedUser = data;
          this.overlay.style.display = 'flex';
          this.overlay.firstChild.style.background =
            'linear-gradient(134deg, blueviolet, #141414)';
          this.overlay.style.display = 'flex';
          this.msgTitle = 'Success!!';

          this.msg = `Your application is successfully updated with all the valid files,Now you can give your drive test!`;
        },
        (err) => {
          this._userService.errorMessage =
            'Sorry, Can not upload files! due to some error!';
          this._router.navigateByUrl('/error');
        }
      );
    }
  }
}
