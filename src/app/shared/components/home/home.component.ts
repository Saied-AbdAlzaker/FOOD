import { Component } from '@angular/core';
import { AuthService } from 'src/app/Core/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userName = localStorage.getItem('name');

  constructor(private _AuthService: AuthService) { }

  isAdmin(): boolean {
    return this._AuthService.role == 'SuperAdmin' ? true : false;
  }
  isUser(): boolean {
    return this._AuthService.role == 'SystemUser' ? true : false;
  }

}
