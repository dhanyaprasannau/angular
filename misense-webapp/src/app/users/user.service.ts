import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class UserService {
    constructor(private router: Router,private httpClient:HttpClient){}

    getUser(username:string){
        return this.httpClient.get('api/users/'+ username);
    }

    getUsers(){
        return this.httpClient.get('api/users');
    }

    deleteUser(name:string){
        return this.httpClient.delete('api/users/'+name);
    }

    updateUser(user:JSON,login:string){
        return this.httpClient.put('api/users',user);
    }

    createUser(user:JSON){
        return this.httpClient.post('api/users',user);
    }
}
