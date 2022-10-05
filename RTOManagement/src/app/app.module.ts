import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { MenupageComponent } from './menupage/menupage.component';
import { ErrorComponent } from './error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApplyLLComponent } from './apply-ll/apply-ll.component';
import { ApplyDlComponent } from './apply-dl/apply-dl.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserServiceService } from './services/user-service.service';
import { UserLoginComponent } from './user-login/user-login.component';
import { StatusOfLicComponent } from './status-of-lic/status-of-lic.component';
import { UtilserviceService } from './services/utilservice.service';
import { ReNewLicComponent } from './re-new-lic/re-new-lic.component';
import { TestDriveComponent } from './test-drive/test-drive.component';
import { ShowAllUserComponent } from './show-all-user/show-all-user.component';
import { SetUserStatusComponent } from './set-user-status/set-user-status.component';
import { AdminMenuPageComponent } from './admin-menu-page/admin-menu-page.component';
import { GetUserService } from './services/get-user.service';
import { ShowAllTestDriveComponent } from './show-all-test-drive/show-all-test-drive.component';
import { UpdateVerificationFilesComponent } from './update-verification-files/update-verification-files.component';
import { GetAdminService } from './services/get-admin.service';
import { NewAdminComponent } from './new-admin/new-admin.component';

/*Application Routes paths*/
const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenupageComponent },
  { path: 'applyLL', component: ApplyLLComponent },
  { path: 'applyDL', component: ApplyDlComponent },
  { path: 'userLogin', component: UserLoginComponent },
  { path: 'statusLic', component: StatusOfLicComponent },
  { path: 'renewLic', component: ReNewLicComponent },
  { path: 'getTestDrive', component: TestDriveComponent },
  { path: 'uploadFiles', component: UpdateVerificationFilesComponent },

  /*Admin Paths */
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'adminMenu', component: AdminMenuPageComponent },
  { path: 'adminShowAllUser', component: ShowAllUserComponent },
  { path: 'adminAllTestDrive', component: ShowAllTestDriveComponent },
  { path: 'adminSetUserStatus', component: SetUserStatusComponent },
  { path: 'newAdmin', component: NewAdminComponent },

  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    HomeComponent,
    MenupageComponent,
    ErrorComponent,
    ApplyLLComponent,
    ApplyDlComponent,
    NavBarComponent,
    UserLoginComponent,
    StatusOfLicComponent,
    ReNewLicComponent,
    TestDriveComponent,
    ShowAllUserComponent,
    SetUserStatusComponent,
    AdminMenuPageComponent,
    NewAdminComponent,
    ShowAllTestDriveComponent,

    UpdateVerificationFilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    UserServiceService,
    UtilserviceService,
    GetUserService,
    GetAdminService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
