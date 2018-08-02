import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  roles = ['Sales Manager','Marketing Manager','Finance Manager','Business analyst'];
  updateStatus = false;
  userHeading:string = ''
  user:any= {};
  name: string;
  userData :any;
  create:boolean = false;
  errorMessage:string='';
  constructor(private userService: UserService,
    private authService : AuthService,
    private activatedRoute:ActivatedRoute,
    private router: Router) { 
  }

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.params['name'];
    if(this.name){
      this.userHeading = 'Edit User '+this.name;
      this.userService.getUser(this.name)
      .pipe(first())
      .subscribe(data=>{
        this.user = data;
      },error=>{
        console.log("Error");
      })
    }else{
      this.create = true;;
      this.userHeading = 'Create a User';

      this.userData = {firstName:'', lastName : '', email:'', phoneNumber:'',roleName:''};
    }
  }

  onUpdateUser(form:NgForm){
    if(this.name){
      this.userData = this.user;
      this.userData.firstName = form.value.firstName;
      this.userData.lastName = form.value.lastName;
      this.userData.email = form.value.email;
      this.userData.phoneNumber = form.value.phoneNumber;
      this.userData.roleName = form.value.roleName;
      this.userService.updateUser(this.userData,form.value.login)
      .pipe(first())
      .subscribe(data=>{
        this.updateStatus = true;
      },error=>{
        this.updateStatus = false;
        console.log("error");
      })

    }else{
      form.value.langKey = 'en';
      this.errorMessage = '';
      this.userService.createUser(form.value)
      .pipe(first())
      .subscribe(
          data => { 
            this.router.navigate(['/users']);
          },
          error => {
              this.errorMessage = 'Username / Email exist.'
              console.log("Create User  error");
          });
    }
  }

}
