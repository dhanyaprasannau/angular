import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AccountService{
    constructor(private httpClient:HttpClient){}

    changePassword(password:string){
        return this.httpClient.post('api/account/change_password',password)
    }
    getProfile(){
        return this.httpClient.get('api/account');
    }
    updateProfile(formValues:JSON){
        return this.httpClient.post('api/account',formValues);
    }
}