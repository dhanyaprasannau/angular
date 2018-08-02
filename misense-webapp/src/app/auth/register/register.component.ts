import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm; 
  public registrationSuccess = false;
  public registration = true;
  registerFailed = false;
  errorMessage = 'dfdfdf';
  constructor(private authService:AuthService,
    private router: Router) { }
  roles = ['Sales Manager','Marketing Manager','Finance Manager','Business analyst'];
  passwordMatch = true;
  ngOnInit() {
  }
  onSignup(form: NgForm) {
    this.passwordMatch = true;
    if(form.value.password!=form.value.confirmPassword){
      this.passwordMatch = false;
    }else{  
      form.value.langKey = 'en';
      this.authService.signupUser(form.value)
              .pipe(first())
              .subscribe(
                  data => { 
                  this.registrationSuccess = true;  
                  this.registration = false;
                  },
                  error => {//console.log(error.error);
                      this.errorMessage = error.error;
                      this.registerFailed = true;
                      console.log("error");
                  });

    } 
    
  }

}
