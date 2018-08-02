import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpRequest, HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
// import { Subject } from 'rxjs';
@Injectable()

export class AuthService{
  //accessToken=new Subject<string>();
  token: string;
  body:string;
  admin = false;
  user :any;
    constructor(private router: Router,private httpClient:HttpClient){}
    
    signupUser(formValues:JSON) {
        // const req = new HttpRequest('POST', 'http://localhost:8089/api/register?cacheBuster=1528184650821', formValues, {reportProgress: true});
        // console.log(this.httpClient.request(req));       //return this.httpClient.request(req);
       
        return this.httpClient.post('api/register', formValues, {responseType:'text'});        
      }

      signinUser(form:NgForm){
        this.body = new HttpParams()
        .set('j_username', form.value.j_username)
        .set('j_password', form.value.j_password).toString();
        return this.httpClient.post('api/authentication',  this.body,{
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          });
       
      }

      activateUser(key:string){
        return this.httpClient.get('api/activate?key='+ key);
      }

      setToken(token:string){
        localStorage.setItem('accessToken', token);
        sessionStorage.setItem('accessToken', token);
      }

      isAuthenticated() { 
        this.token = localStorage.getItem('accessToken'); 
        if(!this.token){
          this.token = sessionStorage.getItem('accessToken'); 
        }
        return this.token != null;
      }

      isLogin(){
        return this.httpClient.get('api/account');
      }
      
      isAdmin( ){
        if(localStorage.getItem('role')=='admin'){
          this.admin = true;
        }else  if(sessionStorage.getItem('role')=='admin'){
          this.admin = true;
        }else{
          this.admin = false;
        }
        return this.admin != false;
      }

      signout() {
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        sessionStorage.removeItem('role');
        return this.httpClient.post('api/logout','');
      }

      forgotPassword(email: string){        
        return this.httpClient.post('api/account/reset_password/init', email, {responseType:'text'}); 
      }

      resetPassword(formValues:JSON){
        return this.httpClient.post('api/account/reset_password/finish',formValues)
      }



      
}