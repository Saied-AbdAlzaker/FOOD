import { Component,Inject, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutDialogComponent>,
    private _router:Router, private spinner: NgxSpinnerService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  logout(){
    this.spinner.show();
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    this._router.navigate(['/auth']);
    this.onNoClick();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }

  ngOnInit() {
    
  }

}
