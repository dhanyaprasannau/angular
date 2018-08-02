import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ActivationComponent } from './auth/activation/activation.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UsersComponent } from './users/users.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { MyProfileComponent } from './account/my-profile/my-profile.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersListComponent } from './users/users-list/users-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'login', component: SigninComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'resetpassword/:key', component: ResetPasswordComponent},
  {path: 'analytics', component: AnalyticsComponent, canActivate:[AuthGuard]},
  {path: 'users', component: UsersComponent , canActivate:[AuthGuard],children:[
    {path:'',component: UsersListComponent,canActivate:[AuthGuard]},
    {path:'new',component: UserEditComponent,canActivate:[AuthGuard]},
    {path:':name',component: UserEditComponent,canActivate:[AuthGuard]}
  ]},
  {path: 'activate/:key', component: ActivationComponent},
  {path: 'changepassword', component: ChangePasswordComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: MyProfileComponent, canActivate:[AuthGuard]}
  //{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {

}
