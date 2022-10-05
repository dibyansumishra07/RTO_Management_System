import { Component, OnInit } from '@angular/core';
import { UtilserviceService } from '../services/utilservice.service';
import { UserModel } from '../models/UserModel';
import { GetUserService } from '../services/get-user.service';
import { range } from 'rxjs';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { GetAdminService } from '../services/get-admin.service';

@Component({
  selector: 'app-apply-ll',
  templateUrl: './apply-ll.component.html',
  styleUrls: ['./apply-ll.component.css'],
})
export class ApplyLLComponent implements OnInit {
  vehicle = [
    '',
    'Motorcycles with gear',
    'Motorcycles without gear (capacity of up to 50CC)',
    'Heavy commercial vehicles',
  ];

  state = [
    '',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Lakshadweep',
    'Puducherry',
  ];
  blood = [
    '',
    'A+ ve',
    'B+ ve',
    'AB+ ve',
    'A- ve',
    'B- ve',
    'AB- ve',
    'O+ ve',
    'O- ve',
  ];

  fullName: any;
  vehicleType: any;
  selectedIndex: any;
  stateValue: any;
  genderValue: any;
  dob: any;
  bloodGroup: any;
  phNo: any;
  email: any;
  idProof: any;
  bloodGroupCert: any;
  certificate: any;
  errMsg: any;
  closeMsg: any;
  pinCode: any;
  gender: any;
  address: any;
  user: UserModel;
  responseData: any;
  btnSubmit: any;
  overlay: any;
  closeBtn: any;
  msgTitle: string;
  msg: string;
  crossMsg: any;
  allUsers: UserModel[];
  leftValue = [
    'Permanent address proof',
    'Voters ID card/Aadhar Card/Passport/Pan card',
    'Birth certificate/SSC certificate',
    "3 passport size photographs while applying for a learner's license",
    '3 passport size photographs while applying for a permanent driving licence',
  ];

  constructor(
    private _utilService: UtilserviceService,
    private _getUser: GetUserService,
    private _router: Router,
    private _userService: UserServiceService,
    private _getAdmin: GetAdminService
  ) {}

  ngOnInit(): void {
    this.user = new UserModel();
    this.vehicleType = document.querySelector('#vehicleType');
    this.selectedIndex = this.vehicleType.value;
    this.fullName = document.querySelector('#userName');
    this.stateValue = document.querySelector('#state');
    this.genderValue = document.querySelector('#gen');
    this.dob = document.querySelector('#dob');
    this.bloodGroup = document.querySelector('#bloodGroup');
    this.phNo = document.querySelector('#phNo');
    this.email = document.querySelector('#email');
    this.idProof = document.querySelector('#idProof');
    this.bloodGroupCert = document.querySelector('#bloodGroupCert');
    this.certificate = document.querySelector('#certificate');
    this.errMsg = document.querySelector('.errormessages');
    this.closeMsg = document.querySelector('#closeMsg');
    this.pinCode = document.querySelector('#pin');
    this.gender = document.getElementsByName('gender');
    this.address = document.querySelector('#address');
    this.btnSubmit = document.querySelector('.btn-submit');
    this.crossMsg = document.querySelector('.closeOverlay');
    this.overlay = document.querySelector('.overlay');
    this.closeBtn = document.querySelector('.closeBtn');
    //Setting default male
    this.user.gender = 'male';

    this.onChange();

    const close = () => {
      this.overlay.style.display = 'none';
      this._router.navigate(['/menu']);
    };
    this.crossMsg.addEventListener('click', close);
    this.closeBtn.addEventListener('click', close);
  }

  setUser() {
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
    this.user.licStatus = 'pending';
    this.user.country = 'india';
    this._getUser.addUser(this.user).subscribe(
      (data) => {
        if (data != null) {
          messageMethod(
            'Success!',
            `Successfully Added a new User with Id ${data.appId} and LL No of ${data.llNo}`
          );
        } else {
          messageMethod(
            'Oops!',
            `Sorry Error While Creating a user, Try again later!`
          );
        }
      },
      (error) => {
        this._userService.errorMessage =
          'Sorry!, some error occured during adding user!';
        this._router.navigateByUrl('/error');
      }
    );
  }

