import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent {

  constructor(public dialogRef: MatDialogRef<LogoutDialogComponent>,
    private _router:Router, private spinner: NgxSpinnerService) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

  logOut(){
    this.spinner.show();

    localStorage.clear();

    this._router.navigate(['/auth']);
    this.onNoClick();

    setTimeout(() => {
      this.spinner.hide();
    }, 2500);

  }

}
