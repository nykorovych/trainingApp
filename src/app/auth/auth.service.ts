import { User } from './user.model';
import { AuthData } from '../authdata.model';

export class AuthService {
    private user: User;

    registerUser(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() *100000).toString()

        }
    }
    login(authData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() *100000).toString()

        }
    }
    logout(){
        this.user = null
    }
    getUser(){
        // IF we do just return this.user --- this will return the same obj. cos object is a referance type 
        return {...this.user}
    }
    isAuth(){
        return this.user != null
    }
}