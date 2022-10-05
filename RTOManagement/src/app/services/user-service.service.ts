import { Injectable } from '@angular/core';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  User: UserModel;
  navigatedFrom: any;
  errorMessage: any;

  constructor() {}
  setUserData(newUser: UserModel) {
    this.User = newUser;
  }
}
