import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users:any;
  constructor(private userService: UserService,
  private activatedRoute:ActivatedRoute,
  private router:Router,
private authService:AuthService) { }

  ngOnInit() {
    this.authService.isLogin()
    .subscribe(data=>{
      this.userService.getUsers()
      .subscribe(data=>{
        this.users = data;
      },error=>{
        console.log("Get Users Error");
      })
    },error=>{
      console.log("login error");
      this.authService.signout();

    })
  }

  onDeleteUser(user){
    this.userService.deleteUser(user.login)
    .subscribe(
      data=>{
        this.users = this.users.filter(u => u !== user);
    },error=>{
      console.log("Delete User Error");
    })
  }

  onEditUser(user){
    this.router.navigate(['/users/',user.login]);
  }

  onCreateUser(){console.log("----");
    this.router.navigate(['/users/new']);
  }


}
