import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { GetUserService } from '../services/get-user.service';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-test-drive',
  templateUrl: './test-drive.component.html',
  styleUrls: ['./test-drive.component.css'],
})
export class TestDriveComponent implements OnInit {
  questions = [
    {
      question: 'Drunken driving is?',
      opt1: 'Allowed at night',
      opt2: 'Allowed during the day',
      opt3: 'Prohibited at all times',
      opt4: 'Allowed at everywhere',
      ans: 'Prohibited at all times',
    },
    {
      question: 'On a road that has been designated as one way?',
      opt1: 'You should not drive in reverse gear',
      opt2: 'You should not overtake',
      opt3: 'You should not park',
      opt4: 'You should use Header light',
      ans: 'You should not drive in reverse gear',
    },
    {
      question: 'A learner’s license is valid for a period of?',
      opt1: '30 days',
      opt2: '6 months',
      opt3: 'Lifetime',
      opt4: 'Until a driving licence is availed',
      ans: '6 months',
    },
    {
      question: 'Zebra lines are meant for?',
      opt1: 'Crossing of pedestrians',
      opt2: 'Stopping vehicles',
      opt3: 'Parking vehicles',
      opt4: 'Overtaking',
      ans: 'Crossing of pedestrians',
    },
  ];
  rules = [
    'Select the Radio buttons to select your answer',
    'You have to secure at least 3 marks from 4 to go to next step',
    'If you secure 2 or less than 2 then you will declared failed',
    'If you are failed then you have to retest',
  ];
  counter: number = 0;
  crossMsg: any;
  overlay: any;
  closeBtn: any;
  User: UserModel;
  msgTitle: string;
  msg: string;
  qstn1: any;
  qstn2: any;
  qstn3: any;
  qstn4: any;
  submit: any;
  updatedUser: UserModel;

  constructor(
    private _userService: UserServiceService,
    private _router: Router,
    private _getUser: GetUserService
  ) {}

  ngOnInit(): void {
    this.qstn1 = document.getElementsByName('ans1');
    this.qstn2 = document.getElementsByName('ans2');
    this.qstn3 = document.getElementsByName('ans3');
    this.qstn4 = document.getElementsByName('ans4');

    this.crossMsg = document.querySelector('.closeOverlay');
    this.overlay = document.querySelector('.overlay');
    this.closeBtn = document.querySelector('.closeBtn');

    this.submit = document.querySelector('.submit');
    //getting the data from the UserService
    if (this._userService.User == null) {
      this._userService.navigatedFrom = '/getTestDrive';
      this._router.navigate(['/userLogin']);
    }
    this.User = this._userService.User;
    if (
      this.User.adhar == null ||
      this.User.bloodGroupCertificate == null ||
      this.User.certificate == null
    ) {
      this.overlay.style.display = 'flex';
      this.overlay.firstChild.display = 'flex';
      this.overlay.firstChild.style.background =
        'linear-gradient(134deg, #ff3a3aed, #141414)';
      this.msgTitle = 'Ooopss!!';
      this.msg = `Sorry! it seems some files are not uploaded yet!, please upload those files first.`;
      this.crossMsg.style.display = 'none';
      this.closeBtn.style.display = 'none';
      setTimeout(() => {
        this._router.navigate(['/menu']);
      }, 9000);
      this._userService.User = null;
    }
    if (
      this.User.licStatus.match('approve') ||
      this.User.licStatus.match('reject') ||
      this.User.testDriveDate != null
    ) {
      this.overlay.style.display = 'flex';
      this.overlay.firstChild.display = 'flex';
      this.overlay.firstChild.style.background =
        'linear-gradient(134deg, #ff3a3aed, #141414)';
      this.msgTitle = 'Ooopss!!';
      this.msg = `Sorry! it seems your application is already approved/rejected or you have already appeared the test drive`;
      this.crossMsg.style.display = 'none';
      this.closeBtn.style.display = 'none';
      setTimeout(() => {
        this._router.navigate(['/menu']);
      }, 9000);
      this._userService.User = null;
    } else {
      if (
        this.User.adhar == null ||
        this.User.bloodGroupCertificate == null ||
        this.User.certificate == null
      ) {
        this.overlay.style.display = 'flex';
        this.overlay.firstChild.display = 'flex';
        this.overlay.firstChild.style.background =
          'linear-gradient(134deg, #ff3a3aed, #141414)';
        this.msgTitle = 'Ooopss!!';
        this.msg = `Sorry! it seems some of the files are not uploaded yet, Please upload it from File Update Option in main menu`;
        this.crossMsg.style.display = 'none';
        this.closeBtn.style.display = 'none';
        setTimeout(() => {
          this._router.navigate(['/menu']);
        }, 10000);
        this._userService.User = null;
      }
    }

    /*close the overlay page - button*/
    const close = () => {
      this.overlay.style.display = 'none';
    };
    this.crossMsg.addEventListener('click', close);
    this.closeBtn.addEventListener('click', close);
  }
  onSubmit() {
    const checkValue = (item) => {
      if (item.checked) {
        let index = item.id;
        if (this.questions[index].ans == item.value) {
          this.counter += 1;
        }
      }
    };

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
      document
        .querySelectorAll('input')
        .forEach((item) => (item.style.pointerEvents = 'none'));
      this.submit.style.opacity = '0';
    };

    //Question 1
    this.qstn1.forEach(checkValue);
    //Question 2
    this.qstn2.forEach(checkValue);
    //Question 3
    this.qstn3.forEach(checkValue);
    //Question 4
    this.qstn4.forEach(checkValue);
    if (this.counter <= 2) {
      messageMethod(
        'Ooops!!',
        `Sorry! You are failed please retest this exam again!`
      );
    } else {
      this.submit.style.pointerEvents = 'none';
      this.submit.style.opacity = '0.5';
      this._getUser.updateUser(this.User).subscribe(
        (data) => {
          this.updatedUser = data;

          messageMethod(
            'Success!',
            `Successfully Passed from the Test Drive, your Test Date is ${this.updatedUser.testDriveDate}`
          );
          this._userService.User = this.updatedUser;
        },
        (error) => {
          this._userService.errorMessage = 'Sorry Can not Update Now!';
          this._router.navigate(['/error']);
        }
      );

      document
        .querySelectorAll('.ans')
        .forEach((item) => item.classList.remove('d-none'));
    }
  }
  onBack() {
    this._userService.User = null;
  }
}
