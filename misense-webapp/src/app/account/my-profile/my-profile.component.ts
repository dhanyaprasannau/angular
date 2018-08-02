import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AccountService } from '../account-service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

export class MyProfileComponent implements OnInit {

  roles = ['Sales Manager','Marketing Manager','Finance Manager','Business analyst'];
  updateStatus = false;
  isLoaded:boolean;
  profile:any={};
   constructor(public accountService:AccountService) {
    this.isLoaded = false;
    this.accountService.getProfile()
    .pipe(first())
    .subscribe(data=>{
      this.profile = data;
      this.isLoaded = true;
    },error=>{
      console.log("Get Profile error");
    })
   }
  

  ngOnInit() {
    if(!this.isLoaded){

    this.profile.firstName='';
    }
  }

  onUpdateProfile(form:NgForm){
    //form.value.activated = true;
    form.value.langKey = 'en';
    this.accountService.updateProfile(form.value)
    .pipe(first())
    .subscribe(data=>{
      this.updateStatus = true;
    },
    error=>{
      this.updateStatus = false;
      console.log("Update Profile error");
    })
  }
}
