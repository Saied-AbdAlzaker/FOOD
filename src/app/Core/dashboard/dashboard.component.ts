import { Component } from '@angular/core';
import { IMenu } from './components/model/menu';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isOpened:boolean=true;
  constructor(private _authService: AuthService){}

  isAdmin():boolean{
    return this._authService.role == 'SuperAdmin'?true:false
  }
  isUser():boolean{
    return this._authService.role == 'SystemUser'?true:false
  }

  menu: IMenu[] = [
    {
      title:'Home',
      icon:'fa-solid fa-house',
      link:'/dashboard/home',
      isActive: this.isAdmin() || this.isUser()
    },
    {
      title:'Users',
      icon:'fa-solid fa-user-group',
      link:'/dashboard/admin/users',
      isActive: this.isAdmin()
    },
    {
      title:'Recipes',
      icon:'fa-solid fa-bowl-rice',
      link:'/dashboard/admin/recipes',
      isActive: this.isAdmin()
    },
    {
      title:'Categories',
      icon:'fa-solid fa-calendar-days',
      link:'/dashboard/admin/categories',
      isActive: this.isAdmin()
    },
    {
      title:'Recipes',
      icon:'fa-solid fa-calendar-days',
      link:'/dashboard/user/recipes',
      isActive: this.isUser()
    },
    {
      title:'Favorites',
      icon:'fa-regular fa-heart',
      link:'/dashboard/user/favorites',
      isActive: this.isUser()
    },
  ]

}