  onChange() {
    this.closeMsg.addEventListener('click', () => {
      this.errMsg.style.display = 'none';
    });

    this.vehicleType.addEventListener('change', () => {
      this.vehicleType.style.borderBottom = '2px solid white';

      this.vehicleType.previousSibling.style.color = 'white';
      // Calling a method to change the conditions according to the vehicle type
      this.rightSideContent();
    });

    this.fullName.addEventListener('input', () => {
      this.fullName.style.borderBottom = '2px solid white';
      this.fullName.previousSibling.style.color = 'white';
    });

    this.stateValue.addEventListener('change', () => {
      this.stateValue.style.borderBottom = '2px solid white';
      this.stateValue.previousSibling.style.color = 'white';
    });

    this.pinCode.addEventListener('input', () => {
      if (
        this.pinCode.value.match(/^[^ ]+[0-9]{5}$/) &&
        this.pinCode.value.length <= 6 &&
        !this.pinCode.value.startsWith('0')
      ) {
        this.pinCode.style.borderBottom = '2px solid white';
        this.pinCode.previousSibling.style.color = 'white';
      } else {
        this.pinCode.style.borderBottom = '2px solid #cc0000';
        this.pinCode.previousSibling.style.color = '#cc0000';
      }
    });

    this.gender.forEach((item) => {
      item.addEventListener('click', () => {
        this.gender.forEach((innerItem) => {
          innerItem.parentElement.previousSibling.style.color = '#fff';
          innerItem.previousSibling.style.color = '#fff';
        });
      });
    });

    this.address.addEventListener('input', () => {
      this.address.style.borderBottom = '2px solid white';
      this.address.previousSibling.style.color = 'white';
    });

    this.dob.addEventListener('input', () => {
      //Get year difference
      const dateValue = this.dob.value;

      let yearDiff = this._utilService.getDateDiffFromToday(dateValue);
      if (yearDiff) {
        this.dob.style.borderBottom = '2px solid white';
        this.dob.previousSibling.style.color = 'white';
      } else {
        this.dob.style.borderBottom = '2px solid #cc0000';
        this.dob.previousSibling.style.color = '#cc0000';
        this.dob.value = '';
        this.errMsg.style.display = 'flex';
        this.errMsg.firstChild.innerHTML =
          'Age should be greater than 18yrs Old!';
      }
    });

    this.bloodGroup.addEventListener('change', () => {
      this.bloodGroup.style.borderBottom = '2px solid white';
      this.bloodGroup.previousSibling.style.color = 'white';
    });

    this.phNo.addEventListener('input', () => {
      if (
        this.phNo.value.match(/^[^ ]+[0-9]{9}$/) &&
        this.phNo.value.length <= 10 &&
        !this.phNo.value.startsWith('0')
      ) {
        this.phNo.style.borderBottom = '2px solid white';
        this.phNo.previousSibling.style.color = 'white';
      } else {
        this.phNo.style.borderBottom = '2px solid #cc0000';
        this.phNo.previousSibling.style.color = '#cc0000';
      }
    });

    this.email.addEventListener('input', () => {
      if (this.email.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
        this.email.style.borderBottom = '2px solid white';
        this.email.previousSibling.style.color = 'white';
      } else {
        this.email.style.borderBottom = '2px solid #cc0000';
        this.email.previousSibling.style.color = '#cc0000';
      }
    });
  }
  rightSideContent() {
    this.selectedIndex = this.vehicleType.value;
    if (this.selectedIndex == '') {
      this.leftValue = [
        'Permanent address proof',
        'Voters ID card/Aadhar Card/Passport/Pan card',
        'Birth certificate/SSC certificate',
        "3 passport size photographs while applying for a learner's license",
        '3 passport size photographs while applying for a permanent driving licence',
        'Application fees',
      ];
    } else if (this.selectedIndex == 'Motorcycles with gear') {
      this.leftValue = [
        'The applicant must be at least 18 years old.',
        'He should be aware of traffic rules and regulations and should have a valid age proof and address proof.',
      ];
    } else if (
      this.selectedIndex == 'Motorcycles without gear (capacity of up to 50CC)'
    ) {
      this.leftValue = [
        'The applicant should be minimum 16 years old and should have the consent of his guardian or parents.',
        'He must be aware of traffic rules and regulations, and should possess a valid age proof and address document.',
      ];
    } else {
      this.leftValue = [
        'The applicant should have cleared the 8th standard.The applicant should be above the age of 18 (In some states, the minimum age for this vehicle type is 20 years).',
        'The applicant should be trained from a government training school or one that is affiliated with the state government.',
      ];
    }
  }
  onSubmit() {
    // this.btnSubmit.style.opacity = '0.5';
    // this.btnSubmit.style.pointerEvents = 'none';
    if (this.selectedIndex == '') {
      this.vehicleType.style.borderBottom = '2px solid #cc0000';
      this.vehicleType.previousSibling.style.color = '#cc0000';
    }
    if (this.fullName.value == '') {
      this.fullName.style.borderBottom = '2px solid #cc0000';
      this.fullName.previousSibling.style.color = '#cc0000';
    }
    if (this.stateValue.value == '') {
      this.stateValue.style.borderBottom = '2px solid #cc0000';
      this.stateValue.previousSibling.style.color = '#cc0000';
    }

    if (
      this.pinCode.value.trim() == '' ||
      !this.pinCode.value.match(/^[^ ]+[0-9]{5}$/) ||
      this.pinCode.value.length > 6 ||
      this.pinCode.value.startsWith('0')
    ) {
      this.pinCode.style.borderBottom = '2px solid #cc0000';
      this.pinCode.previousSibling.style.color = '#cc0000';
    }

    if (this.dob.value == '') {
      this.dob.style.borderBottom = '2px solid #cc0000';
      this.dob.previousSibling.style.color = '#cc0000';
    }
    if (this.bloodGroup.value == '') {
      this.bloodGroup.style.borderBottom = '2px solid #cc0000';
      this.bloodGroup.previousSibling.style.color = '#cc0000';
    }
    if (
      this.phNo.value == '' ||
      !this.phNo.value.match(/^[^ ]+[0-9]{9}$/) ||
      this.phNo.value.length > 10 ||
      this.phNo.value.startsWith('0')
    ) {
      this.phNo.style.borderBottom = '2px solid #cc0000';
      this.phNo.previousSibling.style.color = '#cc0000';
    }
    if (
      this.email.value == '' ||
      !this.email.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)
    ) {
      this.email.style.borderBottom = '2px solid #cc0000';
      this.email.previousSibling.style.color = '#cc0000';
    }

