import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  private email:string;
  emailFailed = false;
  emailSent = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onForgotPassword(form: NgForm){
    this.email= form.value.email;
    this.authService.forgotPassword(this.email)
            .pipe(first())
            .subscribe(
                data => {
                  this.emailSent = true;  
                  this.emailFailed = false;
                  console.log("success");
                },
                error => { 
                  this.emailFailed = true;
                  this.emailSent = false; 
                  console.log("Forgot Password error");
                }); 

  }
  

}
