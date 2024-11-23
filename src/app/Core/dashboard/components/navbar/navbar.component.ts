import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/Core/auth/components/change-password/change-password.component';
import { LogoutDialogComponent } from 'src/app/shared/components/logout-dialog/logout-dialog.component';
import { HelperService } from 'src/app/shared/service/helper.service';
import { IUsers } from '../../modules/admin/users/model/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  imgSrc: any;
  currentUser: IUsers | any;

  img: any;

  constructor(public dialog: MatDialog, private _HelperService: HelperService) {
    this.imgSrc = _HelperService.imgPath;
    _HelperService.currentUser().subscribe({
      next: (res) => {
        this.currentUser = res;
        console.log(this.currentUser);

      }
    })
  }

  ngOnInit(): void {

  }

  // ChangePasswordDialog
  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: {},
      width: '50%',
    });
  }
  // LogoutDialog
  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      data: {},
      width: '40%',
    });
  }

}
