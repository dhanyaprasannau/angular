import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../account-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  password:any;
  passwordMatch = true;
  resetPassword = false;

  constructor(public accountService:AccountService) { }
  ngOnInit() {
  }
  onChangePassword(form: NgForm){
    this.passwordMatch = true;
    console.log(form.value.password);
    if(form.value.password != form.value.confirmPassword){
      this.passwordMatch = false;
    }
    else{  
      this.accountService.changePassword(form.value.password)
              .pipe(first())
              .subscribe(
                  data => {
                    this.resetPassword = true;  
                    console.log("success");
                  },
                  error => { 
                    this.resetPassword = false; 
                    console.log("Change Password error");
                  }); 

    } 
  }

}
