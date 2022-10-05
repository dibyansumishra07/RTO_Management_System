import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminModel } from '../models/AdminModel';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class GetAdminService {
  baseUrl: string = 'http://localhost:8082/rto/admin';
  constructor(private http: HttpClient) {}
  public adminLogin(oldAdmin: AdminModel) {
    return this.http.post(this.baseUrl + '/adminLogin', oldAdmin);
  }
  public setUserStatus(oldUser: UserModel) {
    return this.http.put<UserModel>(`${this.baseUrl}/setStatus`, oldUser);
  }

  public getAllUsers() {
    return this.http.get<UserModel[]>(this.baseUrl + '/getAllLic');
  }

  public getUserById(id: number) {
    return this.http.get<UserModel>(`${this.baseUrl}/getUserById/${id}`);
  }
  public forgotPassword(oldAdmin: AdminModel) {
    return this.http.put(this.baseUrl + '/forgotPassword', oldAdmin);
  }

  public addAdmin(NewAdmin: AdminModel) {
    return this.http.post<AdminModel>(this.baseUrl + '/addAdmin', NewAdmin);
  }
}
