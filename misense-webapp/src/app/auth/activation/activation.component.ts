import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
  activationSuccess:boolean = false;;
  activationFailed :boolean = false;
  constructor(private authService:AuthService,
  private activatedRoute:ActivatedRoute) { 
  }

  ngOnInit() {
    const key = this.activatedRoute.snapshot.params['key'];
    if(key){
    this.authService.activateUser(key)
    .pipe(first())
    .subscribe(
        data => {         
          console.log("success");          
          this.activationSuccess=!this.activationSuccess;           
           
        },
        error => {console.log(error);
            console.log("error");
            
            this.activationFailed=!this.activationFailed;
        });
    }
    else{

    }
    
  }

}
