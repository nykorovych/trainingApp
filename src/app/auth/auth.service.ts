import { User } from './user.model';
import { Subject } from 'rxjs';
import { AuthData } from '../authdata.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}
  authChange = new Subject<boolean>();
  private authenticated = false;

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.initAuthListener();
        console.log(res);
      })
      .catch((err) => {
        this.uiService.showSnackBar(err,null, 2000)
      });
  }
  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true)
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.uiService.loadingStateChanged.next(false)
        this.initAuthListener();
        console.log(res);
      })
      .catch((err) => {
        this.uiService.loadingStateChanged.next(false)
        this.uiService.showSnackBar(err,null, 2000)
        
      });
  }
  logout() {
      this.afAuth.auth.signOut()
      this.router.navigateByUrl('/')
  }
  //   getUser() {
  //     // IF we do just return this.user --- this will return the same obj. cos object is a referance type
  //     return { ...this.user };
  //   }
  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.canselSubcription();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.authenticated = false;
      }
    });
  }
  isAuth() {
    return this.authenticated;
  }
}