    // this.gender.forEach((item) => {
    //   if (!item.checked) {
    //     item.parentElement.previousSibling.style.color = '#cc0000';
    //     item.previousSibling.style.color = '#cc0000';
    //   }
    // });

    if (this.address.value == '') {
      this.address.style.borderBottom = '2px solid #cc0000';
      this.address.previousSibling.style.color = '#cc0000';
    }

    if (
      this.selectedIndex != '' &&
      this.fullName.value != '' &&
      this.stateValue.value != '' &&
      this.pinCode.value != '' &&
      this.dob.value != '' &&
      this.bloodGroup.value != '' &&
      this.phNo.value != '' &&
      this.email.value != '' &&
      this.address.value != '' &&
      this.email.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/) &&
      this.phNo.value.match(/^[^ ]+[0-9]{9}$/) &&
      this.phNo.value.length <= 10 &&
      !this.phNo.value.startsWith('0') &&
      this.pinCode.value.match(/^[^ ]+[0-9]{5}$/) &&
      this.pinCode.value.length <= 6 &&
      !this.pinCode.value.startsWith('0')
    ) {
      this.btnSubmit.style.pointerEvents = 'none';
      this.btnSubmit.style.opacity = '0.4';
      this.setUser();
    }
  }

  onReset() {
    this.vehicleType.style.borderBottom = '2px solid #fff';
    this.vehicleType.previousSibling.style.color = '#fff';

    this.fullName.style.borderBottom = '2px solid #fff';
    this.fullName.previousSibling.style.color = '#fff';

    this.stateValue.style.borderBottom = '2px solid #fff';
    this.stateValue.previousSibling.style.color = '#fff';

    this.pinCode.style.borderBottom = '2px solid #fff';
    this.pinCode.previousSibling.style.color = '#fff';

    this.dob.style.borderBottom = '2px solid #fff';
    this.dob.previousSibling.style.color = '#fff';

    this.bloodGroup.style.borderBottom = '2px solid #fff';
    this.bloodGroup.previousSibling.style.color = '#fff';

    this.phNo.style.borderBottom = '2px solid #fff';
    this.phNo.previousSibling.style.color = '#fff';

    this.email.style.borderBottom = '2px solid #fff';
    this.email.previousSibling.style.color = '#fff';

    this.gender.forEach((item) => {
      item.parentElement.previousSibling.style.color = '#fff';
      item.previousSibling.style.color = '#fff';
    });

    this.address.style.borderBottom = '2px solid white';
    this.address.previousSibling.style.color = 'white';
  }
}
