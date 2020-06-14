import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenva = new EventEmitter()
  isAuth
  authStatus: Subscription

  constructor(private authService: AuthService) { }

  onLogout(){
    this.onClose()
    this.authService.logout()

  }

  ngOnInit(): void {
    this.authStatus = this.authService.authChange.subscribe(auth => this.isAuth = auth)
  }
  onClose() {
    this.closeSidenva.emit()
  }

}
