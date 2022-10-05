import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserModel } from '../models/UserModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  baseUrl: string = 'http://localhost:8082/rto/user'; //url of my backend api
  constructor(private http: HttpClient) {}

  public addUser(user: UserModel) {
    return this.http.post<UserModel>(this.baseUrl + '/applyLl', user);
  }

  public updateUser(oldUser: UserModel) {
    return this.http.put<UserModel>(this.baseUrl + '/testDrive', oldUser);
  }

  public getUser(userCredential: UserModel) {
    return this.http.post(`${this.baseUrl}/getLic`, userCredential);
  }

  public applyDl(oldUser: UserModel) {
    return this.http.put<UserModel>(`${this.baseUrl}/applyDl`, oldUser);
  }

  public renewLic(oldUser: UserModel) {
    return this.http.put<UserModel>(`${this.baseUrl}/renewLic`, oldUser);
  }

  public uploadFiles(oldUser: UserModel) {
    return this.http.put<UserModel>(this.baseUrl + '/uploadFiles', oldUser);
  }
}
