import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private subscription: Subscription;
  token:string;
  loginFailed = false;
  user :any;
  role = '';
  constructor(private authService:AuthService,
    private userService: UserService,
    private router: Router) {
  }
  ngOnInit() {  
      
  }

  onSignin(form: NgForm) { 
    this.authService.signinUser(form)
            .pipe(first())
            .subscribe(
                data => {   
                  const key=this.generateToken();                
                  
                  this.authService.setToken(key);
                  this.getUserDetails(form.value.j_username);
                  
                  this.router.navigate(['/home']);
                },
                error => { 
                  this.loginFailed = true;
                    console.log("error");
                }); 
    
  }

  getUserDetails(username:string){
    this.userService.getUser(username)
    .pipe(first()).subscribe(
      data=>{
        this.user = data;
        if(this.user.authorities.indexOf('ROLE_ADMIN') !== -1) {
          localStorage.setItem('role', 'admin');
          sessionStorage.setItem('role', 'admin');
        }

      },error=>{
        console.log("Get User error");
      }

    );
  }
  generateToken(){
    return Math.random().toString(36).substring(6);
  }
 

}
