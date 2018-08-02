import { Component, OnInit, Pipe } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';

@Pipe({ name: 'safe'})
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  url: SafeResourceUrl;
 
  constructor(sanitizer: DomSanitizer,
    private authService:AuthService) {
    this.authService.isLogin()
    .subscribe(data=>{
      this.url = sanitizer.bypassSecurityTrustResourceUrl('/analyser/index.html?splash=false#');
    },error=>{
      console.log("login error");
      this.authService.signout();

    })
    
  }

  ngOnInit() {
  }

}
