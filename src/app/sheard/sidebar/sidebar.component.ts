import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/Auth.service';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

interface IMenu{
  title:string,
  icon:string,
  link:string,
  isActive:boolean
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private _AuthService:AuthService, private _router:Router,public dialog: MatDialog,
    private toastr:ToastrService) {}

  isOpened:boolean = true;

  isAdmin(): boolean {
    return this._AuthService.role == 'SuperAdmin'?true:false;
  }
  isUser(): boolean {
    return this._AuthService.role == 'SystemUser'?true:false;
  }

  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'fa-solid fa-house',
      link: '/dashboard/home',
      isActive: this.isAdmin() || this.isUser()
    },
    {
      title: 'Users',
      icon: 'fa-solid fa-user-group',
      link: '/dashboard/admin/users',
      isActive: this.isAdmin()
    },
    {
      title: 'Recipes',
      icon: 'fa-solid fa-bowl-rice',
      link: '/dashboard/admin/recipes',
      isActive: this.isAdmin()
    },
    {
      title: 'Categories',
      icon: 'fa-solid fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isAdmin()
    },
    {
      title: 'Recipes',
      icon: 'fa-solid fa-calendar-days',
      link: '/dashboard/user/recipes',
      isActive: this.isUser()
    },
    {
      title: 'Favorites',
      icon: 'fa-solid fa-calendar-week',
      link: '/dashboard/user/favorites',
      isActive: this.isUser()
    },
  ]

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: { },
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onChangPassword(result);
    });

  }

  errorMessage:string='';
  onChangPassword(data: string){

    this._AuthService.onChangePassword(data).subscribe({
      next: (res: any)=>{
        this.errorMessage = res.message;
      }, error: (err)=>{
        this.toastr.error(err.error.message, 'Error!');
      },complete: ()=>{
        this.toastr.success(this.errorMessage, 'Successfully!');
        this._router.navigate(['/auth/resetPassword']);
        localStorage.setItem('email' , data);
      }
    })
  }

  logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    this._router.navigate(['/auth']);
  }

}
