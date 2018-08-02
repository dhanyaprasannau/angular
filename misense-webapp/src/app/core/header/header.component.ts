import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService,
    private router:Router) { }

  ngOnInit() {
  }
  onLogout() {
    this.authService.signout()
    .pipe(first())
    .subscribe(
        data => { 
          this.router.navigate(['/']);
        },
        error => { 
            console.log(error);
            console.log("error");
        }); 
  }

}
