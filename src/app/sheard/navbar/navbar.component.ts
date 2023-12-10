import { Component } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  imgSrc:any;
  currentUser: any;
  constructor(private _HelperService:HelperService) {
    this._HelperService.getCurrentUser().subscribe({
      next: (res)=>{
        // console.log(res);
        this.currentUser = res;
      }
    })
  }

  // userName = localStorage.getItem('userName')?localStorage.getItem('userName'):'Guest';

}
