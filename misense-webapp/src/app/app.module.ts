import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS/*, HttpXsrfInterceptor*/ } from '@angular/common/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RegisterComponent } from './auth/register/register.component';

import { AuthService } from './auth/auth.service';
import { UserService } from './users/user.service';
import { AccountService } from './account/account-service';

import { ActivationComponent } from './auth/activation/activation.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UsersComponent } from './users/users.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DropDownDirective } from './shared/dropdown.directive';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { MyProfileComponent } from './account/my-profile/my-profile.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import {DataTableModule} from "angular-6-datatable";
import { HomeService } from './core/home/home.service';
import {QueryService} from './core/home/query.service';
import { ZipcodeMapComponent } from './zipcode-map/zipcode-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    RegisterComponent,
    ActivationComponent,
    AnalyticsComponent,
    UsersComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    DropDownDirective,
    ChangePasswordComponent,
    MyProfileComponent,
    UserEditComponent,
     UsersListComponent,
     ZipcodeMapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    NgxSpinnerModule
  ],
  providers: [AuthService, UserService, AccountService, HomeService, QueryService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
