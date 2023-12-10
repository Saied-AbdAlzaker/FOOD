import { AuthService } from './../../auth/services/Auth.service';
import { Component } from '@angular/core';
AuthService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userName = localStorage.getItem('userName');


 constructor(private _AuthService:AuthService) {}

  // isAdmin(): boolean {
  //   return this._AuthService.role == 'SuperAdmin'?true:false;
  // }
  // isUser(): boolean {
  //   return this._AuthService.role == 'SystemUser'?true:false;
  // }

}
