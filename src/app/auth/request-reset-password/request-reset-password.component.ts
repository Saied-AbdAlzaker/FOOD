import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RequestResetPasswordComponent>) {}

  email:string='';

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
