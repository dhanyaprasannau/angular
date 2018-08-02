import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private email:string;
  resetFailed = false;
  resetPassword = false;
  passwordMatch = true;
  constructor(private authService: AuthService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  onResetPassword(form: NgForm){
    form.value.key = this.activatedRoute.snapshot.params['key'];
    this.passwordMatch = true;
    if(form.value.newPassword != form.value.confirmPassword){
      this.passwordMatch = false;
    }
    else{  
      this.authService.resetPassword(form.value)
              .pipe(first())
              .subscribe(
                  data => {
                    this.resetPassword = true;  
                    this.resetFailed = false;
                    console.log("success");
                  },
                  error => { 
                    this.resetFailed = true;
                    this.resetPassword = false; 
                    console.log("Reset Password error");
                  }); 

    } 

  }
  

}
