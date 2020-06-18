import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class UIService {
    constructor(private snack: MatSnackBar){}
  loadingStateChanged = new Subject<boolean>();
  showSnackBar(message, action, duration){
      this.snack.open(message,action, {
          duration: duration
      })
  }
}
