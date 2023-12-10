import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../auth/services/Auth.service';
import { Component, OnInit } from '@angular/core';
AuthService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  userName = localStorage.getItem('userName');


 constructor(private _AuthService:AuthService,
  private spinner: NgxSpinnerService) {}

  isAdmin(): boolean {
    return this._AuthService.role == 'SuperAdmin'?true:false;
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }
}
