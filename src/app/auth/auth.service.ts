import { User } from './user.model';
import { Subject } from 'rxjs'
import { AuthData } from '../authdata.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    constructor(private router: Router){}
    authChange = new Subject<boolean>()
    private user: User;

    registerUser(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() *100000).toString()

        }
        this.authSuccessfully()
    }
    login(authData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() *100000).toString()

        }
       this.authSuccessfully()
    }
    logout(){
        this.user = null
        this.authChange.next(false)
        this.router.navigate(['/login'])
    }
    getUser(){
        // IF we do just return this.user --- this will return the same obj. cos object is a referance type 
        return {...this.user}
    }
    isAuth(){
        return this.user != null
    }
    authSuccessfully(){
        this.authChange.next(true)
        this.router.navigate(['/training'])
    }
}